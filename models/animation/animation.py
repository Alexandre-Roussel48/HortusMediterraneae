from peewee import *

from server import BaseModel
from datetime import date
from models.sequence.sequence import Sequence
from models.thesaurus.thesaurus import Thesaurus

class Animation(BaseModel):
    '''
    La classe Animation permet de contenir toutes les données
    d'une animation et est le composant central de l'application.

        Attributs:
                | id (str): id de l'animation
                | titre (str): titre de l'animation
                | statut (int): statut de l'animation (3=En cours, 2=Terminée, 1=Validée)
                | min_max (str): nombre de personnes min/max
                | preconisations (str): preconisations de l'animation
                | annulation (str): conditions d'annulation de l'animation
                | pre_anim (str): avant l'animation
                | post_anim (str): après l'animation
                | objectifs (str): objectifs de l'animation
                | lieu (str): lieu de l'animation
                | public_specifique (str): public specifique de l'animation
                | date_modif (date): dernière date de modification de l'animation
                | sequences (Sequence[]): sequences de l'animation
                | tags (Thesaurus[]): mots-clés de l'animation
    '''
    id = CharField(max_length=40, primary_key=True)
    titre = CharField(max_length=100)
    statut = IntegerField()
    _min = CharField(max_length=3)
    _max = CharField(max_length=3)
    preconisations = TextField()
    annulation = TextField()
    pre_anim = TextField()
    post_anim = TextField()
    objectifs = TextField()
    lieu = TextField()
    public_specifique = TextField()
    sequences = ManyToManyField(Sequence, backref='animation')
    tags = ManyToManyField(Thesaurus, backref='animations')
    date_modif = DateField(default=date.today())

    def toDict(self):
        '''
        Retourne un dictionnaire contenant les données d'un objet Animation.

            Return(s):
                    | data ({}): Dictionnaire contenant tous les attributs de l'objet Animation

        '''
        data = {
            'id':self.id,
            'titre':self.titre,
            'statut':self.statut,
            '_min':self._min,
            '_max':self._max,
            'preconisations':self.preconisations,
            'annulation':self.annulation,
            'pre_anim':self.pre_anim,
            'post_anim':self.post_anim,
            'objectifs':self.objectifs,
            'lieu':self.lieu,
            'public_specifique':self.public_specifique,
            'sequences':[sequence.toDict() for sequence in self.sequences],
            'tags':[tag.toDict() for tag in self.tags],
            'date_modif':self.date_modif
        }

        return data