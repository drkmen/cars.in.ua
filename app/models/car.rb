class Car
  include Optionable #, Paranoidable
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Attributes::Dynamic
  include Mongoid::Paranoia
  include Mongoid::Slug

  # field :mark, type: String
  # field :model, type: String
  field :title, type: String
  field :description, type: String
  field :year, type: String
  field :mileage, type: Integer, default: 0
  field :price, type: BigDecimal, default: 0.0
  field :color, type: String
  field :color_hex, type: String
  field :engine, type: String
  field :fuel, type: String
  field :vin, type: String
  field :sold, type: Boolean, default: false

  field :user_id, type: Integer
  # field :car_mark_list_id, type: Integer

  belongs_to :user
  belongs_to :mark, class_name: 'CarMarkList', counter_cache: true
  belongs_to :model, class_name: 'CarModelList', counter_cache: true
  # belongs_to :car_model_list, counter_cache: true
  # embeds_one :mark, class_name: CarMarkList
  # embeds_one :model, class_name: CarModelList

  has_many :images, dependent: :delete
  has_many :comments, dependent: :delete
  has_many :options

  accepts_nested_attributes_for :images, allow_destroy: true

  before_save :set_title, if: :year_changed? # :mark_changed? || :model_changed?
  slug :title

  def main_image
    # images.where(main: true)
    images.first
  end

  def set_title
    self.title = "#{mark&.name&.capitalize} #{model&.name} #{year}".strip
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
end
