import React, { useEffect, useRef, useState } from 'react';

export const MyChart = (props) => {
  const container = useRef();
  const [pair, setPair] = useState(props.tradePair);
  const [themeMode, setThemeMode] = useState(true); // Default to true for dark mode
  
  const theme = themeMode ? "dark" : "light";
  
  useEffect(() => {
    const scriptId = 'tradingview-chart-script';

    const existingScript = document.getElementById(scriptId);
    if (existingScript && existingScript.parentNode) {
      existingScript.parentNode.removeChild(existingScript);
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    
    // Determine the theme based on themeMode

    script.innerHTML = `
      {
        "autosize": true,
        "symbol": "BINANCE:${pair}",
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": "${theme}",
        "style": "1",
        "locale": "en",
        "enable_publishing": false,
        "allow_symbol_change": true,
        "calendar": false,
        "support_host": "https://www.tradingview.com"
      }`;
    container.current.appendChild(script);

    return () => {
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript);
      }
    };
  }, [props.tradePair, themeMode]); // Update useEffect dependencies

  useEffect(() => {
    if (props.newTheme !== null) {
      setThemeMode(props.newTheme);
    }
  }, [props.newTheme]);

  return (
    <div className="tradingview-widget-container" ref={container} style={{ height: "100%", width: "100%" }}>
      <div className="tradingview-widget-container__widget" style={{ height: "calc(100% - 32px)", width: "100%" }}></div>
    </div>
  );
};
