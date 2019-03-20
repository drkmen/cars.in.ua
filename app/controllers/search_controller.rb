class SearchController < ApplicationController
  # before_action :prepare_related_data, only: :search

  def search
    search_query = params[:q] || ''
    @search_result = search_query.present? ? Car.search(search_query).records : Car.limit(50)
    p '!'*100
    p params[:filters].present?
    # pp @search_result.filter(search_query, params[:filters]).results
    
    @search_result = @search_result.filter(search_query, params[:filters]).records.to_a if params[:filters].present?
    # p @search_result
    # p @search_result&.size
    # p '!'*100
    prepare_related_data
    @search_result.to_a
  end

  def prepare_related_data
    return super unless @search_result.present?

    @related_data = super
    %w(Transmission CarMark Category CarCarcass Fuel Region City).each do |obj|
      objs = @search_result.map { |car| car.public_send(obj.underscore)&.as_hash }
      @related_data[obj.downcase.pluralize.to_sym].each do |hash|
        hash[:cars_count] = objs.group_by { |tr| tr&.dig(:name) }.select { |k, _v| k == hash&.dig(:name) }.values.flatten.size
      end
    end
  end

end