require 'elasticsearch/model'

class Car
  delegate :url_helpers, to: 'Rails.application.routes'

  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Attributes::Dynamic
  include Mongoid::Paranoia
  include Mongoid::Slug

  include Optionable, Commentable, Searchable

  # settings do
  #   mappings dynamic: false do
  #     indexes :mark, type: :text
  #     indexes :model, type: :text
  #     indexes :title, type: :text, analyzer: :english
  #     indexes :year, type: :text
  #     indexes :color, type: :text
  #     indexes :completed, type: :boolean
  #   end
  # end

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
  field :published_at, type: DateTime

  belongs_to :user, counter_cache: true
  belongs_to :car_type, counter_cache: true
  belongs_to :car_carcass, counter_cache: true, optional: true
  belongs_to :mark, class_name: 'CarMark', counter_cache: true
  belongs_to :model, class_name: 'CarModel', counter_cache: true
  belongs_to :transmission, counter_cache: true
  belongs_to :fuel, counter_cache: true
  belongs_to :region, counter_cache: true
  belongs_to :city, counter_cache: true, optional: true
  # belongs_to :country, counter_cache: true, optional: true
  alias :seller :user

  has_many :images, dependent: :delete
  has_and_belongs_to_many :options

  embeds_many :trades
  embeds_many :swaps
  # embeds_one :address

  accepts_nested_attributes_for :images, allow_destroy: true

  before_save :set_title, if: :year_changed?
  slug :slug_title

  scope :active, -> { where(completed: true) }

  def main_image
    images&.first&.image || images.new.image # stub for placeholder
  end

  def set_title
    self.title = "#{mark&.name&.capitalize} #{model&.name} #{year}".strip
  end

  def slug_title
    "#{title}-#{id.to_s}"
  end

  def address
    return nil unless region&.name && city.name
    "#{region.name}, #{city.name}"
  end

  def to_json
    {
      id: id.to_s,
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
      published_at: published_at&.strftime('%d/%m/%Y'),
      doors: doors,
      seller: user,
      mark: mark,
      model: model,
      transmission: transmission,
      images: images_to_json,
      options: grouped_options,
      region: region,
      city: city,
      address: address,
      car_type: car_type,
      car_carcass: car_carcass,
      additional_options: additional_options,
      comments: comments.map(&:to_json),
      swaps: swaps.map(&:to_json),
      trades: trades.map(&:to_json),
      paths: {
        edit_car_path: {
          url: url_helpers.edit_car_path(self),
          method: :get
        },
        add_favorite: {
          url: url_helpers.car_add_to_favorite_path(self),
          method: :get
        },
        remove_from_favorite: {
          url: url_helpers.car_remove_from_favorite_path(self),
          method: :delete
        }
      }
    }
  end

  def as_indexed_json(options = {})
    as_json(
      only: [:title, :year, :price, :color],
      include: {
        mark: { only: :name },
        model: { only: :name },
        fuel: { only: :name },
        transmission: { only: :name }
      }
    )
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
      price: '$' + price.to_i.to_s.in_groups_of(3),
      transmission: transmission&.name,
      mileage: mileage,
      fuel: fuel&.name,
      engine: engine,
      car_path: url_helpers.car_path(self)
    }
  end

  def grouped_options
    options.pluck(:type).uniq.map do |type|
      {
        type: type,
        options: options.select { |opt| opt.type == type }.map(&:to_json)
      }
    end
  end

  def self.search_similar(car:)
    self.search({
      size: 10,
      query: {
        bool: {
          should: [
            { match: { "mark.name": { query: car.mark.name, fuzziness: 'auto' } } },
            { match: { "model.name": { query: car.model.name, fuzziness: 'auto' } } },
            { match: { "price": { query: car.price, fuzziness: 'auto' } } },
            { match: { "car_carcass.name": { query: car.car_carcass&.name || CarCarcass.first.name  } } },
            { match: { "transmission.name": { query: car.transmission.name } } },
            { match: { "fuel.name": { query: car.fuel.name } } }
          ]
        }
      }
    })
  end
end

# belongs_to :car_type, counter_cache: true
# belongs_to :car_carcass, counter_cache: true, optional: true
# belongs_to :mark, class_name: 'CarMark', counter_cache: true
# belongs_to :model, class_name: 'CarModel', counter_cache: true
# belongs_to :transmission
# belongs_to :fuel