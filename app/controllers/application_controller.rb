class ApplicationController < ActionController::API
  def auth_header
    request.headers['Authorization']&.split&.last
  end

  def current_user
    #Current.user = User.find_by_token_for(:auth_token, auth_header)
    user = User.first
    @current_user ||= user
  end
end