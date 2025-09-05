class AddMarkAsReadNote < ActiveRecord::Migration[8.0]
  def change
    add_column :notes, :mark_as_read, :boolean, default: false
  end
end
