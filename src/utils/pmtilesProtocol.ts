import maplibregl, { StyleSpecification } from 'maplibre-gl';
import * as pmtiles from 'pmtiles';

let protocolRegistered = false;

/**
 * Initialise et enregistre le protocole `pmtiles://` auprès de MapLibre GL avec protection contre les erreurs de réseau / stubs.
 * Cette opération est idempotente et ne s'exécute qu'une seule fois.
 */
export function registerPMTilesProtocol(): void {
  if (protocolRegistered) return;
  
  const protocol = new pmtiles.Protocol();

  maplibregl.addProtocol('pmtiles', async (requestParameters, abortController) => {
    try {
      return await protocol.tile(requestParameters, abortController);
    } catch (e: any) {
      console.warn(`[StoryMap-GIT] PMTiles optional layer fallback (${requestParameters.url}):`, e?.message || e);
      return { data: new Uint8Array() };
    }
  });

  protocolRegistered = true;
  console.log('PMTiles protocol registered with error boundary in MapLibre GL');
}

/**
 * Base URL par défaut hébergée sur GitHub Pages pour les tuiles PMTiles du projet
 */
export const DEFAULT_PMTILES_BASE_URL = 'https://eluard-tourisme.github.io/storymap-tiles';

export type MapStyleType =
  | 'base'
  | 'editorial'
  | 'positron'
  | 'dark_matter'
  | 'satellite_hybrid'
  | 'satellite'
  | 'natgeo'
  | 'topographique'
  | 'cyclosm'
  | 'securite'
  | 'relief';

export interface MapTileOffer {
  id: MapStyleType;
  label: string;
  description: string;
  icon: string;
  githubPagesNotice: string;
}

/**
 * Offres de fonds de carte 100% compatibles avec l'hébergement statique GitHub Pages (Serverless / 0 clé API / CORS ouvert)
 */
export const GITHUB_PAGES_TILE_OFFERS: MapTileOffer[] = [
  {
    id: 'base',
    label: 'OpenStreetMap Standard',
    description: 'Carte routière & patrimoniale universelle',
    icon: '🗺️',
    githubPagesNotice: '✓ Gratuit & Libre (OSM Tile Server)',
  },
  {
    id: 'editorial',
    label: 'Voyager Magazine (Éditorial)',
    description: 'Fond clair épuré idéal pour guides touristiques haut de gamme',
    icon: '🎨',
    githubPagesNotice: '✓ Fast CDN CartoDB (CORS libre)',
  },
  {
    id: 'positron',
    label: 'Positron Minimaliste Blanc',
    description: 'Fond ultra-épuré blanc pour faire ressortir les médias',
    icon: '📄',
    githubPagesNotice: '✓ CartoDB Positron (CORS libre)',
  },
  {
    id: 'dark_matter',
    label: 'Dark Matter (Obsidian)',
    description: 'Fond sombre nocturne pour circuits & événements VIP',
    icon: '🌑',
    githubPagesNotice: '✓ CartoDB Dark (CORS libre)',
  },
  {
    id: 'satellite_hybrid',
    label: 'Satellite HD + Noms (Esri Hybride)',
    description: 'Imagerie aérienne Esri avec nom des villes, routes et repères',
    icon: '🛰️🏷️',
    githubPagesNotice: '✓ Esri Imagery + Boundaries (Sans clé API)',
  },
  {
    id: 'satellite',
    label: 'Satellite Brut (Esri)',
    description: 'Imagerie aérienne pure sans aucune étiquette',
    icon: '🛰️',
    githubPagesNotice: '✓ Esri World Imagery (Sans clé API)',
  },
  {
    id: 'natgeo',
    label: 'National Geographic Éditorial',
    description: 'Carte illustrée NatGeo idéale pour la géographie & parcs',
    icon: '🧭',
    githubPagesNotice: '✓ Esri NatGeo World (Sans clé API)',
  },
  {
    id: 'topographique',
    label: 'Topographie & Relief (OpenTopo)',
    description: 'Courbes de niveau et relief pour éco-tourisme & rando',
    icon: '🏞️',
    githubPagesNotice: '✓ OpenTopoMap (Accès direct)',
  },
  {
    id: 'cyclosm',
    label: 'CyclOSM (Vélo & Mobilité Douce)',
    description: 'Pistes cyclables, voies vertes et tourisme à vélo',
    icon: '🚲',
    githubPagesNotice: '✓ CyclOSM (Mobilité verte BTS)',
  },
  {
    id: 'securite',
    label: 'PMTiles Statique (Vectoriel GH Pages)',
    description: 'Fichier unique .pmtiles hébergé en /tiles sans aucun serveur',
    icon: '📦',
    githubPagesNotice: '✓ HTTP Range Requests (100% Serverless)',
  },
];

/**
 * Détermine l'URL de base des tuiles : utilise /tiles en local dev, ou l'URL GitHub Pages / personnalisée.
 */
export function getEffectiveTilesBaseUrl(tilesBaseUrl?: string): string {
  if (tilesBaseUrl) return tilesBaseUrl;
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    return `${window.location.origin}/tiles`;
  }
  return DEFAULT_PMTILES_BASE_URL;
}

/**
 * Génère une spécification de style MapLibre GL compatible GitHub Pages.
 */
export function createPMTilesStyle(styleType: MapStyleType = 'base', tilesBaseUrl?: string): StyleSpecification {
  const baseUrl = getEffectiveTilesBaseUrl(tilesBaseUrl);
  const pmtilesUrl = `${baseUrl}/base.pmtiles`;

  let tileUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
  let labelTileUrl: string | null = null;
  let attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  let maxZoom = 19;

  if (styleType === 'editorial') {
    tileUrl = 'https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
    attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';
  } else if (styleType === 'positron') {
    tileUrl = 'https://basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}{r}.png';
    attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';
  } else if (styleType === 'dark_matter') {
    tileUrl = 'https://basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png';
    attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';
  } else if (styleType === 'satellite' || styleType === 'satellite_hybrid') {
    tileUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
    if (styleType === 'satellite_hybrid') {
      labelTileUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}';
    }
    attribution = 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';
    maxZoom = 18;
  } else if (styleType === 'natgeo') {
    tileUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}';
    attribution = 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC';
    maxZoom = 16;
  } else if (styleType === 'topographique') {
    tileUrl = 'https://a.tile.opentopomap.org/{z}/{x}/{y}.png';
    attribution = 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)';
    maxZoom = 17;
  } else if (styleType === 'cyclosm') {
    tileUrl = 'https://c.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png';
    attribution = 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Style: &copy; <a href="https://www.cyclosm.org">CyclOSM</a>';
    maxZoom = 18;
  }

  return {
    version: 8,
    sources: {
      'raster-tile-source': {
        type: 'raster',
        tiles: [tileUrl],
        tileSize: 256,
        attribution,
      },
      ...(labelTileUrl ? {
        'labels-tile-source': {
          type: 'raster',
          tiles: [labelTileUrl],
          tileSize: 256,
        },
      } : {}),
      ...(styleType === 'securite' || styleType === 'relief' ? {
        'pmtiles-source': {
          type: 'vector',
          url: `pmtiles://${pmtilesUrl}`,
        },
      } : {}),
    },
    layers: [
      {
        id: 'main-background-layer',
        type: 'raster',
        source: 'raster-tile-source',
        minzoom: 0,
        maxzoom: maxZoom,
      },
      ...(labelTileUrl ? [
        {
          id: 'labels-overlay-layer',
          type: 'raster' as const,
          source: 'labels-tile-source',
          minzoom: 0,
          maxzoom: maxZoom,
        },
      ] : []),
      ...(styleType === 'securite' || styleType === 'relief' ? [
        {
          id: 'pmtiles-theme-overlay',
          type: 'line' as const,
          source: 'pmtiles-source',
          'source-layer': 'lines',
          paint: {
            'line-color': styleType === 'securite' ? '#dc2626' : '#d97706',
            'line-width': 3,
          },
        },
      ] : []),
    ],
  };
}

