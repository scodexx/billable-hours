#!/bin/bash

# any future command that fails will exit the script
set -e

echo "Starting operations"

# starting pm2 daemon
#/root/.nvm/versions/node/v11.7.0/bin/pm2 status

# Delete the old repo
cd /var/www/billable-hours

#ls -a

# clone the repo again
git pull

#source the nvm file. In an non
#If you are not using nvm, add the actual path like
# PATH=/home/ubuntu/node/bin:$PATH
#source /home/ubuntu/.nvm/nvm.sh

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