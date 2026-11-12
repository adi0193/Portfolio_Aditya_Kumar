import React from "react";
import Particles from "@tsparticles/react";

// Defined outside the component so the reference stays stable between renders
const options = {
  fullScreen: { enable: false },
  particles: {
    number: {
      value: 160,
      density: { enable: true, width: 1500, height: 1500 },
    },
    links: { enable: false, opacity: 0.03 },
    move: { enable: true, direction: "right", speed: 0.05 },
    size: { value: 1 },
    opacity: {
      value: { min: 0.05, max: 1 },
      animation: { enable: true, speed: 1 },
    },
  },
  interactivity: {
    events: { onClick: { enable: true, mode: "push" } },
    modes: { push: { quantity: 1 } },
  },
  detectRetina: true,
};

function Particle() {
  return <Particles id="tsparticles" options={options} />;
}

export default Particle;
