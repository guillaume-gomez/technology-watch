module Resolvers
  module Users
    # Get current user object
    class GetUsers < Resolvers::BaseResolver
      description 'Get all Users'
      type Types::Users::UserType.connection_type, null: false

      def resolve
        authenticate_user!

        return User.all if current_user.is_super_admin?
        return [current_user]
      end

    end
  end
end