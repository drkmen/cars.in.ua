class SwapsController < ApplicationController

  before_action :find_swap, except: :create

  def create
    @swap = parent.swaps.new swap_params
    redirect_to category_car_path(id: @swap.car) if @swap.save
  end

  def update
    redirect_to category_car_path(id: @swap.car) if @swap.update swap_params
  end

  def destroy
    redirect_to category_car_path(id: @swap.car) if @swap.delete
  end

  def decline
    redirect_to category_car_path(id: @swap.car) if @swap.decline!
  end

  private

  def find_swap
    @swap = parent.swaps.find params[:swap_id]
  end

  def parent
    Car.find params[:car_id]
  end

  def swap_params
    params.require(:swap).permit(:message).merge user_id: current_user&.id
  end
end