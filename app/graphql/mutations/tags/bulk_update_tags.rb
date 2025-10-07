module Mutations
  module Tags
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

    class BulkUpdateTags < BaseMutation
      description 'Add/Update and Destroy Tags'
      
      argument :attributes, [TagBulkType], required: true
      type Types::Tags::TagType.connection_type, null: false


      def resolve(attributes:)
        ApplicationRecord.transaction do
          deleted_tags, other_tags = attributes.partition { |tag| tag.destroy }
          if deleted_tags.count > 0
            deleted_tags_records = Tag.where(id: deleted_tags.pluck(:id))
            deleted_tags_records.destroy_all
          end

          records = other_tags.map do |tag_data|
            if tag_data[:id]
              record = Tag.find(tag_data[:id])
              record.assign_attributes(tag_data.to_h.except!(:destroy))
              record.save
              record
            else
              record = Tag.new(tag_data.to_h)
              record.user = context[:current_resource]
              record.save
              record
            end
          end
          records
        end
      end
    end

  end
end