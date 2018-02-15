class CarMarkList
  include Mongoid::Document

  has_many :cars
  has_many :models, class_name: 'CarModelList', dependent: :delete, inverse_of: :mark

  field :name, type: String
  field :cars_count, type: Integer, default: 0
end
