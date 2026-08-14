# Spécifications d'Exportation & d'Interopérabilité OKF
## Adaptateur de Sortie RssFeeder-GIT ➔ Module d'Import StoryMapJS-GIT

Ce document constitue la spécification technique d'interopérabilité officielle entre l'outil de veille territoriale **RssFeeder-GIT** et l'application **StoryMapJS-GIT** (Section **BTS Tourisme GIT** — Lycée Paul Éluard, Saint-Junien).

Il définit précisément la structure de données attendue en sortie de **RssFeeder-GIT** pour que son fichier d'export (`*.okf.json`) s'injecte et s'affiche instantanément dans le panneau de synthèse de **StoryMapJS-GIT**.

---

## 🎯 1. Principes et Objectifs d'Interopérabilité

L'architecture d'échange repose sur trois piliers :
1. **Découplage et Thématiques Libres** : **RssFeeder-GIT** ne doit pas imposer de thématiques rigides. L'étudiant/utilisateur peut créer autant de cartes qu'il le souhaite, avec des titres, icônes, couleurs et contenus 100% personnalisés.
2. **Panneau Récepteur Vierge** : Dans **StoryMapJS-GIT**, le panneau sous la carte démarre en état vierge (*conteneurs vides en attente d'import*). Seul le chargement du fichier JSON généré par **RssFeeder-GIT** peuple dynamiquement la grille.
3. **Écosystème Local-First & RGPD** : L'échange se fait par fichier JSON local ou copier-coller local, sans aucun serveur centralisé, ni transfert vers des API tierces.

---

## 📐 2. Structure Complète du Fichier d'Export (`*.okf.json`)

Toute synthèse produite par **RssFeeder-GIT** doit exporter un objet JSON conforme à cette structure :

```json
{
  "meta": {
    "title": "Synthèse Territoriale du Parcours",
    "groupName": "Groupe BTS GIT (Lycée Éluard)",
    "author": "Équipe Étudiante 1",
    "createdAt": "2026-08-13T09:00:00Z",
    "version": "2.0.0-OKF"
  },
  "cards": [
    {
      "id": "secu-01",
      "title": "Sécurité & Urgence",
      "icon": "🛡️",
      "color": "red",
      "content": "Parcours sécurisé et balisé. Consignes particulières sur les zones escarpées.",
      "badges": ["Secours 112", "Zone Piétonne", "Accès PMR"],
      "footer": "📞 Urgence local : 112 | Référent BTS GIT"
    },
    {
      "id": "prest-02",
      "title": "Prestations & Inclusions",
      "icon": "✨",
      "color": "green",
      "content": "Visite guidée du Théâtre Antique, accès réservé aux sites historiques et hébergement 4★.",
      "badges": ["Visite VIP", "Coupe-file", "Guide Privatif", "Transfert Luxe"]
    },
    {
      "id": "budg-03",
      "title": "Estimation Budgétaire",
      "icon": "💶",
      "color": "blue",
      "content": "Budget estimé : 145 € / pers.\nInclus accès sites, transports locaux et déjeuner gastronomique.",
      "footer": "✓ Transparence tarifaire certifiée"
    },
    {
      "id": "veille-04",
      "title": "Veille RssFeeder-GIT & Météo",
      "icon": "☀️",
      "color": "amber",
      "content": "Période idéale : Avril à Octobre (22°C - 28°C). Risque de fortes chaleurs en juillet.",
      "links": [
        {
          "title": "Flux Veille Culturelle & Événements",
          "url": "https://eluard-tourisme.fr/rss/sicile-culture"
        },
        {
          "title": "Alerte Météo & Risques Naturels",
          "url": "https://eluard-tourisme.fr/rss/meteo-securite"
        }
      ]
    }
  ]
}
```

---

## 🔍 3. Dictionnaire des Champs du Tableau `cards[]`

Chaque thématique exportée dans le tableau `cards` possède les spécifications suivantes :

| Champ | Type | Obligatoire | Description & Exemples |
| :--- | :--- | :---: | :--- |
| **`title`** | `string` | **Oui** | Titre libre de la thématique (ex: *"Sécurité & Urgence"*, *"Gastronomie & Terroir"*, *"Accessibilité PMR"*). |
| **`content`** | `string` | **Oui** | Description textuelle ou HTML formaté (les retours à la ligne `\n` sont gérés). |
| **`icon`** | `string` | Non | Emoji d'illustration (ex: `"🛡️"`, `"✨"`, `"💶"`, `"☀️"`, `"🍷"`, `"♿"`). Défaut: `"📌"`. |
| **`color`** | `string` | Non | Code couleur du thème : `"red"`, `"green"`, `"emerald"`, `"blue"`, `"amber"`, `"purple"`, `"slate"`. Défaut: `"blue"`. |
| **`badges`** | `string[]` | Non | Liste de mots-clés affichés sous forme de pilules/badges (ex: `["Coupe-file", "Guide VIP"]`). |
| **`footer`** | `string` | Non | Texte ou contact mis en valeur dans le pied de carte (ex: `"📞 Urgence : 112"`). |
| **`links`** | `object[]` | Non | Liste de liens vers les sources de veille RSS : `[{ "title": "...", "url": "..." }]`. |

---

## 🎨 4. Palettes de Couleurs Supportées (`color`)

Pour harmoniser la présentation éditoriale, **RssFeeder-GIT** peut assigner à chaque thématique l'une des clés de couleur suivantes :

- ❤️ **`red`** : Sécurité, urgence, prévention, risques.
- 💚 **`green`** / 🌿 **`emerald`** : Prestations, écologie, environnement, inclusions.
- 💙 **`blue`** : Budget, tarification, logistique, transports.
- 💛 **`amber`** : Météo, saisonnalité, alertes temporelles, événements.
- 💜 **`purple`** : Culture, patrimoine, visites VIP, exclusivités.
- 🩶 **`slate`** : Informations générales, crédits, remarques.

---

## 💻 5. Exemple de Fonction d'Exportation pour RssFeeder-GIT

Voici l'extrait de code JavaScript à intégrer dans **RssFeeder-GIT** pour déclencher le téléchargement du fichier d'export compatible :

```javascript
/**
 * Exporte la synthèse issue de RssFeeder-GIT vers StoryMapJS-GIT
 * @param {Object} synthesisData - Les données de synthèse collectées dans RssFeeder-GIT
 */
function exportOKFSynthesisToStoryMap(synthesisData) {
  const okfPayload = {
    meta: {
      title: synthesisData.title || "Synthèse de Veille Territoriale",
      groupName: synthesisData.groupName || "Groupe BTS GIT",
      author: synthesisData.author || "Étudiant BTS Tourisme",
      createdAt: new Date().toISOString(),
      version: "2.0.0-OKF"
    },
    cards: synthesisData.sections.map((section, idx) => ({
      id: section.id || `card-${idx + 1}`,
      title: section.title, // Titre libre de la thématique
      icon: section.icon || "📌",
      color: section.color || "blue",
      content: section.text || section.description || "",
      badges: section.tags || [],
      footer: section.footerNote || "",
      links: section.rssFeeds ? section.rssFeeds.map(f => ({ title: f.name || f.title, url: f.url })) : []
    }))
  };

  // Téléchargement du fichier .okf.json
  const blob = new Blob([JSON.stringify(okfPayload, null, 2)], { type: 'application/json' });
  const downloadUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = `synthese_territoriale_${Date.now()}.okf.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(downloadUrl);
}
```

---

## 🔄 6. Prise en Charge de la Rétro-compatibilité

Le lecteur **StoryMapJS-GIT** inclut un module d'adaptation automatique (`normalizeOKFData`). Si une ancienne version de **RssFeeder-GIT** exporte un fichier avec des champs fixes (`security`, `prestations`, `budget`, `veilleMeteo`), le lecteur le convertit automatiquement en cartes de thématiques sans aucune perte de données.
