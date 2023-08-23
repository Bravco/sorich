@echo off

call git add sorich-admin

call git commit -m "Deploy Medusa Backend on Heroku"

call git subtree push --prefix sorich-admin origin heroku

pause