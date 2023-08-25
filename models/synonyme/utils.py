from models.synonyme.synonyme import Synonyme

#====================Synonyme====================#

def get_stats():
	'''
	Renvoie le nombre d'objets Synonyme dans la base de donnees

		Return(s):
				| count (int): Compte du nombre de Synonyme
	'''
	return len(Synonyme.select()[:])