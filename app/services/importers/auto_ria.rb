module Importers
  module AutoRia
    class Importer

      def self.get_single_car(id)
        res = client.info car_id: id
        pp res
        car = build_car(res)
        get_images(id, car)
        car.save!
      end

      def get_cars(ids)

      end

      def get_all_cars

      end

      protected

      def self.get_images(id, inner_car)
        photos = client.photos(car_id: id)
        photos['data']&.first&.last&.each do |_key, value|
          inner_car.images << Image.new(remote_image_url: value.dig('formats')&.last)
        end
      end

      def get_options(id)

      end

      def get_trades(id)

      end

      def self.build_car(res)
        car = Car.new uid: res['autoData']['autoId'],
                      published_at: res['addDate'],
                      updated_at: res['updateDate'],
                      imported: true,
                      imported_at: DateTime.now,
                      price: res['USD'],
                      description: res['autoData']['description'],
                      year: res['autoData']['year'],
                      mileage: res['autoData']['raceInt'],
                      engine: res['autoData']['fuelName'],

                      mark_id: CarMark.find_or_create_by(uid: res['markId'], name: res['markName']).id,
                      model_id: CarModel.find_or_create_by(uid: res['modelId'], name: res['modelName']).id,
                      transmission_id: Transmission.find_or_create_by(name: res['autoData']['gearboxName']).id,
                      fuel_id: Fuel.find_or_create_by(name: res['autoData']['fuelNameEng']).id,
                      car_type_id: CarType.find_or_create_by(uid: res['autoData']['categoryId'],
                                                             name: res['autoData']['categoryNameEng']).id,

                      additional_options: {
                          additional_currencies: {
                              'UAH': res['UAH'],
                              'EUR': res['EUR']
                          }
                      },

                      gearbox_name: res['autoData']['gearboxName'],
                      fuel_name_eng: res['autoData']['fuelNameEng'],
                      version: res['autoData']['version'],
                      photoData: res['photoData'],
                      auto_ria_link: res['linkToView']

        car.images << Image.new(remote_image_url: res['photoData']['seoLinkF']) # main image
        car
      end

      def self.client
        @client ||= AutoRiaApi::Base.new(api_key: ENV['AUTO_RIA_API_KEY'])
      end

      private_class_method :client
    end
  end
end