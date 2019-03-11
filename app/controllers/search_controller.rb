class SearchController < ApplicationController
  # before_action :prepare_related_data, only: :search

  def search
    search_query = params[:q] || ''
    @search_result = search_query.present? ? Car.search(search_query).records : Car.limit(50)
    p '!'*100
    # p @search_result = @search_result.filter(search_query, params[:filters]).records
    @search_result = @search_result.filter(search_query, params[:filters]).records.to_a if params[:filters]
    p @search_result
    p @search_result&.size
    p '!'*100
    prepare_related_data
    @search_result.to_a
  end

  def prepare_related_data
    return super unless @search_result.present?
    # p '='*100
    # pp super
    # p '='*100

    # @related_data = %w(Transmission CarMark Category CarCarcass Fuel Region City).each_with_object({}) do |obj, hash|
    #   objs = @search_result.map { |car| car.public_send(obj.underscore).as_hash }
    #   hash[obj.downcase.pluralize.to_sym] = objs.each do |_hash|
    #     _hash[:cars_count] = objs.group_by { |tr| tr[:name] }.select { |k, _v| k == _hash[:name] }.values.flatten.size
    #   end.uniq!
    # end

    @related_data = super
    p '*'*100
    pp @related_data.keys
    p '*'*100
    %w(Transmission CarMark Category CarCarcass Fuel Region City).each do |obj|
      objs = @search_result.map { |car| car.public_send(obj.underscore)&.as_hash }
      # p '='*100
      # p @related_data[:regions]
      # p obj.downcase.pluralize.to_sym
      # p '='*100
      @related_data[obj.downcase.pluralize.to_sym].each do |hash|
        # p ')'*100
        # p hash
        # p hash[:cars_count]
        hash[:cars_count] = objs.group_by { |tr| tr&.dig(:name) }.select { |k, _v| k == hash&.dig(:name) }.values.flatten.size
        # p hash
        # p '='*100
      end
        # _hash[:cars_count] = objs.group_by { |tr| tr[:name] }.select { |k, _v| k == _hash[:name] }.values.flatten.size
      # end.uniq!
    end

    # p '='*100
    # pp temp
    # p '='*100
    # p '='*100

  #   if @search_result.present?
  #     @related_data
  #   else
  #     super
  #   end
  #
  # rescue => e
  #   p '@'*100
  #   p e
  #   p '@'*100
  end
end