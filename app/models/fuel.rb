class Fuel
  include Mongoid::Document

  field :type, type: String

  has_many :cars, inverse_of: nil
end
