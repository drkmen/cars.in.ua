class CarsController < ApplicationController

  before_action :find_car, only: %i[show edit delete update]
  before_action :authenticate_user!, only: %i[new create edit delete]
  before_action :prepare_related_data, only: %i[new edit]

  def index
    # p '-'*100
    # p AutoRiaApi::Base.new(api_key: ENV['AUTO_RIA_API_KEY']).types
    # p '-'*100
    @cars = Car.all.order(imported_at: :desc, created_at: :desc).entries
  end

  def show
    @next_car = Car.last
    @prev_car = Car.first
    @car_comments = @car.comments.map(&:to_json)
    if current_user
      @car_comments.each do |cm|
        cm.merge! comment_owner: current_user.id == cm.dig(:user, :id),
                  car_owner: current_user.id == cm[:commentable][:user]
      end
    end
  end

  def new
    @car = Car.new
    @car.build_address
  end

  def edit
    @mark_list = CarMarkList.all.pluck(:name, :id)
  end

  def update
    redirect_to @car if @car.update_attributes!(car_params)
  end

  def create
    @car = Car.new(car_params.reject { |k| k['images'] })
    car_params['images'].each do |image|
      @car.images << Image.new(image: image)
    end
    redirect_to @car if @car.save!
  end

  private

  def find_car
    @car = Car.includes(:comments).find(params[:id])
  end

  def car_params
    params.require(:car).permit!
    # params.require(:car).permit(:mark, :model, :description, :year, :mileage, :price,
    #                             :color, :engine, :fuel, :vin, images: {image: []})
  end

  def prepare_related_data
    @related_data = {
      transmissions: Transmission.all.pluck(:name, :id),
      mark_list: CarMark.all.pluck(:name, :id),
      car_types: CarType.all.pluck(:name, :id),
      carcasses: CarCarcass.all.pluck(:name, :id),
      fuels: Fuel.all.pluck(:name, :id)
    }
  end
end
