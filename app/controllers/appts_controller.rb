class ApptsController < ApplicationController
	before_filter :authenticate_user!

	def create
		day = Day.find(params[:day_id])
		appt =  day.appts.create(appt_params.merge(user_id: current_user.id))
		# puts appt
		respond_with do |format|
			format.json do
				render json: {
					appt: appt
				}.to_json
			end
		end
		# appts = day.appts.where(:day_id => params[:day_id])

		# respond_to do |format|
		# 	format.json do 
		# 		render json: {
		# 			day: day,
		# 			appt: appt,
		# 			appts: appts
		# 		}.to_json
		# 	end
		# end

	end

	def destroy
		day = Day.find(params[:day_id])
		respond_with day.appts.destroy(params[:id])


	end



	private
	def appt_params
		params.require(:appt).permit(:body)
	end
end
