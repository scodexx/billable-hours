#!/bin/bash
# Although we can further add more deploy instructions here
#  I always assume we had to do the initial setup manually

# any future command that fails will exit the script
set -e

echo "Starting operations"

# cd into repo directory
cd /var/www/billable-hours

# pull from repo
git pull

#install npm packages
echo "Installing modules and dependencies"
rm -rf node_modules
npm install

# build app
echo "Rebuilding react application"
#rm -rf build
npm run build

#Restart the app
/root/.nvm/versions/node/v11.7.0/bin/pm2 restart billable-hours