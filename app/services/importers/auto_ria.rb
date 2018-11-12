module Importers
  module AutoRia
    class Importer

      def self.get_single_car(id)
        # 23120045
        res = client.info car_id: id
        car = Car.new uid: res['autoData']['autoId'],
                      created_at: res['addDate'],
                      updated_at: res['updateDate'],
                      price: res['USD'],
                      description: res['autoData']['description'],
                      year: res['autoData']['year'],
                      mileage: res['autoData']['raceInt'],

                      mark_id: CarMark.find_or_create_by(uid: res['markId'], name: res['markName']).id,
                      model_id: CarModel.find_or_create_by(uid: res['modelId'], name: res['modelName']).id,
                      car_type_id: CarType.find_or_create_by(uid: res['autoData']['categoryId'], name: res['autoData']['categoryNameEng']).id,

                      gearbox_name: res['autoData']['gearboxName'],
                      fuel_name_eng: res['autoData']['fuelNameEng'],
                      version: res['autoData']['version'],
                      photoData: res['photoData'],
                      auto_ria_link: res['linkToView']

        p '*'*100
        p car
        p '*'*100
        car.save!
      end

      def get_cars(ids)

      end

      def get_all_cars

      end

      protected

      def get_images(id)

      end

      def get_options(id)

      end

      def get_trades(id)

      end

      def self.client
        @client ||= AutoRiaApi::Base.new(api_key: ENV['AUTO_RIA_API_KEY'])
      end

      private_class_method :client
    end
  end
end