import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk';
import rootreducer from './slices/index';
import { configureStore } from '@reduxjs/toolkit';
import { HelmetProvider } from 'react-helmet-async';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
const helmetContext = {};

const persistConfig = {
  key: 'root',
  storage: storage,
}


const persistedReducer = persistReducer(persistConfig, rootreducer);
let store = configureStore({
  reducer: {
    persistedReducer
  },
  middleware: [thunk]
})
let persistor = persistStore(store)

const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <HelmetProvider context={helmetContext}>
          <App />
        </HelmetProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider >
);

