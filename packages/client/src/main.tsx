import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./index.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Not Found Application Root.");
}
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
