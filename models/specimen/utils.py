from collections import Counter

from peewee import fn

from models.specimen.specimen import Specimen
from models.thesaurus.thesaurus import Thesaurus

#====================Specimen====================#


def specimen_sort(tab):
    return tab[1]


def specimen_sort_alpha(tab):
    return tab[0].taxonomie.nom


def match_specimen_tags(tags):
    '''
    Retourne tous les objets Specimen et leur pertinence correspondants 
    aux mots-clés.

        Param(s):
                | tags (Thesaurus[]): Liste d'objets Thesaurus à utiliser pour la recherche

        Return(s):
                | specimens ([Specimen, pertinence][]): Liste de tous les objets Specimen correspondant aux mots-clés données

    '''
    if tags:
        specimens = Specimen.select().where(Specimen.parcelle.in_([Thesaurus.get(id=item) for item in tags]))[:]
        query = [{'specimen':item[0], 'count':item[1]} for item in Counter(specimens).most_common()]
    else:
        query = [{'specimen':item} for item in Specimen.select()[:]]

    match = [[item['specimen'], (str(item['count'])+'/'+str(len(tags)) if len(tags) else '')] 
    for item in query] 

    if not tags:
        return sorted(match, key=specimen_sort_alpha, reverse=False)
    else:
        return sorted(match, key=specimen_sort, reverse=True)