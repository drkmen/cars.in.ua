class CarsController < ApplicationController

  before_action :find_car, only: :show

  def index
    @cars = Car.all.entries
  end

  def show

  end

  private

  def find_car
    @car = Car.find(params[:id])
  end

  def car_params
    params.require(:car).permit!
  end
end
