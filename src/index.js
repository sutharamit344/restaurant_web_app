import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { DarkModeProvider } from "./components/darkmode/darkmode";
import AuthUserProvider from './components/contextapis/authuserapi';
import AlertApiProvider from './components/contextapis/alertapi';
import BookingProvider from './components/contextapis/bookingapi';
import CartProvider from './components/contextapis/cartapi';
import { MenuProvider } from './components/contextapis/menuapi';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  <AlertApiProvider>
  <AuthUserProvider>
  <BookingProvider>
  <MenuProvider>
  <CartProvider>
  <DarkModeProvider>
    <App />
  </DarkModeProvider>
  </CartProvider>
  </MenuProvider>
  </BookingProvider>
  </AuthUserProvider>
  </AlertApiProvider>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
