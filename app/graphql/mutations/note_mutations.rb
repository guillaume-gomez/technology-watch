module Mutations
  module NoteMutations
    class NoteInputType < Types::BaseInputObject
      graphql_name 'NoteInput'
      description 'Properties for creating a Note'

      argument :name, String, required: true do
        description 'Note name'
      end

      argument :link, String, required: true do
        description 'Note link'
      end

      argument :user_id, String, required: true do
        description 'Author id of the note'
      end

      argument :description, String, required: false do
        description 'Note description'
      end
      
      argument :rating, Integer, required: false do
        description 'Note rating'
      end

      argument :time_to_read, GraphQL::Types::ISO8601DateTime, required: false do
        description 'Time to read the note'
      end
    end

    class CreateNote < BaseMutation
      description 'Create a Note'
      type Types::NoteType

      argument :note, NoteInputType, required: true

      def resolve(note:)
        record = Note.new(note.to_h)
        record.save!
        record
      end
    end
  end
end

