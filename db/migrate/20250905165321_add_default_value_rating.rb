class AddDefaultValueRating < ActiveRecord::Migration[8.0]
  def change
    change_column :notes, :rating, :integer, default: 0
  end
end
