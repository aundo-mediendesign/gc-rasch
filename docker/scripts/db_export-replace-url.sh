#!/bin/sh

backupName=db_replaced-url-backup-$(date +%Y-%m-%d-%H%M%S)
cd ..
# Load Environment Variables
export $(cat .env | grep -v '#' | awk '/=/ {print $1}')
# Start docker container
if [ "$1" ]
then
    docker compose --env-file .env -f conf/docker-compose.yml run --rm wpcli wp search-replace www.makler-schmidt.localhost $1 --export=$backupName.sql
    mv ../public/$backupName.sql ../_db/$backupName.sql
    echo "Dump $backupName.sql.gz created"
fi