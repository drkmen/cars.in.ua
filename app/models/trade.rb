class Trade
  include Mongoid::Document
  include Mongoid::Timestamps
  include Commentable

  field :message, type: String
  field :suggested_price, type: BigDecimal, default: 0.0

  belongs_to :user
  embedded_in :car

  def to_json
    {
      id: id.to_s,
      message: message,
      price: suggested_price,
      type: :trade,
      user: user
    }
  end

  def user
    User.find(self.user_id)
  end
end
