Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'home#index'
  devise_for :users

  resources :users, except: :index
  resources :cars do
    resources :comments, only: %i[create destroy update]
  end

  # you don't need all CRUD routes
  resources :car_marks do
    get 'mark_models'
  end
end
