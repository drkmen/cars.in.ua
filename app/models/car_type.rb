class CarType
  include Mongoid::Document
  include Mongoid::Timestamps

  has_many :cars

  field :name, type: String
  field :uid
  field :cars_count, type: Integer, default: 0
end
