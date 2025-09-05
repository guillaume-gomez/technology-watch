class AddLanguageUser < ActiveRecord::Migration[8.0]
  def change
    add_column :users, :language_code, :string, default: "en"
  end
end
