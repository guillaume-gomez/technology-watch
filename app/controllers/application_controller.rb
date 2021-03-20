class ApplicationController < ActionController::Base
  include GraphqlDevise::Concerns::SetUserByToken
  protect_from_forgery with: :exception
end
