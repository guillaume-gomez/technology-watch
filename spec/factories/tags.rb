FactoryBot.define do

  factory :tag do
    name { Faker::Game.platform }
    color { Faker::Color.hex_color }
    association :user, factory: :user
  end
end
