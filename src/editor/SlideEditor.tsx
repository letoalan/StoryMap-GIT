import React, { useState } from 'react';
import { StoryData, StorySlide } from '../types/story';
import { MediaUploader } from './MediaUploader';
import { exportToJsonFile } from './storyDataExport';
import { StoryMapView } from '../components/StoryMapView';
import { RichTextEditor } from './RichTextEditor';

interface SlideEditorProps {
  storyData: StoryData;
  onChange: (newData: StoryData) => void;
  onSendToStudio?: (storyData: StoryData) => void;
  lastSaved?: string | null;
  onResetDraft?: () => void;
}

export const SlideEditor: React.FC<SlideEditorProps> = ({
  storyData,
  onChange,
  onSendToStudio,
  lastSaved,
  onResetDraft,
}) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'content' | 'media'>('content');
  const [showGuide, setShowGuide] = useState<boolean>(false);
  const [showGpsDetails, setShowGpsDetails] = useState<boolean>(false);
  const [previewMode, setPreviewMode] = useState<boolean>(false);

  const handleResetWithConfirm = () => {
    if (onResetDraft && window.confirm('⚠️ Réinitialiser le brouillon ?\n\nCette action supprimera toutes vos étapes et repartira du modèle par défaut. Cette action est irréversible.')) {
      onResetDraft();
    }
  };

  const currentSlide: StorySlide = storyData.slides[activeSlideIndex] || {
    location: { lat: 37.8516, lon: 15.2853, zoom: 13 },
    text: { headline: 'Nouvelle Slide', text: '' },
  };

  const slideCount = storyData.slides.length;
  const btsTarget = 10;
  const isCompliant = slideCount >= btsTarget;

  const updateCurrentSlide = (updatedSlide: StorySlide) => {
    const newSlides = [...storyData.slides];
    newSlides[activeSlideIndex] = updatedSlide;
    onChange({ ...storyData, slides: newSlides });
  };

  const handleAddSlide = () => {
    const newSlide: StorySlide = {
      location: {
        lat: currentSlide.location ? currentSlide.location.lat + 0.002 : 37.8516,
        lon: currentSlide.location ? currentSlide.location.lon + 0.002 : 15.2853,
        zoom: 15,
      },
      text: {
        headline: `Étape ${storyData.slides.length}`,
        text: 'Description de cette étape...',
      },
    };
    const newSlides = [...storyData.slides, newSlide];
    onChange({ ...storyData, slides: newSlides });
    setActiveSlideIndex(newSlides.length - 1);
  };

  const handleDeleteSlide = (indexToDelete: number) => {
    if (storyData.slides.length <= 1) {
      alert('Une StoryMap doit contenir au moins une slide.');
      return;
    }
    const newSlides = storyData.slides.filter((_, idx) => idx !== indexToDelete);
    onChange({ ...storyData, slides: newSlides });
    if (activeSlideIndex >= newSlides.length) {
      setActiveSlideIndex(newSlides.length - 1);
    }
  };

  const handleMoveSlide = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= storyData.slides.length) return;

    const newSlides = [...storyData.slides];
    const temp = newSlides[index];
    newSlides[index] = newSlides[targetIndex];
    newSlides[targetIndex] = temp;

    onChange({ ...storyData, slides: newSlides });
    setActiveSlideIndex(targetIndex);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        width: '100%',
        boxSizing: 'border-box',
        background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)',
        borderRadius: '20px',
        color: '#0f172a',
        padding: '1.5rem',
        boxShadow: '0 20px 50px rgba(15, 23, 42, 0.06)',
        border: '1px solid #e2e8f0',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* En-tête Éditeur — Style Light Editorial */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          padding: '1.25rem 1.75rem',
          borderRadius: '16px',
          flexWrap: 'wrap',
          gap: '1rem',
          boxSizing: 'border-box',
          boxShadow: '0 4px 16px rgba(15, 23, 42, 0.03)',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <h2 style={{ margin: 0, fontSize: '1.35rem', fontWeight: 800, background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              ✍️ Mon Circuit Touristique
            </h2>
            <span
              style={{
                fontSize: '0.75rem',
                padding: '0.2rem 0.65rem',
                borderRadius: '20px',
                fontWeight: 700,
                background: isCompliant ? '#dbeafe' : '#fee2e2',
                color: isCompliant ? '#1e40af' : '#991b1b',
                border: `1px solid ${isCompliant ? '#bfdbfe' : '#fca5a5'}`,
              }}
            >
              {isCompliant ? '✓ Conforme BTS (≥10 étapes)' : `${slideCount} / ${btsTarget} étapes`}
            </span>
            {/* Badge RGPD valorisé */}
            <span
              style={{
                fontSize: '0.72rem',
                padding: '0.2rem 0.6rem',
                borderRadius: '20px',
                fontWeight: 600,
                background: '#dcfce7',
                color: '#166534',
                border: '1px solid #86efac',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
              }}
            >
              🛡️ 100% local & RGPD
            </span>
          </div>
          <div style={{ margin: '0.4rem 0 0 0', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.82rem', color: '#64748b' }}>
            {lastSaved && <span>Sauvegarde : <strong style={{ color: '#1e40af' }}>{lastSaved}</strong></span>}
            <button
              type="button"
              onClick={() => setShowGuide(!showGuide)}
              style={{
                background: showGuide ? '#dbeafe' : '#f1f5f9',
                color: showGuide ? '#1e40af' : '#475569',
                border: `1px solid ${showGuide ? '#93c5fd' : '#cbd5e1'}`,
                borderRadius: '6px',
                padding: '0.2rem 0.55rem',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              📋 {showGuide ? 'Masquer les consignes' : 'Consignes BTS'}
            </button>
            <button
              type="button"
              onClick={() => setPreviewMode(!previewMode)}
              style={{
                background: previewMode ? '#fef3c7' : '#f1f5f9',
                color: previewMode ? '#92400e' : '#475569',
                border: `1px solid ${previewMode ? '#fde68a' : '#cbd5e1'}`,
                borderRadius: '6px',
                padding: '0.2rem 0.55rem',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              👁️ {previewMode ? 'Retour éditeur' : 'Aperçu élève'}
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Bouton destructif isolé à gauche */}
          {onResetDraft && (
            <button
              type="button"
              onClick={handleResetWithConfirm}
              title="Supprimer toutes les étapes et repartir de zéro"
              style={{
                background: '#fff1f2',
                color: '#be123c',
                border: '1px solid #fecdd3',
                borderRadius: '8px',
                padding: '0.5rem 0.8rem',
                fontSize: '0.8rem',
                cursor: 'pointer',
                marginRight: 'auto',
                fontWeight: 600,
                transition: 'all 0.2s ease',
              }}
            >
              🗑️ Réinitialiser
            </button>
          )}

          {/* Bouton secondaire outline — Export JSON */}
          <button
            type="button"
            onClick={() => exportToJsonFile(storyData)}
            style={{
              background: '#ffffff',
              color: '#1e3a8a',
              border: '1.5px solid #2563eb',
              borderRadius: '8px',
              padding: '0.55rem 1rem',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            💾 Sauvegarder le fichier
          </button>

          {/* CTA principal — Passage au Studio */}
          {onSendToStudio && (
            <button
              type="button"
              onClick={() => onSendToStudio(storyData)}
              style={{
                background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '0.6rem 1.3rem',
                fontSize: '0.9rem',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)',
                transition: 'all 0.2s ease',
              }}
            >
              🚀 Exporter pour WordPress
            </button>
          )}
        </div>
      </div>

      {/* Panneau Consignes BTS rétractable */}
      {showGuide && (
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #cbd5e1',
            borderRadius: '14px',
            padding: '1rem 1.25rem',
            boxSizing: 'border-box',
            boxShadow: '0 4px 12px rgba(15, 23, 42, 0.03)',
          }}
        >
          <h4 style={{ margin: '0 0 0.6rem 0', fontSize: '0.9rem', color: '#1e3a8a', fontWeight: 700 }}>
            📋 Consignes du parcours — BTS Tourisme GIT
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.82rem', color: '#334155', lineHeight: 1.5 }}>
            <div>
              <p style={{ margin: '0 0 0.4rem 0' }}>
                <strong style={{ color: '#1d4ed8' }}>📍 Nombre d'étapes :</strong> Minimum 10 étapes géolocalisées couvrant l'intégralité du circuit.
              </p>
              <p style={{ margin: '0 0 0.4rem 0' }}>
                <strong style={{ color: '#1d4ed8' }}>📝 Par étape :</strong> Titre, description narrative, coordonnées GPS et au moins une image.
              </p>
            </div>
            <div>
              <p style={{ margin: '0 0 0.4rem 0' }}>
                <strong style={{ color: '#be123c' }}>🛡️ Sécurité :</strong> Chaque étape doit mentionner les consignes de sécurité du voyageur (numéro d'urgence, point de rassemblement).
              </p>
              <p style={{ margin: '0 0 0.4rem 0' }}>
                <strong style={{ color: '#b45309' }}>✨ Prestation VIP :</strong> Valoriser au moins une prestation haut de gamme par étape (visite privative, coupe-file, guide certifié).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Grille Principale 2 Colonnes Égalisées (50% Gauche / 50% Droite) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', width: '100%', alignItems: 'stretch', boxSizing: 'border-box' }}>
        
        {/* Colonne Gauche : Sidebar Parcours + Formulaire empilés */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            boxSizing: 'border-box',
            height: '100%',
          }}
        >
          {/* Section Mes Étapes */}
          <div
            style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '14px',
              padding: '1rem',
              boxShadow: '0 4px 12px rgba(15, 23, 42, 0.03)',
              boxSizing: 'border-box',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <h3 style={{ margin: 0, fontSize: '0.85rem', color: '#1e3a8a', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Mes Étapes ({slideCount})
              </h3>
              <button
                type="button"
                onClick={handleAddSlide}
                style={{
                  background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '0.3rem 0.6rem',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(37, 99, 235, 0.25)',
                }}
              >
                + Nouvelle étape
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {storyData.slides.map((slide, idx) => {
                const isActive = idx === activeSlideIndex;
                const isOverview = slide.type === 'overview' || idx === 0;
                const hasMedia = !!(slide.media?.url);
                const lat = slide.location?.lat?.toFixed(4) || '—';
                const lon = slide.location?.lon?.toFixed(4) || '—';

                return (
                  <div
                    key={idx}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData('text/plain', String(idx));
                      e.dataTransfer.effectAllowed = 'move';
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.dataTransfer.dropEffect = 'move';
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      const fromIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
                      if (isNaN(fromIndex) || fromIndex === idx) return;
                      const newSlides = [...storyData.slides];
                      const [moved] = newSlides.splice(fromIndex, 1);
                      newSlides.splice(idx, 0, moved);
                      onChange({ ...storyData, slides: newSlides });
                      setActiveSlideIndex(idx);
                    }}
                    onClick={() => setActiveSlideIndex(idx)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      padding: '0.55rem 0.75rem',
                      borderRadius: '8px',
                      border: `1.5px solid ${isActive ? '#2563eb' : '#e2e8f0'}`,
                      background: isActive ? '#eff6ff' : '#ffffff',
                      cursor: 'grab',
                      transition: 'all 0.15s ease',
                      boxSizing: 'border-box',
                      boxShadow: isActive ? '0 2px 8px rgba(37, 99, 235, 0.15)' : 'none',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span style={{ fontSize: '0.65rem', color: '#94a3b8', cursor: 'grab' }}>⠿</span>
                        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: isOverview ? '#b45309' : (isActive ? '#1d4ed8' : '#475569') }}>
                          {isOverview ? '📌 Présentation' : `📍 ${idx}`}
                        </span>
                      </div>
                      <div style={{ display: 'flex', gap: '0.2rem' }}>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); handleMoveSlide(idx, 'up'); }}
                          disabled={idx === 0}
                          aria-label="Monter l'étape"
                          style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '0.7rem', color: '#64748b', opacity: idx === 0 ? 0.3 : 1, padding: '0.1rem' }}
                        >▲</button>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); handleMoveSlide(idx, 'down'); }}
                          disabled={idx === storyData.slides.length - 1}
                          aria-label="Descendre l'étape"
                          style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '0.7rem', color: '#64748b', opacity: idx === storyData.slides.length - 1 ? 0.3 : 1, padding: '0.1rem' }}
                        >▼</button>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); handleDeleteSlide(idx); }}
                          aria-label="Supprimer l'étape"
                          style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '0.7rem', color: '#ef4444', padding: '0.1rem' }}
                        >✖</button>
                      </div>
                    </div>
                    <strong style={{ fontSize: '0.82rem', color: isActive ? '#1e3a8a' : '#334155', marginTop: '0.15rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {slide.text.headline || 'Étape sans titre'}
                    </strong>
                    {/* Mini-aperçu : coordonnées + indicateur média */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.15rem', fontSize: '0.68rem', color: '#94a3b8' }}>
                      <span>{lat}°N, {lon}°E</span>
                      <span>{hasMedia ? '📷' : '—'}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section Formulaire de saisie */}
          {!previewMode ? (
            <div
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '14px',
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem',
                boxShadow: '0 4px 12px rgba(15, 23, 42, 0.03)',
                boxSizing: 'border-box',
                flex: 1,
              }}
            >
              {/* Onglets Contenu / Média */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <button
                    type="button"
                    onClick={() => setActiveTab('content')}
                    style={{
                      padding: '0.35rem 0.75rem',
                      borderRadius: '7px',
                      border: 'none',
                      background: activeTab === 'content' ? '#1d4ed8' : '#f1f5f9',
                      color: activeTab === 'content' ? '#ffffff' : '#475569',
                      fontWeight: 700,
                      fontSize: '0.78rem',
                      cursor: 'pointer',
                    }}
                  >
                    📝 Contenu
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('media')}
                    style={{
                      padding: '0.35rem 0.75rem',
                      borderRadius: '7px',
                      border: 'none',
                      background: activeTab === 'media' ? '#1d4ed8' : '#f1f5f9',
                      color: activeTab === 'media' ? '#ffffff' : '#475569',
                      fontWeight: 700,
                      fontSize: '0.78rem',
                      cursor: 'pointer',
                    }}
                  >
                    🖼️ Média
                  </button>
                </div>
                <label style={{ fontSize: '0.72rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.3rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={currentSlide.type === 'overview'}
                    onChange={(e) =>
                      updateCurrentSlide({
                        ...currentSlide,
                        type: e.target.checked ? 'overview' : undefined,
                      })
                    }
                  />
                  Présentation
                </label>
              </div>

              {/* Onglet Contenu */}
              {activeTab === 'content' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', flex: 1 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#1e3a8a', marginBottom: '0.3rem' }}>
                      Nom de l'étape *
                    </label>
                    <input
                      type="text"
                      value={currentSlide.text.headline}
                      onChange={(e) =>
                        updateCurrentSlide({
                          ...currentSlide,
                          text: { ...currentSlide.text, headline: e.target.value },
                        })
                      }
                      placeholder="Ex : Le Théâtre Antique de Taormine"
                      style={{
                        width: '100%',
                        padding: '0.5rem 0.65rem',
                        borderRadius: '7px',
                        border: '1px solid #cbd5e1',
                        background: '#f8fafc',
                        color: '#0f172a',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#1e3a8a', marginBottom: '0.3rem' }}>
                      Description & Narrative (Éditeur WYSIWYG) *
                    </label>
                    <RichTextEditor
                      value={currentSlide.text.text}
                      onChange={(newHtml) =>
                        updateCurrentSlide({
                          ...currentSlide,
                          text: { ...currentSlide.text, text: newHtml },
                        })
                      }
                      placeholder="Décrivez l'intérêt patrimonial, touristique et l'accès au site..."
                    />
                  </div>

                  {/* GPS — Collapsible "Où se situe cette étape ?" */}
                  <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.65rem', background: '#f8fafc', boxSizing: 'border-box' }}>
                    <button
                      type="button"
                      onClick={() => setShowGpsDetails(!showGpsDetails)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#1e3a8a',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        padding: 0,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        width: '100%',
                      }}
                    >
                      📍 Où se situe cette étape ?
                      <span style={{ fontSize: '0.7rem', color: '#64748b', marginLeft: 'auto' }}>
                        {currentSlide.location ? `${currentSlide.location.lat.toFixed(4)}°N, ${currentSlide.location.lon.toFixed(4)}°E` : 'Non défini'}
                        {' '}{showGpsDetails ? '▴' : '▾'}
                      </span>
                    </button>
                    {showGpsDetails && (
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.4rem', marginTop: '0.5rem' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.68rem', color: '#64748b', fontWeight: 600 }}>Latitude</label>
                          <input
                            type="number"
                            step="0.00001"
                            value={currentSlide.location?.lat || 0}
                            onChange={(e) =>
                              updateCurrentSlide({
                                ...currentSlide,
                                location: {
                                  lat: parseFloat(e.target.value) || 0,
                                  lon: currentSlide.location?.lon || 0,
                                  zoom: currentSlide.location?.zoom || 14,
                                },
                              })
                            }
                            style={{ width: '100%', padding: '0.3rem', borderRadius: '4px', border: '1px solid #cbd5e1', background: '#ffffff', color: '#0f172a', fontSize: '0.8rem', boxSizing: 'border-box' }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.68rem', color: '#64748b', fontWeight: 600 }}>Longitude</label>
                          <input
                            type="number"
                            step="0.00001"
                            value={currentSlide.location?.lon || 0}
                            onChange={(e) =>
                              updateCurrentSlide({
                                ...currentSlide,
                                location: {
                                  lat: currentSlide.location?.lat || 0,
                                  lon: parseFloat(e.target.value) || 0,
                                  zoom: currentSlide.location?.zoom || 14,
                                },
                              })
                            }
                            style={{ width: '100%', padding: '0.3rem', borderRadius: '4px', border: '1px solid #cbd5e1', background: '#ffffff', color: '#0f172a', fontSize: '0.8rem', boxSizing: 'border-box' }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.68rem', color: '#64748b', fontWeight: 600 }}>Zoom</label>
                          <input
                            type="number"
                            min="1"
                            max="20"
                            value={currentSlide.location?.zoom || 14}
                            onChange={(e) =>
                              updateCurrentSlide({
                                ...currentSlide,
                                location: {
                                  lat: currentSlide.location?.lat || 0,
                                  lon: currentSlide.location?.lon || 0,
                                  zoom: parseInt(e.target.value, 10) || 14,
                                },
                              })
                            }
                            style={{ width: '100%', padding: '0.3rem', borderRadius: '4px', border: '1px solid #cbd5e1', background: '#ffffff', color: '#0f172a', fontSize: '0.8rem', boxSizing: 'border-box' }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Onglet Média */}
              {activeTab === 'media' && (
                <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.75rem', background: '#f8fafc', boxSizing: 'border-box' }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.82rem', color: '#1e3a8a', fontWeight: 700 }}>
                    Photo ou image de l'étape
                  </h4>
                  <MediaUploader
                    media={currentSlide.media}
                    onChange={(newMedia) =>
                      updateCurrentSlide({
                        ...currentSlide,
                        media: newMedia,
                      })
                    }
                  />
                </div>
              )}
            </div>
          ) : (
            /* Mode Aperçu Élève — Rendu de la slide active */
            <div
              style={{
                background: '#ffffff',
                border: '1px solid #bfdbfe',
                borderRadius: '14px',
                padding: '1.25rem',
                boxShadow: '0 4px 16px rgba(37, 99, 235, 0.08)',
                boxSizing: 'border-box',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.55rem', background: '#dbeafe', color: '#1e40af', border: '1px solid #bfdbfe', borderRadius: '20px', fontWeight: 600 }}>
                  👁️ Aperçu rendu final
                </span>
              </div>
              <h3 style={{ margin: '0 0 0.75rem 0', fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
                {currentSlide.text.headline}
              </h3>
              {currentSlide.media?.url && (
                <div style={{ marginBottom: '0.75rem', borderRadius: '10px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                  <img src={currentSlide.media.url} alt={currentSlide.media.caption || ''} style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', display: 'block' }} />
                  {currentSlide.media.caption && (
                    <p style={{ margin: '0.4rem 0.6rem', fontSize: '0.78rem', color: '#64748b', fontStyle: 'italic' }}>{currentSlide.media.caption}</p>
                  )}
                </div>
              )}
              <div
                style={{ fontSize: '0.88rem', color: '#334155', lineHeight: 1.6 }}
                dangerouslySetInnerHTML={{ __html: currentSlide.text.text || '<em style="color: #94a3b8">Aucune description rédigée.</em>' }}
              />
            </div>
          )}
        </div>

        {/* Colonne Droite : Carte Interactive Dominante (~65% de la largeur) */}
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '14px',
            padding: '0.85rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            boxShadow: '0 4px 16px rgba(15, 23, 42, 0.04)',
            boxSizing: 'border-box',
            height: '100%',
            minHeight: '600px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '0.9rem', color: '#1e3a8a', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              🗺️ Carte du parcours
            </h3>
            <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
              Étape <strong style={{ color: '#1d4ed8' }}>{activeSlideIndex + 1}</strong> / {slideCount}
            </span>
          </div>
          <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>
            La carte se positionne automatiquement sur l'étape sélectionnée.
          </p>
          
          <div style={{ flex: 1, minHeight: '500px', borderRadius: '10px', overflow: 'hidden', border: '1px solid #cbd5e1', boxShadow: '0 4px 12px rgba(15, 23, 42, 0.06)' }}>
            <StoryMapView
              location={currentSlide.location}
              slides={storyData.slides}
              currentIndex={activeSlideIndex}
              onSelectSlide={setActiveSlideIndex}
            />
          </div>
        </div>

      </div>
    </div>
  );
};
