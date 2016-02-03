class ApptsController < ApplicationController
	def create
		day = Day.find(params[:day_id])
		appt = day.appts.create(appt_params)
		appts = day.appts.where(:day_id => params[:day_id])
		respond_to do |format|
			format.json do 
				render json: {
					day: day,
					appt: appt,
					appts: appts
				}.to_json
			end
		end

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
