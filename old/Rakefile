# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require 'graphql/rake_task'

require_relative 'config/application'

Rails.application.load_tasks

GraphQL::RakeTask.new(
  schema_name: 'TechnologyWatchSchema', # this needs to be your generated schema class name
)

#run on command rake graphql:schema:dump