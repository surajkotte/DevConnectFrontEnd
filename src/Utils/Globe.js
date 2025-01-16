import createGlobe from "cobe";
import { useCallback, useEffect, useRef, useState } from "react";

const GLOBE_CONFIG = {
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [251 / 255, 100 / 255, 21 / 255],
  glowColor: [1, 1, 1],
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [19.4326, -99.1332], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 },
  ],
};

export default function Globe({ className, config = GLOBE_CONFIG }) {
  let phi = 0;
  const canvasRef = useRef(null);
  const pointerInteracting = useRef(null);
  const pointerInteractionMovement = useRef(0);
  const [width, setWidth] = useState(0);
  const [rotation, setRotation] = useState(0);

  const updatePointerInteraction = (value) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      setRotation(delta / 200);
    }
  };

  const onRender = useCallback(
    (state) => {
      if (!pointerInteracting.current) phi += 0.005;
      state.phi = phi + rotation;
      state.width = width * 2;
      state.height = width * 2;
    },
    [rotation, phi, width]
  );

  const onResize = () => {
    if (canvasRef.current) {
      setWidth(canvasRef.current.offsetWidth);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current, {
      ...config,
      width: width * 2,
      height: width * 2,
      onRender,
    });

    setTimeout(() => (canvasRef.current.style.opacity = "1"));
    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [config, onRender, width]);

  return (
    <div
      className={`relative flex w-full max-w-[900px] items-center justify-center overflow-hidden rounded-xl mr-5 border bg-background px-40 pb-40 pt-8 md:pb-60 md:shadow-xl ${className}`}
    >
      <span className=" z-10 pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-white to-slate-500 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        Create, Connect, Develop.
      </span>
      <div className="absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[900px] top-28">
        <canvas
          ref={canvasRef}
          className="w-full h-full opacity-0 transition-opacity duration-500"
          onPointerDown={(e) =>
            updatePointerInteraction(
              e.clientX - pointerInteractionMovement.current
            )
          }
          onPointerUp={() => updatePointerInteraction(null)}
          onPointerOut={() => updatePointerInteraction(null)}
          onMouseMove={(e) => updateMovement(e.clientX)}
          onTouchMove={(e) => {
            if (e.touches.length === 1) updateMovement(e.touches[0].clientX);
          }}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]"></div>
    </div>
  );
}
