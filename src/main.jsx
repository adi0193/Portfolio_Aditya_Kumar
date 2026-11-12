import React from "react";
import { createRoot } from "react-dom/client";
import { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import "./index.css";
import App from "./App";

// Must be a stable reference for the lifetime of the app
const initParticles = async (engine) => {
  await loadSlim(engine);
};

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ParticlesProvider init={initParticles}>
      <App />
    </ParticlesProvider>
  </React.StrictMode>
);
