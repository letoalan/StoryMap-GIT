# Agent.md — StoryMap-GIT

## Contexte
Fork pédagogique de StoryMapJS pour le BTS Tourisme GIT (Saint-Junien).
Les étudiants créent leurs storymaps de parcours touristiques sécurisés
via l'outil officiel storymap.knightlab.com, exportent le JSON, puis le
projet réécrit le rendu en React/TypeScript/MapLibre pour produire un
fragment HTML autoportant, intégrable dans le site WordPress
eluard-tourisme.fr sans aucun backend, base de données, ou instance à
maintenir. Le projet s'aligne sur la stack déjà adoptée pour Arda/
Braudel/Tolkien.

## Principe d'architecture
- Édition source : outil officiel Knight Lab (usage ponctuel, hors ligne
  ensuite)
- Export : fichier published.json récupéré manuellement par l'étudiant
- Réécriture du rendu : composants React/TypeScript consommant ce JSON,
  affichage cartographique via MapLibre GL
- Tuiles : PMTiles (fichiers statiques uniques, fond OSM/relief/thème
  sécurité), hébergées sur GitHub Pages, lues via protocole pmtiles://,
  aucune clé API
- Mise en page complémentaire : synthèse visuelle en grille bento
  (HTML/CSS statique, sans JS additionnel)
- Build : Vite, configuration build.lib, sortie unique IIFE
- Diffusion finale : fragment HTML autoportant (bundle JS+CSS+JSON
  inline) collé dans un bloc "HTML personnalisé" WordPress

## Contraintes RGPD
- Aucune donnée nominative dans le JSON (pseudonymes de groupe)
- Aucun appel à Google Maps ou tout service nécessitant un compte
- Aucun tracking, aucun cookie tiers introduit par le fragment
- JSON auditable en clair, non minifié
- Toutes les tuiles proviennent de fichiers PMTiles auto-hébergés, pas
  de service cartographique tiers avec clé

## Stack technique
- Framework : React + TypeScript (cohérence avec Braudel/Arda)
- Cartographie : MapLibre GL + protocole PMTiles
- Build : Vite (mode lib, sortie IIFE), aucune dépendance runtime à
  Vite dans le livrable final
- Génération des tuiles : Tippecanoe ou Planetiler à partir des
  GeoJSON du projet
- Mise en page synthèse : grille bento exportée en HTML/CSS statique
  (MeshSVG ou tailwind-bento)
- Données : JSON statique, sans backend, sans base de données

## Typage des données (aligné sur le JSON Knight Lab)
```typescript
interface StorySlide {
  location: { lat: number; lon: number; zoom: number };
  text: { headline: string; text: string };
  media?: { url: string; caption?: string };
}
interface StoryData {
  slides: StorySlide[];
}
```

## Arborescence cible
storymap-git/
├── src/
│ ├── components/
│ │ ├── StoryMapView.tsx
│ │ ├── StorySlide.tsx
│ │ └── BentoSummary.tsx
│ ├── utils/
│ │ ├── jsonToStoryData.ts
│ │ └── fragmentBuilder.ts
│ ├── types/
│ │ └── story.ts
│ └── main.tsx
├── tiles/
│ ├── base.pmtiles
│ ├── relief.pmtiles
│ └── securite.pmtiles
├── examples/
│ └── taormina.json
├── vite.config.ts
├── agent.md
└── tasks.md

text


## Livrables du fork
1. Composants React/TypeScript de rendu (StoryMapView, StorySlide,
   BentoSummary)
2. Parseur JSON Knight Lab → typage interne
3. Générateur de fragment HTML autoportant (bundle Vite + JSON inline)
4. Fichiers PMTiles de démonstration hébergés sur GitHub Pages
5. Documentation élève : export JSON officiel → génération du fragment
   → collage WordPress
6. Un exemple de référence validé (test Taormina)