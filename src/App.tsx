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
import { ProjectDetails } from "./ProjectDetails";

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
  const projectPage = /^\/projects(?:\/|\/index\.html)?$/.test(
    location.pathname,
  );
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
      <Header
        projectPage={projectPage}
        menuOpen={menuOpen}
        onMenu={() => setMenuOpen(true)}
      />
      <SmoothPage>
        <main id="main" tabIndex={-1}>
          {projectPage ? (
            <ProjectDetails />
          ) : (
            <>
              <Hero />
              <Projects />
              <About />
              <Contact />
            </>
          )}
        </main>
        <Footer projectPage={projectPage} />
      </SmoothPage>
      <Menu
        projectPage={projectPage}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
      <GlobalMotion projectPage={projectPage} menuOpen={menuOpen} />
    </>
  );
}
