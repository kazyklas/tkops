import './AdBanner.css';

export default function AdBanner({ position }) {
  const adSlot = position === 'top' 
    ? import.meta.env.VITE_AD_SLOT_TOP 
    : import.meta.env.VITE_AD_SLOT_BOTTOM;
  const providerId = import.meta.env.VITE_AD_PROVIDER_ID;

  return (
    <div className={`ad-banner ad-${position}`}>
      <div className="ad-container">
        {providerId && adSlot ? (
          <div className="ad-placeholder">
            <span className="ad-label">Advertisement</span>
            <div className="ad-content">
              Ad Slot {position === 'top' ? 'Top' : 'Bottom'}
            </div>
          </div>
        ) : (
          <div className="ad-placeholder ad-placeholder-dev">
            <span className="ad-label">Advertisement</span>
            <div className="ad-content">
              {providerId 
                ? `Ad Slot: ${adSlot || 'Not configured'}` 
                : 'Ad provider not configured (dev mode)'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
