class Note < ApplicationRecord
  belongs_to :user
  has_many :note_tags
  has_many :tags, through: :note_tags

  validates :name, presence: true
  validates :link, presence: true
  validates :rating, numericality: { only_integer: true, greater_than_or_equal_to: 0, less_than_or_equal_to: 10 }
end