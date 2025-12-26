import { useEffect, useRef } from "react";

export function FishCursor() {
  const fishRef = useRef(null);

  useEffect(() => {
    document.body.style.cursor = "none";

    let lastX = 0;

    const move = e => {
      if (!fishRef.current) return;

      const dx = e.clientX - lastX;
      lastX = e.clientX;

      fishRef.current.style.left = e.clientX + "px";
      fishRef.current.style.top = e.clientY + "px";
      fishRef.current.style.transform = `rotate(${dx * 2}deg)`;
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div ref={fishRef} className="fish">
      <div className="fish-body" />
      <div className="fish-tail" />
      <div className="fish-eye" />
    </div>
  );
}
