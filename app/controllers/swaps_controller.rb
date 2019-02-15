class SwapsController < ApplicationController

  before_action :find_swap, only: %i[destroy update]

  def create
    @swap = parent.swaps.new(swap_params)
    redirect_to parent if @swap.save
  end

  def update

  end

  def destroy
    @swap.delete
  end

  private

  def find_swap
    @swap = Swap.find(params[:id])
  end

  def parent
    Car.find(params[:car_id])
  end

  def swap_params
    params.require(:swap).permit(:message).merge(user_id: current_user&.id)
  end

end