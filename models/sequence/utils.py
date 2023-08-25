from models.sequence.sequence import Sequence
from models.animation.animation import Animation
from models.thesaurus.thesaurus import Thesaurus
from models.media.media import Media

#====================Sequence====================#

def create_or_update_all_sequences(id_anim, sequences):
    '''
    Crée ou met à jour les séquences d'un objet Animation
    à partir des données passées en paramètre.

        Param(s):
                | id_anim (str): Id de l'objet Animation auquel les séquences seront liées
                | sequences ([]): Liste contenant les données des séquences à créer ou mettre à jour
    '''
    animation = Animation.get(id=id_anim)
    for seq in animation.sequences:
        seq.medias.clear()
        animation.sequences.remove(seq)
        Sequence.delete().where(Sequence.id==seq.id).execute()

    for seq in sequences:
        sequence = Sequence.create(
            titre = seq['titre'],
            description = seq['description'],
            type_seq = Thesaurus.get(id=seq['type_seq']['id']),
            duree = Thesaurus.get(id=seq['duree']['id']),
            approche = Thesaurus.get(id=seq['approche']['id']),
            modalite = Thesaurus.get(id=seq['modalite']['id']),
            objectifs = seq['objectifs'],
            materiel_div = seq['materiel_div'])

        animation.sequences.add(sequence)

        for media in seq['materiel']:
            sequence.medias.add(Media.get(id=media))


def get_stats():
    '''
    Renvoie le nombre d'objets Sequence dans la base de donnees

        Return(s):
                | count (int): Compte du nombre de Sequence
    '''
    return len(Sequence.select()[:])