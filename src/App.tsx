import { Header } from './Header';
import { MotionProvider, SmoothPage } from './motion';
import { Hero } from './Hero';
import { Projects } from './Projects';

export function App() {
  return <MotionProvider>
    <a href="#main" className="skip-link">Skip to content</a>
    <Header />
    <SmoothPage><main id="main" tabIndex={-1}><Hero /><Projects /></main></SmoothPage>
  </MotionProvider>;
}
