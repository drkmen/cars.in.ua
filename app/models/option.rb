class Option
  include Mongoid::Document

  has_and_belongs_to_many :car
  belongs_to :car_type

  field :name, type: String
  field :uid
  field :type, type: String

  validates :name, uniqueness: true

  def as_hash
    {
      id: id.to_s,
      name: name,
      type: type
    }
  end
end
