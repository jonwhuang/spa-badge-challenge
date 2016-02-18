require 'faker'

students = ["Mike", "Jon", "Ovi", "Beni", "Fatma", "Karla", "Walter", "Ryan", "Hanah", "Michael", "Lu", "Bernice", "Shawn", "Coleby", "Josh", "Lindsey", "Sean"]
students.each do |student|
  Student.create(name: student)
end

80.times do
  Badge.create(name: Faker::Hacker.adjective, votes: rand(55), student_id: rand(17)+1)
end