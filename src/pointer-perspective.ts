type PerspectiveLayer = {
  element: HTMLElement;
  travel: number;
  tilt: number;
  maxRightTilt?: number;
};

/** Keep pointer perspective separate from the elements owned by scroll tweens. */
export function bindPointerPerspective(
  viewport: HTMLElement,
  layers: PerspectiveLayer[],
) {
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let frame = 0;
  let visible = false;

  const draw = () => {
    frame = 0;
    // The reference eases by this fraction each rendered frame.
    currentX += (targetX - currentX) * 0.12;
    currentY += (targetY - currentY) * 0.12;
    const settled =
      Math.abs(targetX - currentX) < 0.001 &&
      Math.abs(targetY - currentY) < 0.001;
    if (settled) {
      currentX = targetX;
      currentY = targetY;
    }
    for (const { element, travel, tilt, maxRightTilt = 10 } of layers) {
      const yaw = Math.min(currentX * tilt, maxRightTilt);
      element.style.transform = `translate3d(${-currentX * travel}px, ${-currentY * travel}px, 0) rotateY(${yaw}deg) rotateX(${-currentY * tilt}deg)`;
    }
    if (!settled) frame = requestAnimationFrame(draw);
  };
  const schedule = () => {
    if (frame || !visible) return;
    frame = requestAnimationFrame(draw);
  };
  const reset = () => {
    targetX = targetY = 0;
    schedule();
  };
  const move = (event: PointerEvent) => {
    if (event.pointerType === "touch") return;
    targetX = Math.max(-1, Math.min(1, (event.clientX / innerWidth - 0.5) * 2));
    targetY = Math.max(
      -1,
      Math.min(1, (event.clientY / innerHeight - 0.5) * 2),
    );
    schedule();
  };
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) {
      layers.forEach(({ element }) => (element.style.willChange = "transform"));
      schedule();
    } else {
      cancelAnimationFrame(frame);
      frame = 0;
      currentX = currentY = 0;
      layers.forEach(({ element }) => {
        element.style.removeProperty("transform");
        element.style.removeProperty("will-change");
      });
    }
  });
  observer.observe(viewport);
  window.addEventListener("pointermove", move, { passive: true });
  window.addEventListener("blur", reset);
  document.documentElement.addEventListener("pointerleave", reset);
  return () => {
    observer.disconnect();
    cancelAnimationFrame(frame);
    window.removeEventListener("pointermove", move);
    window.removeEventListener("blur", reset);
    document.documentElement.removeEventListener("pointerleave", reset);
    layers.forEach(({ element }) => {
      element.style.removeProperty("transform");
      element.style.removeProperty("will-change");
    });
  };
}
