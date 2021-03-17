require 'rails_helper'

RSpec.describe Mutations::UserMutations, type: :graphql do
  let(:mutation) do
    <<~GQL
      mutation($input: UserInput!) {
        createUser(input: { user: $input }) {
          id
        }
      }
    GQL
  end

  describe "resolve" do
    subject{ execute_graphql(mutation, variables: {input: params}) }

    context "when inputs are valid" do
      let(:params) do
        { email: "test@test.net", password: 'password', firstName: "john", lastName: "dump" }
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