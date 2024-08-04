import React, { useEffect, useRef, memo } from 'react';

function MyCryptoChart({ cryptoPair, currency }) {
  const container = useRef();
  const uniqueId = `tradingview-widget-${cryptoPair}`;

  useEffect(() => {
    // Remove the existing script if present
    const existingScript = document.querySelector(`script[src='https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js']`);
    if (existingScript) {
      existingScript.parentNode.removeChild(existingScript);
    }

    // Clear the previous widget if it exists
    const existingWidget = container.current.querySelector('.tradingview-widget-container__widget');
    if (existingWidget) {
      existingWidget.remove();
    }

    // Determine the symbol to use for USD comparison
    const symbol = `${cryptoPair}${currency.curr?.toUpperCase()}`;

    // Create and append a new script
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      "symbols": [
        [
          symbol,
          `COINBASE:${symbol}|1D`
        ]
      ],
      "chartOnly": false,
      "width": "100%",
      "height": "100%",
      "locale": "en",
      "colorTheme": "light",
      "autosize": true,
      "showVolume": false,
      "showMA": false,
      "hideDateRanges": false,
      "hideMarketStatus": false,
      "hideSymbolLogo": false,
      "scalePosition": "right",
      "scaleMode": "Normal",
      "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
      "fontSize": "10",
      "noTimeScale": false,
      "valuesTracking": "1",
      "changeMode": "price-and-percent",
      "chartType": "area",
      "maLineColor": "#2962FF",
      "maLineWidth": 1,
      "maLength": 9,
      "headerFontSize": "medium",
      "backgroundColor": "rgba(19, 23, 34, 0)",
      "lineWidth": 2,
      "lineType": 0,
      "dateRanges": [
        "1d|1",
        "1m|30",
        "3m|60",
        "12m|1D",
        "60m|1W",
        "all|1M"
      ]
    });
    container.current.appendChild(script);

    // Cleanup function to remove the script and widget
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      const widgetContainer = container.current;
      if (widgetContainer) {
        widgetContainer.innerHTML = ''; // Clear the container content
      }
    };
  }, [cryptoPair]);

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget" id={uniqueId}></div>
      <div className="tradingview-widget-copyright">
        {/* Add TradingView copyright if needed */}
      </div>
    </div>
  );
}

export default memo(MyCryptoChart);
