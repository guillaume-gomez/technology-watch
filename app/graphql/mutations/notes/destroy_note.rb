module Mutations
  module Notes

    class DestroyNote < BaseMutation
      description 'Destroy a Note'

      argument :id, ID, required: true
      field :note, Types::Notes::NoteType, null: true
      
      def resolve(id:)
        authenticate_user!

        note = current_user.notes.find(id)
        note.destroy

        { note: note }
      end
    end

  end
end