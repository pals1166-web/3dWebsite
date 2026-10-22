import React, { useState } from 'react';
import { Calendar, CheckCircle, Copy, Check, Sparkles, Coffee, X } from 'lucide-react';

export default function ReservationSection({ orderItems, onClearOrder, preOrderTotal }) {
  const [formData, setFormData] = useState(() => {
    const today = new Date().toISOString().split('T')[0];
    return {
      fullName: '',
      phone: '',
      email: '',
      date: today,
      timeSlot: '17:30',
      guests: '2',
      seatingArea: 'balcony',
      specialRequests: ''
    };
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(() => {
    try {
      const saved = localStorage.getItem('lakehouse_reservation');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [copied, setCopied] = useState(false);

  const timeSlots = [
    { value: '16:00', label: '4:00 PM — Golden Hour Tea & Coffee' },
    { value: '17:30', label: '5:30 PM — Twilight Lake Mist (Most Popular)' },
    { value: '19:00', label: '7:00 PM — Candlelight Hearth Dinner' },
    { value: '20:30', label: '8:30 PM — Starlight Balcony Seating' },
    { value: '21:45', label: '9:45 PM — Late Night Dessert & Brews' }
  ];

  const seatingOptions = [
    {
      id: 'balcony',
      name: 'Heated Lakeside Balcony',
      desc: 'Prime open-air lakefront railing seats with overhead quartz heating & wool throws.',
      tag: 'Top Pick'
    },
    {
      id: 'hearth',
      name: 'Pine Hearthside Lounge',
      desc: 'Cozy indoor tables right next to our wood-fired clay oven and crackling hearth.',
      tag: 'Warm & Cozy'
    },
    {
      id: 'conservatory',
      name: 'Glasshouse Conservatory',
      desc: 'Floor-to-ceiling panoramic glass windows with elevated corner view of Mall Road.',
      tag: 'Quiet & Intimate'
    }
  ];

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name';
    }

    const cleanPhone = formData.phone.replace(/[\s\-+]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address';
    }

    if (!formData.date) {
      newErrors.date = 'Please pick a date for your visit';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const bookingRef = 'LKN-' + Math.floor(1000 + Math.random() * 9000);
      const preOrderList = orderItems ? Object.values(orderItems) : [];

      const bookingRecord = {
        bookingRef,
        ...formData,
        preOrderList,
        preOrderTotal: preOrderTotal || 0,
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      try {
        localStorage.setItem('lakehouse_reservation', JSON.stringify(bookingRecord));
      } catch {
        // Ignore
      }

      setConfirmedBooking(bookingRecord);
      setIsSubmitting(false);
      if (onClearOrder) onClearOrder();
    }, 700);
  };

  const handleCopyDetails = () => {
    if (!confirmedBooking) return;
    const text = `Lakehouse Nainital Reservation Confirmed!
Booking ID: ${confirmedBooking.bookingRef}
Guest: ${confirmedBooking.fullName}
Date: ${confirmedBooking.date} at ${confirmedBooking.timeSlot}
Guests: ${confirmedBooking.guests} Persons
Seating: ${seatingOptions.find(s => s.id === confirmedBooking.seatingArea)?.name}
Location: Mall Road, Opposite Boat Stand, Nainital`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDismissModal = () => {
    setConfirmedBooking(null);
  };

  const preOrderArray = orderItems ? Object.values(orderItems) : [];

  return (
    <section className="reservation-section" id="reservation" aria-label="Table Reservation and Pre-order Form">
      <div className="section-container">
        {/* Header */}
        <div className="section-header text-center">
          <div className="section-eyebrow">
            <Calendar size={14} className="eyebrow-icon" />
            <span>TABLE RESERVATIONS & PRE-ORDERS</span>
          </div>
          <h2 className="section-title">
            Reserve Your <span className="gold-shimmer-text">Lakeside Sanctuary</span>
          </h2>
          <p className="section-description">
            Watch the evening clouds roll over Cheena Peak with a steaming artisanal brew. 
            Zero reservation fee. Balcony tables allocated on arrival based on priority reservation.
          </p>
        </div>

        {/* Main Form Container */}
        <div className="reservation-card-wrapper glass-panel">
          <form className="reservation-form" onSubmit={handleSubmit} noValidate>
            <div className="form-grid">
              {/* Full Name */}
              <div className="form-group">
                <label htmlFor="fullName" className="form-label">
                  Your Full Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  className={`form-input ${errors.fullName ? 'has-error' : ''}`}
                  placeholder="e.g. Aarav Sharma"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
                {errors.fullName && <span className="error-message">{errors.fullName}</span>}
              </div>

              {/* Mobile Number */}
              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  Phone Number (+91) <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className={`form-input ${errors.phone ? 'has-error' : ''}`}
                  placeholder="e.g. 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>

              {/* Email Address */}
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address <span className="required">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`form-input ${errors.email ? 'has-error' : ''}`}
                  placeholder="e.g. aarav@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              {/* Party Size */}
              <div className="form-group">
                <label htmlFor="guests" className="form-label">
                  Party Size <span className="required">*</span>
                </label>
                <div className="select-wrapper">
                  <select
                    id="guests"
                    name="guests"
                    className="form-select"
                    value={formData.guests}
                    onChange={handleChange}
                  >
                    <option value="1">1 Guest (Solo Writer / Coffee Retreat)</option>
                    <option value="2">2 Guests (Couple / Date Table)</option>
                    <option value="3">3 Guests (Small Group)</option>
                    <option value="4">4 Guests (Family / Friends)</option>
                    <option value="6">6 Guests (Large Party)</option>
                    <option value="8+">8+ Guests (Celebration Table)</option>
                  </select>
                </div>
              </div>

              {/* Reservation Date */}
              <div className="form-group">
                <label htmlFor="date" className="form-label">
                  Reservation Date <span className="required">*</span>
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  className={`form-input ${errors.date ? 'has-error' : ''}`}
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
                {errors.date && <span className="error-message">{errors.date}</span>}
              </div>

              {/* Time Slot */}
              <div className="form-group">
                <label htmlFor="timeSlot" className="form-label">
                  Preferred Time Slot <span className="required">*</span>
                </label>
                <div className="select-wrapper">
                  <select
                    id="timeSlot"
                    name="timeSlot"
                    className="form-select"
                    value={formData.timeSlot}
                    onChange={handleChange}
                  >
                    {timeSlots.map((ts) => (
                      <option key={ts.value} value={ts.value}>
                        {ts.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Seating Preference Selector */}
            <div className="form-group-full">
              <label className="form-label">
                Choose Seating Ambiance <span className="required">*</span>
              </label>
              <div className="seating-options-grid">
                {seatingOptions.map((opt) => (
                  <label
                    key={opt.id}
                    className={`seating-choice-card ${formData.seatingArea === opt.id ? 'selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="seatingArea"
                      value={opt.id}
                      checked={formData.seatingArea === opt.id}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className="choice-top">
                      <span className="choice-name">{opt.name}</span>
                      <span className="choice-tag">{opt.tag}</span>
                    </div>
                    <p className="choice-desc">{opt.desc}</p>
                  </label>
                ))}
              </div>
            </div>

            {/* Pre-Order Summary Bar inside Form */}
            {preOrderArray.length > 0 && (
              <div className="attached-preorder-box glass-card">
                <div className="preorder-box-header">
                  <div className="flex items-center gap-2">
                    <Coffee size={18} className="text-amber-300" />
                    <span className="font-semibold text-amber-200">Pre-Order Attached to Reservation</span>
                  </div>
                  <span className="preorder-total-badge">₹{preOrderTotal} Total</span>
                </div>
                <div className="preorder-chips">
                  {preOrderArray.map((item) => (
                    <span key={item.id} className="preorder-chip">
                      {item.name} × {item.quantity}
                    </span>
                  ))}
                </div>
                <span className="preorder-note">
                  ✓ Your items will be freshly brewed and baked for the exact moment of your arrival.
                </span>
              </div>
            )}

            {/* Special Requests */}
            <div className="form-group-full">
              <label htmlFor="specialRequests" className="form-label">
                Special Requests or Celebrations (Optional)
              </label>
              <textarea
                id="specialRequests"
                name="specialRequests"
                rows="3"
                className="form-textarea"
                placeholder="Anniversary cake, extra wool throws, corner lake view preference, dietary restrictions, etc."
                value={formData.specialRequests}
                onChange={handleChange}
              />
            </div>

            {/* Submit Action */}
            <div className="form-submit-row">
              <button
                type="submit"
                className="btn btn-primary btn-large"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span>Securing Table...</span>
                ) : (
                  <>
                    <CheckCircle size={20} />
                    <span>Confirm Free Reservation</span>
                  </>
                )}
              </button>
              <span className="submit-disclaimer">
                Instant confirmation SMS & email · Free cancellation anytime
              </span>
            </div>
          </form>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmedBooking && (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div className="modal-card glass-panel">
            <button
              type="button"
              className="modal-close-btn"
              onClick={handleDismissModal}
              aria-label="Close confirmation dialog"
            >
              <X size={20} />
            </button>

            <div className="modal-header">
              <div className="modal-icon-circle">
                <CheckCircle size={32} className="text-emerald-400" />
              </div>
              <h3 id="modal-title" className="modal-title">Table Reserved!</h3>
              <p className="modal-subtitle">We look forward to welcoming you to Lakehouse Nainital.</p>
            </div>

            <div className="modal-details-box glass-card">
              <div className="detail-row">
                <span className="detail-label">Booking Reference:</span>
                <span className="detail-value highlight-ref">{confirmedBooking.bookingRef}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Guest Name:</span>
                <span className="detail-value">{confirmedBooking.fullName}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Date & Time:</span>
                <span className="detail-value">{confirmedBooking.date} at {confirmedBooking.timeSlot}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Party Size:</span>
                <span className="detail-value">{confirmedBooking.guests} Persons</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Seating:</span>
                <span className="detail-value">
                  {seatingOptions.find(s => s.id === confirmedBooking.seatingArea)?.name}
                </span>
              </div>

              {confirmedBooking.preOrderList && confirmedBooking.preOrderList.length > 0 && (
                <div className="detail-row">
                  <span className="detail-label">Pre-Order:</span>
                  <span className="detail-value text-amber-300">
                    {confirmedBooking.preOrderList.map(i => `${i.name} (×${i.quantity})`).join(', ')} · ₹{confirmedBooking.preOrderTotal}
                  </span>
                </div>
              )}
            </div>

            <div className="modal-advisory">
              <Sparkles size={16} className="text-amber-400 shrink-0" />
              <span>
                <strong>Himalayan Weather Tip:</strong> Lake mist arrives around 5:00 PM; overhead balcony heaters are active. Light jackets are recommended.
              </span>
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCopyDetails}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                <span>{copied ? 'Details Copied!' : 'Copy Details'}</span>
              </button>

              <button
                type="button"
                className="btn btn-primary"
                onClick={handleDismissModal}
              >
                <span>Done</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
