class Notification
  include Mongoid::Document
  include Mongoid::Timestamps

  field :message, type: String
  field :type, type: String
  field :readed, type: Boolean, default: false

  belongs_to :user
  belongs_to :notificator, class_name: 'User'
  belongs_to :car

  default_scope -> { order(created_at: :desc) }
  scope  :unread, -> { where(readed: false) }

  def mark_as_readed!
    update_attributes(readed: true)
  end

  def as_hash
    {
      id: id.to_s,
      name: name,
      type: type,
      readed: readed
    }
  end
end
