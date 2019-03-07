module ApplicationHelper
  def category_cars_path(opts = {})
    opts.merge!(category_id: Category.first.slug) unless opts[:category_id]
    super opts
  end
end
