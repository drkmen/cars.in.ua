class CarsController < ApplicationController

  before_action :find_car, only: %i[show edit delete]
  before_action :authenticate_user!, only: %i[new create edit delete]

  def index
    @cars = Car.all.entries
  end

  def new
    @car = Car.new
  end

  def show;end

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
