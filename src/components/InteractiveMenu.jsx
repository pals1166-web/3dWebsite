import React, { useState } from 'react';
import { Coffee, Sparkles, Flame, Eye, Plus, Check, ShoppingBag, Leaf, Star } from 'lucide-react';

export default function InteractiveMenu({
  activeHeroItem,
  onSelectHeroItem,
  orderItems,
  onAddToCart,
  onOpenCart,
  onOpenReservation
}) {
  const [activeCategory, setActiveCategory] = useState('brews');

  const categories = [
    { id: 'brews', name: 'Signature Brews', icon: Coffee },
    { id: 'shakes', name: 'Decadent Shakes', icon: Sparkles },
    { id: 'hearth', name: 'Wood-Fired Hearth', icon: Flame },
    { id: 'smallplates', name: 'Mountain Small Plates', icon: Star }
  ];

  const menuData = {
    brews: [
      {
        id: 'hazelnut-latte',
        name: 'Hazelnut Rosetta Latte',
        price: 280,
        tag: '3D Featured',
        has3D: true,
        dietary: 'Veg · Specialty',
        description: 'Single-estate Himalayan Arabica double espresso, silky textured micro-foam with toasted hazelnut reduction and handmade rosetta foam art.',
        flavorNotes: 'Warm roasted nuttiness, sweet malt, dark cacao velvet',
        temp: 'Hot · 280ml'
      },
      {
        id: 'himalayan-pour-over',
        name: 'High-Altitude Pour-Over',
        price: 260,
        tag: 'Single Origin',
        has3D: false,
        dietary: 'Vegan · Craft',
        description: 'Light roast washed beans from 7,200ft estate. Extracted slowly through V60 paper filter into a pre-warmed glass carafe.',
        flavorNotes: 'Wild mountain berries, jasmine floral aroma, honey crisp finish',
        temp: 'Hot · 320ml'
      },
      {
        id: 'spiced-pine-cold-brew',
        name: 'Spiced Pine Cold Brew',
        price: 290,
        tag: 'Local Infusion',
        has3D: false,
        dietary: 'Vegan · Refreshing',
        description: '18-hour cold steeped coarse grounds infused with mountain pine cone essence, Ceylon cinnamon bark, and orange zest over crystal clear ice rock.',
        flavorNotes: 'Resinous pine, candied citrus peel, bold chocolate backbone',
        temp: 'Iced · 350ml'
      },
      {
        id: 'lakehouse-cortado',
        name: 'Naini Mist Cortado',
        price: 230,
        tag: 'Barista Classic',
        has3D: false,
        dietary: 'Veg · Intense',
        description: 'Equal parts dense ristretto espresso and velvety steamed milk in a faceted Gibraltar glass. Short, intense, and impeccably balanced.',
        flavorNotes: 'Caramelized sugar, rich hazelnut, roasted almond cream',
        temp: 'Hot · 140ml'
      }
    ],
    shakes: [
      {
        id: 'fudge-shake',
        name: 'Fudge Brownie Shake',
        price: 340,
        tag: '3D Featured',
        has3D: true,
        dietary: 'Veg · Indulgent',
        description: 'Molten Belgian chocolate fudge blended with whole organic milk cream, layered tall with whipped spirals, chocolate drizzle, and a warm brownie bite.',
        flavorNotes: 'Rich dark ganache, creamy vanilla, buttery fudge brownie chunks',
        temp: 'Chilled · 420ml'
      },
      {
        id: 'salted-caramel-shake',
        name: 'Himalayan Salted Caramel Shake',
        price: 330,
        tag: 'House Blend',
        has3D: false,
        dietary: 'Veg · Decadent',
        description: 'Slow-simmered artisanal brown sugar caramel seasoned with crushed pink Himalayan rock salt crystals and creamy jersey milk gelato.',
        flavorNotes: 'Buttery toffee, subtle mineral salt bite, silky roasted cream',
        temp: 'Chilled · 400ml'
      },
      {
        id: 'wild-strawberry-frappe',
        name: 'Mukteshwar Wild Berry Frappe',
        price: 320,
        tag: 'Orchard Special',
        has3D: false,
        dietary: 'Veg · Fruity',
        description: 'Handpicked local mountain wild strawberries and hill raspberries blended with chilled white chocolate cream and crushed ice crystals.',
        flavorNotes: 'Tart wild forest berries, fragrant blossom honey, sweet cream',
        temp: 'Chilled · 380ml'
      }
    ],
    hearth: [
      {
        id: 'wood-fired-pizza',
        name: 'Wood-Fired Margherita Pizza',
        price: 460,
        tag: '3D Featured',
        has3D: true,
        dietary: 'Veg · Neapolitan',
        description: '48-hour cold-fermented sourdough base, crushed San Marzano tomato pulp, torn buffalo mozzarella pearls, Himalayan pine wood char, and fresh sweet basil.',
        flavorNotes: 'Blistered leopard crust, tangy sweet tomato, rich milky cheese pull',
        temp: '11-inch Hearth Baked'
      },
      {
        id: 'truffle-mushroom-pizza',
        name: 'Wild Pine Mushroom Pizza',
        price: 540,
        tag: 'Chef Signature',
        has3D: false,
        dietary: 'Veg · Umami',
        description: 'Bianca cream base, sautéed Himalayan morels and button mushrooms, shaved smoked scamorza cheese, fresh thyme, and cold-pressed white truffle oil.',
        flavorNotes: 'Earthy wild mushrooms, garlicky cream, aromatic forest truffle perfume',
        temp: '11-inch Hearth Baked'
      },
      {
        id: 'four-cheese-quattro',
        name: 'Quattro Formaggi & Hill Honey',
        price: 520,
        tag: 'Resort Favorite',
        has3D: false,
        dietary: 'Veg · Rich',
        description: 'Mozzarella, aged English cheddar, gorgonzola blue cheese, and creamy ricotta, drizzled with raw multifloral Uttarakhand mountain honey.',
        flavorNotes: 'Sharp blue cheese bite mellowed by creamy ricotta and golden wild honey',
        temp: '11-inch Hearth Baked'
      }
    ],
    smallplates: [
      {
        id: 'kumaoni-bruschetta',
        name: 'Lakehouse Rustic Bruschetta',
        price: 260,
        tag: 'Himalayan Twist',
        has3D: false,
        dietary: 'Vegan · Crisp',
        description: 'Thick toasted sourdough crusts rubbed with garlic oil, topped with heirloom mountain cherry tomatoes, cold-pressed olive oil, and crushed pahadi herbs.',
        flavorNotes: 'Crunchy sourdough, sun-ripened sweet tomatoes, fragrant mountain mint',
        temp: '4 Toasted Pieces'
      },
      {
        id: 'parmesan-truffle-fries',
        name: 'Hand-Cut Truffle Fries',
        price: 290,
        tag: 'Lakeside Snacking',
        has3D: false,
        dietary: 'Veg · Crisp',
        description: 'Twice-fried hill potatoes tossed with freshly grated Parmigiano-Reggiano, chopped flat-leaf parsley, truffle essence, and garlic aioli dip.',
        flavorNotes: 'Crisp golden exterior, fluffy interior, savory truffle zest',
        temp: 'Sharing Basket'
      },
      {
        id: 'skillet-brownie-molten',
        name: 'Cast-Iron Skillet Warm Cookie',
        price: 310,
        tag: 'Hot Dessert',
        has3D: false,
        dietary: 'Veg · Freshly Baked',
        description: 'Warm, gooey dark chocolate chip cookie baked fresh to order in a mini cast-iron skillet, topped with Madagascar vanilla bean ice cream and salted caramel.',
        flavorNotes: 'Melting chocolate pools, chewy caramelized cookie edges, cold vanilla contrast',
        temp: 'Served Sizzling Hot'
      }
    ]
  };

  const currentItems = menuData[activeCategory] || [];

  const handleInspect3D = (itemId) => {
    onSelectHeroItem(itemId);
    const hero = document.getElementById('hero');
    if (hero) {
      hero.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="menu-section" id="menu" aria-label="Artisan Menu and 3D Showcase">
      <div className="section-container">
        {/* Header */}
        <div className="section-header text-center">
          <div className="section-eyebrow">
            <Coffee size={14} className="eyebrow-icon" />
            <span>ARTISAN CULINARY & BREWS</span>
          </div>
          <h2 className="section-title">
            The Lakehouse <span className="gold-shimmer-text">Tabletop Menu</span>
          </h2>
          <p className="section-description">
            Every dish is made from scratch with local Himalayan mountain ingredients. 
            Click any <strong className="text-amber-400">"Inspect in 3D"</strong> badge to see it rendered live on our balcony table above!
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="category-filter-bar" role="tablist" aria-label="Menu Categories">
          {categories.map((cat) => {
            const CatIcon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`category-tab-btn ${isActive ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <CatIcon size={18} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Menu Items Grid */}
        <div className="menu-items-grid">
          {currentItems.map((dish) => {
            const isHeroItem = dish.has3D;
            const isCurrentlyInHero = isHeroItem && activeHeroItem === dish.id;
            const isAdded = orderItems && orderItems[dish.id];

            return (
              <div
                key={dish.id}
                className={`menu-card glass-panel ${isCurrentlyInHero ? 'hero-active-card' : ''}`}
              >
                {/* 3D Highlight Indicator */}
                {isHeroItem && (
                  <div className="hero-sync-ribbon">
                    <Eye size={12} />
                    <span>Rendered in 3D Hero</span>
                  </div>
                )}

                <div className="menu-card-header">
                  <div className="dish-title-group">
                    <span className="dietary-badge">
                      <Leaf size={11} className="leaf-icon" />
                      <span>{dish.dietary}</span>
                    </span>
                    <h3 className="dish-name">{dish.name}</h3>
                  </div>
                  <div className="dish-price-box">
                    <span className="dish-price">₹{dish.price}</span>
                    <span className="dish-temp">{dish.temp}</span>
                  </div>
                </div>

                <p className="dish-desc">{dish.description}</p>

                <div className="dish-notes-row">
                  <span className="notes-prefix">Palette:</span>
                  <span className="notes-value">{dish.flavorNotes}</span>
                </div>

                <div className="menu-card-actions">
                  {/* 3D Inspect Button for items with procedural 3D model */}
                  {isHeroItem ? (
                    <button
                      type="button"
                      className={`btn-3d-inspect ${isCurrentlyInHero ? 'active' : ''}`}
                      onClick={() => handleInspect3D(dish.id)}
                      title="Inspect this item live on our 3D table scene"
                    >
                      <Eye size={15} />
                      <span>{isCurrentlyInHero ? 'Currently Viewing in 3D' : 'Inspect in 3D Table'}</span>
                    </button>
                  ) : (
                    <span className="dine-in-badge">Balcony Fresh</span>
                  )}

                  {/* Add to Pre-Order Tray */}
                  <button
                    type="button"
                    className={`btn-add-order ${isAdded ? 'added' : ''}`}
                    onClick={() => onAddToCart(dish)}
                    aria-label={`Add ${dish.name} to pre-order`}
                  >
                    {isAdded ? (
                      <>
                        <Check size={16} />
                        <span>Added ({isAdded.quantity})</span>
                      </>
                    ) : (
                      <>
                        <Plus size={16} />
                        <span>Add to Tray</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pre-Order Summary Bar / Tray Indicator */}
        <div className="menu-bottom-tray glass-card">
          <div className="tray-left">
            <div className="tray-icon-circle">
              <ShoppingBag size={20} className="text-amber-300" />
            </div>
            <div>
              <h4 className="tray-title">Pre-Order with Table Reservation</h4>
              <p className="tray-subtitle">Have your artisan coffees & hot wood-fired pizzas ready the moment you arrive on the balcony.</p>
            </div>
          </div>

          <div className="tray-right">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onOpenCart}
            >
              <span>View Order Tray</span>
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={onOpenReservation}
            >
              <span>Book Table with Pre-Order</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
