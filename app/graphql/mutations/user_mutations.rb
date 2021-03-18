module Mutations
  module UserMutations
    # Defining Type used as argument to create User entries
    class UserInputType < Types::BaseInputObject
      graphql_name 'UserInput'
      description 'Properties for creating a User'

      argument :email, String, required: true do
        description 'User email'
      end

      argument :password, String, required: true do
        description 'User password'
      end

      argument :name, String, required: true do
        description 'full name'
      end

      argument :nickname, String, required: true do
        description 'nickname'
      end
    end

    class CreateUser < BaseMutation
      description 'Create a User'
      type Types::UserType

      argument :user, UserInputType, required: true

      def resolve(user:)
        record = User.new(user.to_h)
        record.save!
        record
      end
    end
  end
end

