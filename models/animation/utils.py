import uuid

from collections import Counter

from models.animation.animation import Animation
from models.sequence.sequence import Sequence
from models.thesaurus.thesaurus import Thesaurus

#====================Animation====================#

def create_or_update_animation(data, tags):
    '''
    Crée ou met à jour un objet animation à partir des données
    passées en paramètre.

        Param(s):
                | data ({}): Dictionnaire contenant les attributs de l'objet
                | tags ({}): Dictionnaire contenant les mots-clés à associer

        Return(s):
                | id_anim (str): Id de l'objet Animation créé ou mis à jour

    '''
    if not data.get('id', False):
        anim_uuid = uuid.uuid4().hex
        animation = Animation.create(
            id = anim_uuid,
            titre = data['titre'],
            statut = data['statut'],
            objectifs = data['objectifs'],
            pre_anim = data['pre_anim'],
            _min = data['_min'],
            _max = data['_max'],
            preconisations = data['preconisations'],
            annulation = data['annulation'],
            lieu = data['lieu'],
            public_specifique = data['public_specifique'],
            post_anim = data['post_anim'],
            date_modif = data['date_modif'])
    else:
        animation = Animation.get(id=data['id'])
        animation.titre = data['titre']
        animation.statut = data['statut']
        animation.objectifs = data['objectifs']
        animation.pre_anim = data['pre_anim']
        animation._min = data['_min']
        animation._max = data['_max']
        animation.preconisations = data['preconisations']
        animation.annulation = data['annulation']
        animation.lieu = data['lieu']
        animation.public_specifique = data['public_specifique']
        animation.post_anim = data['post_anim']
        animation.date_modif = data['date_modif']
        animation.save()

    animation.tags.clear()
    for tag in tags:
        try:
            animation.tags.add(Thesaurus.get(id=tag['id']))
        except Exception:
            pass

    return animation.id


def get_animation(id_anim):
    '''
    Renvoie l'objet Animation dont l'id a été passé en paramètre.

        Param(s):
                | id_anim (str): id de l'animation

        Return(s):
                | anim (Animation): objet Animation à partir de l'id
    '''
    return Animation.get(id=id_anim)


def validate(id_anim):
    '''
    Valide l'objet Animation dont l'id a été passé en paramètre.

        Param(s):
                | id_anim (str): id de l'animation

        Return(s):
                | anim (Animation): objet Animation à partir de l'id
    '''
    anim = Animation.get(id=id_anim)
    anim.statut = 1
    anim.save()
    return 'validated';


def anim_sort(tab):
    return tab[1]


def anim_sort_alpha(tab):
    return tab[0].titre


def match_anim_tags(tags):
    '''
    Retourne tous les objets Animation et leur pertinence correspondants 
    aux mots-clés.

        Param(s):
                | tags (Thesaurus[]): Liste d'objets Thesaurus à utiliser pour la recherche

        Return(s):
                | anims ([Animation, pertinence][]): Liste de tous les objets Animation correspondant aux mots-clés données

    '''
    if tags:
        anims = [anim for list in [Thesaurus.get(id=tag).animations[:] for tag in tags] for anim in list]
        query = [{'anim':item[0], 'count':item[1]} for item in Counter(anims).most_common()]
    else:
        query = [{'anim':item} for item in Animation.select()[:]]

    match = [[Animation.get(id=item['anim']), (str(item['count'])+'/'+str(len(tags)) if len(tags) else '')] 
    for item in query] 

    if not tags:
        return sorted(match, key=anim_sort_alpha, reverse=False)
    else:
        return sorted(match, key=anim_sort, reverse=True)


def delete_animation(id_anim):
    '''
    Supprime l'objet Animation dont l'id a été passé en paramètre
    et toutes ses relations.

        Param(s):
                | id_anim (str): Id de l'objet Animation à supprimer

    '''
    animation = Animation.get(id=id_anim)
    #Suppression des relations thesaurus "tag"
    animation.tags.clear()
    #Suppression des séquences
    for seq in animation.sequences:
        seq.medias.clear()
        animation.sequences.remove(seq)
        Sequence.delete().where(Sequence.id==seq.id).execute()
    #Suppression de l'animation
    Animation.delete().where(Animation.id==id_anim).execute()


def get_stats():
    '''
    Renvoie le nombre d'objets Animation dans la base de donnees

        Return(s):
                | count (int): Compte du nombre de Animation
    '''
    return len(Animation.select()[:])


def search_animation(query):
    '''
    Renvoie les objets Animation qui correspondent a query.

        Param(s):
                | query (str): Nom d'animation a rechercher

        Return(s):
                | anims (Animation[]): Liste d'Animations correspondant a query
    '''
    query_nom = Animation.select().where(Animation.titre.contains(query))
    query_lieu = Animation.select().where(Animation.lieu.contains(query))
    query_objectifs = Animation.select().where(Animation.objectifs.contains(query))
    final_query = list(dict.fromkeys(query_nom+query_lieu+query_objectifs))
    return final_query