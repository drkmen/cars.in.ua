class Swap
  include Rails.application.routes.url_helpers
  include Mongoid::Document
  include Mongoid::Timestamps
  include Commentable

  field :message, type: String
  field :swap_for, type: String

  belongs_to :user
  embedded_in :car

  def to_json
    path = car_swap_path(self.id, car_id: car.id)
    {
      id: id.to_s,
      message: message,
      swap_for: swap_for,
      type: :swap,
      created_at: created_at,
      update_path: path,
      delete_path: path,
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
