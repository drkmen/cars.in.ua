class TradesController < ApplicationController

  before_action :find_trade, except: :create

  def create
    @trade = parent.trades.new trade_params
    redirect_to category_car_path(id: @trade.car) if @trade.save
  end

  def update
    redirect_to category_car_path(id: @trade.car) if @trade.update trade_params
  end

  def destroy
    redirect_to category_car_path(id: @trade.car) if @trade.delete
  end

  def decline
    redirect_to category_car_path(id: @trade.car) if @trade.decline!
  end

  private

  def find_trade
    @trade = parent.trades.find params[:trade_id]
  end

  def parent
    Car.find params[:car_id]
  end

  def trade_params
    params.require(:trade).permit(:message).merge user_id: current_user&.id
  end
end