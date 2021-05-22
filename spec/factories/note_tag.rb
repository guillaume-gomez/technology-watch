FactoryBot.define do

  factory :note_tag do
    association :note, factory: :note
    association :tag, factory: :tag
  end
end
