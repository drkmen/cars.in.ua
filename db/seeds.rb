require 'net/http'
require 'json'

p 'creating marks and models'
# url = 'https://auto.ria.com/api/categories/1/marks/_active/_with_count?langId=2&categoryId=1'
# response = JSON.parse(Net::HTTP.get(URI(url)))
# response.each do |car|
#   p car['name']
#   mark_list = CarMarkList.create(name: car['name'])
#   url = "https://auto.ria.com/api/categories/1/marks/#{car['value']}/models/_with_count?langId=2"
#   response = JSON.parse(Net::HTTP.get(URI(url)))
#   response.each do |model|
#     p model['name']
#     mark_list.models.create!(name: model['name'])
#   end
# end

# p 'creating transmissions'
# %w(автомат типтроник механика робот).each do |transmission|
#   Transmission.create type: transmission
# end

p 'creating fuel'
%w(бензин дизель електро гибрид).each do |fuel|
  Fuel.create type: fuel
end