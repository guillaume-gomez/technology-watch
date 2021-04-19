module Types
  class MutationType < Types::BaseObject
    # TODO: remove me
    field :test_field, String, null: false, authenticate: false,
      description: "An example field added by the generator"
    def test_field
      "Hello World"
    end

    field :create_user, resolver: Mutations::UserMutations::CreateUser, null: false, authenticate: true
    field :edit_user, resolver: Mutations::UserMutations::EditUser, null: false, authenticate: true
    field :create_note, resolver: Mutations::NoteMutations::CreateNote, null: false, authenticate: true

    field :edit_note, resolver: Mutations::NoteMutations::EditNote, null: false, authenticate: true
    field :destroy_note, resolver: Mutations::NoteMutations::DestroyNote, null: false, authenticate: true

    field :create_tag, resolver: Mutations::TagMutations::CreateTag, null: false, authenticate: true
    field :edit_tag, resolver: Mutations::TagMutations::EditTag, null: false, authenticate: true
    field :destroy_tag, resolver: Mutations::TagMutations::DestroyTag, null: false, authenticate: true
  end
end
