class AddUserNotes < ActiveRecord::Migration[8.0]
  def change
    add_reference :notes, :user, index: true
  end
end
