module Commentable
  extend ActiveSupport::Concern
  include Mongoid::Document

  included do
    has_many :comments, as: :commentable, dependent: :destroy
  end
end
