import type { PageKind } from "./pages";
import { nextPage } from "./pages";
import { scrollToSection, useMotion } from "./motion";
import { Logo } from "./Logo";

function ControlHint({
  label,
  row,
  compact = false,
}: {
  label: string;
  row: number;
  compact?: boolean;
}) {
  const width = compact ? 80 : 180;
  const anchor = width - 6;
  return (
    <small aria-hidden="true" className="control-hint" style={{ width }}>
      <svg width={width} height="140" viewBox={`0 0 ${width} 140`}>
        <path
          d={`M${anchor - 3} 6 L${anchor} 1 L${anchor + 3} 6 M${anchor} 1 L${anchor} ${Math.max(8, row - 20)} L${anchor - 18} ${row - 5}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
        <text
          x={compact && row === 72 ? anchor + 8 : anchor - 22}
          y={row}
          textAnchor="end"
          fill="currentColor"
        >
          {label}
        </text>
      </svg>
    </small>
  );
}

export function Header({
  menuOpen,
  onMenu,
  page = "home",
}: {
  menuOpen: boolean;
  onMenu: () => void;
  page?: PageKind;
}) {
  const innerPage = page !== "home";
  const next = nextPage[page];
  const m = useMotion();
  return (
    <header className={`header ${m.hints ? "show-hints" : ""}`}>
      <a
        className="brand"
        href={innerPage ? "/" : "#home"}
        aria-label="Rey Jane Andrada home"
        onClick={(e) => {
          if (innerPage) return;
          e.preventDefault();
          scrollToSection("home");
        }}
      >
        <Logo />
        <span>
          REY ANDRADA
          <br />
          [DEVELOPER]
        </span>
      </a>
      <nav className="header-controls" aria-label="Page controls">
        <button
          className="control contact-control"
          type="button"
          aria-haspopup="dialog"
          aria-controls="navigation-menu"
          aria-expanded={menuOpen}
          onClick={onMenu}
        >
          <span>LET’S TALK</span>
        </button>
        {m.fine && !innerPage && (
          <button
            className="control"
            aria-label="Toggle 3D perspective"
            aria-pressed={m.perspective === "on" && !m.reduced}
            disabled={m.reduced}
            onClick={() =>
              m.setPerspective(m.perspective === "on" ? "off" : "on")
            }
          >
            <span>⌁</span>
            <ControlHint label="Toggle 3D" row={18} />
          </button>
        )}
        <button
          className="control"
          aria-label="Toggle color theme"
          aria-pressed={m.theme === "purple"}
          onClick={() => m.setTheme(m.theme === "purple" ? "red" : "purple")}
        >
          <span>◉</span>
          <ControlHint label="Toggle theme" row={48} />
        </button>
        <button
          className="control"
          aria-label="Show control hints"
          aria-pressed={m.hints}
          onClick={() => m.setHints(!m.hints)}
        >
          <span>!</span>
          <ControlHint label="Toggle hints" row={78} />
        </button>
        {m.fine && (
          <button
            className="control"
            aria-label="Toggle smooth scrolling"
            aria-pressed={m.smoothing === "on" && !m.reduced}
            disabled={m.reduced}
            onClick={() => m.setSmoothing(m.smoothing === "on" ? "off" : "on")}
          >
            <span>≋</span>
            <ControlHint label="Toggle smoothness" row={108} />
          </button>
        )}
        <button
          className="control"
          aria-label="Open navigation menu"
          aria-haspopup="dialog"
          aria-controls="navigation-menu"
          aria-expanded={menuOpen}
          onClick={onMenu}
        >
          <span>☰</span>
          <ControlHint label="Menu" row={72} compact />
        </button>
        <a className="control" aria-label={next.description} href={next.href}>
          <span>→</span>
          <ControlHint label={next.label} row={108} compact />
        </a>
      </nav>
    </header>
  );
}
