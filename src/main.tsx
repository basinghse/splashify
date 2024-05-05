import { SpeedInsights } from "@vercel/speed-insights/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./styles/index.css";
import { DiffieHellmanGroup } from "crypto";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
    {/* Collect Vercel performance metrics */}
    <SpeedInsights />
  </React.StrictMode>
);
