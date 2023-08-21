from peewee import *

from server import BaseModel
from models.taxonomie.taxonomie import Taxonomie
from models.thesaurus.thesaurus import Thesaurus
from models.media.media import Media

class Specimen(BaseModel):
    '''
    La classe Specimen permet de définir la liaison avec une nomenclature et une parcelle.

        Attributs:
                | id (int): id de l'objet Specimen
                | parcelle (Parcelle): parcelle de l'objet Specimen
                | taxonomie (Taxonomie): taxonomie de l'objet Specimen
                | historique (str): historique de l'objet Specimen
                | medias (Media[]): medias de l'objet Specimen
    '''
    id = AutoField(primary_key=True)
    parcelle = ForeignKeyField(Thesaurus)
    taxonomie = ForeignKeyField(Taxonomie)
    historique = TextField()
    medias = ManyToManyField(Media, backref='specimens')

    def toDict(self):
        '''
        Retourne un dictionnaire contenant les données d'un objet Specimen.

            Return(s):
                    | data ({}): Dictionnaire contenant tous les attributs de l'objet Specimen
        '''
        data = {
            'id':self.id,
            'parcelle':self.parcelle.toDict(),
            'taxonomie':self.taxonomie.toDict(),
            'historique':self.historique,
            'medias':[media.toDict() for media in self.medias]
        }

        return data