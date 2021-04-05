class Note < ApplicationRecord
  acts_as_taggable_on :tags
  
  belongs_to :user
  validates :name, presence: true
  validates :link, presence: true
  validates :rating, numericality: { only_integer: true, greater_than_or_equal_to: 0, less_than_or_equal_to: 10 }
end