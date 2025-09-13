class ApplicationController < ActionController::API
  include JsonWebToken

  def current_user
    decoded = auth_header
    return nil unless decoded
    user = User.find(decoded[:user_id])
    @current_user ||= user
  end

  private
    def auth_header
      authorization_header = request.headers['Authorization']&.split&.last
      return nil unless authorization_header
      
      jwt_decode(authorization_header)
    end


end