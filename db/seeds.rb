# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end




john = User.create(
  email: "john.doe@example.com",
  first_name: "john",
  last_name: "doe",
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