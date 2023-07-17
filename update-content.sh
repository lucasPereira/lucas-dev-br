#!/bin/bash

git pull origin main
sudo cp -R * /var/www/lucas.dev.br
sudo chown -R www-data:www-data /var/www/lucas.dev.br
