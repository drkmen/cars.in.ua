class Option
  include Mongoid::Document

  field :name, type: String
  field :type, type: String

  has_and_belongs_to_many :car

  validates :name, uniqueness: true

  def to_json
    {
      id: id.to_s,
      name: name,
      type: type
    }
  end
end
