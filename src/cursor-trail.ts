type Point = { x: number; y: number };
export type TrailDot = Point & {
  scale: number;
  lockX: number;
  lockY: number;
  phase: number;
};

export function createTrail(point: Point, count = 20): TrailDot[] {
  return Array.from({ length: count }, (_, index) => ({
    ...point,
    scale: 1 - index / count,
    lockX: point.x,
    lockY: point.y,
    phase: index * 2.39996,
  }));
}

export function lockTrail(dots: TrailDot[]) {
  dots.forEach((dot) => {
    dot.lockX = dot.x;
    dot.lockY = dot.y;
  });
}

/** A direct head and 35% retained history leave separate circles on fast moves. */
export function advanceTrail(dots: TrailDot[], pointer: Point, idle: boolean) {
  let x = pointer.x;
  let y = pointer.y;
  dots.forEach((dot, index) => {
    if (idle && index > Math.floor(dots.length * 0.3)) {
      dot.phase += 0.05;
      const radius = 13 * (1 - dot.scale) + 2;
      dot.x = dot.lockX + Math.sin(dot.phase) * radius;
      dot.y = dot.lockY + Math.sin(dot.phase + index) * radius;
    } else {
      dot.x = x;
      dot.y = y;
      const next = dots[index + 1];
      if (next) {
        x += (next.x - x) * 0.35;
        y += (next.y - y) * 0.35;
      }
    }
  });
}
