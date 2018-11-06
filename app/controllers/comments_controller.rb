class CommentsController < ApplicationController

  before_action :find_comment, only: %i[destroy update]

  def create
    @comment = parent.comments.new(comment_params)
    if @comment.save!
      # render json: @comment
      redirect_to @comment.commentable
    end
  end

  def destroy
    @comment.destroy
  end

  def update

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