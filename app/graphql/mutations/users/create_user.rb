module Mutations
  module Users

    class UserCreateType < Types::BaseInputObject
      graphql_name 'UserCreateType'
      description 'Properties for create a User'

      argument :first_name, String, required: false
      argument :last_name, String, required: false
      argument :email, String, required: true      
      argument :password, String, required: true
      argument :password_confirmation, String, required: true
    end

    class CreateUser < Mutations::BaseMutation
      null true
      argument :attributes, UserCreateType, required: true
      
      field :user, Types::Users::UserType
      field :errors, [String], null: false

      def resolve(attributes:)
        if user.create(attributes.to_h)
          {
            user: user,
            errors: [],
          }
        else
          {
            comment: nil,
            errors: comment.errors.full_messages
          }
        end
      end
    end
  end
end