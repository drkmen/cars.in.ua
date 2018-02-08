class User
  include Mongoid::Document
  include Mongoid::Timestamps

  field :first_name, type: String
  field :last_name, type: String
  field :phone, type: String
  field :email, type: String
  field :city, type: String

  has_many :comments
  has_many :trades, class_name: 'Comment', inverse_of: :trades
  has_many :swaps, class_name: 'Comment', inverse_of: :swaps
  has_many :cars
end
