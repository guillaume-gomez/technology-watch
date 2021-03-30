FactoryBot.define do

  factory :note do
    name { Faker::ProgrammingLanguage.name }
    link { Faker::Internet.unique.email }
    description { Faker::Lorem.paragraph(sentence_count: 2, supplemental: false, random_sentences_to_add: 4) }
    rating { Faker::Number.between(from: 1, to: 10) }
    time_to_read { Faker::Time.between(from: DateTime.now - 1, to: DateTime.now, format: :default) }
    association :user, factory: :user
  end
end
