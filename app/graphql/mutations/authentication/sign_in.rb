module Mutations
  module Authentication

    class SignIn < Mutations::BaseMutation
      include JsonWebToken
      
      null true
      argument :email, String, required: true
      
      field :token, String, null: true
      field :user, Types::Users::UserType
      field :errors, [String], null: false

      def resolve(email:)
        user = User.find_by_email(email)
        return mock_user unless user

        token = jwt_encode(user_id: user.id)
        
        if user.save
          {
            user: user,
            token: token,
            errors: [],
          }
        else
          {
            comment: nil,
            errors: comment.errors.full_messages
          }
        end
      end

      private

      def mock_user
        {
          user: { id: User.count + 1567 },
          token: "fake_token"
        }
      end
    end
  end
end