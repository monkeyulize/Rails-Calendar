class CreateAppts < ActiveRecord::Migration
  def change
    create_table :appts do |t|
      t.string :body
      t.references :day, index: true

      t.timestamps
    end
  end
end
