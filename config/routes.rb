Rails.application.routes.draw do
  devise_for :users
  root "dashboard#index"

  resources :customers, only: [:index, :show]

  get "templates/*path", to: "templates#show"
  get "fake_billing", to: "fake_billing#show"
end
