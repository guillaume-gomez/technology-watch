module Types
  class TagType < BaseObject
    implements Types::ActiveRecordInterface
    field :name, String, null: false
    field :color, String, null: false

    def color
       object.color || "#000"
    end
  end

end
