class CarMarkListsController < ApplicationController

  def mark_models
    render json: CarMarkList.find(params[:car_mark_list_id])&.models&.map(&:to_json)
  end

end
