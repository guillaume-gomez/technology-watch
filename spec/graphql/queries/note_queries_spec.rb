require 'rails_helper'

RSpec.describe Queries::NoteQueries, type: :graphql do
  include_context 'with graphql query request'

  let!(:current_user) { create(:user) }
  
  describe "resolve getNote" do
    let!(:variables) { {id: params } }
    let(:query) do
      <<~GQL
        query($id: ID!) {
          getNote(id: $id) {
            id
          }
        }
      GQL
    end
    subject{ execute_graphql }

    context "when note id does not exist" do
      let(:params) { -1 }
      it { expect{subject}.to raise_error(ActiveRecord::RecordNotFound) }
    end

    context "when node id exist and belongs to user" do
      let(:note) { create(:note, user: current_user) }
      let(:params) { note.id }

      it { expect(subject.to_h["data"]["getNote"]["id"].to_i).to eq(note.id) }
    end

    context "when note does not belongs to current user" do
      let(:another_user) { create(:user)}
      let(:note) { create(:note, user: another_user) }
      let(:params) { note.id }

      it { expect{subject}.to raise_error(ActiveRecord::RecordNotFound) }
    end
  end


  describe "resolve getNotes" do
    let(:query) do
      <<~GQL
        query {
          getNotes {
            edges {
              node {
                id
              }
            }
          }
        }
      GQL
    end
    subject{ execute_graphql }

    context "when user tries to get its notes" do
      let!(:notes) { create_list(:note, 5, user: current_user) }
      it { expect(subject.to_h["data"]["getNotes"]["edges"].map{|node| node["node"]["id"].to_i }).to contain_exactly(*notes.pluck(:id)) }
    end

    context "when user gets only its notes" do
      let!(:notes) { create_list(:note, 5, user: current_user) }
      let!(:other_notes) { create_list(:note, 6)}

      it { expect(subject.to_h["data"]["getNotes"]["edges"].map{|node| node["node"]["id"].to_i }).to contain_exactly(*notes.pluck(:id)) }
      it { expect(subject.to_h["data"]["getNotes"]["edges"].map{|node| node["node"]["id"].to_i }).not_to contain_exactly(*other_notes.pluck(:id)) }
    end
  end


  describe "resolve getNotes" do
    let!(:variables) { {order: order, direction: direction } }
    let(:query) do
      <<~GQL
        query($order: NoteOrder!, $direction: NoteDirection!) {
          getNotes(orderType: { order: $order, direction: $direction }) {
            edges {
              node {
                id
              }
            }
          }
        }
      GQL
    end
    subject{ execute_graphql }

    context "sort by recent" do
      let!(:note1) { create(:note, user: current_user) }
      let!(:note2) { create(:note, user: current_user) }
      let(:order) { 'RECENT' }
      
      context "in ascendant direction" do
        let(:direction) { 'ASC' }
        it { expect(subject.to_h["data"]["getNotes"]["edges"].map{|node| node["node"]["id"].to_i }).to eq([note1.id, note2.id]) }
      end

      context "in descendant direction" do
        let(:direction) { 'DESC' }
        it { expect(subject.to_h["data"]["getNotes"]["edges"].map{|node| node["node"]["id"].to_i }).to eq([note2.id, note1.id]) }
      end
    end

    context "sort by rating" do
      let!(:note1) { create(:note, user: current_user, rating: 10) }
      let!(:note2) { create(:note, user: current_user, rating: 1) }
      let(:order) { 'RATING' }
      
      context "in ascendant direction" do
        let(:direction) { 'ASC' }
        it { expect(subject.to_h["data"]["getNotes"]["edges"].map{|node| node["node"]["id"].to_i }).to eq([note2.id, note1.id]) }
      end

      context "in descendant direction" do
        let(:direction) { 'DESC' }
        it { expect(subject.to_h["data"]["getNotes"]["edges"].map{|node| node["node"]["id"].to_i }).to eq([note1.id, note2.id]) }
      end
    end

    context "sort by times to read in minutes" do
      let!(:note1) { create(:note, user: current_user, time_to_read_in_minutes: 1) }
      let!(:note2) { create(:note, user: current_user, time_to_read_in_minutes: 10) }
      let(:order) { 'TIMES_TO_READ' }
      
      context "in ascendant direction" do
        let(:direction) { 'ASC' }
        it { expect(subject.to_h["data"]["getNotes"]["edges"].map{|node| node["node"]["id"].to_i }).to eq([note1.id, note2.id]) }
      end

      context "in descendant direction" do
        let(:direction) { 'DESC' }
        it { expect(subject.to_h["data"]["getNotes"]["edges"].map{|node| node["node"]["id"].to_i }).to eq([note2.id, note1.id]) }
      end
    end

    context "sort by mark as read" do
      let!(:note1) { create(:note, user: current_user, mark_as_read: false) }
      let!(:note2) { create(:note, user: current_user, mark_as_read: true) }
      let(:order) { 'MARK_AS_READ' }
      
      context "in ascendant direction" do
        let(:direction) { 'ASC' }
        it { expect(subject.to_h["data"]["getNotes"]["edges"].map{|node| node["node"]["id"].to_i }).to eq([note1.id, note2.id]) }
      end

      context "in descendant direction" do
        let(:direction) { 'DESC' }
        it { expect(subject.to_h["data"]["getNotes"]["edges"].map{|node| node["node"]["id"].to_i }).to eq([note2.id, note1.id]) }
      end
    end
  end

   describe "resolve getNotes" do
    let!(:variables) { {tagged_with: tagged_with } }
    let(:query) do
      <<~GQL
        query($tagged_with: [ID!]) {
          getNotes(taggedWith: $tagged_with) {
            edges {
              node {
                id
              }
            }
          }
        }
      GQL
    end
    subject{ execute_graphql }

    context "filter by tags" do
      let(:tag1) { create(:tag, user: current_user ) }
      let(:tag2) { create(:tag, user: current_user ) }
      let(:tag3) { create(:tag, user: current_user ) }
      let(:note1){ create(:note, user: current_user) }
      let(:note2) { create(:note, user: current_user) }
      let(:note3) { create(:note, user: current_user) }
      let!(:note_tag1) { create(:note_tag, note: note1, tag: tag1) }
      let!(:note_tag2) { create(:note_tag, note: note1, tag: tag2) }
      let!(:note_tag3) { create(:note_tag, note: note1, tag: tag3) }
      let!(:note_tag4) { create(:note_tag, note: note2, tag: tag2) }
      let!(:note_tag5) { create(:note_tag, note: note3, tag: tag3) }

      context "with no tag" do
        let(:tagged_with) { [] }
        it { expect(subject.to_h["data"]["getNotes"]["edges"].map{|node| node["node"]["id"].to_i }).to eq([note1.id, note2.id, note3.id]) }
      end

      context "with 1 tag" do
        let(:tagged_with) { [tag2.id] }
        it { expect(subject.to_h["data"]["getNotes"]["edges"].map{|node| node["node"]["id"].to_i }).to eq([note1.id, note2.id]) }
      end

      context "with 3 tags" do
        let(:tagged_with) { [tag1.id, tag2.id, tag3.id] }
        it { expect(subject.to_h["data"]["getNotes"]["edges"].map{|node| node["node"]["id"].to_i }).to eq([note1.id]) }
      end

    end
  end

  describe "resolve getTotalNote" do
    let(:variables) { {mark_as_read: mark_as_read } }
    let(:query) do
      <<~GQL
        query($mark_as_read: Boolean!) {
          getTotalNotes(markAsRead: $mark_as_read)
        }
      GQL
    end
    subject{ execute_graphql }

    let!(:note1) { create(:note, user: current_user, mark_as_read: false)}
    let!(:note2) { create(:note, user: current_user, mark_as_read: false)}
    let!(:note3) { create(:note, user: current_user, mark_as_read: false)}
    let!(:note4) { create(:note, user: current_user, mark_as_read: false)}
    let!(:note5) { create(:note, user: current_user, mark_as_read: true)}
    let!(:note6) { create(:note, user: current_user, mark_as_read: true)}

    context "when user tries to get the number of unread notes" do
      let(:mark_as_read) { true }
      let!(:note7) { create(:note, mark_as_read: false)}
      it { expect(subject.to_h["data"]["getTotalNotes"].to_i ).to eq(2) }
    end

    context "when user tries to get the number of read notes" do
      let(:mark_as_read) { false }
      let!(:note7) { create(:note, mark_as_read: true)}

      it { expect(subject.to_h["data"]["getTotalNotes"].to_i ).to eq(4) }
    end
  end


end