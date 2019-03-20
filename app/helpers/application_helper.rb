module ApplicationHelper
  def category_cars_path(opts = {})
    opts.merge!(category_id: Category.first.slug) unless opts[:category_id] || opts.class == Category
    super opts
  end

  def resource_name
    :user
  end

  def resource
    @resource ||= User.new
  end

  def devise_mapping
    @devise_mapping ||= Devise.mappings[:user]
  end
end
