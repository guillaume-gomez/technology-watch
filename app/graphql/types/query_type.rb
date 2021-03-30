module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    # TODO: remove me
    field :test_field, String, null: false, authenticate: false,
      description: "An example field added by the generator"
    def test_field
      "Hello World!"
    end

    field :get_user, resolver: Queries::UserQueries::GetUser, authenticate: true
    field :get_users, resolver: Queries::UserQueries::GetUsers, authenticate: true

    field :get_note, resolver: Queries::NoteQueries::GetNote, authenticate: true
    field :get_notes, resolver: Queries::NoteQueries::GetNotes, authenticate: true
  end
end
