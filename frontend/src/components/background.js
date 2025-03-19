"use client";
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadLinksPreset } from "tsparticles-preset-links";

export default function Background() {
  const particlesInit = useCallback(async (engine) => {
    await loadLinksPreset(engine);
  }, []);

  return (
    <div className="particles-container">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          preset: "links",
          background: {
            color: "#000000", 
          },
          particles: {
            color: { value: "#f8f118" },
            links: {
              color: "#f8f118",
              distance: 150,
              enable: true,
            },
            move: {
              enable: true,
              speed: 2,
            },
            number: {
              value: 80,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: 3,
            },
          },
        }}
      />
    </div>
  );
}
