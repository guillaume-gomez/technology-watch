FactoryBot.define do

  factory :user do
    email { Faker::Internet.unique.email }
    name { Faker::Name.first_name }
    password { 'password' }

    trait :super_admin do
      is_super_admin { true }
    end
  end

end
