source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

gem 'rails', '~> 5.1.4'
gem 'mongoid'
gem 'mongoid-slug'
gem 'mongoid_paranoia'
gem 'kaminari-mongoid'

gem 'dotenv-rails'

gem 'elasticsearch-model'
gem 'elasticsearch-rails'

gem 'activeadmin-mongoid'#, '0.8.0'
gem 'ransack-mongoid', github: 'activerecord-hackery/ransack-mongoid'

gem 'puma', '~> 3.7'
gem 'sass-rails', '~> 5.0'
gem 'devise'
gem 'haml-rails'
gem 'foreman'
gem 'wicked'
gem 'auto_ria_api', '0.1.4'

gem 'carrierwave-mongoid', :require => 'carrierwave/mongoid'
gem 'rmagick'

gem 'react-rails'
gem 'webpacker'
# gem 'font-awesome-sass', '~> 5.0.6'
# gem 'bootstrap', '~> 4.0.0'
# gem 'jquery-rails' # need for bootstrap
# gem 'turbolinks'

# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'

# Use CoffeeScript for .coffee assets and views
# gem 'coffee-rails', '~> 4.2'
gem 'jbuilder', '~> 2.5'
gem 'redis', '~> 3.0'
# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

gem 'capistrano-rails', group: :development

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  gem 'capybara', '~> 2.13'
  gem 'selenium-webdriver'
  gem 'rspec-rails'
  gem 'faker'
  gem 'factory_bot_rails'
  # gem 'jazz_hands'
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '>= 3.0.5', '< 3.2'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'better_errors'
  gem 'letter_opener'
  gem 'pry-rails'
  gem 'awesome_print'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
