class AddThemeModeInUser < ActiveRecord::Migration[8.0]
  def change
    add_column :users, :theme_mode, :string, default: "light"
  end
end
