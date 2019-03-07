class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :configure_permitted_parameters, if: :devise_controller?

  def prepare_related_data
    @related_data = {
      transmissions: Transmission.all.map(&:as_hash),
      mark_list: CarMark.all.map(&:as_hash),
      categories: Category.all.map(&:as_hash),
      carcasses: CarCarcass.all.map(&:as_hash),
      fuels: Fuel.all.map(&:as_hash),
      regions: Region.all.map(&:as_hash),
      cities: City.all.map(&:as_hash)
    }
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:username])
  end
end
