class Image
  include Mongoid::Document
  include Mongoid::Timestamps

  mount_uploader :image, ImageUploader

  field :order, type: Integer, default: 0
  field :main, type: Boolean, default: false

  belongs_to :car

  # def image
  #   super || 'car-placeholder'
  # end
end
