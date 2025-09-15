module Resolvers
  module Users
    # Get current user object
    class GetUsers < Resolvers::BaseResolver
      description 'Get all Users'
      type [Types::Users::UserType], null: false

      def resolve
        authenticate_user!
        
        return User.all if context[:current_resource].is_super_admin?
        return [context[:current_resource]]
      end

    end
  end
end