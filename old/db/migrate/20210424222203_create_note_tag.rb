class CreateNoteTag < ActiveRecord::Migration[6.1]
  def change
    create_table :note_tags do |t|
      t.references :note, index: true
      t.references :tag, index: true
      t.timestamps
    end
  end
end
