class CarsController < ApplicationController

  before_action :find_car, only: %i[show edit delete update]
  before_action :authenticate_user!, only: %i[new create edit delete]

  def index
    @cars = Car.all.entries
  end

  def show
    @next_car = Car.last
    @prev_car = Car.first
  end

  def new
    @car = Car.new
    @mark_list = CarMarkList.all.pluck(:name, :id)
    @fuels = Fuel.all.pluck(:type, :id)
    @transmissions = Transmission.all.pluck(:type, :id)
  end

  def edit; end

  def update
    @car.update_attributes!(car_params)
  end

  def create
    @car = Car.new(car_params.reject { |k| k['images'] })
    car_params['images'].each { |image|
      @car.images << Image.new(image: image)
    }
    redirect_to @car if @car.save!
  end

  private

  def find_car
    @car = Car.find(params[:id])
  end

  def car_params
    params.require(:car).permit!
    # params.require(:car).permit(:mark, :model, :description, :year, :mileage, :price,
    #                             :color, :engine, :fuel, :vin, images: {image: []})
  end
end
