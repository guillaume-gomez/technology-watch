module Queries
  module TagQueries

    class GetTag < GraphQL::Schema::Resolver
      description 'Get a Tag'
      type Types::TagType, null: false

      argument :id, ID, required: true

      def resolve(id:)
        user = context[:current_resource]
        tag = Tag.where(user: user, id: id).first
        raise ActiveRecord::RecordNotFound if tag.nil?
        tag
      end
    end

    class GetTags < GraphQL::Schema::Resolver
      description 'Get all Tags'
      type Types::TagType.connection_type, null: false

      def resolve()
        user = context[:current_resource]
        Tag.where(user: user).order("created_at")
      end
    end
  end
end
