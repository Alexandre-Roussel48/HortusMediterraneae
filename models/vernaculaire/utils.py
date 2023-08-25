from models.vernaculaire.vernaculaire import Vernaculaire

#====================Vernaculaire====================#

def get_stats():
	'''
	Renvoie le nombre d'objets Vernaculaire dans la base de donnees

		Return(s):
				| count (int): Compte du nombre de Vernaculaire
	'''
	return len(Vernaculaire.select()[:])