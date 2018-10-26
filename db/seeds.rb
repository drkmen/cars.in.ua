require 'net/http'
require 'json'

p 'creating marks and models'
url = 'https://auto.ria.com/api/categories/1/marks/_active/_with_count?langId=2&categoryId=1'
response = JSON.parse(Net::HTTP.get(URI(url)))
response.each do |car|
  p car['name']
  mark_list = CarMarkList.create(name: car['name'])
  url = "https://auto.ria.com/api/categories/1/marks/#{car['value']}/models/_with_count?langId=2"
  response = JSON.parse(Net::HTTP.get(URI(url)))
  response.each do |model|
    p model['name']
    mark_list.models.create!(name: model['name'])
  end
end

p 'creating transmissions'
%w(Автомат Типтроник Механика Робот).each do |transmission|
  Transmission.create name: transmission
end

p 'creating fuel'
%w(Бензин Дизель Електро Гибрид).each do |fuel|
  Fuel.create name: fuel
end

p 'creating car types'
%w(Легковое Грузовое Мото Спецтехника Автобус Прицеп Водный_транспорт Автодом Другое).each do |c_type|
  CarType.create! name: c_type
end

p 'creating car carcasses'
%w(Седан Внедорожник/Кроссовер Минивэн Хэтчбек Универсал Купе Легковой_Фургон Кабриолет Пикап Лимузин Другое).each do |c_carcass|
  CarCarcass.create! name: c_carcass
end