from peewee import *

from server import BaseModel
from datetime import date
from models.thesaurus.thesaurus import Thesaurus

class Outil(BaseModel):
    '''
    La classe Outil est la classe contenant les données pour les
    outils facilitateurs.

        Attributs:
                | id (int): id de l'outil
                | type_outil (Thesaurus): type de l'outil
                | nom (str): nom de l'outil
                | description (str): description de l'outil
                | url (str): url de la ressource de l'outil
                | variante (str): variante de l'outil
                | difficulte (str): difficulté de l'outil
                | materiel (str): materiel de l'outil
                | date_modif (date): date de création de l'outil
                | type_media_outil (Thesaurus): Type du média associé à l'outil
    '''
    id = AutoField(primary_key=True)
    type_outil = ForeignKeyField(Thesaurus)
    nom = CharField(max_length=100)
    description = TextField()
    url = CharField(max_length=250)
    variante = TextField()
    difficulte = ForeignKeyField(Thesaurus)
    materiel = TextField()
    type_media_outil = ForeignKeyField(Thesaurus, null=True)
    date_modif = DateField(default=date.today())

    def toDict(self):
        '''
        Retourne un dictionnaire contenant les données d'un objet Outil.

            Return(s):
                    | data ({}): Dictionnaire contenant tous les attributs de l'objet Outil
        '''
        data = {
            'id':self.id,
            'type_outil':self.type_outil.toDict(),
            'nom':self.nom,
            'description':self.description,
            'url':self.url,
            'variante':self.variante,
            'difficulte':self.difficulte.toDict(),
            'materiel':self.materiel,
            'type_media_outil':self.type_media_outil.toDict(),
            'date_modif':self.date_modif
        }

        return data