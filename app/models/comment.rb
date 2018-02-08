class Comment
  include Mongoid::Document
  include Mongoid::Timestamps

  field :body, type: String
  field :type, type: String
  field :user_id, type: Integer
  field :car_id, type: Integer

  belongs_to :user, optional: true
  belongs_to :car, optional: true

  scope :swaps, -> { where(type: 'swap') }
  scope :trades, -> { where(type: 'trade') }

end
