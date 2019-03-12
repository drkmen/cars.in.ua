class Notification
  include Mongoid::Document
  include Mongoid::Timestamps

  field :message, type: String
  field :type, type: String
  field :readed, type: Boolean, default: false

  belongs_to :user
  belongs_to :notificator, class_name: 'User'
  belongs_to :car

  scope  :unread, -> { where(readed: false) }

  def as_hash
    {
      id: id.to_s,
      name: name,
      type: type
    }
  end
end
