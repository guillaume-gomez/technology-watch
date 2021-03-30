module Queries
  module UserQueries

    class GetUser < GraphQL::Schema::Resolver
      description 'Get a User'
      type Types::UserType, null: false

      argument :id, ID, required: true

      def resolve(id:)
        User.find(id)
      end
    end

    class GetUsers < GraphQL::Schema::Resolver
      description 'Get all Users'
      type Types::UserType.connection_type, null: false

      def resolve()
        return User.all if context[:current_resource].is_super_admin?
        return [context[:current_resource]]
      end
    end

    class GetCurrentUser < GraphQL::Schema::Resolver
      description 'Get the current user'
      type Types::UserType, null: false

      def resolve
        context[:current_resource]
      end
    end

  end
end
