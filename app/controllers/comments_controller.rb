class CommentsController < ApplicationController

  before_action :find_comment, only: %i[destroy update]

  def create
    @comment = parent.comments.new(comment_params)
    if @comment.save!
      # TODO: rethink notification creation
      unless @comment.commentable.user == current_user
        @comment.commentable.user.notifications.create! message: "<b>#{current_user.name}</b> has left a comment on <b><a href='#{category_car_path(id: @comment.commentable)}'>#{@comment.commentable.title}</a>:</b><br><i>#{@comment.body}</i>",
                                                        car: @comment.commentable
      end
      redirect_to category_car_path(id: @comment.commentable)
    end
  end

  def update

  end

  def destroy
    @comment.destroy
  end

  private

  def comment_params
    params.require(:comment).permit!.merge(user_id: current_user&.id)
  end

  def find_comment
    @comment = Comment.find(params[:id])
  end

  def parent
    Car.find(params[:car_id])
  end
end