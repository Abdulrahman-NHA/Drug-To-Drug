import React from "react";
import { createRoot } from "react-dom/client"; // Updated to use createRoot
import App from "./App";
import "./App.css"; // Import App.css globally

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
