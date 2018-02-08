class Image
  include Mongoid::Document
  include Mongoid::Timestamps

  field :main, type: Boolean, default: false
end
