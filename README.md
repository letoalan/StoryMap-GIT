# StoryMap-GIT v2 — Studio & Édition Intégrés (BTS Tourisme, Lycée Paul Éluard)

> ℹ️ **Filigrane éthique & Déclaration de parenté :**
> **StoryMap-GIT** est un fork pédagogique de **StoryMapJS** (développé par [NUKnightLab](https://github.com/NUKnightLab/StoryMapJS), sous licence libre **ISC / MIT**).
> 
> **Motif du fork :** Knight Lab reconnaît que son outil d'édition en ligne ne garantit pas la confidentialité des données (*"publie pour toute personne connaissant l'URL"*) et recommande de construire son propre système de diffusion si un contrôle strict de confidentialité est requis. 
> 
> Ce fork adapte l'outil pour un usage **100% local-first, serverless et conforme RGPD** en contexte scolaire (BTS Tourisme GIT, lycée Paul Éluard, Saint-Junien), sans aucune dépendance à des comptes tiers, bases de données ou clés API.

---

## 🎯 Principe du Projet v2

Le projet propose **deux chemins de création totalement compatibles** :
1. **Éditeur officiel Knight Lab** (`storymap.knightlab.com`) → export `published.json`.
2. **Éditeur maison StoryMap-GIT** (`src/editor/`) → création 100% locale, sans compte, export `published.json`.

Dans les deux cas, le **Studio de Conversion StoryMap-GIT** (`src/studio/`) prend le fichier JSON, valide les contraintes pédagogiques (10 étapes), et génère un **fragment HTML 100% autoportant** (bundle React + MapLibre GL + CSS + JSON inline) à coller dans un bloc *"HTML personnalisé"* sur le site **[eluard-tourisme.fr](https://eluard-tourisme.fr)**.

---

## 🔒 Engagements RGPD & Serverless

- 🛡️ **0 Backend / 0 Base de données / 0 Instance serveur**
- 🚫 **0 Cookie / 0 Tracker / 0 Clé API tiers**
- 🗺️ Tuiles cartographiques statiques via le protocole **PMTiles** (`pmtiles://`) hébergé sur GitHub Pages
- 📊 **Synthèse Bento** complémentaire (Sécurité, Prestations VIP, Budget, Météo)

---

## 🚀 Commandes Utiles

| Commande | Description |
| :--- | :--- |
| `npm run dev` | Lancer le studio & l'éditeur interactif local (`http://localhost:5173`). |
| `npm run build` | Compiler la librairie autonome au format IIFE (`dist/storymap-git.js`). |
| `npm run generate:fragment` | Générer le fragment HTML autoportant de test (`dist/taormina-fragment.html`). |
| `npm run generate:wp` | Générer la page de simulation WordPress complète (`dist/wordpress-test-page.html`). |
| `npm run audit` | Exécuter le test d'isolation CSS/JS et de conformité RGPD. |
| `npm run validate` | Vérifier le respect du gabarit pédagogique (10 étapes minimum). |

---

## 📚 Documents de Référence

- **[FICHE_ELEVE.md](file:///c:/Users/alano/OneDrive/Documents/GitHub/StoryMap-GIT/FICHE_ELEVE.md)** : Fiche consigne et guide pas-à-pas pour les étudiants.
- **[PILOTE_RETEX.md](file:///c:/Users/alano/OneDrive/Documents/GitHub/StoryMap-GIT/PILOTE_RETEX.md)** : Retour d'expérience sur le test pilote et points de friction.
- **[agent2.md](file:///c:/Users/alano/OneDrive/Documents/GitHub/StoryMap-GIT/agent2.md)** : Spécifications et contraintes d'architecture v2.
- **[tasks2.md](file:///c:/Users/alano/OneDrive/Documents/GitHub/StoryMap-GIT/tasks2.md)** : Suivi des phases de développement v2.

---

## 📜 Licence & Copyright

- **Code original StoryMapJS** : © Northwestern University Knight Lab (Licence ISC).
- **Adaptations & extensions StoryMap-GIT** : © Lycée Paul Éluard, BTS Tourisme GIT (Saint-Junien).
