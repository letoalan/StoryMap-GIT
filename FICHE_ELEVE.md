# Fiche Pédagogique Étudiant — BTS Tourisme GIT (Lycée Paul Éluard, Saint-Junien)
## Création et Intégration de StoryMaps Touristiques Sécurisées (v2 — Éditeur Local & Studio)

---

### 🎯 Objectifs Pédagogiques
Dans le cadre du module **GIT (Gestion de l'Information Touristique)**, vous allez concevoir un parcours touristique interactif, valorisé sur le site officiel de la section ([eluard-tourisme.fr](https://eluard-tourisme.fr)).

Votre StoryMap doit répondre à un cahier des charges rigoureux de conception de parcours touristiques sécurisés, d'intégration de prestations haut de gamme et d'actualisation par la veille territoriale.

---

### 📋 Cahier des Charges du Parcours

| Critère | Exigence Pédagogique |
| :--- | :--- |
| **Durée du parcours** | **10 étapes obligatoires** (1 slide de titre + 9 étapes d'itinéraire). |
| **Sécurité & Prévention** | Chaque étape doit préciser les consignes de sécurité (zone piétonne, numéro d'urgence local, accessibilité PMR, équipement requis). |
| **Prestations & Inclusions** | Valoriser des prestations de qualité (hébergements 4★/5★, visites VIP avec guide conférencier, transferts privatifs). |
| **Veille Territoriale** | Intégrer les sources d'information issues de l'outil **RssFeeder-GIT** (alertes météo, actualités culturelles). |
| **Respect RGPD** | Ne saisir aucune donnée nominative ou confidentielle. Utiliser des pseudonymes de groupe pour les crédits. |

---

### 🛠️ Deux Méthodes de Création Disponibles

Au choix de votre équipe de groupe :

#### Méthode A — Éditeur Local-First StoryMap-GIT (Recommandé - 100% Serverless & RGPD)
1. Ouvrez l'application **StoryMap-GIT** dans votre navigateur.
2. Sur l'onglet **"1. Éditeur de StoryMap"** :
   - Ajoutez vos **10 slides** et modifiez les titres et descriptions.
   - Utilisez le **pointeur de carte interactif** (MapLibre) pour positionner exactement vos étapes GPS.
   - Chargez vos images (locales converties en Base64 ou liens Web Wikimedia/Unsplash).
3. Cliquez sur **"🚀 Envoyer au Studio d Export"** pour valider directement votre travail.
4. Téléchargez une copie de sauvegarde au format `published.json` sur votre ordinateur.

#### Méthode B — Éditeur en Ligne Officiel Knight Lab (Historique)
1. Connectez-vous sur [storymap.knightlab.com](https://storymap.knightlab.com).
2. Créez votre StoryMap avec vos 10 slides (titre, coordonnées, texte, média).
3. Cliquez sur **Share** et téléchargez le fichier `published.json`.
4. Importez ce fichier dans l'onglet **"2. Studio d Export & Contrôle"** de StoryMap-GIT.

---

### 🚀 Procédure d'Exportation & Publication sur WordPress

1. Dans l'onglet **"2. Studio d Export & Contrôle Pédagogique"** :
   - Vérifiez le **Statut de conformité BTS** (minimum 10 étapes).
   - Choisissez le mode **Fragment Autoportant (Inline)** ou **Fragment Léger CDN** selon les consignes de l'enseignant.
   - Cliquez sur **"📋 Copier le fragment HTML pour WordPress"**.
2. Connectez-vous à l'administration de [eluard-tourisme.fr](https://eluard-tourisme.fr).
3. Ouvrez votre page projet dans l'éditeur Gutenberg et ajoutez un bloc **"HTML personnalisé"**.
4. Collez le code HTML copié et cliquez sur **Aperçu**.

---

### 🔍 Contrôle Qualité
- Vérifiez la réactivité du déplacement de la carte (*flyTo*) lors du changement d'étape.
- Vérifiez l'affichage de la **grille bento** synthétisant la sécurité, le budget et les prestations sous la carte.
- Confirmez le respect strict du RGPD (aucun cookie tiers ni suivi externe).
