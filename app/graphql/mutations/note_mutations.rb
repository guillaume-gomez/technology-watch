
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

      argument :description, String, required: false do
        description 'Note description'
      end

      argument :rating, Integer, required: false do
        description 'Note rating'
      end

      argument :tags, [ID], required: false do
        description 'List of tag ids'
      end

      argument :time_to_read, GraphQL::Types::ISO8601DateTime, required: false do
        description 'Time to read the note'
      end
    end

    class NoteEditType < Types::BaseInputObject
      graphql_name 'NoteEditType'
      description 'Properties for editing a Note'

      argument :id, ID, required: true do
        description 'Note id'
      end

      argument :name, String, required: false do
        description 'Note name'
      end

      argument :link, String, required: false do
        description 'Note link'
      end

      argument :description, String, required: false do
        description 'Note description'
      end
      
      argument :rating, Integer, required: false do
        description 'Note rating'
      end

      argument :tags, [ID], required: false do
        description 'List of tag ids'
      end

      argument :time_to_read, GraphQL::Types::ISO8601DateTime, required: false do
        description 'Time to read the note'
      end

      argument :mark_as_read, Boolean, required: false do
        description 'Flag to set as true if the note is read'
      end
    end

    class CreateNote < BaseMutation
      description 'Create a Note'
      type Types::NoteType

      argument :note, NoteInputType, required: true

      def resolve(note:)
        record = Note.new(note.to_h)
        record.user = context[:current_resource]
        record.save!
        record
      end
    end

    class EditNote < BaseMutation
      description 'Edit a Note'
      type Types::NoteType

      argument :note, NoteEditType, required: true

      def resolve(note:)
        record = Note.find(note[:id])
        if record.user_id == context[:current_resource].id
          record.assign_attributes(note.to_h)
          record.save!
        end
        record
      end
    end

    class DestroyNote < BaseMutation
      description 'Destroy a Note'
      type Types::NoteType

      argument :id, ID, required: true

      def resolve(id:)
        record = context[:current_resource].notes.find(id)
        record.destroy
      end
    end
  end
end

