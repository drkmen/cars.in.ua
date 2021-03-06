class CarMark
  include Mongoid::Document
  include Mongoid::Timestamps

  has_many :cars
  has_many :models, class_name: 'CarModel', dependent: :delete, inverse_of: :mark

  field :name, type: String
  field :uid
  field :cars_count, type: Integer, default: 0

  def as_hash
    {
      id: id.to_s,
      name: name,
      cars_count: cars_count
    }
  end
end
