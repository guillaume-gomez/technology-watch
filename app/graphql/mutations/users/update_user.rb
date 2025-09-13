module Mutations
  module Users
    class UpdateUser < Mutations::BaseMutation
      null true
      argument :id, ID, required: true
      argument :first_name, String, required: false
      argument :last_name, String, required: false
      argument :nickname, String, required: false
      
      field :user, Types::Users::UserType
      field :errors, [String], null: false

      def resolve(id:, first_name: nil, last_name: nil, nickname: nil)
        user = User.find(id)
        user.update({ first_name:, last_name:, nickname: })
        
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