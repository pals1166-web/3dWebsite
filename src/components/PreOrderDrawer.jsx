import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Sparkles, Coffee } from 'lucide-react';

export default function PreOrderDrawer({
  isOpen,
  onClose,
  orderItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearOrder,
  onProceedToReservation
}) {
  if (!isOpen) return null;

  const itemsList = Object.values(orderItems || {});
  const totalAmount = itemsList.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="drawer-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Pre-Order Tray">
      <div className="drawer-panel glass-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="drawer-header">
          <div className="drawer-title-group">
            <ShoppingBag size={22} className="text-amber-300" />
            <h3 className="drawer-title">Your Balcony Pre-Order</h3>
          </div>
          <button
            type="button"
            className="drawer-close-btn"
            onClick={onClose}
            aria-label="Close pre-order drawer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="drawer-body">
          {itemsList.length === 0 ? (
            <div className="drawer-empty-state">
              <Coffee size={48} className="empty-icon text-slate-500" />
              <h4>Your order tray is empty</h4>
              <p>Explore our artisan brews, shakes, and wood-fired pizzas to add items to your table reservation.</p>
              <button
                type="button"
                className="btn btn-secondary mt-4"
                onClick={onClose}
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <div className="drawer-items-list">
              {itemsList.map((item) => (
                <div key={item.id} className="drawer-item-row glass-card">
                  <div className="item-info">
                    <span className="item-name">{item.name}</span>
                    <span className="item-unit-price">₹{item.price} each</span>
                  </div>

                  <div className="item-controls">
                    <div className="quantity-stepper">
                      <button
                        type="button"
                        className="stepper-btn"
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="stepper-count">{item.quantity}</span>
                      <button
                        type="button"
                        className="stepper-btn"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <span className="item-subtotal">₹{item.price * item.quantity}</span>

                    <button
                      type="button"
                      className="item-remove-btn"
                      onClick={() => onRemoveItem(item.id)}
                      title="Remove item"
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}

              <div className="drawer-note glass-card">
                <Sparkles size={16} className="text-amber-400 shrink-0" />
                <span>
                  Items are prepared right as your reservation begins, so your coffees arrive piping hot and pizzas freshly bubbling!
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {itemsList.length > 0 && (
          <div className="drawer-footer">
            <div className="drawer-total-row">
              <span className="total-label">Estimated Bill:</span>
              <span className="total-amount">₹{totalAmount}</span>
            </div>

            <div className="drawer-actions">
              <button
                type="button"
                className="btn btn-primary full-width"
                onClick={() => {
                  onClose();
                  onProceedToReservation();
                }}
              >
                <span>Attach to Table Reservation</span>
                <ArrowRight size={18} />
              </button>

              <button
                type="button"
                className="btn-clear-tray"
                onClick={onClearOrder}
              >
                Clear Pre-Order Tray
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
