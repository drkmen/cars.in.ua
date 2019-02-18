class UsersController < ApplicationController

  before_action :get_user

  def show
  end

  def edit
  end

  def update
    if @user.update user_params
      flash[:success] = 'Update!'
    else
      flash[:error] = @user.errors
    end
  # rescue => e
  #   p '.'*100
  #   pp e.backtrace
  #   p '.'*100
  end

  def delete
  end

  private

  def get_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :age, :phone, :avatar)
  end
end