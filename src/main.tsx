import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";

ReactDOM.createRoot(document.getElementById("navbar") as HTMLElement).render(
  <Navbar />
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />
);
