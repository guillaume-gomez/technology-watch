module Mutations
  module Tags

    class TagInputType < Types::BaseInputObject
      graphql_name 'TagInput'
      description 'Properties for creating a Tag'

      argument :name, String, required: true do
        description 'Tag name'
      end

      argument :color, String, required: false do
        description 'Tag color'
      end
    end

    class CreateTag < BaseMutation
      description 'Create a Tag'
      
      argument :attributes, TagInputType, required: true
      field :tag, Types::Tags::TagType, null: true

      def resolve(attributes:)
        authenticate_user!

        tag = Tag.new(attributes.to_h)
        tag.user = current_user
        tag.save
        { tag: tag }
      end
    end

  end
end