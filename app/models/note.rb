class Note < ApplicationRecord
  belongs_to :user
  has_many :note_tags, dependent: :destroy
  has_many :tags, through: :note_tags

  validates :name, presence: true
  validates :link, presence: true
  validates :rating, numericality: { only_integer: true, greater_than_or_equal_to: 0, less_than_or_equal_to: 10 }

  scope :read, -> { where(mark_as_read: true)}
  scope :not_read, -> { where(mark_as_read: false)}
end