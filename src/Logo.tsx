import { useMotion } from './motion';
import './logo.css';

/** CSS framing removes the supplied canvas margins without altering the artwork. */
export function Logo({ className = '' }: { className?: string }) {
  const { theme } = useMotion();
  return <span className={`logo-art ${className}`} aria-hidden="true"><img src={`/assets/brand/rj-${theme === 'purple' ? 'purple' : 'red'}.png`} alt="" width="1280" height="1280" /></span>;
}
