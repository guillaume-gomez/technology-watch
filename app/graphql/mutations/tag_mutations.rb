module Mutations
  module TagMutations
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

    class TagBulkType < Types::BaseInputObject
      graphql_name 'TagBulkType'
      description 'Properties for add, edit and destroy Tags'
      
      argument :id, ID, required: false do
        description 'Tag id'
      end

      argument :destroy, Boolean, required: false do
        description 'Tag id'
      end

      argument :name, String, required: false do
        description 'Tag name'
      end

      argument :color, String, required: false do
        description 'Tag color'
      end
    end

    class CreateTag < BaseMutation
      description 'Create a Tag'
      type Types::TagType

      argument :tag, TagInputType, required: true

      def resolve(tag:)
        record = Tag.new(tag.to_h)
        record.user = context[:current_resource]
        record.save!
        record
      end
    end

    class EditTag < BaseMutation
      description 'Edit a Tag'
      type Types::TagType

      argument :tag, TagEditType, required: true

      def resolve(tag:)
        record = Tag.find(tag[:id])
        if record.user_id == context[:current_resource].id
          record.assign_attributes(tag.to_h)
          record.save!
        end
        record
      end
    end

    class DestroyTag < BaseMutation
      description 'Destroy a Tag'
      type Types::TagType

      argument :id, ID, required: true

      def resolve(id:)
        record = context[:current_resource].tags.find(id)
        record.destroy
      end
    end

    class BulkUpdateTags < BaseMutation
      description 'Add/Update and Destroy Tags'
      type Types::TagType.connection_type

      argument :tags, [TagBulkType], required: true

      def resolve(tags:)
        ApplicationRecord.transaction do
          records = tags.map do |tag_data|
            if tag_data[:id]
              record = Tag.find(tag_data[:id])
              if tag_data[:destroy]
                record.destroy
              else
                record.assign_attributes(tag_data.to_h)
                record.save
                record
              end
            else
              record = Tag.new(tag_data.to_h)
              record.user = context[:current_resource]
              record.save!
              record
            end
          end
          records
        end
      end
    end

  end
end

