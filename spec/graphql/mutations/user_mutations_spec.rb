require 'rails_helper'

RSpec.describe Mutations::UserMutations, type: :graphql do
  let(:mutation) do
    <<~GQL
      mutation($input: UserInputType!) {
        createUser(input: { user: $input }) {
          id
        }
      }
    GQL
  end

  it 'should success' do
    result = execute_graphql(
      mutation,
      variables: { input: { email: "test@test.net", password: 'password', first_name: "john", last_name: "dump" } },
    )

    aggregate_failures do
      expect(result['data']['create_user']['id']).not_to eq nil
    end
  end

  it 'should fails' do
    result = execute_graphql(
      mutation,
      variables: { input: { email: 'test@test.net', password: 'whatever' } },
    )

    expect(result['data']['create_user']['id']).to eq nil
  end
end