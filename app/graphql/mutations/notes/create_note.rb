module Mutations
  module Notes

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

      argument :time_to_read_in_minutes, Integer, required: false do
        description 'Time to read the note in minutes'
      end
    end

    class CreateNote < BaseMutation
      description 'Create a Note'
      
      argument :attributes, NoteInputType, required: true
      field :note, Types::Notes::NoteType, null: true

      def resolve(attributes:)
        authenticate_user!

        _attributes = attributes.to_h
        _tag_ids_params = _attributes.delete(:tags)

        note = Note.new(_attributes)
        note.user = current_user
        note.save!

        if _tag_ids_params.present?
          _tag_ids_params.each do |tag_id|
            note_tag = NoteTag.new(tag_id: tag_id, note_id: note.id)
            note_tag.save!
          end
        end

        { note: note }
      end
    end

  end
end