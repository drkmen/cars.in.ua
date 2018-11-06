class Swap
  include Mongoid::Document
  include Mongoid::Timestamps
  include Commentable

  field :message, type: String
  field :swap_for, type: String
  field :user_id, type: String

  belongs_to :user
  # embedded_in :car
end
