class UpdateTimeToRead < ActiveRecord::Migration[6.1]
  def change
    remove_column :notes, :time_to_read
    add_column :notes, :time_to_read_in_minutes, :integer
  end
end
