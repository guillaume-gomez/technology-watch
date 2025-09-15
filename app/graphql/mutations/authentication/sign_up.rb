module Mutations
  module Authentication

    class SignUp < Mutations::BaseMutation
      null true
      argument :email, String, required: true
      argument :first_name, String, required: true
      argument :last_name, String, required: true
      argument :password, String, required: true, validates: { length: { minimum: 6, maximum: 128} }
      argument :password_confirmation, String, required: true, validates: { length: { minimum: 6, maximum: 128} }
      
      field :user, Types::Users::UserType
      field :errors, [String], null: false

      def resolve(
        email:, 
        first_name:,
        last_name:,
        password:, 
        password_confirmation:
      )
        params = { 
          email: email,
          first_name: first_name,
          last_name: last_name,
          password: password,
          password_confirmation: password_confirmation, 
          is_super_admin: false,
          provider: "email"
        }
        user = User.create(params)
        if user.save
          {
            user: user,
            errors: [],
          }
        else
          {
            user: nil,
            errors: user.errors.full_messages
          }
        end
      end

    end
  end
end