#!/bin/sh

# Choice list example:
# https://askubuntu.com/questions/627532/shell-script-with-select-command-to-show-a-list-of-files
PS3='Select you dump to start import:'$'\n'

list="Cancel $(ls "../../_db" | sed 's/ /£/')"
select option in $list
do
    if [ "$option" = "Cancel" ] #if user selects Exit, then exit the program
    then
        exit 0
    elif [ -n "$option" ] #if name is valid, shows the files inside
    then
        #set filename from choice
        filename=$(echo "$option")

        cd ..
        # Copy dump to wp
        docker cp ../_db/"$filename" wp:/tmp/dump.sql.gz
        # Unzip dump
        docker exec wp bash -c 'gunzip -c /tmp/dump.sql.gz > /var/www/html/dump.sql'
        # Run import
        docker compose --env-file .env -f conf/docker-compose.yml run --rm wpcli wp db import dump.sql
        # Remove file
        docker exec wp rm -rf /var/www/html/dump.sql

        exit 0
    else #if the number of the choice given by user is wrong, exit
        echo "Invalid choice ($REPLY)! Press 1 to cancel"
    fi
done