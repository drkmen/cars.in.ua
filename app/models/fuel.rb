class Fuel
  include Mongoid::Document

  field :name, type: String
  field :uid
  field :cars_count, type: Integer, default: 0

  has_many :cars, inverse_of: nil

  def as_hash
    {
      id: id.to_s,
      name: name,
      cars_count: cars_count
    }
  end
end
