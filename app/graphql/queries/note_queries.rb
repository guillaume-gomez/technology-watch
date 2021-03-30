module Queries
  module NoteQueries

    class GetNote < GraphQL::Schema::Resolver
      description 'Get a Note'
      type Types::NoteType, null: false

      argument :id, ID, required: true

      def resolve(id:)
        Note.find(id)
      end
    end

    class GetNotes < GraphQL::Schema::Resolver
      description 'Get all Notes'
      type Types::NoteType.connection_type, null: false

      def resolve()
        context[:current_user].notes
      end
    end
  end
end