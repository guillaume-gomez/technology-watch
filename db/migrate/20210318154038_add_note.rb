class AddNote < ActiveRecord::Migration[6.1]
  def change
    create_table :notes do |t|
      t.string :name
      t.text :description
      t.string :link
      t.integer :rating
      t.time :time_to_read
      t.timestamps
    end
  end
end
