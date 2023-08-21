from peewee import *

from server import BaseModel

class Parcelle(BaseModel):
    '''
    La classe Parcelle permet de définir la liaison entre une nomenclature
    et ses parcelles/noms courants.

        Attributs:
                | id (int): id de l'objet Parcelle
                | nom (str): nom de l'objet Parcelle
                | lieu (str): lieu de l'objet Parcelle
    '''
    id = AutoField(primary_key=True)
    nom = CharField(max_length=80)
    lieu = CharField(max_length=100)

    def toDict(self):
        '''
        Retourne un dictionnaire contenant les données d'un objet Parcelle.

            Return(s):
                    | data ({}): Dictionnaire contenant tous les attributs de l'objet Parcelle
        '''
        data = {
            'id':self.id,
            'nom':self.nom,
            'lieu':self.lieu
        }

        return data