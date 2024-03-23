import React from "react";

import App from "./App";
import GlobalStyle from "./GlobalStyle";
import { createRoot } from "react-dom/client";

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <GlobalStyle />
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Element with id 'root' not found in the document.");
}
