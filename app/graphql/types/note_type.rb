module Types
  class NoteType < BaseObject
    implements Types::ActiveRecordInterface
    field :name, String, null: false
    field :link, String, null: false
    field :user, Types::UserType, null: false
    field :description, String, null: true
    field :rating, Integer, null: true
    field :time_to_read, String, null: true
    field :mark_as_read, Boolean, null: false
    field :tags, Types::TagType.connection_type, null: false
  end

end
