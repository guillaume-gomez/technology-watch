module Queries
  module NoteQueries

    class GetNote < GraphQL::Schema::Resolver
      description 'Get a Note'
      type Types::NoteType, null: false

      argument :id, ID, required: true

      def resolve(id:)
        context[:current_resource].notes.find(id)
      end
    end

    class GetNotes < GraphQL::Schema::Resolver
      description 'Get all Notes'
      type Types::NoteType.connection_type, null: false

      def resolve()
        Note.where(user: context[:current_resource])
      end
    end
  end
end
