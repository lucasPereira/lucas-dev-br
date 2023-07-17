#!/bin/bash

git pull origin main
sudo cp * /var/www/lucas.dev.br
sudo chown www-data:www-data /var/www/lucas.dev.br
