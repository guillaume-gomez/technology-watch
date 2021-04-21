class User < ApplicationRecord
  include GraphqlDevise::Concerns::Model
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,:confirmable

  has_many :notes
  has_many :tags
end
