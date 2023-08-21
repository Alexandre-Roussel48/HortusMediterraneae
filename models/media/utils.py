from peewee import fn

from collections import Counter

from models.media.media import Media
from models.thesaurus.thesaurus import Thesaurus

#====================Media====================#

def get_all_medias():
    '''
    Retourne tous les objets Media.

        Return(s):
                | anims (Media[]): Liste de tous les objets Media

    '''
    return Media.select()[:]


def media_sort(tab):
   return tab[1]


def media_sort_alpha(tab):
    return tab[0].nom


def match_media_tags(types, tags):
    '''
    Retourne tous les objets Media correspondants aux mots-clés et
    types passés en paramètre.

        Param(s):
                | types (Thesaurus[]): Liste d'objets Thesaurus à utiliser pour la recherche
                | tags (Thesaurus[]): Liste d'objets Thesaurus à utiliser pour la recherche

        Return(s):
                | medias ([Media, pertinence][]): Liste de tous les objets Media correspondant aux mots-clés et types donnés.
    '''

    if not types:
        types = [tag.id for tag in Thesaurus.select().where(Thesaurus.reference=='ref.type_media')[:]]

    queryTypes = Media.select().where(Media.type_media.in_(types))[:]

    if tags:
        tags_medias = [media for list in [Thesaurus.get(id=tag).medias[:] for tag in tags] for media in list]
        queryTags = [media for media in tags_medias if value in set(queryTypes)]
        query = [{'media':item[0], 'count':item[1]} for item in Counter(queryTags).most_common()]
    else:
        query = [{'media': item.id} for item in queryTypes]

    match = [[Media.get(id=item['media']), (str(item['count'])+'/'+str(len(tags)) if len(tags) else '')] 
    for item in query]

    if not tags:
        return sorted(match, key=media_sort_alpha, reverse=False)
    else:
        return sorted(match, key=media_sort, reverse=True)


def create_or_update_media(data, tags):
    '''
    Crée ou met à jour un objet media à partir des données
    passées en paramètre.

        Param(s):
                | data ({}): Dictionnaire contenant les attributs de l'objet
                | tags ({}): Dictionnaire contenant les mots-clés à associer

        Return(s):
                | id_media (str): Id de l'objet media créé ou mis à jour

    '''
    if not data.get('id', False):
        media = Media.create(
            type_media = Thesaurus.get(id=data['type_media']),
            url = data['url'])
    else:
        media = Media.get(id=data['id'])
        media.type_media = Thesaurus.get(id=data['type_media']['id'])
        media.nom = data['nom']
        media.description = data['description']
        media.date_modif = data['date_modif']
        media.save()

        media.tags.clear()
        for tag in tags:
            media.tags.add(tag)

    return media.id


def get_media(id_media):
    '''
    Renvoie l'objet Media dont l'id a été passé en paramètre.

        Param(s):
                | id_media (str): id du media

        Return(s):
                | media (Media): objet Media à partir de l'id
    '''
    return Media.get(id=id_media)


def delete_media(id_media):
    '''
    Supprime l'objet Media dont l'Id a été passé en paramètre
    et toutes ses relations.

        Param(s):
                | id_media (int): Id de l'objet à supprimer
    '''
    media = Media.get(id=id_media)
    media.tags.clear()
    media.sequences.clear()
    Media.delete().where(Media.id==id_media).execute()