from models.thesaurus.thesaurus import Thesaurus

#====================Thesaurus====================#

def get_all_thes():
    '''
    Retourne tous les objets Thesaurus.

        Return(s):
                | anims (Thesaurus[]): Liste de tous les objets Thesaurus

    '''
    return Thesaurus.select()[:]