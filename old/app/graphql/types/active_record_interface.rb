module Types::ActiveRecordInterface
  include Types::BaseInterface
  graphql_name "ActiveRecord"
  description "Active Record Interface"

  field :id, ID, "ID from ActiveRecord", null: false
  field :updated_at, GraphQL::Types::ISO8601DateTime, "update_at field from ActiveRecord", null: false
  field :created_at, GraphQL::Types::ISO8601DateTime, "created_at field from ActiveRecord", null: false
  field :cache_key, String, "Active Record cache key", null: true
end
