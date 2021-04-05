class AddMarkAsReadNote < ActiveRecord::Migration[6.1]
  def change
    add_column :notes, :mark_as_read, :boolean, default: false
  end
end
