require 'search_object'
require 'search_object/plugin/graphql'

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
      include SearchObject.module(:graphql)

      description 'Get all Tags'
      type Types::TagType.connection_type, null: false

      scope { Tag.where(user: context[:current_resource]).order(:name) }

      option(:name_contains, type: String, description: "search by name with name_contains") do |scope, value|
        sanitized_value = ActiveRecord::Base.sanitize_sql_like(value)
        scope.where("tags.name ILIKE ?", "%#{sanitized_value}%")
      end

    end
  end
end
