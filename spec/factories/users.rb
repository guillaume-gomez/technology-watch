FactoryBot.define do

  factory :user do
    email { Faker::Internet.unique.email }
    name { Faker::Name.first_name }
    password { 'password' }

    trait :super_admin do
      is_super_admin { true }
    end

    trait :with_tags do
      tag_list { 5.times.map{ Faker::ProgrammingLanguage.name } }
    end
  end

end
