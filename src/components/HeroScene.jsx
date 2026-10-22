import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Utensils, CloudFog, Coffee, Sparkles, Flame, ChevronDown, Calendar, Compass } from 'lucide-react';
import { initThreeScene } from '../three/sceneManager';
import { isWebGLAvailable } from '../utils/webglCheck';
import WebGLFallback from './WebGLFallback';

export default function HeroScene({
  activeHeroItem,
  setActiveHeroItem,
  activeView = 'balcony',
  setActiveView,
  onOpenReservation,
  onScrollToMenu
}) {
  const containerRef = useRef(null);
  const sceneControllerRef = useRef(null);

  // Initialize WebGL availability synchronously from state initializer
  const [hasWebGL, setHasWebGL] = useState(() => isWebGLAvailable());

  const initialItemRef = useRef(activeHeroItem);
  const initialViewRef = useRef(activeView);

  // Initialize Three.js scene
  useEffect(() => {
    if (!hasWebGL || !containerRef.current) return;

    try {
      const controller = initThreeScene(containerRef.current);
      sceneControllerRef.current = controller;

      if (initialItemRef.current && controller.setActiveItem) {
        controller.setActiveItem(initialItemRef.current);
      }
      if (initialViewRef.current && controller.setView) {
        controller.setView(initialViewRef.current);
      }
    } catch (err) {
      console.warn('WebGL initialization failed, falling back to 2D cinematic view:', err);
      queueMicrotask(() => setHasWebGL(false));
    }

    return () => {
      if (sceneControllerRef.current) {
        sceneControllerRef.current.dispose();
        sceneControllerRef.current = null;
      }
    };
  }, [hasWebGL]);

  // Sync activeHeroItem changes to Three.js controller
  useEffect(() => {
    if (sceneControllerRef.current && activeHeroItem) {
      sceneControllerRef.current.setActiveItem(activeHeroItem);
    }
  }, [activeHeroItem]);

  // Sync activeView changes to Three.js controller
  useEffect(() => {
    if (sceneControllerRef.current && activeView) {
      sceneControllerRef.current.setView(activeView);
    }
  }, [activeView]);

  // Handle View Change
  const handleSelectView = useCallback((viewKey) => {
    if (setActiveView) {
      setActiveView(viewKey);
    }
    if (sceneControllerRef.current) {
      sceneControllerRef.current.setView(viewKey);
    }
  }, [setActiveView]);

  // Handle Hero Item Change
  const handleSelectHeroItem = useCallback((itemKey) => {
    setActiveHeroItem(itemKey);
    if (sceneControllerRef.current) {
      sceneControllerRef.current.setActiveItem(itemKey);
      handleSelectView('tabletop');
    }
  }, [setActiveHeroItem, handleSelectView]);

  return (
    <section className="hero-section" id="hero" aria-label="3D Interactive Balcony Experience">
      {/* 3D Canvas or Fallback */}
      {hasWebGL ? (
        <div className="three-canvas-container" ref={containerRef} aria-hidden="true" />
      ) : (
        <WebGLFallback
          activeItem={activeHeroItem}
          onSelectItem={handleSelectHeroItem}
        />
      )}

      {/* Atmospheric Vignette & Gradient Overlays */}
      <div className="hero-vignette-overlay" />
      <div className="hero-ambient-glow" />

      {/* Hero UI Content (Responsive from 375px to 1440px+) */}
      <div className="hero-content-wrapper">
        <div className="hero-narrative">
          {/* Himalayan Heritage Tag */}
          <div className="hero-pill-tag">
            <span className="live-dot" />
            <span>Mall Road · High-Altitude Balcony · Nainital</span>
          </div>

          <h1 className="hero-title">
            Misty Evenings, <br />
            <span className="gold-shimmer-text">Clouds & Coffee.</span>
          </h1>

          <p className="hero-subtitle">
            Perched directly over the tranquil waters of Naini Lake. Savor single-origin artisan roasts, 
            wood-fired sourdough bakes, and panoramic Himalayan twilight under glowing Edison bulbs.
          </p>

          {/* Primary Action Buttons */}
          <div className="hero-cta-group">
            <button
              type="button"
              className="btn btn-primary"
              onClick={onOpenReservation}
              aria-label="Reserve a lake-facing table"
            >
              <Calendar size={18} />
              <span>Reserve Lakeside Table</span>
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={onScrollToMenu}
              aria-label="View our culinary and brews menu"
            >
              <Utensils size={18} />
              <span>Explore Menu</span>
            </button>
          </div>

          {/* Micro stats / Trust indicators */}
          <div className="hero-stats-row">
            <div className="stat-pill">
              <span className="stat-value">6,837 ft</span>
              <span className="stat-label">Altitude</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-pill">
              <span className="stat-value">14°C</span>
              <span className="stat-label">Lake Mist</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-pill">
              <span className="stat-value">4.9 ★</span>
              <span className="stat-label">Lakeside Dining</span>
            </div>
          </div>
        </div>

        {/* Floating 3D Controls Console */}
        <div className="hero-controls-panel glass-card">
          {/* View Switcher Controls */}
          <div className="controls-group">
            <div className="controls-header">
              <span className="controls-label">Interactive Viewpoint</span>
              <span className="controls-badge">Real-time 3D</span>
            </div>
            <div className="view-switcher-bar" role="tablist" aria-label="3D View Angles">
              <button
                type="button"
                role="tab"
                aria-selected={activeView === 'balcony'}
                className={`view-btn ${activeView === 'balcony' ? 'active' : ''}`}
                onClick={() => handleSelectView('balcony')}
                title="Pan over balcony, lake, and Himalayan ridges"
              >
                <Compass size={16} />
                <span>Balcony View</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeView === 'tabletop'}
                className={`view-btn ${activeView === 'tabletop' ? 'active' : ''}`}
                onClick={() => handleSelectView('tabletop')}
                title="Cinematic close-up on the wooden table dish"
              >
                <Utensils size={16} />
                <span>Tabletop Menu</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeView === 'lake'}
                className={`view-btn ${activeView === 'lake' ? 'active' : ''}`}
                onClick={() => handleSelectView('lake')}
                title="Moody low perspective over drifting mist and water"
              >
                <CloudFog size={16} />
                <span>Lake Mist</span>
              </button>
            </div>
          </div>

          {/* Tabletop 3D Dish Selector Bar */}
          <div className="controls-group">
            <div className="controls-header">
              <span className="controls-label">Featured on Table</span>
              <span className="controls-sub">Click to inspect in 3D</span>
            </div>
            <div className="dish-selector-grid">
              <button
                type="button"
                className={`dish-select-btn ${activeHeroItem === 'hazelnut-latte' ? 'active' : ''}`}
                onClick={() => handleSelectHeroItem('hazelnut-latte')}
              >
                <div className="dish-btn-icon">
                  <Coffee size={16} />
                </div>
                <div className="dish-btn-text">
                  <span className="dish-btn-name">Hazelnut Latte</span>
                  <span className="dish-btn-price">₹280</span>
                </div>
              </button>

              <button
                type="button"
                className={`dish-select-btn ${activeHeroItem === 'fudge-shake' ? 'active' : ''}`}
                onClick={() => handleSelectHeroItem('fudge-shake')}
              >
                <div className="dish-btn-icon">
                  <Sparkles size={16} />
                </div>
                <div className="dish-btn-text">
                  <span className="dish-btn-name">Fudge Shake</span>
                  <span className="dish-btn-price">₹340</span>
                </div>
              </button>

              <button
                type="button"
                className={`dish-select-btn ${activeHeroItem === 'wood-fired-pizza' ? 'active' : ''}`}
                onClick={() => handleSelectHeroItem('wood-fired-pizza')}
              >
                <div className="dish-btn-icon">
                  <Flame size={16} />
                </div>
                <div className="dish-btn-text">
                  <span className="dish-btn-name">Wood-Fired Pizza</span>
                  <span className="dish-btn-price">₹460</span>
                </div>
              </button>
            </div>
          </div>

          {/* Mobile prompt */}
          <div className="controls-hint">
            <span>Drag or tilt device to explore scene perspective</span>
          </div>
        </div>
      </div>

      {/* Downward indicator */}
      <div className="hero-scroll-indicator" onClick={onScrollToMenu} role="button" tabIndex={0}>
        <span className="scroll-text">Explore The Experience</span>
        <ChevronDown size={18} className="scroll-arrow" />
      </div>
    </section>
  );
}
