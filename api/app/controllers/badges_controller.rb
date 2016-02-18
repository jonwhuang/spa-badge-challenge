class BadgesController < ApplicationController
  def update
    badge = Badge.find(params[:id])
    if params[:type] == "up"
      badge.votes += 1
    else
      badge.votes -= 1 unless badge.votes == 0
    end
    badge.save
    @student = Student.find(badge.student_id)
    render json: @student, include: :badges
  end

  def create
    badge = Badge.new(name: params[:content], votes: 0, student_id: params[:student_id])
    badge.save
    @student = Student.find(params[:student_id])
    render json: badge
  end
end

