module Resolvers
  module Notes
    
    class GetNote < Resolvers::BaseResolver
      description 'Get a Note'
      type Types::Notes::NoteType, null: false

      argument :id, ID, required: true

      def resolve(id:)
        authenticate_user!

        current_user.notes.find(id)
      end
    end

  end
end