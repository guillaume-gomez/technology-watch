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
end