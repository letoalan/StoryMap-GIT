import React from 'react';
import './LandingPage.css';

interface LandingPageProps {
  onEnterApp: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  return (
    <div className="lp-page">
      {/* ════════════════════════════════════════════════════════
          HERO SECTION
          ════════════════════════════════════════════════════════ */}
      <section className="lp-hero">
        <div className="lp-hero-content">
          <div className="lp-hero-badge">
            <span className="lp-hero-badge-dot" />
            BTS Tourisme GIT — Lycée Paul Éluard, Saint-Junien
          </div>

          <h1 className="lp-hero-title">
            Créez votre{' '}
            <span className="lp-hero-title-accent">circuit touristique</span>
            {' '}interactif
          </h1>

          <p className="lp-hero-subtitle">
            Concevez un parcours géolocalisé en 10 étapes, ajoutez vos photos et descriptions,
            puis publiez-le directement sur le site eluard-tourisme.fr — le tout sans compte,
            sans cookies, 100% conforme RGPD.
          </p>

          <button
            type="button"
            className="lp-hero-cta"
            onClick={onEnterApp}
          >
            🚀 Commencer mon parcours
          </button>

          <div className="lp-features-strip">
            <div className="lp-feature-item">
              <span className="lp-feature-item-icon">🛡️</span>
              100% local & RGPD
            </div>
            <div className="lp-feature-item">
              <span className="lp-feature-item-icon">🗺️</span>
              Carte interactive MapLibre
            </div>
            <div className="lp-feature-item">
              <span className="lp-feature-item-icon">📤</span>
              Export WordPress en 1 clic
            </div>
            <div className="lp-feature-item">
              <span className="lp-feature-item-icon">🌐</span>
              Aucun compte requis
            </div>
          </div>
        </div>

        <div className="lp-hero-scroll-hint">
          <span>Découvrir le fonctionnement</span>
          <span className="lp-hero-scroll-arrow">↓</span>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          COMMENT ÇA MARCHE — 3 ÉTAPES
          ════════════════════════════════════════════════════════ */}
      <section className="lp-section">
        <div className="lp-section-inner">
          <header className="lp-section-header">
            <span className="lp-section-eyebrow">Mode d'emploi</span>
            <h2 className="lp-section-title">Comment ça marche ?</h2>
            <p className="lp-section-desc">
              En trois étapes simples, passez de l'idée de parcours à la publication
              sur le site officiel de la section tourisme.
            </p>
          </header>

          <div className="lp-steps-grid">
            {/* Étape 1 */}
            <div className="lp-step-card">
              <div className="lp-step-number">1</div>
              <span className="lp-step-icon">✍️</span>
              <h3 className="lp-step-title">Créez vos 10 étapes</h3>
              <p className="lp-step-desc">
                Remplissez le titre et la description narrative de chaque étape. Positionnez-les
                précisément sur la carte interactive en cliquant sur le lieu désiré.
              </p>
            </div>

            {/* Étape 2 */}
            <div className="lp-step-card">
              <div className="lp-step-number">2</div>
              <span className="lp-step-icon">🖼️</span>
              <h3 className="lp-step-title">Ajoutez vos médias</h3>
              <p className="lp-step-desc">
                Importez des photos depuis votre ordinateur (converties automatiquement) ou
                collez un lien vers Wikimedia Commons ou Unsplash. Ajoutez une légende.
              </p>
            </div>

            {/* Étape 3 */}
            <div className="lp-step-card">
              <div className="lp-step-number">3</div>
              <span className="lp-step-icon">📤</span>
              <h3 className="lp-step-title">Exportez pour WordPress</h3>
              <p className="lp-step-desc">
                Cliquez sur « Exporter », copiez le code HTML généré et collez-le dans un
                bloc « HTML personnalisé » de votre page sur eluard-tourisme.fr.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          CAHIER DES CHARGES BTS
          ════════════════════════════════════════════════════════ */}
      <section className="lp-section lp-section--alt">
        <div className="lp-section-inner">
          <header className="lp-section-header">
            <span className="lp-section-eyebrow">Exigences pédagogiques</span>
            <h2 className="lp-section-title">Cahier des charges BTS Tourisme</h2>
            <p className="lp-section-desc">
              Votre parcours touristique doit respecter ces quatre exigences essentielles
              pour être validé.
            </p>
          </header>

          <div className="lp-req-grid">
            {/* 10 étapes */}
            <div className="lp-req-card">
              <div className="lp-req-icon lp-req-icon--blue">📍</div>
              <div>
                <h3 className="lp-req-title">10 étapes obligatoires</h3>
                <p className="lp-req-desc">
                  1 slide de titre (présentation du circuit) + 9 étapes d'itinéraire géolocalisées.
                  L'application vérifie automatiquement le nombre d'étapes.
                </p>
              </div>
            </div>

            {/* Sécurité */}
            <div className="lp-req-card">
              <div className="lp-req-icon lp-req-icon--red">🛡️</div>
              <div>
                <h3 className="lp-req-title">Sécurité & Prévention</h3>
                <p className="lp-req-desc">
                  Chaque étape mentionne les consignes de sécurité : zone piétonne, numéro
                  d'urgence local, accessibilité PMR, équipement requis.
                </p>
              </div>
            </div>

            {/* Prestations VIP */}
            <div className="lp-req-card">
              <div className="lp-req-icon lp-req-icon--amber">✨</div>
              <div>
                <h3 className="lp-req-title">Prestations haut de gamme</h3>
                <p className="lp-req-desc">
                  Valorisez des prestations de qualité : hébergements 4★/5★, visites VIP
                  avec guide conférencier, transferts privatifs, coupe-file.
                </p>
              </div>
            </div>

            {/* RGPD */}
            <div className="lp-req-card">
              <div className="lp-req-icon lp-req-icon--green">🔒</div>
              <div>
                <h3 className="lp-req-title">Conformité RGPD</h3>
                <p className="lp-req-desc">
                  Aucune donnée nominative. Utilisez des pseudonymes de groupe pour les
                  crédits. Zéro cookie, zéro tracker, zéro clé API tierce.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          LES 2 MÉTHODES DE CRÉATION
          ════════════════════════════════════════════════════════ */}
      <section className="lp-section">
        <div className="lp-section-inner">
          <header className="lp-section-header">
            <span className="lp-section-eyebrow">Deux chemins possibles</span>
            <h2 className="lp-section-title">Choisissez votre méthode de création</h2>
            <p className="lp-section-desc">
              Deux méthodes sont disponibles au choix de votre équipe.
              Les deux produisent le même résultat final.
            </p>
          </header>

          <div className="lp-methods-grid">
            {/* Méthode A — Recommandée */}
            <div className="lp-method-card lp-method-card--recommended">
              <div className="lp-method-badge lp-method-badge--rec">
                ⭐ Recommandé
              </div>
              <h3 className="lp-method-title">Éditeur local StoryMap-GIT</h3>
              <p className="lp-method-subtitle">
                100% serverless, sans compte, conforme RGPD. Tout reste sur votre ordinateur.
              </p>
              <ol className="lp-method-steps">
                <li className="lp-method-step">
                  <span className="lp-method-step-num">1</span>
                  <span>Ouvrez l'application dans votre navigateur</span>
                </li>
                <li className="lp-method-step">
                  <span className="lp-method-step-num">2</span>
                  <span>Créez vos 10 slides avec le pointeur de carte interactif</span>
                </li>
                <li className="lp-method-step">
                  <span className="lp-method-step-num">3</span>
                  <span>Cliquez sur « 🚀 Exporter pour WordPress »</span>
                </li>
                <li className="lp-method-step">
                  <span className="lp-method-step-num">4</span>
                  <span>Collez le code HTML dans votre page eluard-tourisme.fr</span>
                </li>
              </ol>
            </div>

            {/* Méthode B — Alternative */}
            <div className="lp-method-card lp-method-card--alt">
              <div className="lp-method-badge lp-method-badge--alt">
                Historique
              </div>
              <h3 className="lp-method-title">Éditeur en ligne Knight Lab</h3>
              <p className="lp-method-subtitle">
                L'éditeur officiel de Northwestern University. Nécessite un compte Google.
              </p>
              <ol className="lp-method-steps">
                <li className="lp-method-step">
                  <span className="lp-method-step-num">1</span>
                  <span>Connectez-vous sur storymap.knightlab.com</span>
                </li>
                <li className="lp-method-step">
                  <span className="lp-method-step-num">2</span>
                  <span>Créez votre StoryMap avec 10 slides</span>
                </li>
                <li className="lp-method-step">
                  <span className="lp-method-step-num">3</span>
                  <span>Téléchargez le fichier published.json</span>
                </li>
                <li className="lp-method-step">
                  <span className="lp-method-step-num">4</span>
                  <span>Importez-le dans le Studio d'Export StoryMap-GIT</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          CTA FINAL
          ════════════════════════════════════════════════════════ */}
      <section className="lp-bottom-cta">
        <div className="lp-bottom-cta-inner">
          <h2 className="lp-bottom-cta-title">
            Prêt à créer votre StoryMap ?
          </h2>
          <p className="lp-bottom-cta-desc">
            Lancez l'éditeur, construisez votre circuit touristique et
            publiez-le sur le site de la section en quelques minutes.
          </p>
          <button
            type="button"
            className="lp-bottom-cta-btn"
            onClick={onEnterApp}
          >
            🗺️ Lancer l'éditeur
          </button>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          FOOTER
          ════════════════════════════════════════════════════════ */}
      <footer className="lp-footer">
        <p className="lp-footer-text">
          StoryMap-GIT — Fork pédagogique de{' '}
          <a href="https://github.com/NUKnightLab/StoryMapJS" target="_blank" rel="noopener noreferrer">
            StoryMapJS
          </a>{' '}
          (Knight Lab, licence ISC/MIT)
          <br />
          © Lycée Paul Éluard, BTS Tourisme GIT — Saint-Junien
        </p>
      </footer>
    </div>
  );
};
