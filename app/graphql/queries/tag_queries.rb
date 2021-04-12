module Queries
  module TagQueries

    class GetTag < GraphQL::Schema::Resolver
      description 'Get a Tag'
      type Types::TagType, null: false

      argument :id, ID, required: true

      def resolve(id:)
        user = context[:current_resource]
        tag = ActsAsTaggableOn::Tagging.where(taggable_type: "User", taggable_id: user.id, tag_id: id).first
        raise ActiveRecord::RecordNotFound if tag.nil?
        tag
      end
    end

    class GetTags < GraphQL::Schema::Resolver
      description 'Get all Tags'
      type Types::TagType.connection_type, null: false

      def resolve()
        user = context[:current_resource]
        ActsAsTaggableOn::Tagging.where(taggable_type:"User").where(taggable_id: user.id)
      end
    end
  end
end
