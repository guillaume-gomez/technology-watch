module Types
  class TagType < BaseObject
    implements Types::ActiveRecordInterface
    field :name, String, null: false
  end

end
