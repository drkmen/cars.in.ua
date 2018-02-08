module Optionable
  extend ActiveSupport::Concern
  include Mongoid::Document

  included do
    field :additional_options, type: Hash, default: {}
  end
end
