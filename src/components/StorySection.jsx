import React from 'react';
import { Compass, Flame, BookOpen, Music, Shield, MapPin } from 'lucide-react';

export default function StorySection() {
  const highlights = [
    {
      icon: Flame,
      title: 'Balcony Radiant Heating',
      text: 'Overhead quartz heaters and soft Kumaoni wool throws ensure your balcony table stays cozy even during chilly 12°C lake mist.'
    },
    {
      icon: Music,
      title: 'Acoustic Twilight Sessions',
      text: 'Gentle live acoustic guitar and indie folk music echo softly over the rippling lake water every Friday and Saturday evening.'
    },
    {
      icon: BookOpen,
      title: 'The Mountain Library',
      text: 'A curated corner of Himalayan mountaineering memoirs, botanical illustrations, and classic novels to read beside your warm pour-over.'
    },
    {
      icon: Shield,
      title: 'Kumaon Organic Sourcing',
      text: 'Every drop of wild forest honey, pahadi herb, and organic stone-milled flour comes directly from local high-altitude farming families.'
    }
  ];

  return (
    <section className="story-section" id="story" aria-label="Café Lakehouse Heritage and Philosophy">
      <div className="section-container">
        <div className="story-grid">
          {/* Narrative Column */}
          <div className="story-content">
            <div className="section-eyebrow">
              <Compass size={14} className="eyebrow-icon" />
              <span>THE MALL ROAD SANCTUARY</span>
            </div>

            <h2 className="section-title">
              Born from a Love of <br />
              <span className="gold-shimmer-text">Misty Himalayan Twilight</span>
            </h2>

            <p className="story-paragraph">
              Inspired by the iconic spirit of Café LakeSide and THF Lakehouse on Nainital’s historic Mall Road, 
              <strong> Lakehouse Nainital</strong> was created as an escape from the rush of everyday life. 
              Here, time slows down to the rhythmic lap of lake water against wooden hulls and the rising steam of freshly roasted Arabica.
            </p>

            <p className="story-paragraph">
              Whether you arrive during the golden glow of late afternoon or as twilight settles over the Cheena Peak ridge, 
              our heated balcony puts you in front-row seats to nature's most captivating spectacle—drifting mountain clouds, 
              starry pine silhouettes, and the warm, amber glow of filament lamps.
            </p>

            <div className="story-quote glass-card">
              <p className="quote-text">
                "There is no finer companion to a steaming cup of artisan hazelnut coffee than the silent, misty waters of Naini Lake at dusk."
              </p>
              <span className="quote-author">— The Lakehouse Journal, Mall Road</span>
            </div>
          </div>

          {/* Visual Showcase Column */}
          <div className="story-visual-column">
            <div className="story-card-stack">
              {highlights.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="story-feature-card glass-panel">
                    <div className="story-icon-box">
                      <Icon size={22} className="text-amber-300" />
                    </div>
                    <div className="story-card-text">
                      <h3 className="story-card-title">{item.title}</h3>
                      <p className="story-card-desc">{item.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Location callout */}
            <div className="location-callout glass-card">
              <MapPin size={20} className="text-amber-400" />
              <div>
                <span className="loc-title">Mall Road Promenade, Nainital</span>
                <span className="loc-sub">Directly opposite Lake Boat Stand No. 3 · Valet & Lake Access</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
