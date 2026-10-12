import { useState } from "react";
import { Header } from "./Header";
import { MotionProvider, SmoothPage, scrollToSection } from "./motion";
import { Hero } from "./Hero";
import { Projects } from "./Projects";
import { About } from "./About";
import { Contact } from "./Contact";
import { InquiryProvider } from "./Inquiry";
import { Menu } from "./Menu";
import { Footer } from "./Footer";
import { GlobalMotion } from "./GlobalMotion";

export function App() {
  return (
    <MotionProvider>
      <InquiryProvider>
        <Page />
      </InquiryProvider>
    </MotionProvider>
  );
}

function Page() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <a
        href="#main"
        className="skip-link"
        onClick={(e) => {
          e.preventDefault();
          scrollToSection("main");
        }}
      >
        Skip to content
      </a>
      <Header menuOpen={menuOpen} onMenu={() => setMenuOpen(true)} />
      <SmoothPage>
        <main id="main" tabIndex={-1}>
          <Hero />
          <Projects />
          <About />
          <Contact />
        </main>
        <Footer />
      </SmoothPage>
      <Menu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <GlobalMotion menuOpen={menuOpen} />
    </>
  );
}
