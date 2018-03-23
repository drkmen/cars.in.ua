class Image
  include Mongoid::Document
  include Mongoid::Timestamps

  mount_uploader :image, ImageUploader

  field :car_id, type: Integer
  field :main, type: Boolean, default: false

  belongs_to :car
end
