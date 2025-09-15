module Mutations
  module Notes

    class DestroyNote < BaseMutation
      description 'Destroy a Note'
      type Types::Notes::NoteType

      argument :id, ID, required: true

      def resolve(id:)
        record = current_user.notes.find(id)
        record.destroy
      end
    end

  end
end