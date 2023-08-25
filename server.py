from flask import Flask, request, redirect, url_for, g, render_template
from flask_cors import CORS
from peewee import MySQLDatabase, Model
from itsdangerous import (
        TimedSerializer,
        SignatureExpired,
        BadSignature)

import config

app = Flask('__name__')
#CORS(app)

app.config.from_pyfile('config.py')

db = MySQLDatabase(
        config.db_name, 
        user=config.db_username,
        password=config.db_password, 
        host=config.db_host,
        port=config.db_port
        )

class BaseModel(Model):
    class Meta:
        database = db

from views import (
    pedagogie,
    medias,
    especes,
    base
)

app.register_blueprint(base.views)

app.register_blueprint(pedagogie.views, url_prefix='/pedagogie')
app.register_blueprint(medias.views, url_prefix='/medias')
app.register_blueprint(especes.views, url_prefix='/especes')


@app.before_request
def _check_user():
    serializer = TimedSerializer(config.SECRET_KEY)

    db.connect(reuse_if_open=True)


@app.teardown_request
def _db_close(exc):
    '''
    Ferme la connection à la base de données une fois que la
    requête a été traitée.
    '''
    if not db.is_closed():
        db.close()


if __name__ == '__main__':
    app.run('0.0.0.0')