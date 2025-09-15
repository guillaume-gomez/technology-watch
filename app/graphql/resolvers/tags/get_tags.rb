module Resolvers
  module Tags
    
    class GetTags < Resolvers::BaseResolver
      description 'Get all Tags'
      type Types::Tags::TagType.connection_type, null: false

      def resolve()
        authenticate_user!

        Tag.where(user: current_user).order(:name)
      end
    end

  end
end