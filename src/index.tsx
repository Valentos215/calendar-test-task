import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createGlobalStyle } from 'styled-components';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const Global = createGlobalStyle`
*{
   margin: 0;
   padding: 0;
   border: 0;
   box-sizing: border-box;
   font-family:Arial, Helvetica, sans-serif
}
*,
*:before,
*:after {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
:focus,
:active {
  outline: none;
}
a:focus,
a:active {
  outline: none;
}
html,
body {
  height: 100%;
  width: 100%;
  font-size: 100%;
  line-height: 1;
  font-size: 16px;
  -ms-text-size-adjust: 100%;
  -moz-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  @media (max-width: 450px) {
   font-size: 14px;
  }
}
input,
button,
textarea {
  font-family: inherit;
}
input::-ms-clear {
  display: none;
}`;

root.render(
  <React.StrictMode>
    <Global />
    <App />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
