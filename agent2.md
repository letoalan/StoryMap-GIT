# Agent2.md — StoryMap-GIT v2 (Éditeur + Studio intégrés)

## Contexte
Évolution du projet StoryMap-GIT : au studio de conversion/export déjà
livré (lecture d'un published.json, contrôle pédagogique, génération
du fragment HTML autoportant) s'ajoute désormais un éditeur de création
de storymaps, fork direct du code officiel StoryMapJS (NUKnightLab),
réintégré en local-first et serverless dans notre propre pipeline.

## Filigrane éthique (obligatoire avant développement)
- Origine déclarée : ce projet est un fork de NUKnightLab/StoryMapJS,
  licence ISC/MIT, dont l'avis de copyright original doit être
  conservé dans le code repris
- Motif du fork explicitement documenté : Knight Lab reconnaît que son
  outil d'édition en ligne ne garantit pas la confidentialité des
  données ("publie pour toute personne connaissant l'URL") et
  recommande de construire son propre système de diffusion si un
  contrôle de confidentialité est requis
- Mention à insérer dans le README : "StoryMap-GIT est un fork
  pédagogique de StoryMapJS (NUKnightLab, licence ISC), adapté pour
  un usage local-first, serverless et conforme RGPD en contexte
  scolaire (BTS Tourisme, lycée Éluard, Saint-Junien)"
- Aucune fonctionnalité n'est présentée comme une création originale
  indépendante de Knight Lab

## Principe d'architecture générale
Le projet se compose désormais de trois blocs séquentiels, tous
serverless et sans base de données :

1. **Éditeur** (nouveau) : interface de création de slides (point GPS,
   texte, média), fork du code d'édition StoryMapJS, fonctionnant
   entièrement côté client, sortie = fichier JSON local (même schéma
   que published.json Knight Lab)
2. **Studio de conversion/export** (déjà livré) : lecture du JSON
   (produit par notre éditeur ou exporté depuis storymap.knightlab.com),
   contrôle de conformité pédagogique, prévisualisation React/MapLibre,
   génération du fragment HTML autoportant
3. **Diffusion** : collage du fragment dans un bloc HTML personnalisé
   WordPress (eluard-tourisme.fr)

Les étudiants peuvent indifféremment utiliser l'éditeur officiel Knight
Lab OU notre éditeur maison : les deux produisent un JSON compatible,
lu par le même studio en aval.

## Contraintes RGPD
- Aucune donnée nominative dans le JSON (pseudonymes de groupe)
- Éditeur maison : aucune sauvegarde automatique vers un serveur
  externe, aucun compte requis, sauvegarde locale uniquement
  (téléchargement du fichier JSON, ou stockage navigateur local)
- Aucun appel à Google Maps ou tout service nécessitant un compte
- Tuiles cartographiques via PMTiles auto-hébergées (GitHub Pages),
  aucune clé API
- Aucun tracking, aucun cookie tiers

## Stack technique
- Framework : React + TypeScript (cohérence Arda/Braudel)
- Cartographie : MapLibre GL + protocole PMTiles
- Build : Vite (mode lib, sortie IIFE), aucune dépendance runtime
  Vite dans le livrable final
- Éditeur : fork adapté du moteur d'édition StoryMapJS (formulaire de
  saisie de slides, sélection de point sur carte, upload média local)
- Données : JSON statique en entrée/sortie de chaque bloc, sans
  backend, sans base de données

## Vérifications en attente (héritées de la version studio)
- [ ] Mesurer la taille en Ko du fragment HTML généré
- [ ] Tester le collage réel du fragment sur une page brouillon
  WordPress (bloc HTML personnalisé, vérifier le filtrage
  éventuel des balises <style>/<script> selon hébergement
  WordPress.com vs auto-hébergé)
- [ ] Si le fragment dépasse ~200 Ko, externaliser React/MapLibre
  vers CDN public (unpkg/jsdelivr) plutôt que de les embarquer
  dans le bundle Vite

## Typage des données (partagé éditeur/studio)
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
│ ├── editor/
│ │ ├── SlideEditor.tsx
│ │ ├── MapPointPicker.tsx
│ │ ├── MediaUploader.tsx
│ │ └── storyDataExport.ts
│ ├── studio/
│ │ ├── StoryConverterUI.tsx
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
├── README.md (avec mention de filigrane éthique)
├── vite.config.ts
├── agent2.md
└── tasks2.md

text


## Livrables du fork v2
1. Éditeur de création de slides (SlideEditor, MapPointPicker,
   MediaUploader), sortie JSON compatible published.json
2. Studio de conversion/export déjà livré, inchangé dans sa logique
3. README avec mention de parenté et licence StoryMapJS
4. Correctifs issus des vérifications en attente (taille fragment,
   test WordPress, externalisation CDN si nécessaire)
5. Documentation élève mise à jour : deux chemins possibles (Knight
   Lab ou éditeur maison) menant au même studio