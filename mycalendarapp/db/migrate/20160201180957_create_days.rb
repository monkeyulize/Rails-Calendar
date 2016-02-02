class CreateDays < ActiveRecord::Migration
  def change
    create_table :days do |t|
      t.date :date
      t.text :dayObj

      t.timestamps
    end
  end
end
