import { useRef, useEffect } from "react";

export default function LiquidCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let mouse = { x: 0, y: 0 };
    window.addEventListener("mousemove", e => {
      mouse = { x: e.clientX, y: e.clientY };
    });

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const g = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        20,
        mouse.x,
        mouse.y,
        250
      );
      g.addColorStop(0, "rgba(0,150,255,0.35)");
      g.addColorStop(1, "transparent");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      requestAnimationFrame(draw);
    }

    draw();
  }, []);

  return (
    <canvas
      ref={ref}
      style={{ position: "fixed", inset: 0, zIndex: 0 }}
    />
  );
}
