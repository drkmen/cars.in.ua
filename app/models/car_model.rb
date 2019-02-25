class CarModel
  include Mongoid::Document
  include Mongoid::Timestamps

  has_many :cars
  belongs_to :mark, class_name: 'CarMark', inverse_of: :models

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
