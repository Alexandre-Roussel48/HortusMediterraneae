from peewee import *

from server import BaseModel

class Synonyme(BaseModel):
    '''
    La classe Synonyme permet de définir la liaison entre une nomenclature
    et ses synonymes/noms courants.

        Attributs:
                | id (int): id de l'objet Synonyme
                | synonyme (str): synonyme de l'objet Synonyme
    '''
    id = AutoField(primary_key=True)
    synonyme = CharField(max_length=100)

    def toDict(self):
        '''
        Retourne un dictionnaire contenant les données d'un objet Synonyme.

            Return(s):
                    | data ({}): Dictionnaire contenant tous les attributs de l'objet Synonyme
        '''
        data = {
            'id':self.id,
            'synonyme':self.synonyme
        }

        return data