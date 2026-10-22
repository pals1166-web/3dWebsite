import React from 'react';
import { Coffee, Sparkles, AlertCircle, Flame } from 'lucide-react';

export default function WebGLFallback({ activeItem, onSelectItem }) {
  const itemData = {
    'hazelnut-latte': {
      title: 'Hazelnut Rosetta Latte',
      price: '₹280',
      tag: 'Chef Signature',
      desc: 'Single-estate Himalayan arabica pulled into double espresso, micro-steamed milk with hazelnut essence and artisan rosetta foam art.',
      notes: 'Notes of roasted nuts, toasted oak, and velvety chocolate cream',
      icon: Coffee,
      badge: 'Hot Beverage · Single Origin'
    },
    'fudge-shake': {
      title: 'Fudge Brownie Shake',
      price: '₹340',
      tag: 'Resort Favorite',
      desc: 'Dense molten Belgian fudge swirled with whole milk vanilla cream, piped whipped swirl, amber straw, and warm brownie bite.',
      notes: 'Rich cocoa layers, crunchy chocolate flecks, malted finish',
      icon: Sparkles,
      badge: 'Decadent · Chilled'
    },
    'wood-fired-pizza': {
      title: 'Wood-Fired Margherita Pizza',
      price: '₹460',
      tag: 'Hearth Special',
      desc: '48-hour fermented sourdough crust blistered at 450°C in our hill pine wood oven, San Marzano marinara, torn buffalo mozzarella & fresh basil.',
      notes: 'Crisp charred leopard crust, sweet tomato acidity, aromatic sweet basil',
      icon: Flame,
      badge: 'Vegetarian · Wood Fired'
    }
  };

  const current = itemData[activeItem] || itemData['hazelnut-latte'];
  const CurrentIcon = current.icon;

  return (
    <div className="webgl-fallback-container" role="region" aria-label="Cinematic Lakehouse Fallback View">
      {/* Dynamic atmospheric twilight mountain backdrop */}
      <div className="fallback-backdrop">
        <div className="fallback-sky-gradient" />
        
        {/* Layered mountain ridges */}
        <div className="fallback-mountains">
          <svg className="mountain-svg back-ridge" viewBox="0 0 1200 400" preserveAspectRatio="none">
            <path d="M0,400 L0,220 Q180,80 350,190 T700,120 T1050,170 T1200,140 L1200,400 Z" fill="#091428" />
          </svg>
          <svg className="mountain-svg mid-ridge" viewBox="0 0 1200 400" preserveAspectRatio="none">
            <path d="M0,400 L0,270 Q220,160 480,240 T880,180 T1200,230 L1200,400 Z" fill="#071120" />
          </svg>
          <svg className="mountain-svg front-ridge" viewBox="0 0 1200 400" preserveAspectRatio="none">
            <path d="M0,400 L0,320 Q280,260 620,310 T1200,280 L1200,400 Z" fill="#050c18" />
          </svg>
        </div>

        {/* Valley Rolling Mountain Clouds */}
        <div className="fallback-clouds-container">
          <div className="cloud-drift cloud-1" />
          <div className="cloud-drift cloud-2" />
          <div className="cloud-drift cloud-3" />
        </div>

        {/* Reflective lake water surface with animated ripples & floating boats */}
        <div className="fallback-water">
          <div className="water-ripples" />
          <div className="water-amber-reflection" />

          {/* Wooden Rowing Boats on Lake Naini */}
          <div className="fallback-boat fallback-boat-1">
            <svg viewBox="0 0 120 45" className="boat-svg" aria-label="Wooden rowing boat on Naini Lake">
              {/* Wooden Hull */}
              <path d="M5,16 Q60,32 115,16 Q100,26 60,26 Q20,26 5,16 Z" fill="#3d2415" />
              {/* Gunwale Rim Trim */}
              <path d="M5,16 Q60,24 115,16" stroke="#e6a15c" strokeWidth="2.5" fill="none" />
              {/* Cross Benches */}
              <line x1="42" y1="21" x2="42" y2="25" stroke="#6b4423" strokeWidth="3" />
              <line x1="78" y1="21" x2="78" y2="25" stroke="#6b4423" strokeWidth="3" />
              {/* Oars */}
              <line x1="58" y1="18" x2="35" y2="34" stroke="#bf8547" strokeWidth="2" strokeLinecap="round" />
              <line x1="62" y1="18" x2="85" y2="34" stroke="#bf8547" strokeWidth="2" strokeLinecap="round" />
              {/* Bow Lantern Post & Glow */}
              <line x1="110" y1="16" x2="110" y2="8" stroke="#1f242c" strokeWidth="2" />
              <circle cx="110" cy="7" r="4.5" fill="#ffe299" className="lantern-glow-dot" />
            </svg>
            <div className="boat-reflection" />
          </div>

          <div className="fallback-boat fallback-boat-2">
            <svg viewBox="0 0 90 35" className="boat-svg" aria-label="Distant rowing boat on Naini Lake">
              <path d="M5,12 Q45,24 85,12 Q75,20 45,20 Q15,20 5,12 Z" fill="#29180e" />
              <path d="M5,12 Q45,18 85,12" stroke="#229988" strokeWidth="2" fill="none" />
              <line x1="82" y1="12" x2="82" y2="6" stroke="#1f242c" strokeWidth="1.5" />
              <circle cx="82" cy="5" r="3.5" fill="#ffd97d" className="lantern-glow-dot" />
            </svg>
            <div className="boat-reflection small" />
          </div>
        </div>

        {/* Animated drifting mist layers */}
        <div className="fallback-mist mist-layer-1" />
        <div className="fallback-mist mist-layer-2" />

        {/* Balcony railing and warm Edison glowing lamps */}
        <div className="fallback-balcony">
          <div className="fallback-edison-string">
            <div className="edison-bulb-lamp bulb-left" />
            <div className="edison-bulb-lamp bulb-center" />
            <div className="edison-bulb-lamp bulb-right" />
          </div>
          <div className="fallback-railing-wood" />
          <div className="fallback-railing-spindles" />
        </div>
      </div>

      {/* Notice badge */}
      <div className="fallback-notice-pill">
        <AlertCircle size={14} className="text-amber-400" />
        <span>Hardware WebGL Disabled · Running High-Fidelity 2D Cinematic Mode</span>
      </div>

      {/* Active Dish/Drink Highlight Card */}
      <div className="fallback-content-card glass-panel">
        <div className="fallback-badge-row">
          <span className="gold-pill">{current.tag}</span>
          <span className="muted-pill">{current.badge}</span>
        </div>

        <div className="fallback-item-title-row">
          <div className="item-icon-circle">
            <CurrentIcon size={26} className="text-amber-300" />
          </div>
          <div>
            <h3 className="fallback-item-title">{current.title}</h3>
            <span className="fallback-item-price">{current.price}</span>
          </div>
        </div>

        <p className="fallback-item-desc">{current.desc}</p>
        
        <div className="fallback-notes-box">
          <span className="notes-label">Aroma & Texture:</span>
          <p className="notes-text">{current.notes}</p>
        </div>

        {/* Switcher tabs */}
        <div className="fallback-item-switcher">
          <span className="switcher-label">Select Tabletop Specialty:</span>
          <div className="switcher-buttons">
            <button
              type="button"
              className={`switcher-btn ${activeItem === 'hazelnut-latte' ? 'active' : ''}`}
              onClick={() => onSelectItem('hazelnut-latte')}
            >
              ☕ Hazelnut Latte
            </button>
            <button
              type="button"
              className={`switcher-btn ${activeItem === 'fudge-shake' ? 'active' : ''}`}
              onClick={() => onSelectItem('fudge-shake')}
            >
              🥤 Fudge Shake
            </button>
            <button
              type="button"
              className={`switcher-btn ${activeItem === 'wood-fired-pizza' ? 'active' : ''}`}
              onClick={() => onSelectItem('wood-fired-pizza')}
            >
              🍕 Wood-Fired Pizza
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
