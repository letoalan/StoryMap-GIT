import React from 'react';
import { StorySlide as StorySlideType } from '../types/story';

interface StorySlideProps {
  slide: StorySlideType;
  currentIndex: number;
  totalSlides: number;
  onPrev: () => void;
  onNext: () => void;
}

export const StorySlide: React.FC<StorySlideProps> = ({
  slide,
  currentIndex,
  totalSlides,
  onPrev,
  onNext,
}) => {
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalSlides - 1;

  return (
    <div className="story-slide-panel" style={styles.panel}>
      <div style={styles.header}>
        <span style={styles.stepBadge}>
          {slide.type === 'overview' ? '👑 Présentation Générale' : `📍 Étape ${currentIndex + 1} / ${totalSlides}`}
        </span>
      </div>

      <h2 style={styles.headline}>{slide.text.headline}</h2>

      {slide.media?.url && (
        <div style={styles.mediaContainer}>
          <img src={slide.media.url} alt={slide.media.caption || slide.text.headline} style={styles.mediaImage} />
          {(slide.media.caption || slide.media.credit) && (
            <p style={styles.mediaCaption}>
              {slide.media.caption}
              {slide.media.credit && <span style={styles.mediaCredit}> — Crédit : {slide.media.credit}</span>}
            </p>
          )}
        </div>
      )}

      <div
        style={styles.textContent}
        dangerouslySetInnerHTML={{ __html: slide.text.text }}
      />

      <div style={styles.navButtons}>
        <button
          onClick={onPrev}
          disabled={isFirst}
          style={{
            ...styles.button,
            ...(isFirst ? styles.buttonDisabled : styles.buttonPrimary),
          }}
        >
          ← Précédent
        </button>
        <button
          onClick={onNext}
          disabled={isLast}
          style={{
            ...styles.button,
            ...(isLast ? styles.buttonDisabled : styles.buttonPrimary),
          }}
        >
          Suivant →
        </button>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  panel: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: '1.5rem',
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    boxShadow: '0 4px 16px rgba(15, 23, 42, 0.04)',
    borderRadius: '16px',
    overflowY: 'auto',
    color: '#0f172a',
    boxSizing: 'border-box',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  header: {
    marginBottom: '0.75rem',
  },
  stepBadge: {
    display: 'inline-block',
    padding: '0.3rem 0.8rem',
    background: '#dbeafe',
    color: '#1e40af',
    border: '1px solid #bfdbfe',
    borderRadius: '9999px',
    fontSize: '0.8rem',
    fontWeight: 700,
  },
  headline: {
    margin: '0 0 1rem 0',
    fontSize: '1.45rem',
    fontWeight: 800,
    color: '#0f172a',
    lineHeight: 1.3,
  },
  mediaContainer: {
    marginBottom: '1rem',
    borderRadius: '12px',
    overflow: 'hidden',
    border: '1px solid #e2e8f0',
    background: '#f8fafc',
  },
  mediaImage: {
    width: '100%',
    maxHeight: '260px',
    objectFit: 'cover',
    display: 'block',
  },
  mediaCaption: {
    margin: '0.6rem 0.8rem',
    fontSize: '0.85rem',
    color: '#64748b',
    fontStyle: 'italic',
  },
  mediaCredit: {
    fontWeight: 600,
    color: '#1d4ed8',
    fontStyle: 'normal',
  },
  textContent: {
    fontSize: '0.95rem',
    color: '#334155',
    lineHeight: 1.6,
    marginBottom: '1.5rem',
    flexGrow: 1,
  },
  navButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '1rem',
    marginTop: 'auto',
    paddingTop: '1rem',
    borderTop: '1px solid #e2e8f0',
  },
  button: {
    padding: '0.65rem 1.25rem',
    borderRadius: '10px',
    border: 'none',
    fontWeight: 800,
    fontSize: '0.85rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  buttonPrimary: {
    background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)',
    color: '#ffffff',
    boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)',
  },
  buttonDisabled: {
    background: '#f1f5f9',
    color: '#94a3b8',
    cursor: 'not-allowed',
  },
};
