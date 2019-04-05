class CarsController < ApplicationController

  before_action :find_car, only: %i[show edit delete update]
  before_action :authenticate_user!, only: %i[new create edit delete]
  before_action :prepare_related_data, only: %i[index new edit]

  def index
    # @cars = Car.active.order(created_at: :desc).entries
    @cars = Car.completed.order(created_at: :desc).page(params[:page]).per(20)
  end

  def show
    @similar_cars = Car.search_similar(car: @car)
    p "-----------------------SCORES: #{@similar_cars.results.map { |che| che._score}}"
    p "-----------------------SCORE: #{@similar_cars.results.first._score}"
    p '*'*100
    # pp @similar_cars.records
    p '*'*100
    @similar_cars = @similar_cars.records.to_a
    @car_comments = @car.comments.map(&:as_hash)
    @car_suggestions = (@car.swaps + @car.trades).map(&:as_hash)

    if current_user
      @car_suggestions = (@car.swaps + @car.trades).map(&:as_hash).each do |obj|
        obj.merge! "#{obj[:type]}_owner".to_sym => current_user.id.to_s == obj[:user][:id],
                   car_owner: current_user.id.to_s == obj.dig(:car, :owner_id)
      end

      @car_comments = @car.comments.map(&:as_hash).each do |cm|
        cm.merge! comment_owner: current_user.id.to_s == cm.dig(:user, :id).to_s,
                  car_owner: current_user.id.to_s == cm[:commentable][:user]&.to_s
      end
    end

    # TODO: IP address and so on
    @car.increment_views!
    prepare_statistic
  end

  def new
    redirect_to car_setup_car_index_path(car_id: current_user.cars.create.id.to_s)
  end

  def edit; end

  def update
    redirect_to category_car_path(id: @car) if @car.update_attributes!(car_params)
  end

  def create
    @car = current_user.cars.new(car_params.reject { |k| k['images'] })
    car_params['images'].each do |image|
      @car.images << Image.new(image: image)
    end
    redirect_to category_car_path(id: @car) if @car.save!
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

  def prepare_statistic
    @statistic = {
      views: @car.views,
      bookmarks: Favorite.where(car_id: @car.id).count,
      price: 0
    }
  end
end
