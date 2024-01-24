import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Find all widget divs
const widgetDivs : NodeListOf<HTMLElement> = document.querySelectorAll('.compound-widget');

// Inject our react app into all the widgets
widgetDivs.forEach((widget) => {
  const root = ReactDOM.createRoot(widget);
  root.render(<React.StrictMode>
    <App productId={widget.dataset.productid} label={widget.dataset.label??'Save with Compound'} />
  </React.StrictMode>)
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
