import uuid

from collections import Counter

from peewee import fn

from models.taxonomie.taxonomie import Taxonomie, Rel_Taxonomie_Taxonomie
from models.synonyme.synonyme import Synonyme
from models.vernaculaire.vernaculaire import Vernaculaire
from models.thesaurus.thesaurus import Thesaurus

#====================Taxonomie====================#


def get_from_taxonomie(rang=None):
	'''
	Retourne les objets Taxonomie dont le rang
	a été passé en paramètre.

			Param(s):
				| rang (int): Rang du type d'objets Taxonomie à renvoyer

			Return(s):
				| nomenclatures (Taxonomie[]): Liste de tous les objets Taxonomie correspondants au rang d'objets passé en paramètre
	'''
	if rang is None: 
		raise ValueError('get_from_thes: idref doit être fourni')
	current = Thesaurus.get(id=rang)
	rangs = []
	while current.code[:1] == '_':
		rangs.append(current)
		current = Thesaurus.get(id=current.id-1)
	rangs.append(current)
	return Taxonomie.select().where(Taxonomie.rang.in_(rangs))


def create_or_update_taxonomie(data, tags, synonymes, vernaculaires):
	'''
	Crée ou met à jour un objet taxonomie à partir des données
	passées en paramètre.

			Param(s):
				| data ({}): Dictionnaire contenant les attributs de l'objet
				| tags ({}): Dictionnaire contenant les mots-clés à associer
				| synonymes ({}): Dictionnaire contenant les synonymes à associer
				| vernaculaires ({}): Dictionnaire contenant les vernaculaires à associer

			Return(s):
				| id_taxon (str): Id de l'objet Taxonomie créé ou mis à jour

	'''
	if not data.get('id', False):
		nomen_uuid = uuid.uuid4().hex
		taxonomie = Taxonomie.create(
		id = nomen_uuid,
		nom = data['nom'],
		auteur = data['auteur'],
		annee = data['annee'],
		bibliographie = data['bibliographie'],
		publication = data['publication'],
		description = data['description'],
		rang = Thesaurus.get(id=data['rang']['id']),
		date_modif = data['date_modif'])
	else:
		taxonomie = Taxonomie.get(id=data['id'])
		taxonomie.nom = data['nom']
		taxonomie.auteur = data['auteur']
		taxonomie.annee = data['annee']
		taxonomie.bibliographie = data['bibliographie']
		taxonomie.publication = data['publication']
		taxonomie.description = data['description']
		taxonomie.rang = Thesaurus.get(id=data['rang']['id'])
		taxonomie.date_modif = data['date_modif']
		taxonomie.save()

	taxonomie.tags.clear()

	for synonyme in taxonomie.synonymes:
		taxonomie.synonymes.remove(synonyme)
		Synonyme.delete().where(Synonyme.id==synonyme.id).execute()

	for vernaculaire in taxonomie.vernaculaires:
		taxonomie.vernaculaires.remove(vernaculaire)
		Vernaculaire.delete().where(Vernaculaire.id==vernaculaire.id).execute()

	for tag in tags:
		taxonomie.tags.add(Thesaurus.get(id=tag['id']))

	for synonyme in synonymes:
		if not synonyme['synonyme'] == '':
			taxonomie.synonymes.add(Synonyme.create(synonyme=synonyme['synonyme']))

	for vernaculaire in vernaculaires:
		if not vernaculaire['vernaculaire'] == '':
			taxonomie.vernaculaires.add(Vernaculaire.create(vernaculaire=vernaculaire['vernaculaire']))

	if not data['parent']['parent']=='':
		parent = data['parent']['parent']
		try:
			Taxonomie.get(nom=parent)
			Rel_Taxonomie_Taxonomie.delete().where(Rel_Taxonomie_Taxonomie.fils==taxonomie.id).execute()
			Rel_Taxonomie_Taxonomie.create(
			parent = Taxonomie.get(nom=parent),
			fils = Taxonomie.get(id=taxonomie.id))
		except Exception as e:
			pass

	return taxonomie.id


def taxon_sort(tab):
    return tab[1]


def taxon_sort_alpha(tab):
    return tab[0].nom


def match_taxonomie_tags(tags, rangs):
    '''
    Retourne tous les objets Taxonomie et leur pertinence correspondants 
    aux mots-clés.

        Param(s):
                | tags (Thesaurus[]): Liste d'objets Thesaurus à utiliser pour la recherche

        Return(s):
                | taxons ([Taxonomie, pertinence][]): Liste de tous les objets Taxonomie correspondant aux mots-clés données

    '''
    if not rangs:
        rangs = [tag for tag in Thesaurus.select().where(Thesaurus.reference=='ref.rang')[:]]

    queryRangs = Taxonomie.select().where(Taxonomie.rang.in_(rangs))[:]

    if tags:
        taxons = [taxon for list in [Thesaurus.get(id=tag).taxonomies[:] for tag in tags] for taxon in list]
        queryTags = [taxon for taxon in taxons if taxon in set(queryRangs)]
        query = [{'taxon':item[0], 'count':item[1]} for item in Counter(queryTags).most_common()]
    else:
        query = [{'taxon': item} for item in queryRangs]

    match = [[item['taxon'], (str(item['count'])+'/'+str(len(tags)) if len(tags) else '')] 
    for item in query] 

    if not tags:
        return sorted(match, key=taxon_sort_alpha, reverse=False)
    else:
        return sorted(match, key=taxon_sort, reverse=True)


def get_stats():
	'''
	Renvoie le nombre d'objets Taxonomie dans la base de donnees

		Return(s):
				| count (int): Compte du nombre de Taxonomie
	'''
	return len(Taxonomie.select()[:])


def get_stats_especes():
	'''
	Renvoie le nombre d'objets Taxonomie de rang espece dans la base de donnees

		Return(s):
				| count (int): Compte du nombre de Taxonomie
	'''
	return len(Taxonomie.select().where(Taxonomie.rang==Thesaurus.select().where(Thesaurus.code=='espece'))[:])


def get_taxonomie(id_taxon):
	'''
    Renvoie l'objet Taxonomie dont l'id a été passé en paramètre.

        Param(s):
                | id_taxon (str): id de la taxonomie

        Return(s):
                | taxon (Taxonomie): objet Taxonomie à partir de l'id
    '''
	return Taxonomie.get(id=id_taxon)


def get_specimens(id_taxon):
	'''
    Renvoie les Specimens liés a l'objet Taxonomie dont l'id a été passé en paramètre.

        Param(s):
                | id_taxon (str): id de la taxonomie

        Return(s):
                | specimens (Specimen[]): objets Specimens à partir de l'id
    '''
	taxon = Taxonomie.get(id=id_taxon)
	return taxon.specimens[:]


def search_taxonomie(query):
    '''
    Renvoie les objets Taxonomie qui correspondent a query.

        Param(s):
                | query (str): Nom de taxon a rechercher

        Return(s):
                | taxons (Taxonomie[]): Liste de Taxonomies correspondant a query
    '''
    query_nom = Taxonomie.select().where(Taxonomie.nom.contains(query))
    query_auteur = Taxonomie.select().where(Taxonomie.auteur.contains(query))
    query_description = Taxonomie.select().where(Taxonomie.description.contains(query))
    query_publication = Taxonomie.select().where(Taxonomie.publication.contains(query))
    query_synonymes = Taxonomie.select().where(Taxonomie.id.in_([synonyme.taxonomie[:][0].id for synonyme in Synonyme.select().where(Synonyme.synonyme.contains(query))]))
    query_vernaculaires = Taxonomie.select().where(Taxonomie.id.in_([vernaculaire.taxonomie[:][0].id for vernaculaire in Vernaculaire.select().where(Vernaculaire.vernaculaire.contains(query))]))
    print(query_nom)
    print(query_auteur)
    print(query_description)
    print(query_publication)
    print(query_synonymes)
    print(query_vernaculaires)
    final_query = list(dict.fromkeys(query_nom+query_auteur+query_description+query_publication+query_synonymes+query_vernaculaires))
    return final_query


def delete_taxonomie(id_taxon):
	'''
	Supprime l'objet Taxonomie dont l'id a été passé en paramètre
    et toutes ses relations.
	'''
	taxon = Taxonomie.get(id=id_taxon)
	taxon.tags.clear()
	for synonyme in taxon.synonymes:
		taxon.synonymes.remove(synonyme)
		Synonyme.delete().where(Synonyme.id==synonyme.id).execute()
	for vernaculaire in taxon.vernaculaires:
		taxon.vernaculaires.remove(vernaculaire)
		Vernaculaire.delete().where(Vernaculaire.id==vernaculaire.id).execute()
	Rel_Taxonomie_Taxonomie.delete().where(Rel_Taxonomie_Taxonomie.parent==id_taxon).execute()
	Rel_Taxonomie_Taxonomie.delete().where(Rel_Taxonomie_Taxonomie.fils==id_taxon).execute()
	Taxonomie.delete().where(Taxonomie.id==id_taxon).execute()