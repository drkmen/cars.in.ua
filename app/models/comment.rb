class Comment
  include Rails.application.routes.url_helpers
  include Mongoid::Document
  include Mongoid::Timestamps

  field :body, type: String

  belongs_to :commentable, polymorphic: true
  belongs_to :user, optional: true

  def as_hash
    path = category_car_comment_path(category_id: commentable.category.slug, car_id: commentable.slug, id: self.id)
    {
      id: id.to_s,
      body: body,
      user: user&.as_hash,
      commentable: commentable,
      created_at: created_at,
      updated_at: updated_at,
      update: {
        path: path,
        able: created_at > Time.now - 1.hour
      },
      delete: {
        path: path,
        able: created_at > Time.now - 2.hour
      },
      reply_path: nil,
      # comment_owner: false # filled in car/show view :(
    }
  end
end
