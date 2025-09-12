# frozen_string_literal: true

module Types
  module Users
    class UserType < Types::BaseObject
      #implements Types::ActiveRecordInterface
      field :id, ID, null: false
      field :email, String, null: false
      field :name, String, null: false
      field :nickname, String, null: false
      field :language_code, String, null: false
      #field :tags, Types::TagType.connection_type, null: false
      field :theme_mode, String, null: false
    end
  end
end
