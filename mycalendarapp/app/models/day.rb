class Day < ActiveRecord::Base
	has_many :appts

	def as_json(options = {})
		super(options.merge(include: :appts))
	end
end
