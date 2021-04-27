module Queries
  module NoteQueries

    class GetNote < GraphQL::Schema::Resolver
      description 'Get a Note'
      type Types::NoteType, null: false

      argument :id, ID, required: true

      def resolve(id:)
        context[:current_resource].notes.find(id)
      end
    end


    class NoteOrder < Types::BaseEnum
      graphql_name 'NoteOrder'

      value 'RECENT'
      value 'RATING'
    end

    class GetNotes < GraphQL::Schema::Resolver
      include SearchObject.module(:graphql)

      description 'Get all Notes'
      type Types::NoteType.connection_type, null: false

      scope { Note.where(user: context[:current_resource]) }


      option :order, type: NoteOrder, default: 'RECENT'

      def apply_order_with_recent(scope)
        scope.order('created_at DESC')
      end

      def apply_order_with_rating(scope)
        scope.order('rating DESC')
      end



      option(:name, type: String, description: "search by name") do |scope, value|
        sanitized_value = ActiveRecord::Base.sanitize_sql_like(value)
        scope.where("notes.name ILIKE ?", "%#{sanitized_value}%")
      end
      option(:read, type: Boolean, description: "get only read notes/unread.") { |scope, value| value ? scope.read : scope.not_read }

      # def resolve()
      #   debugger
      #   Note.where(user: context[:current_resource]).order("created_at")
      # end
    end
  end
end
