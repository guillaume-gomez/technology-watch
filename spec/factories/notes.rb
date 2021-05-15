FactoryBot.define do

  factory :note do
    name { Faker::ProgrammingLanguage.name }
    link { Faker::Internet.unique.email }
    description { Faker::Lorem.paragraph(sentence_count: 2, supplemental: false, random_sentences_to_add: 4) }
    rating { Faker::Number.between(from: 1, to: 10) }
    time_to_read_in_minutes { Faker::Number.between(from: 1, to: 10) }
    association :user, factory: :user
  end
end
