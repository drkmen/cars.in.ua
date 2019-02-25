Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'home#index'
  devise_for :users

  get 'search', to: 'search#search', as: :search

  resources :users, except: :index
  resources :cars do
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

  # you don't need all CRUD routes
  resources :car_marks do
    get 'mark_models'
  end
end
