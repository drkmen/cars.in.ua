class NotificationsController < ApplicationController
  before_action :find_notification, only: :mark_as_readed

  def mark_as_readed
    @notification.mark_as_readed!
    respond_to do |format|
      format.js { render 'users/notifications/mark_as_readed' }
    end
  end

  private

  def find_notification
    @notification = current_user.notifications.find(params[:notification_id])
  end
end