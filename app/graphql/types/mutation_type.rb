# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    # TODO: remove me
    field :test_field, String, null: false,
      description: "An example field added by the generator"
    
    def test_field
      "Hello World"
    end

    field :sign_in, mutation: Mutations::Authentication::SignIn
    field :sign_up, mutation: Mutations::Authentication::SignUp
    
    field :update_user, mutation: Mutations::Users::UpdateUser

    field :create_note, mutation: Mutations::Notes::CreateNote
    field :update_note, mutation: Mutations::Notes::UpdateNote
    field :destroy_note, mutation: Mutations::Notes::DestroyNote
  end
end
