require 'rails_helper'

RSpec.describe Mutations::NoteMutations, type: :graphql do
  include_context 'with graphql query request'
  let(:query) do
    <<~GQL
      mutation($input: NoteInput!) {
        createNote(input: { note: $input }) {
          id
        }
      }
    GQL
  end

  describe "resolve" do
    let!(:current_user) { create(:user) }
    let(:variables) { {input: params } }
    subject{ execute_graphql }

    context "when required params are present" do
      let(:params) do
        { name: "My first note", link: 'http://easywin.com', userId: current_user.id.to_s }
      end
      it { expect{subject}.to change { Note.count }.by(1) }
    end

    context "when some required params are missing" do
      let(:params) do
        { name: "My first note", userId: current_user.id }
      end
      it { expect{subject}.not_to change { Note.count } }
    end
  end
end