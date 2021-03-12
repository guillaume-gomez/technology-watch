module Queries
  module UserQueries

    class GetUser < GraphQL::Schema::Resolver
      description 'Get a User'
      type Types::UserType, null: false

      argument :id, ID, required: true

      def resolve(id:)
        #scope = policy_scope(User)
        #Auth::Authorize.authorize context, to: :show?, with: scope.find(id)
        User.find(id)
      end
    end

    class GetUsers < GraphQL::Schema::Resolver
      description 'Get all Users'
      type Types::UserType.connection_type, null: false

      def resolve()
        #scope = policy_scope(User)
        #Auth::Authorize.authorize context, to: :show?, with: scope.find(id)
        User.all
      end
    end

    class GetCurrentUser < GraphQL::Schema::Resolver
      description 'Get the current user'
      type Types::UserType, null: false

      def resolve
        context[:current_user]
      end
    end

  end
end
