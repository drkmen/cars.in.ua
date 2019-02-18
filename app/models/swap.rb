class Swap
  include Rails.application.routes.url_helpers
  include Mongoid::Document
  include Mongoid::Timestamps
  include Commentable

  field :message, type: String
  field :swap_for, type: String
  field :active, type: Boolean, default: true

  belongs_to :user
  embedded_in :car

  def decline!
    self.update_attributes active: false
  end

  def to_json
    {
      id: id.to_s,
      active: active,
      message: message,
      swap_for: swap_for,
      type: :swap,
      created_at: created_at,
      update_path: car_swap_path(self.id, car_id: car.id),
      delete_path: car_swap_path(self.id, car_id: car.id),
      decline_path: car_swap_decline_path(self.id, car_id: car.id),
      user: user.to_json,
      car: {
        id: car.id.to_s,
        owner_id: car.user.id.to_s
      }
    }
  end

  def user
    User.find(self.user_id)
  end
end
