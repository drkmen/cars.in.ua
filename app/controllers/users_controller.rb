class UsersController < ApplicationController

  before_action :get_user

  def show

  end

  def edit

  end

  def update

  end

  def delete

  end

  private

  def get_user
    @user = User.find(params[:id])
  end
end