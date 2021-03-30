require 'rails_helper'

RSpec.describe Queries::UserQueries, type: :graphql do
  include_context 'with graphql query request'

  let!(:current_user) { create(:user) }
  
  describe "resolve getUser" do
    let!(:variables) { {id: params } }
    let(:query) do
      <<~GQL
        query($id: ID!) {
          getUser(id: $id) {
            id
          }
        }
      GQL
    end
    subject{ execute_graphql }

    context "when user id does not exist" do
      let(:params) { -1 }
      it { expect{subject}.to raise_error(ActiveRecord::RecordNotFound) }
    end

    context "when user id exist" do
      let(:user) { create(:user) }
      let(:params) { user.id }

      it { expect(subject.to_h["data"]["getUser"]["id"].to_i).to eq(user.id) }
    end
  end


  describe "resolve getUsers" do
    let(:query) do
      <<~GQL
        query {
          getUsers {
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

    context "when user id exist" do
      let!(:users) { create_list(:user, 5) }

      it { expect(subject.to_h["data"]["getUsers"]["edges"].map{|node| node["node"]["id"].to_i }).to contain_exactly(*users.pluck(:id), current_user.id) }
    end
  end
end