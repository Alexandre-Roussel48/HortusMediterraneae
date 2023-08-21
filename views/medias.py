import os
import os.path
import datetime

from flask import (
        Blueprint,
        render_template,
        send_from_directory,
        redirect,
        request,
        g)

import json

from werkzeug.utils import secure_filename
import hashlib
import glob

import utils
import config
from utils import json_encoder
#from utils import auth

from models.thesaurus import utils as thesaurus
from models.media import utils as media

views = Blueprint('medias',__name__)

#Cette fonction permet de récupérer tous les mots-clés du thesaurus pour la recherche de médias
@views.route('/get_tags_search', methods=['GET'])
#@auth.require_valid_user
def get_tags_search():
     thes = thesaurus.get_all_thes()
     codes = ['ref.theme','ref.type_media']

     return json.dumps(
          {
               key.label:[tag.toDict() for tag in thes if tag.reference==key.code] for key in thes if key.code in codes
          }
     )


#Cette fonction permet d'afficher les résultats de la recherche
@views.route('/results', methods=['GET'])
#@auth.require_valid_user
def medias_search_search_results():

     tags = request.args.getlist('tag')
     types = request.args.getlist('type')
    
     match = media.match_media_tags(types=types, tags=tags)

     medias = [(item[0].toDict(), item[1]) for item in match]

     return json.dumps(medias, cls=json_encoder.DateTimeEncoder)


#Cette fonction permet de vérifier si 
#le fichier upload à une extension autorisée
def allowed_file(filename):
    return '.' in filename and \
            filename.rsplit('.', 1)[1].lower() in config.ALLOWED_EXTENSIONS


#Cette fonction permet de renvoyer la somme md5 du fichier upload
def hash_file(file):
    md5_hash = hashlib.md5(file.read()).hexdigest()
    file.stream.seek(0) 
    return md5_hash


#Cette fonction permet de render le form d'import de média et créer/importer le média
@views.route('/cr_or_up_media', methods=['POST'])
#@auth.require_valid_user
def medias_create_form():
     if request.files.get('file', False):
          file = request.files['file']
          if allowed_file(file.filename):

               md5_hash = hash_file(file)

               if glob.glob(os.path.join(config.UPLOAD_FOLDER, md5_hash)+'_*'):
                    return json.dumps({'alert':'duplicate'})

               filename = md5_hash + '_' + secure_filename(file.filename)
                 
               data = dict(request.form)
               data['url'] = os.path.join(config.UPLOAD_FOLDER, filename)
               id_media = media.create_or_update_media(data=data, tags=[])
               file.save(data['url'])
               return str(id_media)
          else:
               return json.dumps({'alert':config.ALLOWED_EXTENSIONS})
     else:
          data = request.json
          data['date_modif'] = datetime.datetime.now()
          tags = data.pop('tags')
          id_media = media.create_or_update_media(data=data, tags=tags)
          return '/medias/search'


#Cette fonction permet de récupérer les données d'une animation.
@views.route('/get_media', methods=['GET'])
#@auth.require_valid_user
def get_media():
     id_media = request.args['q']
     _media = media.get_media(id_media)

     return json.dumps(_media.toDict(),cls=json_encoder.DateTimeEncoder)


#Cette fonction permet de télécharger le média
@views.route('/download', methods=['GET'])
#@auth.require_valid_user
def medias_download():
     id_media = request.args['q']
     return send_from_directory(config.UPLOAD_FOLDER, 
          os.path.basename(media.get_media(id_media).url), as_attachment=True)


#Cette fonction permet de supprimer le média concerné
@views.route('/delete', methods=['GET'])
#@auth.require_valid_user
def medias_delete():
     id_media = request.args['q']
     _media = media.get_media(id_media)
     os.remove(_media.url)
     media.delete_media(id_media)
     return 'deleted'