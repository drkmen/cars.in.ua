class Swap
  include Rails.application.routes.url_helpers
  include Mongoid::Document
  include Mongoid::Timestamps
  include Commentable

  field :message, type: String
  field :swap_for, type: String
  field :active, type: Boolean, default: true

  belongs_to :user
  # embedded_in :car
  belongs_to :car

  def decline!
    self.update_attributes active: false
  end

  def as_hash
    {
      id: id.to_s,
      active: active,
      message: message,
      swap_for: swap_for,
      type: :swap,
      created_at: created_at,
      update_path: category_car_swap_path(category_id: car.category.id, car_id: car.id, id: self.id),
      delete_path: category_car_swap_path(category_id: car.category.id, car_id: car.id, id: self.id),
      decline_path: category_car_swap_decline_path(category_id: car.category.id, car_id: car.id, swap_id: self.id),
      user: user.as_hash,
      car: {
        id: car.id.to_s,
        owner_id: car.user.id.to_s
      }
    }
  end

  # def user
  #   User.find(self.user_id)
  # end
end
