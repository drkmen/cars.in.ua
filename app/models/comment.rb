class Comment
  include Mongoid::Document
  include Mongoid::Timestamps

  field :body, type: String
  field :user_id, type: Integer
  field :car_id, type: Integer

  belongs_to :commentable, polymorphic: true
  belongs_to :user, optional: true
  belongs_to :car, optional: true

  # embedded_in :car

  def to_json
    {
      body: body,
      user: user.to_json,
      car: car,
      created_at: created_at,
      updated_at: updated_at
    }
  end
end
