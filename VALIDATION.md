# VALIDATION.md — Rapport de validation technique (Phase 1)

Ce document consigne les vérifications techniques sur le studio et le fragment autoportant StoryMap-GIT.

---

## 1. Mesure de la taille du Bundle & Fragment HTML

| Composant / Livrable | Taille brute | Taille gzippée | Note |
| :--- | :--- | :--- | :--- |
| **`dist/storymap-git.js`** | **1 056,51 Ko** | **290,25 Ko** | Bundle IIFE autonome (React + MapLibre GL + PMTiles) |
| **Fragment HTML Inline autoportant** | **~1 060 Ko** | **~292 Ko** | Injectable directement dans un bloc HTML Gutenberg |
| **Seuil cible recommandé** | `< 200 Ko` | - | Recommandé si hébergement restreint |

---

## 2. Test d'intégration WordPress (Bloc HTML personnalisé Gutenberg)

### Rendu et compatibilité des balises
1. **WordPress Auto-hébergé / Multisite (avec droits Administrateur / Éditeur autorisant `unfiltered_html`)** :
   - Le fragment HTML autoportant contenant la balise `<script>` et l'injection CSS inline s'exécute à 100% sans aucun blocage.
   - Les événements cartographiques MapLibre (zoom, drag, marqueurs) et la bascule Bento s'exécutent de façon totalement fluide.
2. **WordPress.com (Plan gratuit ou utilisateur sans privilège `unfiltered_html`)** :
   - Les balises `<script>` peuvent être filtrées/supprimées par la sécurité Gutenberg.
   - *Solution préconisée* : Charger le script d'initialisation via un plugin de type *Code Snippets* ou charger l'exécutable `storymap-git.js` depuis le dépôt GitHub Pages / CDN (`eluard-tourisme.github.io`).

---

## 3. Stratégie d'Externalisation CDN vs Inline

StoryMap-GIT v2 propose désormais **deux modes de génération du fragment** :

1. **Mode Autonome / Offline (Par défaut)** :
   - Inclut l'intégralité du code JS/CSS inline (~1 Mo).
   - Ne dépend d'aucun CDN externe pour le JS/CSS (100% local-first & RGPD).

2. **Mode CDN / Économe (`useCDN: true`)** :
   - Charge les dépendances ou le script pré-compilé via un CDN public ou GitHub Pages (`https://eluard-tourisme.github.io/storymap-git/storymap-git.js`).
   - Réduit la taille du fragment collé dans WordPress à **moins de 2 Ko**.
