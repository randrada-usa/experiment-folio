import { Header } from './Header';
import { MotionProvider, SmoothPage } from './motion';

export function App() {
  return <MotionProvider>
    <a href="#main" className="skip-link">Skip to content</a>
    <Header />
    <SmoothPage><main id="main" tabIndex={-1}><section className="foundation section" id="home"><p className="eyebrow">REY JANE ANDRADA / EXPERIMENT FOLIO</p><h1>Building with<br /><em>purpose.</em></h1><p>Backend-focused developer.<br />Aspiring data engineer.</p></section></main></SmoothPage>
  </MotionProvider>;
}
