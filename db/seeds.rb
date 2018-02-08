namespace :db do
  desc 'Seed DB'
  task seed: :environment do
    p '_-------------'
    p Car.create!(mark: 'Citroen', model: 'C1', descrption: 'uuuuuu you touch my trulala',
                  year: 2008, mileage: 139, price: 5500, color: 'Yellow', color_hex: '#ff3d35',
                  engine: '1', fuel: 'Benzin')
  end
end


# field :mark, type: String
# field :model, type: String
# field :description, type: String
# field :year, type: String
# field :mileage, type: Integer, default: 0#, null: false
# field :price, type: BigDecimal, default: 0.0#, null: false
# field :color, type: String
# field :color_hex, type: String
# field :engine, type: String
# field :fuel, type: String
# field :sold, type: Boolean, default: false
# field :user_id, type: Integer
