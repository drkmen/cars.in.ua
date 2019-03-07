class SearchController < ApplicationController
  before_action :prepare_related_data, only: :search

  def search
    search_query = params[:q] || ''
    @search_result = search_query.present? ? Car.search(search_query).records : Car.limit(50)
    p '!'*100
    # p @search_result = @search_result.filter(search_query, params[:filters]).records
    @search_result = @search_result.filter(search_query, params[:filters]).records.to_a if params[:filters]
    p @search_result
    p @search_result&.size
    p '!'*100
    @search_result.to_a
  end
end