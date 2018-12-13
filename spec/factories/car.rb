FactoryBot.define do
  factory :car do
    vin     { Faker::Vehicle.vin }
    year    { Faker::Vehicle.year }
    mileage { Faker::Vehicle.mileage }
    color   { Faker::Vehicle.color }
    engine  { Faker::Vehicle.engine }
    doors   { Faker::Vehicle.door_count }
  end
end

# Faker::Vehicle.vin #=> "LLDWXZLG77VK2LUUF"
# Faker::Vehicle.manufacture #=> "JAGUAR CARS LTD"
# Faker::Vehicle.mileage #=> 12463
# Faker::Vehicle.year #=> 2006
# Faker::Vehicle.make #=> "Toyota"
# Faker::Vehicle.model #=> "Prius"
# Faker::Vehicle.make_and_model #=> "Ford Focus"
# Faker::Vehicle.style #=> "ESi"
# Faker::Vehicle.color #=> "Beige"
# Faker::Vehicle.transmission #=> "Automatic"
# Faker::Vehicle.drive_type #=> "FWD"
# Faker::Vehicle.fuel_type #=> "Gasoline Hybrid"
# Faker::Vehicle.door_count #=> "2 Door"
# Faker::Vehicle.car_type #=> "Hatchback"
# Faker::Vehicle.engine #=> "6 Cylinder Engine"
# Faker::Vehicle.engine_size #=> "8 Cylinder Engine"
# Faker::Vehicle.car_options #=> ["A/C: Front", "Airbag: Driver", "AM/FM Stereo", ...]
# Faker::Vehicle.standard_specs #=> ["Pwr windows", "Remote fuel lid release", "Immobilizer system", ...]
#
#   field :title, type: String
#   field :description, type: String
#   field :year, type: String
#   field :mileage, type: Integer, default: 0
#   field :price, type: BigDecimal, default: 0.0
#   field :color, type: String
#   field :color_hex, type: String
#   field :engine, type: String
#   field :equipment, type: String
#   field :doors, type: Integer, default: 5
#   field :vin, type: String
#   field :sold, type: Boolean, default: false
#   field :completed, type: Boolean, default: false
#   field :imported,  type: Boolean, default: false
#   field :imported_at, type: DateTime
#   field :published_at, type: DateTime
#
#   belongs_to :car_type, counter_cache: true
#   belongs_to :car_carcass, counter_cache: true, optional: true
#   belongs_to :mark, class_name: 'CarMark', counter_cache: true
#   belongs_to :model, class_name: 'CarModel', counter_cache: true
#   belongs_to :transmission
#   belongs_to :fuel
#   belongs_to :user, counter_cache: true