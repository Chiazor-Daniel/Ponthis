import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux-contexts/redux/store/store';
import { ResponsiveProvider } from './redux-contexts/context/responsive';
import ThemeContext from "./redux-contexts/context/ThemeContext";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ResponsiveProvider>
    <ThemeContext>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ThemeContext>
  </ResponsiveProvider>
);