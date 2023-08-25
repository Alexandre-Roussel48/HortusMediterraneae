from collections import Counter

from peewee import fn

from models.specimen.specimen import Specimen
from models.thesaurus.thesaurus import Thesaurus
from models.taxonomie.taxonomie import Taxonomie
from models.taxonomie import utils as taxonomie
from models.media.media import Media

#====================Specimen====================#


def specimen_sort(tab):
    return tab[1]


def specimen_sort_alpha(tab):
    return tab[0].taxonomie.nom


def match_specimen_tags(parcelles, tags, rangs):
    '''
    Retourne tous les objets Specimen et leur pertinence correspondants 
    aux mots-clés.

        Param(s):
                | parcelles (Thesaurus[]): Liste d'objets Thesaurus à utiliser pour la recherche
                | tags (Thesaurus[]): Liste d'objets Thesaurus à utiliser pour la recherche
                | rangs (Thesaurus[]): Liste d'objets Thesaurus à utiliser pour la recherche

        Return(s):
                | specimens ([Specimen, pertinence][]): Liste de tous les objets Specimen correspondant aux mots-clés données

    '''
    queryTagsRangs = [item for list in 
        [[spec for spec in taxon[0].specimens] for taxon in taxonomie.match_taxonomie_tags(tags, rangs)] 
        for item in list]

    if parcelles:
        specimens = Specimen.select().where(Specimen.parcelle.in_([Thesaurus.get(id=item) for item in parcelles]))[:]
        queryParcelles = [specimen for specimen in specimens if specimen in set(queryTagsRangs)]
        print(queryParcelles)
        query = [{'specimen':item[0], 'count':item[1]} for item in Counter(queryParcelles).most_common()]
    else:
        query = [{'specimen':item} for item in queryTagsRangs]

    match = [[item['specimen'], (str(item['count'])+'/'+str(len(parcelles)) if len(parcelles) else '')] 
    for item in query] 

    if not parcelles:
        return sorted(match, key=specimen_sort_alpha, reverse=False)
    else:
        return sorted(match, key=specimen_sort, reverse=True)


def get_stats():
    '''
    Renvoie le nombre d'objets Specimen dans la base de donnees

        Return(s):
                | count (int): Compte du nombre de Specimen
    '''
    return len(Specimen.select()[:])


def get_specimen(id_specimen):
    '''
    Renvoie l'objet Specimen dont l'id a été passé en paramètre.

        Param(s):
                | id_specimen (int): id du specimen

        Return(s):
                | specimen (Specimen): objet Specimen à partir de l'id
    '''
    return Specimen.get(id=id_specimen)


def create_or_update_specimen(data):
    '''
    Crée ou met à jour un objet specimen à partir des données
    passées en paramètre.

            Param(s):
                | data ({}): Dictionnaire contenant les attributs de l'objet

            Return(s):
                | id_taxon (str): Id de l'objet Taxonomie associé

    '''
    if not data.get('id', False):
        specimen = Specimen.create(
            parcelle = Thesaurus.get(id=data['parcelle']['id']),
            indigenat = Thesaurus.get(id=data['indigenat']['id']),
            taxonomie = Taxonomie.get(id=data['taxonomie']['id']),
            historique = data['historique'],
            herbier = data['herbier']
        )
    else:
        specimen = Specimen.get(id=data['id'])
        specimen.parcelle = Thesaurus.get(id=data['parcelle']['id'])
        specimen.indigenat = Thesaurus.get(id=data['indigenat']['id'])
        specimen.historique = data['historique']
        specimen.herbier = data['herbier']
        specimen.save()

    specimen.medias.clear()

    for media in data['medias']:
        specimen.medias.add(Media.get(id=media))

    return specimen.taxonomie.id


def search_specimen(query):
    '''
    Renvoie les objets Specimen qui correspondent a query.

        Param(s):
                | query (str): Nom de specimen a rechercher

        Return(s):
                | specimens (Specimen[]): Liste de Specimens correspondant a query
    '''
    query_nom = Specimen.select().where(Specimen.taxonomie.in_(Taxonomie.select().where(Taxonomie.nom.contains(query))))
    query_parcelle = Specimen.select().where(Specimen.parcelle.in_(Thesaurus.select().where(Thesaurus.label.contains(query))))
    query_historique = Specimen.select().where(Specimen.historique.contains(query))
    query_herbier = Specimen.select().where(Specimen.herbier.contains(query))
    final_query = list(dict.fromkeys(query_nom+query_parcelle+query_historique+query_herbier))
    return final_query


def delete_specimen(id_specimen):
    '''
    Supprime l'objet Specimen dont l'id a été passé en paramètre
    et toutes ses relations.
    '''
    specimen = Specimen.get(id=id_specimen)
    specimen.medias.clear()
    Specimen.delete().where(Specimen.id==id_specimen).execute()