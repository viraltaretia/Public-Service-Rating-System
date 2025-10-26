
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);

// Re-written to avoid using JSX in the entry-point file, which can sometimes
// cause issues with simple dev servers and MIME type detection.
root.render(
  React.createElement(
    React.StrictMode,
    null,
    React.createElement(App, null)
  )
);