module GraphqlHelpers
  def controller
    @controller ||= GraphqlController.new.tap do |obj|
      obj.set_request! ActionDispatch::Request.new({})
    end
  end

  def execute_graphql(query, **kwargs)
    TechnologyWatchSchema.execute(
      query,
      { context: { controller: controller } }.merge(kwargs),
    )
  end
end

RSpec.configure do |config|
  config.include GraphqlHelpers, type: :graphql
end