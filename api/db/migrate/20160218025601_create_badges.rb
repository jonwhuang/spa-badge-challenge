class CreateBadges < ActiveRecord::Migration
  def change
    create_table :badges do |t|
      t.string :name
      t.integer :votes
      t.references :student, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
