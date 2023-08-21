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
    for seq in sequences:
        if not seq.get('id',False):
            sequence = Sequence.create(
                titre = seq['titre'],
                description = seq['description'],
                type_seq = Thesaurus.get(id=seq['type_seq']['id']),
                duree = Thesaurus.get(id=seq['duree']['id']),
                approche = Thesaurus.get(id=seq['approche']['id']),
                modalite = Thesaurus.get(id=seq['modalite']['id']),
                objectifs = seq['objectifs'],
                materiel_div = seq['materiel_div'])

            Animation.get(id=id_anim).sequences.add(sequence)
        else:
            sequence = Sequence.get(id=seq['id'])
            sequence.titre = seq['titre']
            sequence.description = seq['description']
            sequence.type_seq = Thesaurus.get(id=seq['type_seq']['id'])
            sequence.duree = Thesaurus.get(id=seq['duree']['id'])
            sequence.approche = Thesaurus.get(id=seq['approche']['id'])
            sequence.modalite = Thesaurus.get(id=seq['modalite']['id'])
            sequence.objectifs = seq['objectifs']
            sequence.materiel_div = seq['materiel_div']
            sequence.save()

        sequence.medias.clear()
        for media in seq['materiel']:
            sequence.medias.add(Media.get(id=media))