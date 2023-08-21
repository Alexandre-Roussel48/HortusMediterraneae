from peewee import *

from server import BaseModel
from models.thesaurus.thesaurus import Thesaurus
from models.media.media import Media
from models.codex.codex import Codex

class Sequence(BaseModel):
    '''
    Cette classe permet de créer une séquence liée à un objet Animation.

        Attributs:
                | id (int): id de la séquence
                | titre (str): titre de la séquence
                | objectifs (str): objectifs de la séquence
                | modalite (Thesaurus): modalité de la séquence
                | approche (Thesaurus): approche de la séquence
                | description (str): description de la séquence
                | materiel_div (str): matériel de la séquence
                | duree (Thesaurus): durée de la séquence
                | type_seq (Thesaurus): type de la séquence
                | medias (Media[]): medias de la séquence
                | codex (Codex[]): codex de la séquence
    '''
    id = AutoField(primary_key=True)
    titre = CharField(max_length=100)
    objectifs = TextField()
    modalite = ForeignKeyField(Thesaurus)
    approche = ForeignKeyField(Thesaurus)
    description = TextField()
    materiel_div = TextField()
    duree = ForeignKeyField(Thesaurus)
    type_seq = ForeignKeyField(Thesaurus)
    medias = ManyToManyField(Media, backref='sequences')
    codex = ManyToManyField(Codex, backref='sequences')

    def toDict(self):
        '''
        Retourne un dictionnaire contenant les données d'un objet Sequence.

            Return(s):
                    | data ({}): Dictionnaire contenant tous les attributs de l'objet Sequence
        '''
        data = {
            'id':self.id,
            'titre':self.titre,
            'objectifs':self.objectifs,
            'modalite':self.modalite.toDict(),
            'approche':self.approche.toDict(),
            'description':self.description,
            'materiel_div':self.materiel_div,
            'duree':self.duree.toDict(),
            'type_seq':self.type_seq.toDict(),
            'materiel':[media.toDict() for media in self.medias],
            'codex':[cod.toDict() for cod in self.codex]
        }

        return data