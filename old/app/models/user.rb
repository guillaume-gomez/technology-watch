class User < ApplicationRecord
  include GraphqlDevise::Concerns::Model
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,:confirmable

  DEFAULT_TAGS = %w(awesome interesting fun).freeze
  after_create :create_default_tag

  has_many :notes, dependent: :destroy
  has_many :tags, dependent: :destroy

  def create_default_tag
    DEFAULT_TAGS.each do |tag_name|
      tags.create(name: tag_name, color: "##{Random.bytes(3).unpack1('H*')}")
    end
  end
end
