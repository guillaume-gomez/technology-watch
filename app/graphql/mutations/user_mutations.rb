module Mutations
  module UserMutations
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

    class UserEditType < Types::BaseInputObject
      graphql_name 'UserEditType'
      description 'Properties for editing a User'

      argument :id, ID, required: true do
        description 'user id'
      end

      argument :name, String, required: false do
        description 'full name'
      end

      argument :nickname, String, required: false do
        description 'nickname'
      end

      argument :language, String, required: false do
        description 'application language'
      end

      argument :tags, [String], required: false, as: :tag_list do
        description 'list of suggested tags on notes'
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

    class EditUser < BaseMutation
      description 'Edit a User'
      type Types::UserType

      argument :user, UserEditType, required: true

      def resolve(user:)
        record = User.find(user[:id])
        if !context[:current_resource].is_super_admin && record.id != context[:current_resource].id
          return record
        end
        record.assign_attributes(user.to_h)
        record.save!
        record
      end
    end

    class SignUp < GraphqlDevise::Mutations::SignUp
      argument :name, String, required: true
      argument :nickname, String, required: true
      field :user, Types::UserType, null: true

      def resolve(email:, **attrs)
        original_payload = super
        original_payload.merge(user: original_payload[:authenticatable])
      end
    end
  end
end

