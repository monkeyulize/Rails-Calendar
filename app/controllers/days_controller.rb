class DaysController < ApplicationController
	before_filter :authenticate_user!, only: [:index, :create]


	def index
		
		respond_with Day.where(user_id: current_user.id);
	end

	def create
		day = Day.where(date: Date.parse(params[:date])).where(user_id: current_user.id).first
		if !day



			respond_with Day.create(day_params.merge(user_id: current_user.id))
		else
			# appts = day.appts.where(:day_id => day[:id])

			respond_with day
			

		end
	end




	def show
		respond_with Day.find(params[:id])
	end


	private
	def day_params
		params.require(:day).permit(:date)
	end

end
