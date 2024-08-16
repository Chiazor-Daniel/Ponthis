import React, { useEffect } from 'react';

const TradingViewTimelineWidget = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-timeline.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      "feedMode": "all_symbols",
      "isTransparent": true,
      "displayMode": "adaptive",
      "width": "100%",
        "height": "100%",
      "colorTheme": "dark",
      "locale": "en"
    });

    const parentContainer = document.getElementById('tradingview-widget-container');
    if (parentContainer) {
      parentContainer.appendChild(script);
    }

    return () => {
      if (parentContainer && script.parentNode) {
        parentContainer.removeChild(script);
      }
    };
  }, []);

  return (
    <div id="tradingview-widget-container" className="tradingview-widget-container">
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
};

export default TradingViewTimelineWidget;
