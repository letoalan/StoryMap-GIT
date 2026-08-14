# RETEX Pilote — StoryMap-GIT (BTS Tourisme, Lycée Paul Éluard)
## Retour d'Expérience et Points de Friction Identifiés

---

### 📌 Synthèse du Test Pilote
Le test pilote a été mené sur un parcours complet de **10 étapes** en Sicile orientale (Taormine - Etna - Alcantara), représentatif d'une production d'étudiants du BTS Tourisme.

Le fragment HTML autoportant généré (`dist/taormina-fragment.html`) a été testé avec succès dans un environnement simulant Gutenberg WordPress ([eluard-tourisme.fr](https://eluard-tourisme.fr)).

---

### 🔍 Enseignements & Points de Friction Identifiés

#### 1. Édition du JSON sur `storymap.knightlab.com`
- **Friction :** Omission fréquente du champ `credit` ou de la légende `caption` dans les médias Knight Lab.
- **Solution / Recommandation :** Sensibiliser les étudiants à la saisie systématique des crédits d'images libres de droits (Unsplash, Wikimedia Commons) pour respecter le droit d'auteur.

#### 2. Formatage des Coordonnées GPS
- **Friction :** Inversion occasionnelle entre Latitude et Longitude lors du copier-coller depuis Google Maps ou OpenStreetMap.
- **Solution / Recommandation :** Rappeler que la Sicile se situe aux alentours de Lat: 37.8°, Lon: 15.2°. Le parseur `jsonToStoryData.ts` sécurise les valeurs manquantes ou les types string, mais l'emplacement cartographique reste sous la responsabilité de l'étudiant.

#### 3. Intégration dans le bloc "HTML personnalisé" WordPress
- **Friction :** Tentative de collage dans l'éditeur de texte enrichi (Visual Editor) au lieu du bloc "HTML personnalisé".
- **Solution / Recommandation :** Dans Gutenberg, les étudiants doivent **impérativement** créer un bloc de type **"HTML personnalisé"** (`/html`) avant de coller le code du fragment, sous peine d'échappement du balisage `<script>`.

#### 4. Hébergement des tuiles PMTiles
- **Friction :** Dépendance au serveur d'hébergement statique des tuiles (`https://eluard-tourisme.github.io/storymap-tiles`).
- **Solution / Recommandation :** Vérifier au préalable de la séance que les fichiers `.pmtiles` sont bien accessibles via le navigateur et configurés avec les entêtes CORS `Access-Control-Allow-Origin: *`.

---

### ✅ Bilan de Conformité RGPD & Serverless

| Critère | Statut | Résultat du Test |
| :--- | :---: | :--- |
| **0 Backend / 0 Base de données** | ✅ Validé | Rendu 100% exécuté dans le navigateur de l'internaute. |
| **0 Tracking / 0 Cookies tiers** | ✅ Validé | Aucun cookie déposé, aucun tracker Analytics ou Facebook Pixel. |
| **0 Clé API tiers** | ✅ Validé | Fond de carte libre basé sur le protocole statique `pmtiles://`. |
| **Isolation CSS/JS WordPress** | ✅ Validé | Conteneur avec ID unique aléatoire, aucun conflit avec le thème WordPress actif. |
