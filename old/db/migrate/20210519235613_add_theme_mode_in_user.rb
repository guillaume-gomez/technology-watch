class AddThemeModeInUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :theme_mode, :string, default: "light"
  end
end
