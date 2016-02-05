class AddUserRefToAppts < ActiveRecord::Migration
  def change
    add_reference :appts, :user, index: true
  end
end
