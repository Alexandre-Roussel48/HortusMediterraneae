from flask import Flask, request, redirect, url_for, g, render_template
from flask_cors import CORS
#from flask_mail import Mail
from peewee import MySQLDatabase, Model
from itsdangerous import (
        TimedSerializer,
        SignatureExpired,
        BadSignature)

import config
#from utils.auth import AuthUser

#import utils

#mail = Mail()
app = Flask('__name__')
CORS(app)

app.config.from_pyfile('config.py')
#mail.init_app(app)

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
    especes
#    base,    
#    outils,
#    thesaurus,
#    pedatheque,
#    pedatheque_edit,
#    botanique
)

#app.register_blueprint(base.views)

app.register_blueprint(pedagogie.views, url_prefix='/pedagogie')
app.register_blueprint(medias.views, url_prefix='/medias')
app.register_blueprint(especes.views, url_prefix='/especes')
#app.register_blueprint(outils.views, url_prefix='/outils')
#app.register_blueprint(thesaurus.views, url_prefix='/thesaurus')
#app.register_blueprint(pedatheque.views, url_prefix='/pedatheque')
#app.register_blueprint(pedatheque_edit.views, url_prefix='/pedatheque_edit')
#app.register_blueprint(botanique.views, url_prefix='/base_botanique')


@app.before_request
def _check_user():
    '''
    Vérifie que l'utilisateur soit bien authentifié et reconnecte
    la base de données.
    '''
    '''
    g.user = None
    serializer = TimedSerializer(config.SECRET_KEY)

    try:
        userdata = serializer.loads(request.cookies.get('user', None))
        g.user = AuthUser(userdata)
    except SignatureExpired:
        return redirect(url_for('main.login_view'))
    except BadSignature:
        g.user = AuthUser()
    except TypeError:
        g.user = AuthUser()
    '''
    serializer = TimedSerializer(config.SECRET_KEY)
    #g.user = AuthUser()

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
    #from flask_script import Manager
    app.run('0.0.0.0')
'''
@app.errorhandler(Exception)
def page_not_found(e):
    return render_template('error.htm')

@app.template_filter('md')
def affichage_md(s):
    return utils.render_page(s)

@app.template_filter('username_format')
def user_format(s):
    return utils.user_format(s)

@app.template_filter('date_format')
def date_format(s):
    return s.strftime('%d/%m/%Y')
'''