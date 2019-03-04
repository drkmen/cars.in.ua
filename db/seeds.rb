# require 'net/http'
# require 'json'
#
# p 'creating marks and models'
# url = 'https://auto.ria.com/api/categories/1/marks/_active/_with_count?langId=2&categoryId=1'
# response = JSON.parse(Net::HTTP.get(URI(url)))
# response.each do |car|
#   p car['name']
#   mark_list = CarMark.create(name: car['name'])
#   url = "https://auto.ria.com/api/categories/1/marks/#{car['value']}/models/_with_count?langId=2"
#   response = JSON.parse(Net::HTTP.get(URI(url)))
#   response.each do |model|
#     p model['name']
#     mark_list.models.create!(name: model['name'])
#   end
# end

# p 'creating transmissions'
# %w(Автомат Типтроник Механика Робот).each do |transmission|
#   Transmission.create name: transmission
# end

# p 'creating fuel'
# %w(Бензин Дизель Електро Гибрид).each do |fuel|
#   Fuel.create name: fuel
# end

# p 'creating car types'
# %w(Легковое Грузовое Мото Спецтехника Автобус Прицеп Водный_транспорт Автодом Другое).each do |c_type|
#   CarType.create! name: c_type
# end

# p 'creating car carcasses'
# %w(Седан Внедорожник/Кроссовер Минивэн Хэтчбек Универсал Купе Легковой_Фургон Кабриолет Пикап Лимузин Другое).each do |c_carcass|
#   CarCarcass.create! name: c_carcass
# end

p 'creating options'
comfort = ['Усилитель руля', 'Климат-контроль', 'Кондиционер ', 'Элекро-стеклоподъемники', 'Электро-регулировка боковых зеркал',
           'Складывание зеркал заднего вида', 'Электрический стояночный тормоз', 'Дополнительная защита картера двигателя', 'Круиз-контроль',
           'Датчик дождя', 'Тонировка задних стекол', 'Бесключевого доступа', 'Запуск двигателя кнопкой', 'Мультимедиа', 'Навигационная система',
           'Мультируль', 'Память водительского сиденья и зеркал', 'Панорамная крыша', 'Люк', 'Кожанный салон',
           'Камера заднего вида', 'Система автоматической парковки', 'Система контроля давления в шинах']
comfort.each do |opt|
  Option.create type: 'Комфорт', name: opt
end

security = ['ABD', 'ABS', 'ESP', 'Бронированный автомобиль', 'Замок на КПП', 'Иммобилайзер', 'Подушка безопасности (Airbag)',
            'Сигнализация', 'Центральный замок', 'Крепления детских сидений Isofix']
security.each do |opt|
  Option.create type: 'Безопасность', name: opt
end

outside = ['Галогенные фары', 'Пневмоподвеска', 'Серворуль', 'Омыватель фар', 'Противотуманные фары',
           'Обогрев боковых зеркал', 'Обогрев сидений', 'Передние и задние датчики парковки', 'Газовая установка ГБО']
outside.each do |opt|
  Option.create type: 'Внешний вид', name: opt
end

condition = ['Гаражное хранение', 'Индивидуальная комплектация', 'Не бит', 'Не крашен', 'Первая регистрация',
             'Первый владелец', 'Сервисная книжка', 'Требует ремонта', 'Нерастаможенный', 'После ДТП', 'Не на ходу', 'Взято в кредит']
condition.each do |opt|
  Option.create type: 'Состояние', name: opt
end

client = AutoRiaApi::Base.new(api_key: ENV['AUTO_RIA_API_KEY'])

# { name: "Легковые", value: 1 },
# { name: "Мото", value: 2 },
# { name: "Водный транспорт", value: 3 },
# { name: "Спецтехника", value: 4 },
# { name: "Прицеп", value: 5 },
# { name: "Грузовик", value: 6 },
# { name: "Автобус", value: 7 },
# { name: "Автодом", value: 8 },
# { name: "Воздушный транспорт", value: 9 }

# client.regions.each do |region|
#   reg = Region.find_or_create_by(name: region['name'], uid: region['value'])
#
#   client.cities(region: region['value']).each do |city|
#     reg.cities.find_or_create_by(name: city['name'], uid: city['value'])
#   end
# end

# client.types.each do |type|
#   p "creating car types: #{type['name']}"
#   car_type = CarType.create! uid: type['value'], name: type['name']
#   next unless type['value'].to_i == 1
#
#   client.carcasses(type: type['value']).each do |carcass|
#     p "creating carcasses: #{carcass['name']}"
#     CarCarcass.create! uid: carcass['value'], name: carcass['name']
#   end
#
#   client.marks(type: type['value']).each do |mark|
#     p "creating car marks: #{mark['name']}"
#     i_mark = CarMark.create uid: mark['value'], name: mark['name']
#
#     client.models(type: type['value'], mark: mark['value']).each do |model|
#       p "creating car models: #{model['name']}"
#       i_mark.models.create! uid: model['value'], name: model['name']
#     end
#   end
#
#   client.options(type: type['value']).each do |option|
#     p "creating options: #{option['name']}"
#     car_type.options.create! uid: option['value'], name: option['name']
#   end
# endAdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password') if Rails.env.development?