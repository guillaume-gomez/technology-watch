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
      let!(:current_user) { create(:user)}
      let!(:tag) { create(:tag, user: current_user) }
      let(:params) { tag.id }

      it { expect(subject.to_h["data"]["getTag"]["id"].to_i).to eq(tag.id) }
    end

    context "when tag does not belongs to current user" do
      let(:another_user) { create(:user)}
      let(:tag) { create(:tag, user: another_user) }
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
      let!(:current_user) { create(:user)}
      let!(:tags) { create_list(:tag, 5, user: current_user ) }
      it { expect(subject.to_h["data"]["getTags"]["edges"].map{|node| node["node"]["id"].to_i }).to contain_exactly(*tags.pluck(:id)) }
    end

    context "when user gets only its tags" do
      let!(:current_user) { create(:user)}
      let!(:tags) { create_list(:tag, 5, user: current_user ) }

      let!(:another_user) { create(:user)}
      let!(:other_tags) { create_list(:tag, 5, user: another_user ) }

      it { expect(subject.to_h["data"]["getTags"]["edges"].map{|node| node["node"]["id"].to_i }).to contain_exactly(*tags.pluck(:id)) }
      it { expect(subject.to_h["data"]["getTags"]["edges"].map{|node| node["node"]["id"].to_i }).not_to contain_exactly(*other_tags.pluck(:id)) }
    end
  end
end