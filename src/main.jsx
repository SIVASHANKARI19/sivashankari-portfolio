import React from "react";
import ReactDOM from "react-dom/client"; // <-- IMPORTANT
import App from "./App.jsx";
import "./index.css"; 

ReactDOM.createRoot(document.getElementById("root")).render(
  <App /> // No StrictMode to prevent WebGL double mount
);
