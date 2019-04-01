Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'home#index'
  devise_for :users

  get 'search', to: 'search#search', as: :search

  resources :users, except: :index do
    member do
      get '/notifications/:notification_id/mark_as_readed', to: 'notifications#mark_as_readed', as: :mark_as_readed
    end
  end

  # resource :notifications do
  #   get 'mark_as_readed', on: :member
  # end

  resources :cars, only: :new

  resources :categories do
    resources :cars, except: :new do
      resources :comments, only: %i[create destroy update]
      resources :swaps, only: %i[create destroy update] do
        get :decline
      end
      resources :trades, only: %i[create destroy update] do
        get :decline
      end
      get 'add_to_favorite'
      delete 'remove_from_favorite'
    end
  end

  # you don't need all CRUD routes
  resources :car_marks do
    get 'mark_models'
  end
end
