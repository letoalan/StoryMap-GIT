import { MapStyleType } from '../utils/pmtilesProtocol';

export interface StorySlideLocation {
  lat: number;
  lon: number;
  zoom: number;
}

export interface StorySlideText {
  headline: string;
  text: string;
}

export interface StorySlideMedia {
  url: string;
  caption?: string;
  credit?: string;
}

export interface StorySlide {
  location: StorySlideLocation;
  text: StorySlideText;
  media?: StorySlideMedia;
  type?: string;
}

export interface StoryData {
  slides: StorySlide[];
  mapStyle?: MapStyleType;
}

// Types pour la donnée brute Knight Lab
export interface KnightLabRawLocation {
  lat?: number | string;
  lon?: number | string;
  zoom?: number | string;
}

export interface KnightLabRawSlide {
  type?: string;
  location?: KnightLabRawLocation;
  text?: {
    headline?: string;
    text?: string;
  };
  media?: {
    url?: string;
    caption?: string;
    credit?: string;
  };
}

export interface KnightLabRawData {
  storymap?: {
    map_type?: string;
    mapStyle?: string;
    slides?: KnightLabRawSlide[];
  };
  story?: {
    map_type?: string;
    mapStyle?: string;
    slides?: KnightLabRawSlide[];
  };
  slides?: KnightLabRawSlide[];
  map_type?: string;
  mapStyle?: string;
}
