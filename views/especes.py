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

     try:
          id_taxon = taxonomie.create_or_update_taxonomie(taxon, tags, synonymes, vernaculaires)
          return '/especes/'+id_taxon
     except Exception:
          return 'duplicate'


#Cette fonction permet la création ou la mise à jour d'une nomenclature
@views.route('/cr_or_up_specimen', methods=['POST'])
#@auth.require_valid_user
def create_or_update_specimen():
     _specimen = request.json

     id_taxon = specimen.create_or_update_specimen(_specimen)
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

     parcelles = request.args.getlist('parcelle')
     tags = request.args.getlist('tag')
     rangs = request.args.getlist('rang')
    
     match = specimen.match_specimen_tags(parcelles, tags, rangs)

     specimens = [(item[0].toDict(), item[1]) for item in match]

     return json.dumps(specimens, cls=json_encoder.DateTimeEncoder)


#Cette fonction permet de récupérer les données d'un taxon.
@views.route('/get_taxon', methods=['GET'])
#@auth.require_valid_user
def get_taxonomie():
     id_taxon = request.args['q']
     taxon = taxonomie.get_taxonomie(id_taxon)

     return json.dumps(taxon.toDict(), cls=json_encoder.DateTimeEncoder)


#Cette fonction permet de récupérer les données d'un specimen.
@views.route('/get_specimen', methods=['GET'])
#@auth.require_valid_user
def get_specimen():
     id_specimen = request.args['q']
     _specimen = specimen.get_specimen(id_specimen)

     return json.dumps(_specimen.toDict(), cls=json_encoder.DateTimeEncoder)


#Cette fonction permet de récupérer les specimens d'un taxon.
@views.route('/get_specimens', methods=['GET'])
#@auth.require_valid_user
def get_specimens():
     id_taxon = request.args['q']
     specimens = taxonomie.get_specimens(id_taxon)

     return json.dumps([specimen.toDict() for specimen in specimens], cls=json_encoder.DateTimeEncoder)


#Cette fonction permet de chercher les taxons par nom.
@views.route('/search', methods=['GET'])
#@auth.require_valid_user
def search_taxonomie():
     query = request.args['q']
     taxons = taxonomie.search_taxonomie(query)
     return json.dumps([taxon.toDict() for taxon in taxons], cls=json_encoder.DateTimeEncoder)


#Cette fonction permet de chercher les specimens par parcelles.
@views.route('/specimen/search', methods=['GET'])
#@auth.require_valid_user
def search_specimen():
     query = request.args['q']
     specimens = specimen.search_specimen(query)
     return json.dumps([specimen.toDict() for specimen in specimens], cls=json_encoder.DateTimeEncoder)


#Cette fonction permet de supprimer le taxon passé en parametre.
@views.route('/delete', methods=['GET'])
#@auth.require_valid_user
def delete_taxon():
     id_taxon = request.args['q']
     taxonomie.delete_taxonomie(id_taxon)
     return 'deleted'


#Cette fonction permet de supprimer le specimen passé en parametre.
@views.route('/specimen/delete', methods=['GET'])
#@auth.require_valid_user
def delete_specimen():
     id_specimen = request.args['q']
     specimen.delete_specimen(id_specimen)
     return 'deleted'