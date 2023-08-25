from models.outil.outil import Outil

#====================Outil====================#

def get_stats():
	'''
	Renvoie le nombre d'objets Outil dans la base de donnees

		Return(s):
				| count (int): Compte du nombre de Outil
	'''
	return len(Outil.select()[:])