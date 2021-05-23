# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
[
  User,
  Tag,
  Note,
].each(&:delete_all)



john = User.create!(
  email: "john.doe@example.com",
  name: "john Doe",
  nickname: "Jojo",
  password: "password",
  is_super_admin: true
)
john.confirm

25.times.each do |index|
  Tag.create!(name: "tag#{index + 1}", user: john, color: Faker::Color.hex_color)
end

50.times.each do |index|
  note = Note.create!(name: "note_'#{index + 1}'", link: "http://linux.com", rating: [*0..10].sample, user: john)
  NoteTag.create!(note: note, tag: Tag.all.sample)
end
