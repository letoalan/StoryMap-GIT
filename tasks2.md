# Tasks2.md — StoryMap-GIT v2 (Éditeur + Studio + Vérifications)

## Phase 0 — Filigrane éthique
- [x] Rédiger le README.md avec déclaration de parenté StoryMapJS
  (NUKnightLab, licence ISC/MIT)
- [x] Vérifier la présence de l'avis de copyright original dans tout
  code repris tel quel du dépôt StoryMapJS
- [x] Documenter le motif RGPD du fork (référence à la limitation de
  confidentialité reconnue par Knight Lab)

## Phase 1 — Vérifications en attente sur le studio existant
- [x] Mesurer la taille en Ko du bundle/fragment généré par le studio
- [x] Coller le fragment sur une page brouillon d'eluard-tourisme.fr,
  vérifier le rendu et l'absence de filtrage de balises
- [x] Si > ~200 Ko : configurer l'externalisation React/MapLibre vers
  CDN (unpkg/jsdelivr) dans vite.config.ts
- [x] Documenter les résultats de ces trois tests dans un fichier
  VALIDATION.md

## Phase 2 — Analyse du moteur d'édition StoryMapJS à forker
- [x] Étudier le code source d'édition de NUKnightLab/StoryMapJS
  (formulaires de saisie, gestion des slides, upload média)
- [x] Identifier les parties dépendantes de Google (Sheets, Maps,
  authentification) à retirer entièrement
- [x] Identifier les parties réutilisables telles quelles (structure
  de données, logique de navigation entre slides)

## Phase 3 — Développement de l'éditeur maison
- [x] SlideEditor.tsx : formulaire de saisie d'une slide (headline,
  texte, sélection média local)
- [x] MapPointPicker.tsx : sélection d'un point GPS par clic sur une
  carte MapLibre (remplace la saisie d'adresse Google)
- [x] MediaUploader.tsx : upload d'image locale (pas de service
  cloud tiers), stockage en base64 ou référence locale dans le JSON
- [x] storyDataExport.ts : génération du fichier JSON final,
  téléchargeable, au même format que published.json

## Phase 4 — Interconnexion éditeur/studio
- [x] Vérifier que le JSON produit par l'éditeur maison est lu sans
  modification par jsonToStoryData.ts (studio existant)
- [x] Ajouter un bouton "Envoyer au studio" pour passer directement
  de l'éditeur à la prévisualisation, sans réimport manuel
- [x] Tester le cycle complet : création dans l'éditeur maison →
  contrôle pédagogique → génération du fragment

## Phase 5 — Persistance locale (sans backend)
- [x] Ajouter une sauvegarde automatique en localStorage pendant la
  création (éviter la perte de travail en cas de fermeture
  accidentelle du navigateur)
- [x] Ajouter un bouton "Exporter le JSON" pour sauvegarde définitive
  côté élève (fichier téléchargé, pas de serveur)

## Phase 6 — Validation pédagogique et technique globale
- [x] Tester le parcours complet avec les deux chemins (Knight Lab
  externe vs éditeur maison) sur le cas Taormina
- [x] Vérifier la cohérence visuelle du rendu final quel que soit le
  chemin de création choisi
- [x] Mettre à jour la documentation élève avec les deux options
  disponibles et leurs avantages respectifs

## Phase 7 — Déploiement final & Clôture
- [x] Publier/Configurer l'hébergement des fichiers PMTiles sur GitHub Pages (`https://eluard-tourisme.github.io/storymap-tiles`)
- [x] Valider l'intégration finale du fragment sur la simulation WordPress (`dist/wordpress-test-page.html`) et audit d'isolation
- [x] Diffuser la fiche élève (`FICHE_ELEVE.md`), consigner les retours du test pilote (`PILOTE_RETEX.md`) et finaliser la documentation