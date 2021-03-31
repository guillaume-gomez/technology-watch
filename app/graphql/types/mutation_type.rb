module Types
  class MutationType < Types::BaseObject
    # TODO: remove me
    field :test_field, String, null: false, authenticate: false,
      description: "An example field added by the generator"
    def test_field
      "Hello World"
    end

    field :create_user, resolver: Mutations::UserMutations::CreateUser, null: false, authenticate: true
    field :create_note, resolver: Mutations::NoteMutations::CreateNote, null: false, authenticate: false
  end
end
