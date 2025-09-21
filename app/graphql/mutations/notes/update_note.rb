module Mutations
  module Notes

    class EditNoteInputType < Types::BaseInputObject
      graphql_name 'EditNoteInput'
      description 'Properties for edit a Note'

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

      # argument :time_to_read_in_minutes, Integer, required: false do
      #   description 'Time to read the note in minutes'
      # end
    end

    class UpdateNote < BaseMutation
      description 'Edit a Note'
      
      argument :id, ID, required: true
      argument :attributes, EditNoteInputType, required: true

      field :note, Types::Notes::NoteType, null: true

      def resolve(id:, attributes:)
        authenticate_user!

         _attributes = attributes.to_h
        _tag_ids_params = _attributes.delete(:tags)

        note = Note.find(id)
        if note.user_id == current_user.id
          note.assign_attributes(_attributes.to_h)
          note.save!
        end

        unless _tag_ids_params.nil?
          note_tag_ids_to_destroyed = note.tags.pluck(:id) - _tag_ids_params.map(&:to_i)
          NoteTag.where(tag_id: note_tag_ids_to_destroyed).destroy_all
          _tag_ids_params.each do |tag_id|
            note_tag = NoteTag.find_or_create_by(tag_id: tag_id, note_id: note.id)
            note_tag.save!
          end
        end

        { note: note }
      end
    end

  end
end