class DaysController < ApplicationController

	def index
		respond_with Day.all
	end

	def create
		day = Day.where(date: Date.parse(params[:date])).first
		puts day

		if day 
			addevent
		else 
			dp = day_params
			dp[:dayObj] = "{\"appt\": [" + dp[:dayObj] + "]}"
			puts dp
			respond_with Day.create(dp)
		end
	end

	def show
		respond_with Day.find(params[:id])
	end

	def addevent
		day = Day.where(date: Date.parse(params[:date])).first
		# puts day.inspect
		# puts day["dayObj"].inspect
		
		hash = JSON.parse(day["dayObj"])
		newAppt = params[:dayObj];
		
		hash['appt'].push(newAppt)
		# day['dayObj'] = JSON.generate(hash).to_s
		day.update(dayObj: JSON.generate(hash).to_s);
		# day.save
		# puts json
		# if !defined? day.dayObj['appt'] 
		# 	day.dayObj['appt'] = []
		# else 
		# 	day.dayObj['appt'].push("new test")
		# end
		# @day.save
		respond_with day
	end

	private
	def create_appt

	end

	def day_params
		params.require(:day).permit(:date, :dayObj)
	end

end
