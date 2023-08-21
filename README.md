# HortusMediterraneae

Plateforme de sessions pédagogiques et outil botanique

## PASSER LE REPO EN PUBLIC

## install

precond :

```
apt-get install python3-venv
```

then :

```
git clone https://github.com/Alexandre-Roussel48/HortusMediterraneae.git
cd HortusMediterraneae
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

## configuration

Rename file **config.py.sample** -> **config.py and complete informations** 

You can add or remove tags **carefully** in **models/__init__.py** and add or remove the linked images in **static/ressources**
Replace the **static/ressources/favicon.png** for personalization.

First time :

```
cd HortusMediterraneae
source venv/bin/activate
python
>>> import models
>>> models.create_db()
```

Then :

```
cd HortusMediterraneae
source venv/bin/activate
python
>>> import models
>>> models.pop_refs_thes()
>>> models.pop_thes()
```

## run (development mode)

```
	rundev.sh
. venv/bin/activate
export FLASK_ENV=development
export FLASK_APP=server.py
flask run
```

## run (server mode)

```
	run.sh
kill $(cat HortusMediterraneae.pid)
source venv/bin/activate
gunicorn --daemon -b '0.0.0.0:4800' --pid=HortusMediterraneae.pid --error-log=./errors.log server:app
```