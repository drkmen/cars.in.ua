Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'home#index'
  devise_for :users

  resources :cars

  # you don't need all CRUD routes
  resources :car_mark_lists do
    get 'mark_models'
  end
end
