# makler-schmidt
 
## Docker

Copy docker/env.example to  docker/.env for development variables.
Run `npm run docker-start-all` for the first time to create ssl certificates and use phpMyAdmin to create a database.
If folder public is empty, wp docker image will automatically download the latest wordpress version. This might take a while.
To stop all containers run `npm run docker-stop`. Later you can use `npm run docker-start` to only start the main containers for development.

## Database
Login into phpMyAdmin `http://localhost:8080` and create the database from docker/.env folder

## Install WordPress if no Dump in folder _db is available
Visit https://www.makler-schmidt.localhost/ and start the setup wizzard.

## Install Plugins
`npm run wp-download-plugins` installs all plugins listed in plugins.txt file.

## Backend login

To log into the backend visit https://www.makler-schmidt.localhost and use your login credentials.

## Google Fonts
Can be downloaded here: https://google-webfonts-helper.herokuapp.com/fonts

## Generate JS / CSS 

You can also run `npm run watch` to permanently watch for file changes in resources folder.
The file will be generated into the themes folder.

## WP CLI EXAMPLES
docker compose run --rm wpcli plugin list
docker compose run --rm wpcli wp db import ./XXX-dump.sql
docker compose run --rm wpcli search-replace 'makler-schmidt.de' 'makler-schmidt.localhost'  --all-tables-with-prefix

## Maybe usefull
define('WP_HOME',		'http://www.makler-schmidt.localhost');
define('WP_SITEURL',	'http://www.makler-schmidt.localhost');