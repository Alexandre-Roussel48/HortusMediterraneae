'''
Fichier contenant les fonctions utiles à la manipulation du thesaurus.
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Fonctions:

   | create_db()
   | pop_refs_thes()
   | pop_thes()
'''

import peewee

from server import db
from .animation.animation import Animation
from .codex.codex import Codex
from .media.media import Media
from .taxonomie.taxonomie import Taxonomie, Rel_Taxonomie_Taxonomie
from .outil.outil import Outil
from .sequence.sequence import Sequence
from .synonyme.synonyme import Synonyme
from .vernaculaire.vernaculaire import Vernaculaire
from .parcelle.parcelle import Parcelle
from .specimen.specimen import Specimen
from .thesaurus.thesaurus import Thesaurus

def create_db():
    '''
    Crée les tables au niveau de la base de données.   
    '''
    db.create_tables([
        Thesaurus,
        Media,
        Outil,
        Sequence,
        Animation,
        Taxonomie,
        Rel_Taxonomie_Taxonomie,
        Synonyme,
        Vernaculaire,
        Specimen,
        Codex,
        Media.tags.get_through_model(),
        Sequence.medias.get_through_model(),
        Sequence.codex.get_through_model(),
        Animation.sequences.get_through_model(),
        Animation.tags.get_through_model(),
        Taxonomie.tags.get_through_model(),
        Taxonomie.synonymes.get_through_model(),
        Taxonomie.vernaculaires.get_through_model(),
        Codex.tags.get_through_model(),
        Specimen.medias.get_through_model()
        ])

def pop_refs_thes():
    """
    initialise le thésaurus
    attention, ne plus toucher une fois défini
    ne pas corriger les index
    si nouvelle reference, ajouter sur le tas

    id references:
        | 'ref.theme' - theme de l'animediaion
        | 'ref.duree' - duree de l'animediaion
        | 'ref.saison' - saison de l'animediaion
        | 'ref.public' - public de l'animediaion
        | 'ref.lieu' - lieu de l'animediaion
        | 'ref.modalite' - modalite de la sequence
        | 'ref.approche' - approche de la sequence
        | 'ref.duree_seq' - duree de la sequence
        | 'ref.type_seq' - type de la sequence
        | 'ref.type_media' - type de media
        | 'ref.type_outil' - type de l'outil
        | 'ref.difficulte' - difficulte outil
        | 'ref.rang' - rang nomenclature
    """
    for idx, label, ref, code in [
            (1, 'Themes', '', 'ref.theme'),
            (2, 'Durée', '', 'ref.duree'),
            (3, 'Saison', '', 'ref.saison'),
            (4, 'Public', '', 'ref.public'),
            (5, 'Modalités', '', 'ref.modalite'),
            (6, 'Approches', '', 'ref.approche'),
            (7, 'Durée de séquence', '', 'ref.duree_seq'),
            (8, 'Type de séquence', '', 'ref.type_seq'),
            (9, 'Types de médias', '', 'ref.type_media'),
            (10, 'Types d\'outils', '', 'ref.type_outil'),
            (11, 'Difficulté', '', 'ref.difficulte'),
            (12, 'Rang', '', 'ref.rang'),
            (13, 'Conservation/patrimonialité', '', 'ref.conservation'),
            (14, 'Status IUCN à l\'échelle mondiale', '', 'ref.iucn_monde'),
            (15, 'Status IUCN à l\'échelle européenne', '', 'ref.iucn_europe'),
            (16, 'Status IUCN à l\'échelle régionale PACA', '', 'ref.iucn_region'),
            (17, 'Floraison', '', 'ref.floraison'),
            (18, 'Type biologique', '', 'ref.type_bio'),
            (19, 'Couleur des fleurs', '', 'ref.couleur_fleur'),
            (20, 'Parcelle', '', 'ref.parcelle'),
            (21, 'Indigénat', '', 'ref.indigenat'),]:
        try:
            Thesaurus.create(id=idx, label=label, reference=ref, code=code)
        except peewee.IntegrityError:
            print ('%s - %s déja existant' % (idx, label))

def pop_thes():
    '''
    Entrées de base du thésaurus
    '''
    for idx, label, ref, code in [
            (22, 'Printemps', 'ref.saison', None),
            (23, 'Été', 'ref.saison', None),
            (24, 'Automne', 'ref.saison', None),
            (25, 'Hiver', 'ref.saison', None),
            (26, 'Toute l\'année', 'ref.saison', None),
            (27, 'Terrain', 'ref.lieu', None),
            (28, 'Intérieur', 'ref.lieu', None),
            (29, '1er Cycle', 'ref.public', None),
            (30, '2ème Cycle', 'ref.public', None),
            (31, '3ème Cycle', 'ref.public', None),
            (32, 'Collège', 'ref.public', None),
            (33, 'Lycée et plus', 'ref.public', None),
            (34, 'Grand public', 'ref.public', None),
            (35, 'À l\'écoute', 'ref.modalite', None),
            (36, 'En action', 'ref.modalite', None),
            (37, 'Artistique', 'ref.approche', None),
            (38, 'Scientifique', 'ref.approche', None),
            (39, 'Ludique', 'ref.approche', None),
            (40, 'Mise en pratique', 'ref.approche', None),
            (41, 'Sensible', 'ref.approche', None),
            (42, '5 min', 'ref.duree_seq', '5'),
            (43, '10 min', 'ref.duree_seq', '10'),
            (44, '15 min', 'ref.duree_seq', '15'),
            (45, '20 min', 'ref.duree_seq', '20'),
            (46, '25 min', 'ref.duree_seq', '25'),
            (47, '30 min', 'ref.duree_seq', '30'),
            (48, '35 min', 'ref.duree_seq', '35'),
            (49, '40 min', 'ref.duree_seq', '40'),
            (50, '45 min', 'ref.duree_seq', '45'),
            (51, '50 min', 'ref.duree_seq', '50'),
            (52, '55 min', 'ref.duree_seq', '55'),
            (53, '1h', 'ref.duree_seq', '60'),
            (54, '1h30', 'ref.duree_seq', '90'),
            (55, '2h', 'ref.duree_seq', '120'),
            (56, 'Introduction', 'ref.type_seq', 'intro'),
            (57, 'Développement', 'ref.type_seq', 'dvp'),
            (58, 'Développement optionnel', 'ref.type_seq', 'dvpopt'),
            (59, 'Conclusion', 'ref.type_seq', 'conclu'),
            (60, 'Image', 'ref.type_media', 'image'),
            (61, 'Photo', 'ref.type_media', 'photo'),
            (62, 'Vidéo', 'ref.type_media', 'video'),
            (63, 'Bande-son', 'ref.type_media', 'bandeson'),
            (64, 'Support', 'ref.type_media', 'support'),
            (65, 'Conte', 'ref.type_media', 'conte'),
            (66, 'Instaurer un cadre de confiance', 'ref.type_outil', 'instaureruncadre'),
            (67, 'Débats', 'ref.type_outil', 'debats'),
            (68, 'Émergence des représentations', 'ref.type_outil', 'emergencedesrespresentations'),
            (69, 'Moments de calme', 'ref.type_outil', 'momentsdecalme'),
            (70, 'En conclusion', 'ref.type_outil', 'enconclusion'),
            (71, 'Jeux', 'ref.type_outil', 'jeux'),
            (72, 'Multi-usage', 'ref.type_outil', 'multiusage'),
            (73, 'Très facile', 'ref.difficulte', None),
            (74, 'Facile', 'ref.difficulte', None),
            (75, 'Moyen', 'ref.difficulte', None),
            (76, 'Difficile', 'ref.difficulte', None),
            (77, 'Règne', 'ref.rang', 'regne'),
            (78, 'Groupe', 'ref.rang', 'groupe'),
            (79, 'Ordre', 'ref.rang', 'ordre'),
            (80, 'Famille', 'ref.rang', 'famille'),
            (81, 'Tribu', 'ref.rang', '_tribu'),
            (82, 'Genre', 'ref.rang', 'genre'),
            (83, 'Section', 'ref.rang', '_section'),
            (84, 'Série', 'ref.rang', '_serie'),
            (85, 'Espèce', 'ref.rang', 'espece'),
            (86, 'Sous-espèce', 'ref.rang', '_sous-espece'),
            (87, 'Varieté', 'ref.rang', 'variete'),
            (88, 'Forme', 'ref.rang', 'forme'),
            (89, 'Hybride', 'ref.rang', 'hybride'),
            (90, 'Cultivar', 'ref.rang', 'cultivar'),
            (91, 'Plantes protégées à l’échelle nationale', 'ref.conservation', None),
            (92, 'Plantes protégées à l’échelle régionale', 'ref.conservation', None),
            (93, 'Convention de Barcelone', 'ref.conservation', None),
            (94, 'Convention de Berne', 'ref.conservation', None),
            (95, 'Règlement communautaire CITES', 'ref.conservation', None),
            (96, 'Protection départementale', 'ref.conservation', None),
            (97, 'Déterminantes ZNIEFF (PACA)', 'ref.conservation', None),
            (98, 'Éteint', 'ref.iucn_monde', None),
            (99, 'Peut-être éteint', 'ref.iucn_monde', None),
            (100, 'Éteint à l\'état sauvage', 'ref.iucn_monde', None),
            (101, 'Peut-être éteint à l\'état sauvage', 'ref.iucn_monde', None),
            (102, 'Non évalué', 'ref.iucn_monde', None),
            (103, 'Données insuffisantes', 'ref.iucn_monde', None),
            (104, 'En danger critique', 'ref.iucn_monde', None),
            (105, 'En danger', 'ref.iucn_monde', None),
            (106, 'Vulnérable', 'ref.iucn_monde', None),
            (107, 'Conservation dependent', 'ref.iucn_monde', None),
            (108, 'Quasi menacé', 'ref.iucn_monde', None),
            (109, 'Éteint', 'ref.iucn_europe', None),
            (110, 'Peut-être éteint', 'ref.iucn_europe', None),
            (111, 'Éteint à l\'état sauvage', 'ref.iucn_europe', None),
            (112, 'Peut-être éteint à l\'état sauvage', 'ref.iucn_europe', None),
            (113, 'Non évalué', 'ref.iucn_europe', None),
            (114, 'Données insuffisantes', 'ref.iucn_europe', None),
            (115, 'En danger critique', 'ref.iucn_europe', None),
            (116, 'En danger', 'ref.iucn_europe', None),
            (117, 'Vulnérable', 'ref.iucn_europe', None),
            (118, 'Conservation dependent', 'ref.iucn_europe', None),
            (119, 'Quasi menacé', 'ref.iucn_europe', None),
            (120, 'Non évalué', 'ref.iucn_region', None),
            (121, 'Données insuffisantes', 'ref.iucn_region', None),
            (122, 'En danger critique', 'ref.iucn_region', None),
            (123, 'En danger', 'ref.iucn_region', None),
            (124, 'Vulnérable', 'ref.iucn_region', None),
            (125, 'Quasi menacé', 'ref.iucn_region', None),
            (126, 'Décembre', 'ref.floraison', None),
            (127, 'Janvier', 'ref.floraison', None),
            (128, 'Février', 'ref.floraison', None),
            (129, 'Mars', 'ref.floraison', None),
            (130, 'Avril', 'ref.floraison', None),
            (131, 'Mai', 'ref.floraison', None),
            (132, 'Juin', 'ref.floraison', None),
            (133, 'Juillet', 'ref.floraison', None),
            (134, 'Août', 'ref.floraison', None),
            (135, 'Septembre', 'ref.floraison', None),
            (136, 'Octobre', 'ref.floraison', None),
            (137, 'Novembre', 'ref.floraison', None),
            (138, 'Géophytes', 'ref.type_bio', None),
            (139, 'Hémicryptophyte', 'ref.type_bio', None),
            (140, 'Chaméphyte', 'ref.type_bio', None),
            (141, 'Nanophanérophyte', 'ref.type_bio', None),
            (142, 'Phanérophyte', 'ref.type_bio', None),
            (143, 'Thérophyte', 'ref.type_bio', None),
            (144, 'Hydrophyte', 'ref.type_bio', None),
            (145, 'Hélophyte', 'ref.type_bio', None),
            (146, 'Bleu', 'ref.couleur_fleur', None),
            (147, 'Noir', 'ref.couleur_fleur', None),
            (148, 'Rouge', 'ref.couleur_fleur', None),
            (149, 'Blanc / Gris', 'ref.couleur_fleur', None),
            (150, 'Marron', 'ref.couleur_fleur', None),
            (151, 'Vert', 'ref.couleur_fleur', None),
            (152, 'Rose', 'ref.couleur_fleur', None),
            (153, 'Jaune', 'ref.couleur_fleur', None),
            (154, 'Orange', 'ref.couleur_fleur', None),
            (155, 'Violet', 'ref.couleur_fleur', None),
            (156, 'Canaries', 'ref.parcelle', None),
            (157, 'Californie', 'ref.parcelle', None),
            (158, 'Australie', 'ref.parcelle', None),
            (159, 'Afrique du Sud', 'ref.parcelle', None),
            (160, 'Chili', 'ref.parcelle', None),
            (161, 'Nouvelle Zélande', 'ref.parcelle', None),
            (162, 'Amérique subtropicale', 'ref.parcelle', None),
            (163, 'Amérique aride', 'ref.parcelle', None),
            (164, 'Asie subtropicale', 'ref.parcelle', None),
            (165, 'Indigène', 'ref.indigenat', None),
            (166, 'Exogène', 'ref.indigenat', None),
            (167, 'Subspontané', 'ref.indigenat', None),
            (168, 'Espèce Exotique Envahissante', 'ref.indigenat', None)]:
        try:
            Thesaurus.create(id=idx, label=label, reference=ref, code=code)
        except peewee.IntegrityError:
            print ('%s - %s déja existant' % (idx, label))