from peewee import *

from server import BaseModel

class Thesaurus(BaseModel):
    '''
    La classe Thesaurus permet d'accéder à toutes les données
    fixes de l'application.

        Attributs:
                | id (int): id de la donnée
                | reference (int): référence de la donnée
                | label (str): label de la donnée
                | code (str): code de la donnée
    '''
    id = AutoField(primary_key=True)
    reference = TextField()
    label = CharField(max_length=80)
    code = CharField(max_length=20, null=True)

    class Meta:
        indexes = (
            (('code',), True),
        )

    def toDict(self):
        '''
        Retourne un dictionnaire contenant les données d'un objet Taxonomie.

            Return(s):
                    | data ({}): Dictionnaire contenant tous les attributs de l'objet Taxonomie
        '''
        data = {
            'id':self.id,
            'reference':self.reference,
            'label':self.label,
            'code':self.code
        }

        return data