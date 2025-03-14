import { StrictMode } from 'react'
import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App";
import './index.css'
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>
)