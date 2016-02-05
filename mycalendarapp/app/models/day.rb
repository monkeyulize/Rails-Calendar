class Day < ActiveRecord::Base
	belongs_to :user
	has_many :appts

	def as_json(options = {})
		super(options.merge(include: [:appts, :user]))
	end
end
