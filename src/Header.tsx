import { scrollToSection, useMotion } from './motion';
import { Logo } from './Logo';

export function Header({ menuOpen, onMenu }: { menuOpen: boolean; onMenu: () => void }) {
  const m = useMotion();
  return <header className={`header ${m.hints ? 'show-hints' : ''}`}>
    <a className="brand" href="#home" aria-label="Rey Jane Andrada home" onClick={e => { e.preventDefault(); scrollToSection('home'); }}><Logo /><span>REY ANDRADA<br />[DEVELOPER]</span></a>
    <nav className="header-controls" aria-label="Page controls">
      <a className="control contact-control" href="#inquiry" onClick={e => {e.preventDefault();scrollToSection('inquiry');}}><span>LET’S TALK</span></a>
      {m.fine && <button className="control" aria-label="Toggle 3D perspective" aria-pressed={m.perspective === 'on' && !m.reduced} disabled={m.reduced} onClick={() => m.setPerspective(m.perspective === 'on' ? 'off' : 'on')}><span>⌁</span><small>↳ perspective</small></button>}
      <button className="control" aria-label="Toggle color theme" aria-pressed={m.theme === 'purple'} onClick={() => m.setTheme(m.theme === 'purple' ? 'red' : 'purple')}><span>◉</span><small>↳ change the mood</small></button>
      <button className="control" aria-label="Show control hints" aria-pressed={m.hints} onClick={() => m.setHints(!m.hints)}><span>!</span><small>↳ a little help</small></button>
      {m.fine && <button className="control" aria-label="Toggle smooth scrolling" aria-pressed={m.smoothing === 'on' && !m.reduced} disabled={m.reduced} onClick={() => m.setSmoothing(m.smoothing === 'on' ? 'off' : 'on')}><span>≋</span><small>↳ smooth scrolling</small></button>}
      <button className="control" aria-label="Open navigation menu" aria-haspopup="dialog" aria-controls="navigation-menu" aria-expanded={menuOpen} onClick={onMenu}><span>☰</span><small>↳ explore</small></button>
      <a className="control" aria-label="All portfolio projects" href="https://www.devbyrey.me/projects"><span>→</span><small>↳ more work</small></a>
    </nav>
  </header>;
}
