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
        | 'ref.rang' - rang taxonomie
        | 'ref.conservation' - conservation taxonomie
        | 'ref.iucn_monde' - iucn_monde taxonomie
        | 'ref.iucn_europe' - iucn_europe taxonomie
        | 'ref.iucn_region' - iucn_region taxonomie
        | 'ref.floraison' - floraison taxonomie
        | 'ref.type_bio' - type_bio taxonomie
        | 'ref.couleur_fleur' - couleur_fleur taxonomie
        | 'ref.parcelle' - parcelle specimen
        | 'ref.indigenat' - indigenat taxonomie
        | 'ref.accueil' - texte accueil
    """
    for idx, label, ref, code in [
            (1, 'Themes', '', 'ref.theme'),
            (2, 'Saison', '', 'ref.saison'),
            (3, 'Public', '', 'ref.public'),
            (4, 'Modalités', '', 'ref.modalite'),
            (5, 'Approches', '', 'ref.approche'),
            (6, 'Durée de séquence', '', 'ref.duree_seq'),
            (7, 'Type de séquence', '', 'ref.type_seq'),
            (8, 'Types de médias', '', 'ref.type_media'),
            (9, 'Types d\'outils', '', 'ref.type_outil'),
            (10, 'Difficulté', '', 'ref.difficulte'),
            (11, 'Rang', '', 'ref.rang'),
            (12, 'Conservation/patrimonialité', '', 'ref.conservation'),
            (13, 'Status IUCN à l\'échelle mondiale', '', 'ref.iucn_monde'),
            (14, 'Status IUCN à l\'échelle européenne', '', 'ref.iucn_europe'),
            (15, 'Status IUCN à l\'échelle régionale PACA', '', 'ref.iucn_region'),
            (16, 'Floraison', '', 'ref.floraison'),
            (17, 'Type biologique', '', 'ref.type_bio'),
            (18, 'Couleur des fleurs', '', 'ref.couleur_fleur'),
            (19, 'Parcelle', '', 'ref.parcelle'),
            (20, 'Indigénat', '', 'ref.indigenat'),
            (21, '', '', 'ref.accueil')]:
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
            (27, '1er Cycle', 'ref.public', None),
            (29, '2ème Cycle', 'ref.public', None),
            (30, '3ème Cycle', 'ref.public', None),
            (31, 'Collège', 'ref.public', None),
            (32, 'Lycée et plus', 'ref.public', None),
            (33, 'Grand public', 'ref.public', None),
            (34, 'À l\'écoute', 'ref.modalite', None),
            (35, 'En action', 'ref.modalite', None),
            (36, 'Artistique', 'ref.approche', None),
            (37, 'Scientifique', 'ref.approche', None),
            (38, 'Ludique', 'ref.approche', None),
            (39, 'Mise en pratique', 'ref.approche', None),
            (40, 'Sensible', 'ref.approche', None),
            (41, '5 min', 'ref.duree_seq', '5'),
            (42, '10 min', 'ref.duree_seq', '10'),
            (43, '15 min', 'ref.duree_seq', '15'),
            (44, '20 min', 'ref.duree_seq', '20'),
            (45, '25 min', 'ref.duree_seq', '25'),
            (46, '30 min', 'ref.duree_seq', '30'),
            (47, '35 min', 'ref.duree_seq', '35'),
            (48, '40 min', 'ref.duree_seq', '40'),
            (49, '45 min', 'ref.duree_seq', '45'),
            (50, '50 min', 'ref.duree_seq', '50'),
            (51, '55 min', 'ref.duree_seq', '55'),
            (52, '1h', 'ref.duree_seq', '60'),
            (53, '1h30', 'ref.duree_seq', '90'),
            (54, '2h', 'ref.duree_seq', '120'),
            (55, 'Introduction', 'ref.type_seq', 'intro'),
            (56, 'Développement', 'ref.type_seq', 'dvp'),
            (57, 'Développement optionnel', 'ref.type_seq', 'dvpopt'),
            (58, 'Conclusion', 'ref.type_seq', 'conclu'),
            (59, 'Image', 'ref.type_media', 'image'),
            (60, 'Photo', 'ref.type_media', 'photo'),
            (61, 'Vidéo', 'ref.type_media', 'video'),
            (62, 'Bande-son', 'ref.type_media', 'bandeson'),
            (63, 'Support', 'ref.type_media', 'support'),
            (64, 'Conte', 'ref.type_media', 'conte'),
            (65, 'Instaurer un cadre de confiance', 'ref.type_outil', 'instaureruncadre'),
            (66, 'Débats', 'ref.type_outil', 'debats'),
            (67, 'Émergence des représentations', 'ref.type_outil', 'emergencedesrespresentations'),
            (68, 'Moments de calme', 'ref.type_outil', 'momentsdecalme'),
            (69, 'En conclusion', 'ref.type_outil', 'enconclusion'),
            (70, 'Jeux', 'ref.type_outil', 'jeux'),
            (71, 'Multi-usage', 'ref.type_outil', 'multiusage'),
            (72, 'Très facile', 'ref.difficulte', None),
            (73, 'Facile', 'ref.difficulte', None),
            (74, 'Moyen', 'ref.difficulte', None),
            (75, 'Difficile', 'ref.difficulte', None),
            (76, 'Règne', 'ref.rang', 'regne'),
            (77, 'Groupe', 'ref.rang', 'groupe'),
            (78, 'Ordre', 'ref.rang', 'ordre'),
            (79, 'Famille', 'ref.rang', 'famille'),
            (80, 'Tribu', 'ref.rang', '_tribu'),
            (81, 'Genre', 'ref.rang', 'genre'),
            (82, 'Section', 'ref.rang', '_section'),
            (83, 'Série', 'ref.rang', '_serie'),
            (84, 'Espèce', 'ref.rang', 'espece'),
            (85, 'Sous-espèce', 'ref.rang', '_sous-espece'),
            (86, 'Varieté', 'ref.rang', 'variete'),
            (87, 'Forme', 'ref.rang', 'forme'),
            (88, 'Hybride', 'ref.rang', 'hybride'),
            (89, 'Cultivar', 'ref.rang', 'cultivar'),
            (90, 'Plantes protégées à l’échelle nationale', 'ref.conservation', None),
            (91, 'Plantes protégées à l’échelle régionale', 'ref.conservation', None),
            (92, 'Convention de Barcelone', 'ref.conservation', None),
            (93, 'Convention de Berne', 'ref.conservation', None),
            (94, 'Règlement communautaire CITES', 'ref.conservation', None),
            (95, 'Protection départementale', 'ref.conservation', None),
            (96, 'Déterminantes ZNIEFF (PACA)', 'ref.conservation', None),
            (97, 'Éteint', 'ref.iucn_monde', None),
            (98, 'Peut-être éteint', 'ref.iucn_monde', None),
            (99, 'Éteint à l\'état sauvage', 'ref.iucn_monde', None),
            (100, 'Peut-être éteint à l\'état sauvage', 'ref.iucn_monde', None),
            (101, 'Non évalué', 'ref.iucn_monde', None),
            (102, 'Données insuffisantes', 'ref.iucn_monde', None),
            (103, 'En danger critique', 'ref.iucn_monde', None),
            (104, 'En danger', 'ref.iucn_monde', None),
            (105, 'Vulnérable', 'ref.iucn_monde', None),
            (106, 'Conservation dependent', 'ref.iucn_monde', None),
            (107, 'Quasi menacé', 'ref.iucn_monde', None),
            (108, 'Éteint', 'ref.iucn_europe', None),
            (109, 'Peut-être éteint', 'ref.iucn_europe', None),
            (110, 'Éteint à l\'état sauvage', 'ref.iucn_europe', None),
            (111, 'Peut-être éteint à l\'état sauvage', 'ref.iucn_europe', None),
            (112, 'Non évalué', 'ref.iucn_europe', None),
            (113, 'Données insuffisantes', 'ref.iucn_europe', None),
            (114, 'En danger critique', 'ref.iucn_europe', None),
            (115, 'En danger', 'ref.iucn_europe', None),
            (116, 'Vulnérable', 'ref.iucn_europe', None),
            (117, 'Conservation dependent', 'ref.iucn_europe', None),
            (118, 'Quasi menacé', 'ref.iucn_europe', None),
            (119, 'Non évalué', 'ref.iucn_region', None),
            (120, 'Données insuffisantes', 'ref.iucn_region', None),
            (121, 'En danger critique', 'ref.iucn_region', None),
            (122, 'En danger', 'ref.iucn_region', None),
            (123, 'Vulnérable', 'ref.iucn_region', None),
            (124, 'Quasi menacé', 'ref.iucn_region', None),
            (125, 'Décembre', 'ref.floraison', None),
            (126, 'Janvier', 'ref.floraison', None),
            (127, 'Février', 'ref.floraison', None),
            (128, 'Mars', 'ref.floraison', None),
            (129, 'Avril', 'ref.floraison', None),
            (130, 'Mai', 'ref.floraison', None),
            (131, 'Juin', 'ref.floraison', None),
            (132, 'Juillet', 'ref.floraison', None),
            (133, 'Août', 'ref.floraison', None),
            (134, 'Septembre', 'ref.floraison', None),
            (135, 'Octobre', 'ref.floraison', None),
            (136, 'Novembre', 'ref.floraison', None),
            (137, 'Géophytes', 'ref.type_bio', None),
            (138, 'Hémicryptophyte', 'ref.type_bio', None),
            (139, 'Chaméphyte', 'ref.type_bio', None),
            (140, 'Nanophanérophyte', 'ref.type_bio', None),
            (141, 'Phanérophyte', 'ref.type_bio', None),
            (142, 'Thérophyte', 'ref.type_bio', None),
            (143, 'Hydrophyte', 'ref.type_bio', None),
            (144, 'Hélophyte', 'ref.type_bio', None),
            (145, 'Bleu', 'ref.couleur_fleur', None),
            (146, 'Noir', 'ref.couleur_fleur', None),
            (147, 'Rouge', 'ref.couleur_fleur', None),
            (148, 'Blanc / Gris', 'ref.couleur_fleur', None),
            (149, 'Marron', 'ref.couleur_fleur', None),
            (150, 'Vert', 'ref.couleur_fleur', None),
            (151, 'Rose', 'ref.couleur_fleur', None),
            (152, 'Jaune', 'ref.couleur_fleur', None),
            (153, 'Orange', 'ref.couleur_fleur', None),
            (154, 'Violet', 'ref.couleur_fleur', None),
            (155, 'Canaries', 'ref.parcelle', None),
            (156, 'Californie', 'ref.parcelle', None),
            (157, 'Australie', 'ref.parcelle', None),
            (158, 'Afrique du Sud', 'ref.parcelle', None),
            (159, 'Chili', 'ref.parcelle', None),
            (160, 'Nouvelle Zélande', 'ref.parcelle', None),
            (161, 'Amérique subtropicale', 'ref.parcelle', None),
            (162, 'Amérique aride', 'ref.parcelle', None),
            (163, 'Asie subtropicale', 'ref.parcelle', None),
            (164, 'Maquis (s.l.)', 'ref.parcelle', None),
            (165, 'Espace marin', 'ref.parcelle', None),
            (166, 'Indigène', 'ref.indigenat', None),
            (167, 'Exogène', 'ref.indigenat', None),
            (168, 'Subspontané', 'ref.indigenat', None),
            (169, 'Espèce Exotique Envahissante', 'ref.indigenat', None),
            (170, 'Biodiversité', 'ref.theme', None),
            (171, 'Environnement', 'ref.theme', None),
            (172, 'Adaptations', 'ref.theme', None),
            (173, 'Géographie', 'ref.theme', None),
            (174, 'Espèces exotiques', 'ref.theme', None),
            (175, 'Activités humaines', 'ref.theme', None),
            (176, 'Histoire', 'ref.theme', None),
            (177, 'Aménagement paysager', 'ref.theme', None),
            (178, 'Faune', 'ref.theme', None),
            (179, 'Flore', 'ref.theme', None),
            (180, 'Paysage', 'ref.theme', None),
            (181, 'Jour', 'ref.theme', None),
            (182, 'Nuit', 'ref.theme', None),
            (183, 'Événement', 'ref.theme', None),
            (184, 'Bâtiment', 'ref.theme', None)]:
        try:
            Thesaurus.create(id=idx, label=label, reference=ref, code=code)
        except peewee.IntegrityError:
            print ('%s - %s déja existant' % (idx, label))