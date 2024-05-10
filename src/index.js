import React from 'react';
import ReactDOM from 'react-dom/client';
//import './index.css';
import 'bootstrap/dist/css/bootstrap.css'; // or include from a CDN
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './redux/store/store';
import { ResponsiveProvider } from './context/responsive';
import  ThemeContext  from "./context/ThemeContext"; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store = {store}>
      <BrowserRouter>
        <ThemeContext>
          <ResponsiveProvider>
            <App />
          </ResponsiveProvider>
        </ThemeContext>
      </BrowserRouter>
    </Provider>
);


reportWebVitals();
