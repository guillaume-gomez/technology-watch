module Types
  class UserType < BaseObject
    implements Types::ActiveRecordInterface
    field :email, String, null: false
    field :first_name, String, null: false
    field :last_name, String, null: false
  end

end
