from models.thesaurus.thesaurus import Thesaurus

#====================Thesaurus====================#

def get_all_thes():
    '''
    Retourne tous les objets Thesaurus.

        Return(s):
                | anims (Thesaurus[]): Liste de tous les objets Thesaurus

    '''
    return Thesaurus.select()[:]


def get_stats():
    '''
    Renvoie le nombre d'objets Thesaurus dans la base de donnees

        Return(s):
                | count (int): Compte du nombre de Thesaurus
    '''
    return len(Thesaurus.select()[:])


def get_description():
    '''
    Renvoie le texte de l'objet Thesaurus avec la ref accueil

        Return(s):
                | description (str) : description du background de l'accueil
    '''
    return Thesaurus.select().where(Thesaurus.code=='ref.accueil')[:][0].label


def update_description(data):
    '''
    Met a jour le texte de l'objet Thesaurus avec la ref accueil
    '''
    thes = Thesaurus.select().where(Thesaurus.code=='ref.accueil')[:][0]
    thes.label = data
    thes.save()