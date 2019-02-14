class Fuel
  include Mongoid::Document

  field :name, type: String
  field :uid
  field :cars_count, type: Integer, default: 0

  has_many :cars, inverse_of: nil
end
