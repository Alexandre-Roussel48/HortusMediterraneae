from peewee import *

from server import BaseModel

class Vernaculaire(BaseModel):
    '''
    La classe Vernaculaire permet de définir la liaison entre une nomenclature
    et ses vernaculaires/noms courants.

        Attributs:
                | id (int): id de l'objet Vernaculaire
                | vernaculaire (str): vernaculaire de l'objet Vernaculaire
    '''
    id = AutoField(primary_key=True)
    vernaculaire = CharField(max_length=100)

    def toDict(self):
        '''
        Retourne un dictionnaire contenant les données d'un objet Taxonomie.

            Return(s):
                    | data ({}): Dictionnaire contenant tous les attributs de l'objet Taxonomie
        '''
        data = {
            'id':self.id,
            'vernaculaire':self.vernaculaire
        }

        return data