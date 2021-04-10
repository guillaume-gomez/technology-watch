module Queries
  module TagQueries

    class GetTag < GraphQL::Schema::Resolver
      description 'Get a Tag'
      type Types::TagType, null: false

      argument :id, ID, required: true

      def resolve(id:)
        ActsAsTaggableOn::Tag.find(id)
      end
    end

    class GetTags < GraphQL::Schema::Resolver
      description 'Get all Tags'
      type Types::TagType.connection_type, null: false

      def resolve()
        user = context[:current_resource]
        note_ids = Note.where(user: user).pluck(:id)
        ActsAsTaggableOn::Tagging.where(taggable_type:"Note").where(taggable_id: note_ids)
      end
    end
  end
end
