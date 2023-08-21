from peewee import *

from server import BaseModel
from datetime import date
from models.thesaurus.thesaurus import Thesaurus
from models.taxonomie.taxonomie import Taxonomie

class Codex(BaseModel):
    '''
    La classe Codex est la classe contenant les données pour le codex.

        Attributs:
                | id (int): Id de la fiche
                | taxonomie (Taxonomie): taxonomie associée
                | nom (str): nom de la fiche
                | description (str): description de la fiche
                | date_modif (date): date de création de la fiche
                | tags (Thesaurus[]): tag(s) du média
    '''
    id = AutoField(primary_key=True)
    taxonomie = ForeignKeyField(Taxonomie)
    nom = CharField(max_length=100)
    description = TextField()
    tags = ManyToManyField(Thesaurus)
    date_modif = DateField(default=date.today())

    def toDict(self):
        '''
        Retourne un dictionnaire contenant les données d'un objet Codex.

            Return(s):
                    | data ({}): Dictionnaire contenant tous les attributs de l'objet Codex

        '''
        data = {
            'id':self.id,
            'taxonomie':self.taxonomie.toDict(),
            'nom':self.nom,
            'description':self.description,
            'tags':[tag.toDict() for tag in self.tags],
            'date_modif':self.date_modif
        }

        return data