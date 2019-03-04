class CarMarksController < ApplicationController

  def mark_models
    render json: CarMark.find(params[:car_mark_id])&.models&.map(&:as_hash)
  end

end
