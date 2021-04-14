require 'rails_helper'

RSpec.describe Queries::TagQueries, type: :graphql do
  include_context 'with graphql query request'

  let!(:current_user) { create(:user) }
  
  describe "resolve getTag" do
    let!(:variables) { {id: params } }
    let(:query) do
      <<~GQL
        query($id: ID!) {
          getTag(id: $id) {
            id
          }
        }
      GQL
    end
    subject{ execute_graphql }

    context "when tag id does not exist" do
      let(:params) { -1 }
      it { expect{subject}.to raise_error(ActiveRecord::RecordNotFound) }
    end

    context "when tag exist and belongs to user" do
      let!(:current_user) { create(:user, :with_tags)}
      let!(:tag) { ActsAsTaggableOn::Tagging.where(taggable_type: "User", taggable_id: current_user.id).sample }
      let(:params) { tag.tag_id }

      it { debugger;expect(subject.to_h["data"]["getTag"]["id"].to_i).to eq(tag.tag_id) }
    end

    context "when tag does not belongs to current user" do
      let(:another_user) { create(:user)}
      let(:tag) { nil }
      let(:params) { -1 }

      it { expect{subject}.to raise_error(ActiveRecord::RecordNotFound) }
    end
  end


  describe "resolve getTags" do
    let(:query) do
      <<~GQL
        query {
          getTags {
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

    context "when user tries to get its tags" do
      let!(:current_user) { create(:user, :with_tags)}
      let!(:tags) { ActsAsTaggableOn::Tagging.where(taggable_type: "User", taggable_id: current_user.id) }
      it { expect(subject.to_h["data"]["getTags"]["edges"].map{|node| node["node"]["id"].to_i }).to contain_exactly(*tags.pluck(:id)) }
    end

    context "when user gets only its tags" do
      let!(:current_user) { create(:user, :with_tags)}
      let!(:tags) { ActsAsTaggableOn::Tagging.where(taggable_type: "User", taggable_id: current_user.id) }

      let!(:another_user) { create(:user, :with_tags)}
      let!(:other_tags) { ActsAsTaggableOn::Tagging.where(taggable_type: "User", taggable_id:another_user.id) }

      it { expect(subject.to_h["data"]["getTags"]["edges"].map{|node| node["node"]["id"].to_i }).to contain_exactly(*tags.pluck(:id)) }
      it { expect(subject.to_h["data"]["getTags"]["edges"].map{|node| node["node"]["id"].to_i }).not_to contain_exactly(*other_tags.pluck(:id)) }
    end
  end
end