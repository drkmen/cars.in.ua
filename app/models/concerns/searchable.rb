module Searchable
  extend ActiveSupport::Concern

  included do
    include Elasticsearch::Model
    include Elasticsearch::Model::Callbacks

    # mapping do
    #   raise 'Not implemented'
    # end
    #
    # def self.search(query)
    #   raise 'Not implemented'
    # end
  end
end