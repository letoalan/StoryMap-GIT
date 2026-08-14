# Tasks.md — StoryMap-GIT

## Phase 1 — Initialisation du projet
- [x] Créer le projet Vite en template react-ts
- [x] Installer maplibre-gl, pmtiles et leurs types TypeScript
- [x] Définir l'arborescence : src/components, src/utils, src/types,
  tiles/, examples/
- [x] Configurer vite.config.ts en mode build.lib (sortie IIFE,
  un seul fichier bundle + CSS)

## Phase 2 — Typage et parsing des données
- [x] Définir les interfaces StorySlide / StoryData dans src/types/story.ts
- [x] Écrire jsonToStoryData.ts : validation et conversion du
  published.json Knight Lab vers le typage interne
- [x] Tester le parseur avec un vrai export (JSON Taormina)

## Phase 3 — Génération et hébergement des tuiles
- [x] Générer un fichier base.pmtiles (fond OSM) via Tippecanoe/Planetiler
- [x] Générer un fichier relief.pmtiles et securite.pmtiles thématiques
- [x] Héberger les fichiers .pmtiles dans un repo GitHub Pages dédié
- [x] Enregistrer le protocole pmtiles:// dans MapLibre GL et valider
  le chargement de chaque fichier

## Phase 4 — Composants de rendu
- [x] StoryMapView.tsx : initialisation MapLibre GL, sélection du
  fichier PMTiles selon le style demandé
- [x] StorySlide.tsx : affichage headline/text/média d'une étape
- [x] Navigation entre slides (précédent/suivant ou timeline cliquable)
- [x] Gestion du déplacement de la carte (flyTo) synchronisé avec
  le changement de slide

## Phase 5 — Synthèse visuelle bento
- [x] Concevoir un gabarit bento (sécurité / prestation / budget /
  météo) via MeshSVG ou tailwind-bento
- [x] Exporter en HTML/CSS statique
- [x] Intégrer BentoSummary.tsx comme composant complémentaire à la
  storymap dans le même fragment

## Phase 6 — Génération du fragment autoportant
- [x] Écrire fragmentBuilder.ts : assemble bundle Vite (JS+CSS), JSON
  de production et bloc bento en un unique fragment HTML
- [x] Paramétrer un identifiant de conteneur unique par production
  (éviter collisions si plusieurs storymaps sur une page)
- [x] Vérifier qu'aucun fetch réseau n'est requis hors chargement
  des fichiers PMTiles

## Phase 7 — Validation WordPress
- [x] Coller un fragment généré dans un bloc "HTML personnalisé"
  sur une page test d'eluard-tourisme.fr
- [x] Vérifier le rendu responsive (desktop/mobile) de la carte et
  de la grille bento
- [x] Vérifier l'absence de conflit CSS/JS avec le thème WordPress actif
- [x] Confirmer l'autonomie totale du fragment (aucun service tiers
  requis à l'affichage, hors GitHub Pages pour les tuiles)

## Phase 8 — Gabarit pédagogique
- [x] Fixer le nombre minimal de slides (10 étapes = 10 jours)
- [x] Fixer les champs obligatoires par slide (sécurité, prestation
  luxe, source de veille RssFeeder-GIT)
- [x] Rédiger la fiche élève : export JSON officiel → génération du
  fragment → collage WordPress

## Phase 9 — Test pilote
- [x] Réaliser une storymap test (Taormina, cohérence avec les tests
  RssFeeder-GIT déjà menés)
- [x] Générer et intégrer le fragment correspondant sur le site du BTS
- [x] Documenter les points de friction avant diffusion aux étudiants