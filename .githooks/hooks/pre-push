#!/bin/sh
# This hook ensure code is clean before pushing to remote

if [ $1 != "origin" ]; then
  exit 0
fi

git add -N .; git diff --name-only --diff-filter=d origin/master... -- '*.rb' | xargs bundle exec rubocop

# $? stores exit value of the last command
if [ $? -ne 0 ]; then
  echo "😱😱😱😱 Rubocop is not happy, please make sure it's ok before pushing"
  exit 1
fi

# git add -N .; git diff --name-only --diff-filter=d origin/master... -- '*.js' '*.ts' '*.tsx' | xargs -r yarn run eslint --max-warnings=0

# if [ $? -ne 0 ]; then
#   echo "😱😱😱😱 ESLint is not happy, please make sure it's ok before pushing"
#   exit 1
# fi
