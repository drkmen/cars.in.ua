class Trade
  include Rails.application.routes.url_helpers
  include Mongoid::Document
  include Mongoid::Timestamps
  include Commentable

  field :message, type: String
  field :suggested_price, type: BigDecimal, default: 0.0
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
      price: suggested_price,
      type: :trade,
      created_at: created_at,
      update_path: car_trade_path(self.id, car_id: car.id),
      delete_path: car_trade_path(self.id, car_id: car.id),
      decline_path: car_trade_decline_path(self.id, car_id: car.id),
      user: user.as_hash,
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
