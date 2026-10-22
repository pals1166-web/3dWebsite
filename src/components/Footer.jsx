import React from 'react';
import { Coffee, MapPin, Clock, Phone, Mail, ArrowUp, Share2, Globe } from 'lucide-react';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer({ onScrollToTop }) {
  return (
    <footer className="footer-section" aria-label="Lakehouse Nainital Footer">
      {/* Live Ambiance Status Bar */}
      <div className="footer-live-status-bar">
        <div className="section-container">
          <div className="live-status-content">
            <div className="live-status-left">
              <span className="live-pulsing-dot" />
              <span className="live-text-bold">LIVE AT LAKEHOUSE NAINITAL:</span>
              <span className="live-text-desc">Misty Evening · 14°C · Over Naini Lake · Balcony Heating Active</span>
            </div>
            <div className="live-status-right">
              <span>Sunset View: 6:18 PM</span>
              <span className="divider-dot">·</span>
              <span>Open Tonight until 11:00 PM</span>
            </div>
          </div>
        </div>
      </div>

      <div className="section-container footer-main-content">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-col brand-col">
            <div className="footer-brand">
              <div className="brand-logo-mark small">
                <Coffee size={20} className="logo-icon" />
              </div>
              <div>
                <span className="footer-brand-title">LAKEHOUSE NAINITAL</span>
                <span className="footer-brand-sub">CLOUDS & COFFEE · EST. MALL ROAD</span>
              </div>
            </div>
            <p className="footer-desc">
              Perched high on the waterfront promenade of Mall Road, inspired by Café LakeSide and THF Lakehouse. 
              Serving single-origin Himalayan roasts, wood-fired hearth sourdough bakes, and panoramic twilight views over Naini Lake.
            </p>
            <div className="social-links-row">
              <a href="#instagram" className="social-icon-btn" aria-label="Visit our social page" onClick={(e) => e.preventDefault()}>
                <Globe size={18} />
              </a>
              <a href="#share" className="social-icon-btn" aria-label="Share Lakehouse Nainital" onClick={(e) => e.preventDefault()}>
                <Share2 size={18} />
              </a>
              <a href="#maps" className="social-icon-btn" aria-label="Locate on Google Maps" onClick={(e) => e.preventDefault()}>
                <MapPin size={18} />
              </a>
            </div>
          </div>

          {/* Location & Hours */}
          <div className="footer-col">
            <h4 className="footer-heading">VISIT THE BALCONY</h4>
            <ul className="footer-list">
              <li className="footer-item">
                <MapPin size={16} className="item-icon" />
                <span>Mall Road, Opp. Boat Stand No. 3, Nainital, Uttarakhand 263002</span>
              </li>
              <li className="footer-item">
                <Clock size={16} className="item-icon" />
                <span>Open Everyday: 8:00 AM – 11:00 PM</span>
              </li>
              <li className="footer-item">
                <Phone size={16} className="item-icon" />
                <span>+91 (05942) 238-901</span>
              </li>
              <li className="footer-item">
                <Mail size={16} className="item-icon" />
                <span>balcony@lakehousenainital.com</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">EXPLORE</h4>
            <ul className="footer-links-list">
              <li><a href="#hero" className="footer-link">3D Balcony Experience</a></li>
              <li><a href="#experience" className="footer-link">Lakeside Ambiance</a></li>
              <li><a href="#menu" className="footer-link">Artisan Brews & Hearth Menu</a></li>
              <li><a href="#story" className="footer-link">The Mall Road Story</a></li>
              <li><a href="#reservation" className="footer-link">Book a Lakeside Table</a></li>
            </ul>
          </div>

          {/* Heritage Note & Back to Top */}
          <div className="footer-col">
            <h4 className="footer-heading">THE HIMALAYAN PROMISE</h4>
            <p className="promise-text">
              We charge zero booking fees. Every bean is sourced directly from sustainable high-altitude farms across the Himalayas.
            </p>
            <button
              type="button"
              className="btn btn-secondary back-to-top-btn"
              onClick={onScrollToTop}
            >
              <ArrowUp size={16} />
              <span>Back to Top</span>
            </button>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="footer-bottom-row">
          <p className="copyright-text">
            © {CURRENT_YEAR} Lakehouse Nainital — Clouds & Coffee. All rights reserved.
          </p>
          <div className="bottom-links">
            <span>Designed for Himalayan Explorers & Café Lovers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
