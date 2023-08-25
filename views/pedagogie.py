import datetime

from flask import (
        Blueprint,
        render_template,
        redirect,
        request,
        g)

import json

from models.thesaurus import utils as thesaurus
from models.media import utils as media
from models.animation import utils as animation
from models.sequence import utils as sequence

from utils import json_encoder
#from utils import auth

views = Blueprint('pedagogie',__name__)

#Cette fonction permet de récupérer tous les mots-clés du thesaurus
@views.route('/get_thes', methods=['GET'])
#@auth.require_valid_user
def get_thes():
     thes = thesaurus.get_all_thes()
     return json.dumps(
          {
               ref.code:[
                    tag.toDict() for tag in thes if tag.reference==ref.code
               ] for ref in thes if ref.reference==''
          }
     )


#Cette fonctions permet de récupérer tous les médias.
@views.route('/get_medias', methods=['GET'])
#@auth.require_valid_user
def get_medias():
     return json.dumps(
          [media.toDict() for media in media.get_all_medias()],
          cls=json_encoder.DateTimeEncoder)


#Cette fonction permet la création ou la mise à jour d'une animation
@views.route('/cr_or_up_anim', methods=['POST'])
#@auth.require_valid_user
def create_or_update_animation():
     data = request.json
     sequences = data.pop('sequences')
     tags = data.pop('tags')
     anim = data
     anim['date_modif'] = datetime.datetime.now()

     id_anim = animation.create_or_update_animation(anim, tags)
     sequence.create_or_update_all_sequences(id_anim, sequences)

     return '/pedagogie/'+id_anim


#Cette fonction permet de récupérer les données d'une animation.
@views.route('/get_anim', methods=['GET'])
#@auth.require_valid_user
def get_animation():
     id_anim = request.args['q']
     anim = animation.get_animation(id_anim)

     return json.dumps(anim.toDict(),cls=json_encoder.DateTimeEncoder)


#Cette fonction permet de valider une animation.
@views.route('/<id_anim>/validate', methods=['GET'])
#@auth.require_valid_user
def validate(id_anim):
     return animation.validate(id_anim)


#Cette fonction permet de récupérer tous les mots-clés du thesaurus pour la recherche d'animations
@views.route('/get_tags_search', methods=['GET'])
#@auth.require_valid_user
def get_tags_search():
     thes = thesaurus.get_all_thes()
     codes = ['ref.theme','ref.saison','ref.public','ref.lieu']

     return json.dumps(
          {
               key.label:[tag.toDict() for tag in thes if tag.reference==key.code] for key in thes if key.code in codes
          }
     )


#Cette fonction permet d'afficher les résultats de la recherche
@views.route('/results', methods=['GET'])
#@auth.require_valid_user
def pedatheque_search_search_results():

     tags = request.args.getlist('tag')
    
     match = animation.match_anim_tags(tags)

     anims = [(item[0].toDict(), item[1]) for item in match]

     return json.dumps(anims, cls=json_encoder.DateTimeEncoder)


#Cette fonction permet de supprimer le média concerné
@views.route('/delete', methods=['GET'])
#@auth.require_valid_user
def anim_delete():
     id_anim = request.args['q']
     animation.delete_animation(id_anim)
     return 'deleted'


#Cette fonction permet de chercher les specimens par parcelles.
@views.route('/search', methods=['GET'])
#@auth.require_valid_user
def search_animation():
     query = request.args['q']
     anims = animation.search_animation(query)
     return json.dumps([anim.toDict() for anim in anims], cls=json_encoder.DateTimeEncoder)