module Paranoidable
  extend ActiveSupport::Concern
  include Mongoid::Document

  included do
    field :deleted, type: Boolean, default: false
    field :deleted_at, type: DateTime

    default_scope -> { where(deleted: false) }
    scope :deleted, -> { where(deleted: true) }

    def destroy
      self.update_attributes(deleted: true)
    end

    def restore
      self.update_attributes(deleted: false)
    end
  end
end
