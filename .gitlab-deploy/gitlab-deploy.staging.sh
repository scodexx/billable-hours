# !/bin/bash

# Get servers list:
set - f
# Variables from GitLab server:
# Note: They can't have spaces!!
string=$DEPLOY_SERVERS
array=(${string//,/ })

# Iterate servers for deploy and pull last commit
# Careful with the ; https://stackoverflow.com/a/20666248/1057052
for i in "${!array[@]}"; do
  echo "Deploy project on server ${array[i]}"
  ssh root@${array[i]} 'bash -s' < ./.deploy/deploy-update.staging.sh
done