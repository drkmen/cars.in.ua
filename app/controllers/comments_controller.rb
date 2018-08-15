class CommentsController < ApplicationController

  before_action :find_comment, only: %i[destroy update]

  def create
    @comment = Comment.new(comment_params)
    if @comment.save!
      render json: @comment
    end
  end

  def destroy

  end

  def update

  end

  private

  def comment_params
    params.require(:comment).permit!
  end

  def find_comment
    @comment = Comment.find(params[:id])
  end

end