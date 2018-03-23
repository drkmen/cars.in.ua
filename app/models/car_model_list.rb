class CarModelList
  include Mongoid::Document

  has_many :cars
  belongs_to :mark, class_name: 'CarMarkList', inverse_of: :models

  field :name, type: String
  field :cars_count, type: Integer, default: 0

  def to_json
    {
      id: id.to_s,
      name: name,
      cars_count: cars_count
    }
  end
end
