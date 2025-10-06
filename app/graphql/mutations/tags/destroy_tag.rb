module Mutations
  module Tags

    class DestroyTag < BaseMutation
      description 'Destroy a Tag'

      argument :id, ID, required: true
      field :tag, Types::Tags::TagType, null: true
      
      def resolve(id:)
        authenticate_user!

        tag = current_user.tags.find(id)
        tag.destroy

        { tag: tag }
      end
    end

  end
end