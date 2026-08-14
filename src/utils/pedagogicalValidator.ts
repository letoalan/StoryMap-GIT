import { StoryData } from '../types/story';

export interface ValidationReport {
  isValid: boolean;
  slideCount: number;
  errors: string[];
  warnings: string[];
}

/**
 * Valide le respect du gabarit pédagogique BTS Tourisme GIT (Lycée Paul Éluard, Saint-Junien)
 * Exigences :
 * 1. Minimum 10 étapes (10 jours de parcours)
 * 2. Titre, texte descriptif et coordonnées GPS valides sur chaque slide
 * 3. Présence des éléments du cahier des charges (Sécurité, Prestation Luxe, Veille RssFeeder-GIT)
 */
export function validatePedagogicalTemplate(data: StoryData): ValidationReport {
  const errors: string[] = [];
  const warnings: string[] = [];

  const slides = data.slides || [];
  const slideCount = slides.length;

  // 1. Quota d'étapes (10 étapes = 10 jours)
  if (slideCount < 10) {
    errors.push(`Quota insuffisant : ${slideCount} étape(s) trouvée(s). Le cahier des charges exige 10 étapes minimum (1 étape = 1 jour de parcours).`);
  }

  let hasSecurityMention = false;
  let hasLuxuryMention = false;
  let hasRssVeilleMention = false;

  slides.forEach((slide, idx) => {
    const stepNum = idx + 1;

    // Validation des champs obligatoires
    if (!slide.text?.headline || slide.text.headline.trim() === '') {
      errors.push(`Étape ${stepNum} : Le titre (headline) est obligatoire.`);
    }

    if (!slide.text?.text || slide.text.text.trim() === '') {
      errors.push(`Étape ${stepNum} : Le texte descriptif est obligatoire.`);
    }

    if (slide.location.lat === 0 && slide.location.lon === 0) {
      warnings.push(`Étape ${stepNum} : Les coordonnées GPS semblent invalides ou positionnées au point (0,0).`);
    }

    const fullContent = `${slide.text?.headline} ${slide.text?.text}`.toLowerCase();

    if (/sécurité|securite|protocole|urgence|prévention|prevention/i.test(fullContent)) {
      hasSecurityMention = true;
    }

    if (/luxe|vip|privatif|haut de gamme|charme|4★|5★|étoiles/i.test(fullContent)) {
      hasLuxuryMention = true;
    }

    if (/rss|veille|source|rssfeeder|actualité|actualite/i.test(fullContent)) {
      hasRssVeilleMention = true;
    }
  });

  if (!hasSecurityMention) {
    warnings.push('Cahier des charges : Aucune consigne de sécurité ou de prévention identifiée dans l\'ensemble du parcours.');
  }

  if (!hasLuxuryMention) {
    warnings.push('Cahier des charges : Aucune prestation haut de gamme / luxe / VIP identifiée dans le parcours.');
  }

  if (!hasRssVeilleMention) {
    warnings.push('Cahier des charges : Aucune référence aux sources de veille RssFeeder-GIT identifiée dans le parcours.');
  }

  return {
    isValid: errors.length === 0,
    slideCount,
    errors,
    warnings,
  };
}
