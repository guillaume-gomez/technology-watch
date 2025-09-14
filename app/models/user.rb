class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,:confirmable

  DEFAULT_TAGS = %w(awesome interesting fun).freeze
  before_save :fill_uid
  after_create :create_default_tag


  has_many :notes, dependent: :destroy
  has_many :tags, dependent: :destroy

  def create_default_tag
    DEFAULT_TAGS.each do |tag_name|
      tags.create(name: tag_name, color: "##{Random.bytes(3).unpack1('H*')}")
    end
  end

  def fill_uid
    key = "#{email}-#{provider}"
    self.uid = Digest::UUID.uuid_v5(Digest::UUID::DNS_NAMESPACE, key)
  end
end
