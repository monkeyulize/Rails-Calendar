class DaysController < ApplicationController

	def index
		respond_with Day.all
	end

	def create
		day = Day.where(date: Date.parse(params[:date])).first
		if !day



			respond_with Day.create(day_params)
		else
			appts = day.appts.where(:day_id => day[:id])

			respond_to do |format|
				format.json do 
					render json: {
						day: day,
						appts: appts
					}.to_json
				end
			end

		end


		# day = Day.where(date: Date.parse(params[:date])).first
		# puts day

		# if day 
		# 	addevent
		# else 
		# 	dp = day_params
		# 	dp[:dayObj] = "{\"appt\": [" + dp[:dayObj] + "]}"
		# 	puts dp
		# 	respond_with Day.create(dp)
		# end
	end


	def 

	def show
		respond_with Day.find(params[:id])
	end


	private
	def day_params
		params.require(:day).permit(:date)
	end

end
