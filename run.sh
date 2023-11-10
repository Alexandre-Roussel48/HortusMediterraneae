#!/bin/bash

cd /home/ubuntu/HortusMediterraneae/database
docker-compose up --build &
cd ..

kill $(cat /home/ubuntu/HortusMediterraneae/HortusMediterraneae.pid)
source /home/ubuntu/HortusMediterraneae/venv/bin/activate
/home/ubuntu/HortusMediterraneae/venv/bin/gunicorn --daemon -b '0.0.0.0:80' --pid=/home/ubuntu/HortusMediterraneae/HortusMediterraneae.pid --error-log=/home/ubuntu/HortusMediterraneae/errors.log server:app
