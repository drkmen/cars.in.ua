class Comment
  include Rails.application.routes.url_helpers
  include Mongoid::Document
  include Mongoid::Timestamps

  field :body, type: String

  belongs_to :commentable, polymorphic: true
  belongs_to :user, optional: true

  def to_json
    path = car_comment_path(id: self.id, car_id: commentable.id)
    {
      body: body,
      user: user&.to_json,
      commentable: commentable,
      created_at: created_at,
      updated_at: updated_at,
      update_path: path,
      delete_path: path,
      reply_path: nil,
      # comment_owner: false # filled in car/show view :(
    }
  end
end
