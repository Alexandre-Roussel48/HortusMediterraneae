cd database
docker-compose up --build &
cd ..

. venv/bin/activate

export FLASK_ENV=development
export FLASK_APP=server.py

flask run
