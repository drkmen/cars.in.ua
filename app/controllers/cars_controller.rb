class CarsController < ApplicationController

  before_action :find_car, only: %i[show edit delete update]
  before_action :authenticate_user!, only: %i[new create edit delete]
  before_action :prepare_related_data, only: %i[index new edit]

  def index
    # @cars = Car.active.order(created_at: :desc).entries
    @cars = Car.order(created_at: :desc).entries
  end

  def show
    @similar_cars = Car.search_similar(car: @car)
    p "-----------------------SCORES: #{@similar_cars.results.map { |che| che._score}}"
    p "-----------------------SCORE: #{@similar_cars.results.first._score}"
    @similar_cars = @similar_cars.records.to_a

    if current_user
      @car_suggestions = (@car.swaps + @car.trades).map(&:as_json).each do |obj|
        obj.merge! "#{obj[:type]}_owner".to_sym => current_user.id.to_s == obj[:user][:id],
                   car_owner: current_user.id.to_s == obj.dig(:car, :owner_id)
      end

      @car_comments = @car.comments.map(&:as_hash).each do |cm|
        cm.merge! comment_owner: current_user.id == cm.dig(:user, :id),
                  car_owner: current_user.id == cm[:commentable][:user]&.to_s
      end
    end
  end

  def new
    @car = Car.new
  end

  def edit; end

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

  def add_to_favorite
    current_user.favorites.create car_id: Car.find(params[:car_id]).id
  end

  def remove_from_favorite
    current_user.favorites.find_by(car_id: Car.find(params[:car_id])).delete
  end

  private

  def find_car
    @car = Car.includes(:comments).find(params[:id])
  end

  def car_params
    params.require(:car).permit!
  end

  # def prepare_related_data
  #   @related_data = {
  #     transmissions: Transmission.all.pluck(:name, :id),
  #     mark_list: CarMark.all.pluck(:name, :id),
  #     car_types: CarType.all.pluck(:name, :id),
  #     carcasses: CarCarcass.all.pluck(:name, :id),
  #     fuels: Fuel.all.pluck(:name, :id),
  #     regions: Region.all.pluck(:name, :id),
  #     cities: City.all.pluck(:name, :id)
  #   }
  # end
end
