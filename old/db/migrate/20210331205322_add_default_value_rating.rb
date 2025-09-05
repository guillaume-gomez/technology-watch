class AddDefaultValueRating < ActiveRecord::Migration[6.1]
  def change
    change_column :notes, :rating, :integer, default: 0
  end
end
