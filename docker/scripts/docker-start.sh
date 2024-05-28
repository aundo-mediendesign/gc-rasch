#!/bin/sh

cd ..
# Check .env file for project url
if [ -f .env ]; then
    # Load Environment Variables
    export $(cat .env | grep -v '#' | awk '/=/ {print $1}')
    # Start docker container
    if [ "$1" == "all" ]
    then
        docker compose --env-file .env -f conf/docker-compose.yml up -d
    else
        docker compose --env-file .env -f conf/docker-compose.yml up -d db wp wpcli nginx
    fi
    # Print URL
    echo 'Project URL: https://'$LOCAL_DOMAIN
fi