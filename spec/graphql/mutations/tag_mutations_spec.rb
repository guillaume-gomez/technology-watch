require 'rails_helper'

RSpec.describe Mutations::TagMutations, type: :graphql do
  include_context 'with graphql query request'
  let!(:current_user) { create(:user) }
  let(:variables) { {input: params } }
  subject{ execute_graphql }

  describe "resolve createTag" do
    let(:query) do
      <<~GQL
        mutation($input: TagInput!) {
          createTag(input: { tag: $input }) {
            id
          }
        }
      GQL
    end

    context "when required params are present" do
      let(:params) do
        { name: "My new tag" }
      end
      it { expect{subject}.to change { Tag.count }.by(1) }
    end

    context "when some required params are missing" do
      let(:params) do
        { color: "#452596" }
      end
      it { expect{subject}.not_to change { Tag.count } }
    end
  end

  describe "resolve editTag" do
    let(:query) do
      <<~GQL
        mutation($input: TagEditType!) {
          editTag(input: { tag: $input }) {
            id
          }
        }
      GQL
    end
    let(:tag) { create(:tag, user_id: current_user.id.to_s )}
    
    context "when change tag and rating description" do
      let(:params) do
        { id: tag.id.to_s, name: "My first tag" }
      end
      it { expect{subject}.to change { tag.reload.name } }
    end

    context "when try to change a tag that not belongs to current user" do
      let(:another_user) { create(:user)}
      let(:tag) { create(:tag, user_id: another_user.id.to_s )}
      let(:params) do
        { id: tag.id.to_s, name: "My first tag" }
      end
      it { expect{subject}.not_to change { tag.reload.name } }
    end
  end


  describe "resolve DestroyTag" do
    let(:query) do
      <<~GQL
        mutation($id: ID!) {
          destroyTag(input: { id: $id }) {
            id
          }
        }
      GQL
    end
    let!(:tag) { create(:tag, user_id: current_user.id.to_s )}
    let(:variables) { {id: params } }
    
    context "when destroy tag" do
      let(:params) { tag.id.to_s }
      
      it { expect{subject}.to change { Tag.count }.by(-1) }
    end

    context "when try to destroy a tag that not belongs to current user" do
      let(:another_user) { create(:user)}
      let(:tag) { create(:tag, user_id: another_user.id.to_s )}
      let(:params) { tag.id.to_s }

      it { expect{subject}.to raise_error(ActiveRecord::RecordNotFound) }
    end
  end

  describe "resolve BulkUpdateTags" do
    let(:query) do
      <<~GQL
        mutation($input: [TagBulkType!]!) {
          bulkUpdateTags(input: { tags: $input }) {
            edges {
              node {
                id
              }
            }
          }
        }
      GQL
    end
    let!(:tags) { create_list(:tag, 5, user_id: current_user.id.to_s )}
    let(:tag) { tags.sample }
    
    context "when destroy tags" do
      let(:params) { [{ id: tag.id, destroy: true }] }
      it { expect{subject}.to change { Tag.count }.by(-1) }
      it { expect(subject.to_h["data"]["bulkUpdateTags"]["edges"].count).to eq(0) }
    end

    context "when update tags" do
      let(:params) { [{ id: tag.id, name: "New tag name" }] }
      it { expect{subject}.to change { tag.reload.name } }
    end

    context "when create tags" do
      let(:params) { [{ name: "New tag name" }] }
      it { expect{subject}.to change { Tag.count }.by(1) }
    end

    context "when create, update and destroy tags" do
      let(:tag) { tags.first }
      let(:tag2) { tags.last }
      let(:params) do
        [
          { name: "New tag" },
          { id: tag2.id, name: "New tag name" },
          { id: tag.id, destroy: true }
        ]
      end
      it { expect{subject}.to change { Tag.count }.by(0) }
      it { expect{subject}.to change { tag2.reload.name } }
    end

  end

end