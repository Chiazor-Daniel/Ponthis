import React, { useEffect } from 'react';

const TradingViewWidget = () => {
  useEffect(() => {
    const loadScript = () => {
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-forex-cross-rates.js';
      script.async = true;
      script.innerHTML = JSON.stringify({
        "width": "100%",
        "height": "100%",
        "currencies": [
          "EUR",
          "USD",
          "JPY",
          "GBP",
          "CHF",
          "AUD",
          "CAD",
          "NZD"
        ],
        "isTransparent": false,
        "colorTheme": "dark",
        "locale": "en",
        "backgroundColor": "#000000"
      });
      
      // Wait for the container to be available in the DOM
      const interval = setInterval(() => {
        const container = document.querySelector('.tradingview-widget-container__widget');
        if (container) {
          clearInterval(interval);
          container.appendChild(script);
        }
      }, 100);
    };

    loadScript();

    return () => {
      // Clean up script when component unmounts
      const container = document.querySelector('.tradingview-widget-container__widget');
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="w-full h-full">
      <div className="w-full h-full tradingview-widget-container__widget"></div>
    </div>
  );
};

export default TradingViewWidget;
