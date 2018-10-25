class Trade
  include Mongoid::Document
  include Mongoid::Timestamps
  include Commentable

  field :message, type: String
  field :suggested_price, type: BigDecimal, default: 0.0
  field :user_id, type: String

  belongs_to :user
  # embedded_in :car
end
