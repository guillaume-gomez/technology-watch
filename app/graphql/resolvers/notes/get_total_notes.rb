module Resolvers
  module Notes
    class GetTotalNotes < Resolvers::BaseResolver
      
      description 'Get total notes for a user'
      type Integer, null: false

      argument :mark_as_read, Boolean, required: true

      def resolve(mark_as_read:)
        Note.where(user: current_user).where(mark_as_read: mark_as_read).count
      end

    end

  end
end