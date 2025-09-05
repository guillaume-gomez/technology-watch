class Tag < ApplicationRecord
  belongs_to :user
  has_many :note_tags, dependent: :destroy

  validates :name, presence: true
end
