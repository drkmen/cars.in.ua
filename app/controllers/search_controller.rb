class SearchController < ApplicationController
  before_action :prepare_related_data, only: :search

  def search
    @search_result = Car.search(params[:q]).records#.to_a
    p '!'*100
    @search_result = @search_result.filter(params[:filters]).records.to_a if params[:filters]
    p @search_result
    p @search_result&.size
    p '!'*100
    @search_result.to_a
  end
end