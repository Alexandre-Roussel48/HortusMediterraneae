import datetime

from flask import (
        Blueprint,
        render_template,
        send_from_directory,
        redirect,
        request,
        g)

import json

from models.thesaurus import utils as thesaurus
from models.taxonomie import utils as taxonomie
from models.specimen import utils as specimen

from utils import json_encoder
#from utils import auth

views = Blueprint('especes',__name__)

#Cette fonction permet de récupérer tous les mots-clés du thesaurus pour la recherche de médias
@views.route('/get_tags_search', methods=['GET'])
#@auth.require_valid_user
def get_tags_search():
     thes = thesaurus.get_all_thes()
     codes = ['ref.rang', 'ref.conservation', 'ref.iucn_monde', 'ref.iucn_europe', 'ref.iucn_region', 
          'ref.floraison', 'ref.type_bio', 'ref.couleur_fleur', 'ref.parcelle', 'ref.indigenat']

     return json.dumps(
          {
               key.label:[tag.toDict() for tag in thes if tag.reference==key.code] for key in thes if key.code in codes
          }
     )

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


#Cette fonction permet de récupérer tous les parents d'un rang de taxonomie
@views.route('/get_parents', methods=['GET'])
#@auth.require_valid_user
def get_parents():
     return json.dumps(
          [{'nom': nomen.nom} for nomen in taxonomie.get_from_taxonomie(request.args['q'])]
     )


#Cette fonction permet la création ou la mise à jour d'une nomenclature
@views.route('/cr_or_up_nomenclature', methods=['POST'])
#@auth.require_valid_user
def create_or_update_taxonomie():
     taxon = request.json
     tags = taxon.pop('tags')
     synonymes = taxon.pop('synonymes')
     vernaculaires = taxon.pop('vernaculaires')
     taxon['date_modif'] = datetime.datetime.now()

     id_taxon = taxonomie.create_or_update_taxonomie(taxon, tags, synonymes, vernaculaires)

     return '/especes/'+id_taxon


#Cette fonction permet d'afficher les résultats de la recherche
@views.route('/results', methods=['GET'])
#@auth.require_valid_user
def especes_search_results():

     tags = request.args.getlist('tag')
     rangs = request.args.getlist('rang')
    
     match = taxonomie.match_taxonomie_tags(tags, rangs)

     taxons = [(item[0].toDict(), item[1]) for item in match]

     return json.dumps(taxons, cls=json_encoder.DateTimeEncoder)


#Cette fonction permet d'afficher les résultats de la recherche
@views.route('/specimen/results', methods=['GET'])
#@auth.require_valid_user
def specimens_search_results():

     tags = request.args.getlist('tag')
    
     match = specimen.match_specimen_tags(tags)

     specimens = [(item[0].toDict(), item[1]) for item in match]

     return json.dumps(specimens)