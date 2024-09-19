import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { FoodProvider } from './components/contextapis/foodprovider';
import { DarkModeProvider } from "./components/darkmode/darkmode";
import AuthUserProvider from './components/contextapis/authuserapi';
import AlertApiProvider from './components/contextapis/alertapi';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthUserProvider>
  <FoodProvider>
  <DarkModeProvider>
    <AlertApiProvider>
    <App />
    </AlertApiProvider>
  </DarkModeProvider>
  </FoodProvider>
  </AuthUserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
