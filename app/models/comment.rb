class Comment
  include Rails.application.routes.url_helpers
  include Mongoid::Document
  include Mongoid::Timestamps

  field :body, type: String

  belongs_to :commentable, polymorphic: true
  belongs_to :user, optional: true

  def as_hash
    path = car_comment_path(id: self.id, car_id: commentable.id)
    {
      id: id.to_s,
      body: body,
      user: user&.as_hash,
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
