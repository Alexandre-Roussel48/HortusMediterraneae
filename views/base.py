from flask import (
        Blueprint,
        render_template,
        send_from_directory,
        redirect,
        request,
        g)

from models.animation import utils as animation
from models.codex import utils as codex
from models.media import utils as media
from models.outil import utils as outil
from models.sequence import utils as sequence
from models.specimen import utils as specimen
from models.synonyme import utils as synonyme
from models.taxonomie import utils as taxonomie
from models.thesaurus import utils as thesaurus
from models.vernaculaire import utils as vernaculaire

#from utils import auth
import json

views = Blueprint('main', __name__)

#Cette fonction est le point de depart de l'application.
@views.route('/')
def index():
	return render_template('index.html',path={'path':''})

#Cette fonction permet de récupérer toutes les statistiques.
@views.route('/get_stats')
#@auth.require_valid_user
def get_stats():
	total = animation.get_stats() + codex.get_stats() + media.get_stats() + outil.get_stats() + sequence.get_stats() + specimen.get_stats() + synonyme.get_stats() + taxonomie.get_stats() + thesaurus.get_stats() + vernaculaire.get_stats()
	especes = taxonomie.get_stats_especes()
	medias = media.get_stats()
	animations = animation.get_stats()

	return json.dumps(
		{
			'total':total, 'especes':especes, 'medias':medias, 'animations':animations
		}
	)


#Cette fonction permet de récupérer la description du background.
@views.route('/get_description')
#@auth.require_valid_user
def get_desc():
	return thesaurus.get_description()


#Cette fonction permet de mettre a jour la description du background.
@views.route('/update_description', methods=['POST'])
#@auth.require_valid_user
def update_desc():
	data = request.json
	thesaurus.update_description(data)
	return 'updated'