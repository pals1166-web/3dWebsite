import React from 'react';
import { Coffee, Flame, Compass, Sparkles, ChevronRight } from 'lucide-react';

export default function FeatureGrid({ onSelectView, onSelectHeroItem, onOpenReservation }) {
  const features = [
    {
      id: 'balcony-lake',
      tag: 'Mall Road Landmark',
      title: 'Heated Balcony Over Naini Lake',
      subtitle: 'Where mountain mist meets glowing Edison warmth',
      description: 'Suspended directly along the scenic Mall Road promenade with uninterrupted panoramic vistas across Naini Lake. Enjoy cushioned cedar seating, radiant overhead balcony heaters, and cozy Himalayan woolen throws during crisp twilight hours.',
      icon: Compass,
      highlights: ['Heated Open-Air Balcony', 'Panoramic Twilight Vistas', 'Gentle Lake Mist & Pine Air'],
      actionLabel: 'Switch to Balcony 3D View',
      actionHandler: () => {
        onSelectView('balcony');
        const hero = document.getElementById('hero');
        if (hero) hero.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'mountain-brews',
      tag: 'Craft Coffee Lab',
      title: 'Single-Estate Mountain Roasts',
      subtitle: 'Harvested from high-altitude slopes, perfected by hand',
      description: 'Directly sourced shade-grown Arabica from sustainable organic estates. From micro-lot pour-overs and siphon brews to our signature Hazelnut Rosetta Latte and velvety chocolate cold brews, each cup celebrates true Himalayan craftsmanship.',
      icon: Coffee,
      highlights: ['Small-Batch Roasted Beans', 'Artisan Rosetta Foam Art', 'Botanical Hill Infusions'],
      actionLabel: 'Inspect Latte in 3D',
      actionHandler: () => {
        onSelectHeroItem('hazelnut-latte');
        const hero = document.getElementById('hero');
        if (hero) hero.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'wood-fired-hearth',
      tag: 'Slow Artisan Bakery',
      title: 'Pine Wood-Fired Hearth & Oven',
      subtitle: '48-hour fermented sourdough & decadent bakes',
      description: 'Our traditional refractory clay hearth burns sustainably dried local pine logs at 450°C, producing charred, blistered Neapolitan crusts, bubbling mozzarella, and sizzling skillet fudge brownies that warm the mountain chill.',
      icon: Flame,
      highlights: ['48-Hour Cold Fermentation', 'San Marzano & Buffalo Mozzarella', 'Molten Cast-Iron Bakes'],
      actionLabel: 'Inspect Pizza in 3D',
      actionHandler: () => {
        onSelectHeroItem('wood-fired-pizza');
        const hero = document.getElementById('hero');
        if (hero) hero.scrollIntoView({ behavior: 'smooth' });
      }
    }
  ];

  return (
    <section className="feature-section" id="experience" aria-label="Lakehouse Signature Experiences">
      <div className="section-container">
        {/* Header */}
        <div className="section-header text-center">
          <div className="section-eyebrow">
            <Sparkles size={14} className="eyebrow-icon" />
            <span>THE NAINI LAKESIDE RITUAL</span>
          </div>
          <h2 className="section-title">
            Crafted for <span className="gold-shimmer-text">Slow Mountain Evenings</span>
          </h2>
          <p className="section-description">
            Inspired by the timeless romance of Nainital’s vintage waterfront promenade. 
            Step off Mall Road into a warm, candlelit sanctuary above the reflective waters.
          </p>
        </div>

        {/* 3-Card Responsive Grid */}
        <div className="feature-grid">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="feature-card glass-panel" style={{ '--card-index': index }}>
                {/* Glowing border highlight */}
                <div className="card-ambient-glow" />

                <div className="card-top">
                  <div className="card-icon-box">
                    <Icon size={24} className="feature-icon" />
                  </div>
                  <span className="card-badge">{item.tag}</span>
                </div>

                <div className="card-content">
                  <h3 className="card-title">{item.title}</h3>
                  <h4 className="card-subtitle">{item.subtitle}</h4>
                  <p className="card-text">{item.description}</p>

                  {/* Feature Highlights Pills */}
                  <ul className="card-highlights">
                    {item.highlights.map((hl, i) => (
                      <li key={i} className="highlight-pill">
                        <span className="check-dot" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="card-footer">
                  <button
                    type="button"
                    className="card-action-btn"
                    onClick={item.actionHandler}
                  >
                    <span>{item.actionLabel}</span>
                    <ChevronRight size={16} className="btn-arrow" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating Balcony Atmosphere Banner */}
        <div className="atmosphere-ribbon glass-card">
          <div className="ribbon-content">
            <div className="ribbon-text">
              <span className="gold-pill">Lakeside Balcony Seating</span>
              <h3>Planning a Sunset Dinner or High-Tea Over Naini Lake?</h3>
              <p>Balcony tables fill quickly between 4:30 PM (Golden Hour) and 8:30 PM (Starlight Evening). Advance reservations strongly recommended.</p>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={onOpenReservation}
            >
              <span>Reserve Priority Table</span>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
