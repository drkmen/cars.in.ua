class CarCarcass
  include Mongoid::Document
  include Mongoid::Timestamps

  has_many :cars

  field :name, type: String
  field :cars_count, type: Integer, default: 0
end
