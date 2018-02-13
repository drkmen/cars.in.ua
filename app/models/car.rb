class Car
  include Optionable #, Paranoidable

  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Attributes::Dynamic
  include Mongoid::Paranoia
  include Mongoid::Slug

  field :mark, type: String
  field :model, type: String
  field :title, type: String
  field :description, type: String
  field :year, type: String
  field :mileage, type: Integer, default: 0#, null: false
  field :price, type: BigDecimal, default: 0.0#, null: false
  field :color, type: String
  field :color_hex, type: String
  field :engine, type: String
  field :fuel, type: String
  field :vin, type: String
  field :sold, type: Boolean, default: false
  field :user_id, type: Integer

  belongs_to :user

  has_many :images, dependent: :delete
  has_many :comments, dependent: :delete
  has_many :options

  before_save :set_title
  slug :title

  def main_image
    images.where(main: true)
  end

  private

  def set_title
    self.title = "#{mark&.capitalize} #{model} #{year}"
  end
end
