export function wheelPixels(delta: number, mode: number, viewport: number) {
  return delta * (mode === 1 ? 16 : mode === 2 ? viewport : 1);
}

export function continuationProgress(
  accumulated: number,
  delta: number,
  eligible: boolean,
) {
  return eligible && delta > 0 ? Math.min(6000, accumulated + delta) : 0;
}
