class TradesController < ApplicationController

  before_action :find_trade, only: %i[destroy update]

  def create
    @trade = parent.trades.new(trade_params)
    redirect_to parent if @trade.save
  end

  def update

  end

  def destroy
    @trade.delete
  end

  private

  def find_trade
    @trade = Trade.find(params[:id])
  end

  def parent
    Car.find(params[:car_id])
  end

  def trade_params
    params.require(:trade).permit(:message).merge(user_id: current_user&.id)
  end

end