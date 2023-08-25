from peewee import *

from server import BaseModel
from datetime import date
from models.synonyme.synonyme import Synonyme
from models.vernaculaire.vernaculaire import Vernaculaire
from models.thesaurus.thesaurus import Thesaurus

class Taxonomie(BaseModel):
    '''
    La classe Taxonomie est la classe contenant les données
    pour la taxonomie des plantes.

        Attributs:
                | id (str): id de la taxonomie
                | nom (str): nom de la taxonomie
                | auteur (str): auteur de la taxonomie
                | date_modif (date): date de publication de la taxonomie
                | description (str): description de la taxonomie
                | rang (Thesaurus): rang de la taxonomie
                | tags (Thesaurus[]): mots-clés de la taxonomie
                | synonymes (Synonyme[]): synonymes de la taxonomie
                | vernaculaires (Vernaculaire[]): noms vernaculaires de la taxonomie
    '''
    id = CharField(max_length=40, primary_key=True)
    nom = CharField(max_length=40)
    auteur = TextField()
    annee = TextField()
    description = TextField()
    publication = TextField()
    bibliographie = TextField()
    rang = ForeignKeyField(Thesaurus)
    tags = ManyToManyField(Thesaurus, backref='taxonomies')
    synonymes = ManyToManyField(Synonyme, backref='taxonomie')
    vernaculaires = ManyToManyField(Vernaculaire, backref='taxonomie')
    date_modif = DateField(default=date.today())

    class Meta:
        indexes = (
            (('nom',), True),
        )

    def toDict(self):
        '''
        Retourne un dictionnaire contenant les données d'un objet Taxonomie.

            Return(s):
                    | data ({}): Dictionnaire contenant tous les attributs de l'objet Taxonomie
        '''
        parent = ''
        try:
            parent = Rel_Taxonomie_Taxonomie.select().where(Rel_Taxonomie_Taxonomie.fils==self.id)[:][0].parent.toDict()
        except Exception as e:
            pass
        data = {
            'id':self.id,
            'nom':self.nom,
            'auteur':self.auteur,
            'annee':self.annee,
            'description':self.description,
            'publication':self.publication,
            'bibliographie':self.bibliographie,
            'rang':self.rang.toDict(),
            'tags':[tag.toDict() for tag in self.tags],
            'synonymes':[synonyme.toDict() for synonyme in self.synonymes],
            'vernaculaires':[vernaculaire.toDict() for vernaculaire in self.vernaculaires],
            'date_modif':self.date_modif,
            'parent':parent
        }

        return data

class Rel_Taxonomie_Taxonomie(BaseModel):
    '''
    La classe Rel_Taxonomie_Taxonomie permet de faire la liaison
    entre l'objet Taxonomie et l'objet Taxonomie.

        Attributs:
                | parent (Taxonomie): objet Taxonomie
                | fils (Taxonomie): objet Taxonomie
    '''
    parent = ForeignKeyField(Taxonomie, null=True, backref='fils')
    fils = ForeignKeyField(Taxonomie, null=True, backref='parent')

    class Meta:
        indexes = (
            (('parent', 'fils'), True),
        )