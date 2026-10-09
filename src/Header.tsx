import { useMotion } from './motion';

export function Header() {
  const m = useMotion();
  return <header className={`header ${m.hints ? 'show-hints' : ''}`}>
    <a className="brand" href="#home" aria-label="Rey Jane Andrada home"><span className="brand-mark">/RJ</span><span>REY ANDRADA<br />[DEVELOPER]</span></a>
    <nav className="header-controls" aria-label="Page controls">
      <a className="control contact-control" href="mailto:rayalejaga12@gmail.com"><span>LET’S TALK</span></a>
      {m.fine && <button className="control" aria-label="Toggle 3D perspective" aria-pressed={m.perspective === 'on' && !m.reduced} disabled={m.reduced} onClick={() => m.setPerspective(m.perspective === 'on' ? 'off' : 'on')}><span>⌁</span><small>↳ perspective</small></button>}
      <button className="control" aria-label="Toggle color theme" aria-pressed={m.theme === 'purple'} onClick={() => m.setTheme(m.theme === 'purple' ? 'red' : 'purple')}><span>◉</span><small>↳ change the mood</small></button>
      <button className="control" aria-label="Show control hints" aria-pressed={m.hints} onClick={() => m.setHints(!m.hints)}><span>!</span><small>↳ a little help</small></button>
      {m.fine && <button className="control" aria-label="Toggle smooth scrolling" aria-pressed={m.smoothing === 'on' && !m.reduced} disabled={m.reduced} onClick={() => m.setSmoothing(m.smoothing === 'on' ? 'off' : 'on')}><span>≋</span><small>↳ smooth scrolling</small></button>}
      <button className="control" aria-label="Navigation menu (in development)" disabled><span>☰</span></button>
      <a className="control" aria-label="All portfolio projects" href="https://www.devbyrey.me/projects"><span>→</span><small>↳ more work</small></a>
    </nav>
  </header>;
}
