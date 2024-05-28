#!/bin/sh

cd ..
docker compose --env-file .env -f conf/docker-compose.yml down