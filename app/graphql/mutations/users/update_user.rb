module Mutations
  module Users

    class UserEditType < Types::BaseInputObject
      graphql_name 'UserEditType'
      description 'Properties for editing a User'

      argument :first_name, String, required: false do
        description 'user id'
      end
      argument :last_name, String, required: false
      argument :nickname, String, required: false
      argument :language_code, String, required: false 
      argument :theme_mode, String, required: false 
    end

    class UpdateUser < Mutations::BaseMutation
      null true
      argument :id, ID, required: true
      argument :attributes, UserEditType, required: true
      
      field :user, Types::Users::UserType
      field :errors, [String], null: false

      def resolve(id:, attributes:)
        user = User.find(id);
        user.update(attributes.to_h)
        
        if user.save
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