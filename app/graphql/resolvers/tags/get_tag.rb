module Resolvers
  module Tags
    
    class GetTag < Resolvers::BaseResolver
      description 'Get a Tag'
      type Types::Tags::TagType, null: false

      argument :id, ID, required: true

      def resolve(id:)
        authenticate_user!

        tag = Tag.where(user: current_user, id: id).first
        raise ActiveRecord::RecordNotFound if tag.nil?
        tag
      end
    end

  end
end