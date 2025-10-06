module Mutations
  module Tags

    class TagEditType < Types::BaseInputObject
      graphql_name 'TagEditType'
      description 'Properties for editing a Tag'

      argument :id, ID, required: true do
        description 'Tag id'
      end

      argument :name, String, required: false do
        description 'Tag name'
      end

      argument :color, String, required: false do
        description 'Tag color'
      end
    end

    class UpdateTag < BaseMutation
      description 'Edit a Tag'
      
      argument :id, ID, required: true
      argument :attributes, TagInputType, required: true
      field :tag, Types::Tags::TagType, null: true

      def resolve(id:, attributes:)
        authenticate_user!

        tag = Tag.find(id)
        if tag.user_id == current_user.id
          tag.assign_attributes(attributes.to_h)
          tag.save
        end
        { tag: tag }
      end
    end

  end
end