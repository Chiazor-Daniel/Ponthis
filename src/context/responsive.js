import React, { createContext, useContext } from 'react';
import { useMediaQuery } from 'react-responsive';

const ResponsiveContext = createContext();

export const ResponsiveProvider = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024 });
  const isDesktop = useMediaQuery({ minWidth: 1025 });

  return (
    <ResponsiveContext.Provider value={{ isMobile, isTablet }}>
      {children}
    </ResponsiveContext.Provider>
  );
};

export const useResponsive = () => {
  const context = useContext(ResponsiveContext);
  if (!context) {
    throw new Error('useResponsive must be used within a ResponsiveProvider');
  }
  return context;
};
