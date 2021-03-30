# frozen_string_literal: true

RSpec.shared_context 'with graphql query request' do
  let(:variables) { nil }
  let(:query) { nil }
  let(:current_user) { nil }

  def execute_graphql
    controller_double = double(:controller, set_resource_by_token: current_user)
    context = { resource_name: :user, controller: controller_double }
    TechnologyWatchSchema.execute(query, variables: variables, context: context)
  end
end