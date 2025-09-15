module Resolvers
  module Notes
    
    class GetNotes < Resolvers::BaseResolver
      
      description 'Get all Notes'
      type Types::Notes::NoteType.connection_type, null: false
      
      def resolve()
        authenticate_user!

        Note.where(user: current_user)
      end
    end

  end
end