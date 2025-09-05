class CreateNoteTag < ActiveRecord::Migration[8.0]
  def change
    create_table :note_tags do |t|
      t.references :note, index: true
      t.references :tag, index: true
      t.timestamps
    end
  end
end
