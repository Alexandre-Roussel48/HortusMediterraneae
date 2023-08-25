from models.codex.codex import Codex

#====================Codex====================#

def get_stats():
	'''
	Renvoie le nombre d'objets Codex dans la base de donnees

		Return(s):
				| count (int): Compte du nombre de Codex
	'''
	return len(Codex.select()[:])