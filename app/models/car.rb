class Car
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Attributes::Dynamic
  include Mongoid::Paranoia
  include Mongoid::Slug
  include Optionable, Commentable #, Paranoidable

  field :title, type: String
  field :description, type: String
  field :year, type: String
  field :mileage, type: Integer, default: 0
  field :price, type: BigDecimal, default: 0.0
  field :color, type: String
  field :color_hex, type: String
  field :engine, type: String
  field :equipment, type: String
  field :vin, type: String
  field :sold, type: Boolean, default: false
  field :completed, type: Boolean, default: false

  belongs_to :car_type, counter_cache: true
  belongs_to :car_carcass, counter_cache: true
  belongs_to :mark, class_name: 'CarMarkList', counter_cache: true
  belongs_to :model, class_name: 'CarModelList', counter_cache: true
  belongs_to :transmission
  belongs_to :fuel
  belongs_to :user, counter_cache: true

  has_many :images, dependent: :delete
  has_many :options

  # embeds_many :comments, as: :commentable
  embeds_many :trades
  embeds_many :swaps
  embeds_one :address

  # accepts_nested_attributes_for :model, :fuel, :transmission
  accepts_nested_attributes_for :images, allow_destroy: true

  before_save :set_title, if: :year_changed?
  slug :slug_title

  def main_image
    images.first.image
  end

  def set_title
    self.title = "#{mark&.name&.capitalize} #{model&.name} #{year}".strip
  end

  def slug_title
    "#{title}-#{id.to_s}"
  end

  # def to_json
  #   attributes.merge(images: images_to_json, model: model&.name, mark: mark&.name&.capitalize)
  # end

  def to_json
    {
      title: title,
      description: description,
      year: year,
      mileage: mileage.to_s.in_groups_of(3),
      price: price.to_i.to_s.in_groups_of(3),
      color: color,
      color_hex: color_hex,
      engine: engine,
      fuel: fuel,
      vin: vin,
      sold: sold,
      seller: user,
      mark: mark,
      model: model,
      transmission: transmission,
      images: images_to_json,
      comments: comments,
      trades: trades,
      swaps: swaps,
      options: options,
      address: address.to_json,
      car_type: car_type,
      car_carcass: car_carcass,
      additional_options: additional_options
    }
  end

  def images_to_json
    images.map do |img|
      {
        id: img.id.to_s,
        main: img.main,
        url: img.image.url
      }
    end
  end

  def to_card_json
    {
      image: main_image,
      title: "#{mark&.name&.capitalize} #{model&.name}",
      year: year,
      price: price,
      transmission: transmission&.type,
      mileage: mileage,
      fuel: fuel&.type,
      engine: engine
    }
  end
end


