require 'rails_helper'

RSpec.describe Mutations::UserMutations, type: :graphql do
  include_context 'with graphql query request'
  let(:query) do
    <<~GQL
      mutation($input: UserInput!) {
        createUser(input: { user: $input }) {
          id
        }
      }
    GQL
  end

  describe "resolve" do
    let!(:current_user) { create(:user) }
    let!(:variables) { {input: params } }
    subject{ execute_graphql }

    context "when inputs are valid" do
      let(:params) do
        { email: "test@test.net", password: 'password', nickname: "jojo", name: "john dump" }
      end
      it { expect{subject}.to change { User.count }.by(1) }
    end

    context "when input are invalid" do
      let(:params) do
        { email: 'test@test.net', password: 'whatever' }
      end
      it { expect{subject}.not_to change { User.count } }
    end
  end
end