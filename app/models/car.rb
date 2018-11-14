require 'elasticsearch/model'

class Car
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Attributes::Dynamic
  include Mongoid::Paranoia
  include Mongoid::Slug

  include Optionable, Commentable, Searchable

  field :uid
  field :title, type: String
  field :description, type: String
  field :year, type: String
  field :mileage, type: Integer, default: 0
  field :price, type: BigDecimal, default: 0.0
  field :color, type: String
  field :color_hex, type: String
  field :engine, type: String
  field :equipment, type: String
  field :doors, type: Integer, default: 5
  field :vin, type: String
  field :sold, type: Boolean, default: false
  field :completed, type: Boolean, default: false
  field :imported,  type: Boolean, default: false
  field :imported_at, type: DateTime

  belongs_to :car_type, counter_cache: true
  belongs_to :car_carcass, counter_cache: true, optional: true
  belongs_to :mark, class_name: 'CarMark', counter_cache: true
  belongs_to :model, class_name: 'CarModel', counter_cache: true
  belongs_to :transmission
  belongs_to :fuel
  belongs_to :user, counter_cache: true
  alias :seller :user

  has_many :images, dependent: :delete
  has_and_belongs_to_many :options

  embeds_many :trades
  embeds_many :swaps
  embeds_one :address

  accepts_nested_attributes_for :images, allow_destroy: true

  before_save :set_title, if: :year_changed?
  slug :slug_title

  def main_image
    images&.first&.image || images.new.image # stub for placeholder
  end

  def set_title
    self.title = "#{mark&.name&.capitalize} #{model&.name} #{year}".strip
  end

  def slug_title
    "#{title}-#{id.to_s}"
  end

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
      created_at: created_at.strftime('%d/%m/%Y'),
      doors: doors,
      seller: user,
      mark: mark,
      model: model,
      transmission: transmission,
      images: images_to_json,
      comments: comments,
      trades: trades,
      swaps: swaps,
      options: grouped_options,
      address: address.to_json,
      car_type: car_type,
      car_carcass: car_carcass,
      additional_options: additional_options,
      
    }
  end

  def as_indexed_json(options = {})
    as_json(except: [:id, :_id])
  end

  def images_to_json
    imgs = images.map do |img|
      {
        id: img.id.to_s,
        main: img.main,
        url: img.image.url
      }
    end
    return [images.new] if imgs.empty?
    imgs
  end

  def to_card_json
    {
      image: main_image,
      title: "#{mark&.name&.capitalize} #{model&.name}",
      year: year,
      price: price,
      transmission: transmission&.name,
      mileage: mileage,
      fuel: fuel&.name,
      engine: engine
    }
  end

  def grouped_options
    options.pluck(:type).uniq.map do |type|
      {
        type: type,
        options: options.select { |opt| opt.type == type }
      }
    end
  end
end


