from peewee import *

from server import BaseModel
from datetime import date
from models.thesaurus.thesaurus import Thesaurus

class Media(BaseModel):
    '''
    La classe Media est la classe contenant les données pour les médias.

        Attributs:
                | id (int): id du media
                | type_media (Thesaurus): type du média
                | nom (str): nom du média
                | description (str): description du média
                | url (str): url de la ressource du média
                | date_modif (date): date de création du média
                | tags (Thesaurus[]): tag(s) du média
    '''
    id = AutoField(primary_key=True)
    type_media = ForeignKeyField(Thesaurus)
    nom = CharField(max_length=100)
    description = TextField()
    url = CharField(max_length=250)
    tags = ManyToManyField(Thesaurus, backref='medias')
    date_modif = DateField(default=date.today())

    def toDict(self):
        '''
        Retourne un dictionnaire contenant les données d'un objet Media.

            Return(s):
                    | data ({}): Dictionnaire contenant tous les attributs de l'objet Media
        '''
        data = {
            'id':self.id,
            'type_media':self.type_media.toDict(),
            'nom':self.nom,
            'description':self.description,
            'url':self.url,
            'tags':[tag.toDict() for tag in self.tags],
            'date_modif':self.date_modif,
            'open':''
        }

        return data