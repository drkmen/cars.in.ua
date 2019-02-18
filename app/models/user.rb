class User
  include Mongoid::Document
  include Mongoid::Timestamps
  include Commentable

  mount_uploader :avatar, ImageUploader
  devise :database_authenticatable, :registerable, :confirmable, :recoverable, stretches: 12

  ## Database authenticatable
  field :email,              type: String, default: ''
  field :encrypted_password, type: String, default: ''

  ## Recoverable
  field :reset_password_token,   type: String
  field :reset_password_sent_at, type: Time

  ## Rememberable
  # field :remember_created_at, :type => Time

  ## Trackable
  # field :sign_in_count,      :type => Integer, :default => 0
  # field :current_sign_in_at, :type => Time
  # field :last_sign_in_at,    :type => Time
  # field :current_sign_in_ip, :type => String
  # field :last_sign_in_ip,    :type => String

  ## Confirmable
  field :confirmation_token,   type: String
  field :confirmed_at,         type: Time
  field :confirmation_sent_at, type: Time
  field :unconfirmed_email,    type: String # Only if using reconfirmable

  ## Lockable
  # field :failed_attempts, :type => Integer, :default => 0 # Only if lock strategy is :failed_attempts
  # field :unlock_token,    :type => String # Only if unlock strategy is :email or :both
  # field :locked_at,       :type => Time

  ## Token authenticatable
  # field :authentication_token, :type => String

  # field :avatar
  field :first_name, type: String
  field :last_name, type: String
  field :age, type: Integer
  field :phone, type: String
  field :city, type: String
  field :reputation, type: Integer
  field :showroom, type: Boolean, default: false

  field :cars_count, type: Fixnum, default: 0

  has_many :cars
  has_many :comments
  has_many :trades
  has_many :swaps
  has_many :favorites, dependent: :delete
  # has_many :favorite_cars, through: :favorites

  embeds_one :address

  def name
    "#{first_name} #{last_name}"
  end

  def favorite_cars
    favorites.map(&:car).compact
  end

  def to_json
    {
      id: id.to_s,
      name: name,
      email: email,
      age: age,
      phone: phone,
      city: city,
      avatar: {
        url: avatar&.url
      }
    }
  end
end
