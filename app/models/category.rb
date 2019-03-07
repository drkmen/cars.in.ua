class Category
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Slug

  has_many :cars
  has_many :options

  field :name, type: String
  field :name_en, type: String
  field :uid
  field :cars_count, type: Integer, default: 0

  slug :name_en

  def as_hash
    {
      id: id.to_s,
      name: name,
      cars_count: cars_count
    }
  end
end
