class HomeController < ApplicationController
  def index
    @recent_cars = Car.limit(4).order('created_at DESC')
  end
end
