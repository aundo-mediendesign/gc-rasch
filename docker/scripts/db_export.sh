#!/bin/sh

backupName=db_backup-$(date +%Y-%m-%d-%H%M%S)
cd ..
#docker compose run --rm wpcli wp db export - | tee > ../../_db/$backupName.sql
docker compose --env-file .env -f conf/docker-compose.yml run --rm wpcli wp db export - | gzip > ../_db/$backupName.sql.gz
echo "Dump $backupName.sql.gz created"