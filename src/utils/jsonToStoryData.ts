import { StoryData, StorySlide, KnightLabRawData, KnightLabRawSlide } from '../types/story';

/**
 * Valide et convertit un objet JSON issu de Knight Lab StoryMapJS vers la structure interne StoryData.
 */
export function parseKnightLabJson(rawJson: unknown): StoryData {
  if (typeof rawJson !== 'object' || rawJson === null) {
    throw new Error('Format JSON invalide : objet attendu');
  }

  const data = rawJson as KnightLabRawData;
  const rawSlides: KnightLabRawSlide[] =
    data.storymap?.slides || data.story?.slides || data.slides || [];

  if (!Array.isArray(rawSlides)) {
    throw new Error('Format JSON invalide : tableau de slides introuvable');
  }

  const slides: StorySlide[] = rawSlides.map((slideRaw, index) => {
    const latNum = typeof slideRaw.location?.lat === 'number'
      ? slideRaw.location.lat
      : parseFloat(String(slideRaw.location?.lat ?? 0));

    const lonNum = typeof slideRaw.location?.lon === 'number'
      ? slideRaw.location.lon
      : parseFloat(String(slideRaw.location?.lon ?? 0));

    const zoomNum = typeof slideRaw.location?.zoom === 'number'
      ? slideRaw.location.zoom
      : parseInt(String(slideRaw.location?.zoom ?? 10), 10);

    const slide: StorySlide = {
      location: {
        lat: isNaN(latNum) ? 0 : latNum,
        lon: isNaN(lonNum) ? 0 : lonNum,
        zoom: isNaN(zoomNum) ? 10 : zoomNum,
      },
      text: {
        headline: slideRaw.text?.headline ?? `Étape ${index + 1}`,
        text: slideRaw.text?.text ?? '',
      },
    };

    if (slideRaw.type) {
      slide.type = slideRaw.type;
    }

    if (slideRaw.media?.url) {
      slide.media = {
        url: slideRaw.media.url,
        caption: slideRaw.media.caption,
        credit: slideRaw.media.credit,
      };
    }

    return slide;
  });

  return { slides };
}
