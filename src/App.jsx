import React, { useState, useCallback, useMemo } from 'react';
import Navbar from './components/Navbar';
import HeroScene from './components/HeroScene';
import FeatureGrid from './components/FeatureGrid';
import InteractiveMenu from './components/InteractiveMenu';
import StorySection from './components/StorySection';
import ReservationSection from './components/ReservationSection';
import PreOrderDrawer from './components/PreOrderDrawer';
import Footer from './components/Footer';
import { initAmbientAudio, setAmbientVolume } from './utils/ambientAudio';
import { ShoppingBag } from 'lucide-react';
import './App.css';

export default function App() {
  const [activeHeroItem, setActiveHeroItem] = useState('hazelnut-latte');
  const [activeView, setActiveView] = useState('balcony');
  const [orderItems, setOrderItems] = useState({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [audioInitialized, setAudioInitialized] = useState(false);

  // Audio Toggle
  const handleToggleAudio = useCallback(() => {
    if (!audioInitialized) {
      initAmbientAudio();
      setAudioInitialized(true);
      setIsMuted(false);
      setAmbientVolume(0.06);
    } else {
      if (isMuted) {
        setAmbientVolume(0.06);
        setIsMuted(false);
      } else {
        setAmbientVolume(0);
        setIsMuted(true);
      }
    }
  }, [audioInitialized, isMuted]);

  // Order Handlers
  const handleAddToCart = useCallback((dish) => {
    setOrderItems((prev) => {
      const current = prev[dish.id];
      const newQty = current ? current.quantity + 1 : 1;
      return {
        ...prev,
        [dish.id]: {
          ...dish,
          quantity: newQty
        }
      };
    });
  }, []);

  const handleUpdateQuantity = useCallback((id, quantity) => {
    setOrderItems((prev) => {
      if (quantity <= 0) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return {
        ...prev,
        [id]: {
          ...prev[id],
          quantity
        }
      };
    });
  }, []);

  const handleRemoveItem = useCallback((id) => {
    setOrderItems((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const handleClearOrder = useCallback(() => {
    setOrderItems({});
  }, []);

  const preOrderTotal = useMemo(() => {
    return Object.values(orderItems).reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [orderItems]);

  const totalItemCount = useMemo(() => {
    return Object.values(orderItems).reduce((sum, item) => sum + item.quantity, 0);
  }, [orderItems]);

  // Smooth Scroll Handlers
  const handleOpenReservation = useCallback(() => {
    const el = document.getElementById('reservation');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      // Focus name input after brief delay
      setTimeout(() => {
        const input = document.getElementById('fullName');
        if (input) input.focus();
      }, 500);
    }
  }, []);

  const handleScrollToMenu = useCallback(() => {
    const el = document.getElementById('menu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleScrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="lakehouse-app">
      {/* Top Navigation */}
      <Navbar
        onOpenReservation={handleOpenReservation}
        isMuted={isMuted}
        onToggleAudio={handleToggleAudio}
      />

      <main>
        {/* Hero 3D WebGL Balcony Scene */}
        <HeroScene
          activeHeroItem={activeHeroItem}
          setActiveHeroItem={setActiveHeroItem}
          activeView={activeView}
          setActiveView={setActiveView}
          onOpenReservation={handleOpenReservation}
          onScrollToMenu={handleScrollToMenu}
        />

        {/* 3-Card Signature Experience Grid */}
        <FeatureGrid
          onSelectView={(viewKey) => {
            setActiveView(viewKey);
            const hero = document.getElementById('hero');
            if (hero) hero.scrollIntoView({ behavior: 'smooth' });
          }}
          onSelectHeroItem={(itemKey) => {
            setActiveHeroItem(itemKey);
            setActiveView('tabletop');
          }}
          onOpenReservation={handleOpenReservation}
        />

        {/* Interactive Menu Showcase (3D Sync) */}
        <InteractiveMenu
          activeHeroItem={activeHeroItem}
          onSelectHeroItem={setActiveHeroItem}
          orderItems={orderItems}
          onAddToCart={handleAddToCart}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenReservation={handleOpenReservation}
        />

        {/* Café LakeSide & THF Heritage Story */}
        <StorySection />

        {/* Reservation CTA Form & Confirmation */}
        <ReservationSection
          orderItems={orderItems}
          onClearOrder={handleClearOrder}
          preOrderTotal={preOrderTotal}
        />
      </main>

      {/* Footer */}
      <Footer onScrollToTop={handleScrollToTop} />

      {/* Floating Pre-Order Tray Trigger (When items added) */}
      {totalItemCount > 0 && (
        <button
          type="button"
          className="floating-cart-pill glass-card"
          onClick={() => setIsCartOpen(true)}
          aria-label={`View pre-order tray with ${totalItemCount} items`}
        >
          <div className="floating-cart-badge">
            <ShoppingBag size={18} />
            <span className="cart-count">{totalItemCount}</span>
          </div>
          <div className="floating-cart-info">
            <span className="floating-cart-label">Pre-Order Tray</span>
            <span className="floating-cart-price">₹{preOrderTotal}</span>
          </div>
        </button>
      )}

      {/* Pre-Order Side Drawer */}
      <PreOrderDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        orderItems={orderItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearOrder={handleClearOrder}
        onProceedToReservation={handleOpenReservation}
      />
    </div>
  );
}
