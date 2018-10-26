class Transmission
  include Mongoid::Document

  field :name, type: String

  has_many :cars#, inverse_of: nil
end
