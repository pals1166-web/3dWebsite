import React, { useState, useEffect } from 'react';
import { Menu, X, Coffee, Calendar, Volume2, VolumeX } from 'lucide-react';

export default function Navbar({ onOpenReservation, isMuted, onToggleAudio }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Brand Logo */}
        <a href="#hero" className="navbar-brand" onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}>
          <div className="brand-logo-mark">
            <Coffee size={22} className="logo-icon" />
            <span className="logo-glow" />
          </div>
          <div className="brand-text">
            <span className="brand-title">LAKEHOUSE</span>
            <span className="brand-subtitle">NAINITAL · CLOUDS & COFFEE</span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <button type="button" className="nav-link" onClick={() => scrollToSection('hero')}>
            Balcony View
          </button>
          <button type="button" className="nav-link" onClick={() => scrollToSection('experience')}>
            Ambiance
          </button>
          <button type="button" className="nav-link" onClick={() => scrollToSection('menu')}>
            Artisan Menu
          </button>
          <button type="button" className="nav-link" onClick={() => scrollToSection('story')}>
            Our Story
          </button>
          <button type="button" className="nav-link" onClick={() => scrollToSection('reservation')}>
            Reservations
          </button>
        </nav>

        {/* Actions Group (Ambiance Audio, Status Pill, CTA) */}
        <div className="navbar-actions">
          {/* Subtle Ambient Sound Toggle */}
          <button
            type="button"
            className={`audio-toggle-btn ${!isMuted ? 'active' : ''}`}
            onClick={onToggleAudio}
            title={isMuted ? "Enable Himalayan mist ambiance sound" : "Mute ambiance sound"}
            aria-label={isMuted ? "Unmute atmospheric sound" : "Mute atmospheric sound"}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            <span className="audio-label">{isMuted ? 'Muted' : 'Mist Sound'}</span>
          </button>

          {/* Quick Book CTA */}
          <button
            type="button"
            className="btn btn-nav-cta"
            onClick={onOpenReservation}
          >
            <Calendar size={16} />
            <span>Book Table</span>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-inner">
          <div className="mobile-brand-info">
            <span className="gold-pill">Mall Road · Nainital</span>
            <p className="mobile-tagline">Misty evenings overlooking Naini Lake</p>
          </div>

          <nav className="mobile-links" aria-label="Mobile Navigation">
            <button type="button" className="mobile-link" onClick={() => scrollToSection('hero')}>
              <span>3D Balcony Scene</span>
              <span className="link-arrow">→</span>
            </button>
            <button type="button" className="mobile-link" onClick={() => scrollToSection('experience')}>
              <span>Lakeside Experience</span>
              <span className="link-arrow">→</span>
            </button>
            <button type="button" className="mobile-link" onClick={() => scrollToSection('menu')}>
              <span>Artisan Food & Drinks</span>
              <span className="link-arrow">→</span>
            </button>
            <button type="button" className="mobile-link" onClick={() => scrollToSection('story')}>
              <span>Café Heritage & Story</span>
              <span className="link-arrow">→</span>
            </button>
            <button type="button" className="mobile-link" onClick={() => scrollToSection('reservation')}>
              <span>Book Your Table</span>
              <span className="link-arrow">→</span>
            </button>
          </nav>

          <div className="mobile-drawer-footer">
            <button
              type="button"
              className="btn btn-primary full-width"
              onClick={() => { setMobileMenuOpen(false); onOpenReservation(); }}
            >
              <Calendar size={18} />
              <span>Reserve Lakefront Table</span>
            </button>

            <div className="mobile-weather-pill">
              <span className="live-dot" />
              <span>Naini Lake Mist · 14°C · Balcony Heating Active</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
