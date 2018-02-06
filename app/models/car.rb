class Car
  include Optionable
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Attributes::Dynamic

  field :mark, type: String
  field :description, type: Text
  field :model, type: String
  field :year, type: String
  field :mileage, type: Integer, default: 0, null: false
  field :price, type: BigDecimal, default: 0.0, null: false
  field :color, type: String
  field :color_hex, type: String
  field :engine, type: String
  field :fuel, type: String

  has_many :options
end
