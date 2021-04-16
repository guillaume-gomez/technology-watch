module Types
  class UserType < BaseObject
    implements Types::ActiveRecordInterface
    field :email, String, null: false
    field :name, String, null: false
    field :nickname, String, null: false
    field :language_code, String, null: false
  end

end
