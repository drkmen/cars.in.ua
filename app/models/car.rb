require 'elasticsearch/model'

class Car
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Attributes::Dynamic
  include Mongoid::Paranoia
  include Mongoid::Slug

  include Optionable, Commentable, Searchable

  delegate :url_helpers, to: 'Rails.application.routes'
  delegate :search, to: :__elasticsearch__
  delegate :mapping, to: :__elasticsearch__

  settings do
    mappings do
      # indexes :mark, type: :text
      # indexes :model, type: :text
      # indexes :title, type: :text, analyzer: :english
      # indexes :year, type: :text
      # indexes :color, type: :text

      indexes :completed, type: :boolean
      indexes :created_at, type: :date
      indexes :created_int, type: :integer
    end
  end

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
  field :views, type: Integer, default: 0

  belongs_to :user, counter_cache: true
  belongs_to :category, counter_cache: true
  belongs_to :car_carcass, counter_cache: true, optional: true
  belongs_to :mark, class_name: 'CarMark', counter_cache: true
  belongs_to :model, class_name: 'CarModel', counter_cache: true
  belongs_to :transmission, counter_cache: true
  belongs_to :fuel, counter_cache: true
  belongs_to :region, counter_cache: true
  belongs_to :city, counter_cache: true, optional: true
  # belongs_to :country, counter_cache: true, optional: true
  alias :seller :user
  alias :car_mark :mark

  has_many :images, dependent: :delete
  has_and_belongs_to_many :options

  # embeds_many :trades
  has_many :trades
  # embeds_many :swaps
  has_many :swaps
  # embeds_one :address

  accepts_nested_attributes_for :images, allow_destroy: true

  before_save :set_title, if: :year_changed?
  slug :slug_title

  scope :completed, -> { where(completed: true) }

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

  def increment_views!
    self.inc views: 1
  end

  def as_hash
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
      views: views.to_s.in_groups_of(3),
      created_at: created_at.strftime('%d/%m/%Y'),
      published_at: published_at&.strftime('%d/%m/%Y'),
      doors: doors,
      seller: user,
      mark: mark,
      model: model,
      transmission: transmission,
      images: images_as_hash,
      options: grouped_options,
      region: region,
      city: city,
      address: address,
      category: category,
      car_carcass: car_carcass,
      additional_options: additional_options,
      comments: comments.map(&:as_hash),
      swaps: swaps.map(&:as_hash),
      trades: trades.map(&:as_hash),
      # suggestions: swaps.map(&:to_json) + trades.map(&:to_json),
      paths: {
        edit_car_path: {
          url: url_helpers.edit_category_car_path(category_id: self.category.id.to_s, id: self.id.to_s),
          method: :get
        },
        add_favorite: {
          url: url_helpers.category_car_add_to_favorite_path(category_id: self.category.id.to_s, car_id: self.id.to_s),
          method: :get
        },
        remove_from_favorite: {
          url: url_helpers.category_car_remove_from_favorite_path(category_id: self.category.id.to_s, car_id: self.id.to_s),
          method: :delete
        }
      }
    }
  end

  def images_as_hash
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

  def as_card_hash
    {
      image: main_image,
      title: "#{mark&.name&.capitalize} #{model&.name}",
      year: year,
      price: '$' + price.to_i.to_s.in_groups_of(3),
      transmission: transmission&.name,
      mileage: mileage,
      fuel: fuel&.name,
      engine: engine,
      sold: sold,
      car_path: url_helpers.category_car_path(category_id: self.category.slug, id: self.id.to_s)
    }
  end

  def grouped_options
    options.pluck(:type).uniq.map do |type|
      {
        type: type,
        options: options.select { |opt| opt.type == type }.map(&:as_hash)
      }
    end
  end

  def self.search_similar(car:)
    self.search({
      size: 10,
      query: {
        bool: {
          should: [
            { match: { mark_id: { query: car.mark.id.to_s } } },
            { match: { model_id: { query: car.model.id.to_s } } },
            { match: { price: { query: car.price, fuzziness: 'auto' } } },
            { match: { car_carcass_id: { query: car.car_carcass&.id&.to_s || CarCarcass.first.id.to_s } } },
            { match: { transmission_id: { query: car.transmission.id.to_s } } },
            { match: { fuel_id: { query: car.fuel.id.to_s } } }
          ],
          must_not: {
            term: { _id: car.id.to_s },
            term: { completed: false }
          }
        }
      }
    })
  end

  def self.filter(search, filters)
    self.search( {
      query: {
        bool: {
          should: [
            { match: { title: { query: search } } },
          ],
          filter: [
            { term: { completed: true } },
            { terms: { fuel_id: filters&.first[:fuels] || Fuel.all.map { |f| f.id.to_s } } },
            { terms: { transmission_id: filters&.first[:transmissions] || Transmission.all.map { |f| f.id.to_s } } },
            { terms: { car_carcass_id: filters&.first[:carcasses] || CarCarcass.all.map { |f| f.id.to_s } } },
          ]
        }
      },
      sort: [
        { created_int: { order: 'desc' } }#, '_score'
      ]
    })
  end

  def as_indexed_json(options = {})
    related_data = {
      mark_id: mark.id.to_s, mark_name: mark.name,
      model_id: model.id.to_s, model_name: model.name,
      fuel_id: fuel.id.to_s, fuel_name: fuel.name,
      transmission_id: transmission.id.to_s, transmission_name: transmission.name,
      car_carcass_id: car_carcass&.id&.to_s, car_carcass_name: car_carcass&.name,
      created_int: created_at.to_i
    }
    as_json(
        only: %i[title year price color completed created_at],
        # include: {
        #     mark: { only: %i[id name] },
        #     model: { only: :name },
        #     fuel: { only: :name },
        #     transmission: { only: :name },
        #     car_carcass: { only: :name }
        # }
    ).merge related_data

  end
end