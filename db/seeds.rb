User.create!(email: 'john.doe@example.com', password: 'password12',
              password_confirmation: 'password12')

5_000.times do |i|
  Customer.create!(
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    username: "#{Faker::Internet.user_name}#{i}",
    email: "#{Faker::Internet.user_name}#{i.to_s}@#{Faker::Internet.domain_name}"
  )
end
