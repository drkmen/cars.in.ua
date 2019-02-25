class Address
  include Mongoid::Document
  include Mongoid::Timestamps

  field :country, type: String
  field :region, type: String
  field :city, type: String
  field :street, type: String
  field :house_number, type: String
  field :apartment_number, type: String

  embedded_in :car

  def to_s
    "#{country}, #{city}"
  end

  def as_hash
    {
      full: to_s,
      country: country,
      city: city
    }
  end
end