require 'search_object'
require 'search_object/plugin/graphql'

module Queries
  module NoteQueries

    class NoteOrder < Types::BaseEnum
      graphql_name 'NoteOrder'

      value 'RECENT'
      value 'RATING'
      value 'TIMES_TO_READ'
      value 'MARK_AS_READ'
    end

    class NoteDirection < Types::BaseEnum
      graphql_name 'NoteDirection'

      value 'DESC'
      value 'ASC'
    end

    class NoteOrderInputType < Types::BaseInputObject
      graphql_name 'NoteOrderInput'
      description 'Properties for sorting notes'

      argument :order, NoteOrder, required: true do
        description 'type of order'
      end

      argument :direction, NoteDirection, required: true do
        description 'direction of the order'
      end

    end

    class GetNote < GraphQL::Schema::Resolver
      description 'Get a Note'
      type Types::NoteType, null: false

      argument :id, ID, required: true

      def resolve(id:)
        context[:current_resource].notes.find(id)
      end
    end

    class GetNotes < GraphQL::Schema::Resolver
      include SearchObject.module(:graphql)

      description 'Get all Notes'
      type Types::NoteType.connection_type, null: false

      scope { Note.where(user: context[:current_resource]) }

      option :order_type, type: NoteOrderInputType do |scope, value|
        value_to_h = value.to_h
        direction = value_to_h[:direction]
        order = value_to_h[:order]
        case order
        when "RECENT"
          scope.order(created_at: direction)
        when "RATING"
          scope.order(rating: direction)
        when "TIMES_TO_READ"
          scope.order(time_to_read_in_minutes: direction)
        when "MARK_AS_READ"
          scope.order(mark_as_read: direction)
        else
          scope.order("created_at DESC")
        end
      end

      option(:name, type: String, description: "search by name") do |scope, value|
        sanitized_value = ActiveRecord::Base.sanitize_sql_like(value)
        scope.where("notes.name ILIKE ?", "%#{sanitized_value}%")
      end
      
      option(:read, type: Boolean, description: "get only read notes/unread.") do |scope, value|
        value ? scope.read : scope.not_read
      end

      option(:tagged_with, type: [ID], required: false, description: "filter by tags name (cumulative)") do |scope, tag_ids|
        if tag_ids.blank?
          scope
        else
          scope.joins(:tags).where("note_tags.tag_id in (?)", tag_ids).group(:id).having("COUNT(*) >= ?", tag_ids.count)
        end
      end
    end

    class GetTotalNotes < GraphQL::Schema::Resolver
      description 'Get total notes for a user'
      type Integer, null: false

      argument :mark_as_read, Boolean, required: true

      def resolve(mark_as_read:)
        Note.where(user: context[:current_resource]).where(mark_as_read: mark_as_read).count
      end
    end

  end
end
