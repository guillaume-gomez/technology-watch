
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
        _note = note.to_h
        _tag_ids_params = _note.delete(:tags)

        record = Note.new(_note.to_h)
        record.user = context[:current_resource]
        record.save!

        if _tag_ids_params.present?
          _tag_ids_params.each do |tag_id|
            note_tag = NoteTag.new(tag_id: tag_id, note_id: record.id)
            note_tag.save!
          end
        end

        record
      end
    end

    class EditNote < BaseMutation
      description 'Edit a Note'
      type Types::NoteType

      argument :note, NoteEditType, required: true

      def resolve(note:)
        _note = note.to_h
        _tag_ids_params = _note.delete(:tags)

        record = Note.find(_note[:id])
        if record.user_id == context[:current_resource].id
          record.assign_attributes(_note.to_h)
          record.save!
        end

        if _tag_ids_params.present?
          note_tag_ids_to_destroyed = record.tags.pluck(:id) - _tag_ids_params.map(&:to_i)
          NoteTag.where(tag_id: note_tag_ids_to_destroyed).destroy_all
          _tag_ids_params.each do |tag_id|
            note_tag = NoteTag.find_or_create_by(tag_id: tag_id, note_id: record.id)
            note_tag.save!
          end
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

