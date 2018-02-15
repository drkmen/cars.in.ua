require 'net/http'
require 'json'

url = 'https://auto.ria.com/api/categories/1/marks/_active/_with_count?langId=2&categoryId=1'
response = JSON.parse(Net::HTTP.get(URI(url)))
response.each do |car|
  mark_list = CarMarkList.create(name: car['name'])
  url = "https://auto.ria.com/api/categories/1/marks/#{car['value']}/models/_with_count?langId=2"
  response = JSON.parse(Net::HTTP.get(URI(url)))
  response.each do |model|
    mark_list.models.create!(name: model['name'])
  end
end
