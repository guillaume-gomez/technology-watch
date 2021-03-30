class AddUserNotes < ActiveRecord::Migration[6.1]
  def change
    add_reference :notes, :users, index: true
  end
end
