require 'rails_helper'

RSpec.describe Mutations::NoteMutations, type: :graphql do
  include_context 'with graphql query request'
  let!(:current_user) { create(:user) }
  let(:variables) { {input: params } }
  subject{ execute_graphql }

  describe "resolve createNote" do
    let(:query) do
      <<~GQL
        mutation($input: NoteInput!) {
          createNote(input: { note: $input }) {
            id
          }
        }
      GQL
    end

    context "when required params are present" do
      let(:params) do
        { name: "My first note", link: 'http://easywin.com'}
      end
      it { expect{subject}.to change { Note.count }.by(1) }
    end

    context "when some required params are missing" do
      let(:params) do
        { name: "My first note" }
      end
      it { expect{subject}.not_to change { Note.count } }
    end

    context "when add some tags in tags creation" do
      let(:params) do
        { name: "My first note", tags: [{ name: "C++"}] }
      end
      it { expect{subject}.to change { NoteTag.count }.by(1) }
    end
  end

  describe "resolve editNote" do
    let(:query) do
      <<~GQL
        mutation($input: NoteEditType!) {
          editNote(input: { note: $input }) {
            id
          }
        }
      GQL
    end
    let(:note) { create(:note, user_id: current_user.id.to_s )}
    
    context "when change note and rating description" do
      let(:params) do
        { id: note.id.to_s, description: "My first note" }
      end
      it { expect{subject}.to change { note.reload.description } }
    end

    context "when try to change a note that not belongs to current user" do
      let(:another_user) { create(:user)}
      let(:note) { create(:note, user_id: another_user.id.to_s )}
      let(:params) do
        { id: note.id.to_s, description: "My first note" }
      end
      it { expect{subject}.not_to change { note.reload.description } }
    end
  end


  describe "resolve DestroyNote" do
    let(:query) do
      <<~GQL
        mutation($id: ID!) {
          destroyNote(input: { id: $id }) {
            id
          }
        }
      GQL
    end
    let!(:note) { create(:note, user_id: current_user.id.to_s )}
    let(:variables) { {id: params } }
    
    context "when destroy note" do
      let(:params) { note.id.to_s }
      
      it { expect{subject}.to change { Note.count }.by(-1) }
    end

    context "when try to destroy a note that not belongs to current user" do
      let(:another_user) { create(:user)}
      let(:note) { create(:note, user_id: another_user.id.to_s )}
      let(:params) { note.id.to_s }

      it { expect{subject}.to raise_error(ActiveRecord::RecordNotFound) }
    end
  end
end