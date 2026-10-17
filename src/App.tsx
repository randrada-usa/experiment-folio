import { useEffect, useState } from "react";
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
import { CertificateDetails } from "./CertificateDetails";
import { getPageKind } from "./pages";

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
  useEffect(() => {
    // Preserve old links to the former homepage inquiry form.
    const openInquiry = () => {
      if (location.hash === "#inquiry") setMenuOpen(true);
    };
    openInquiry();
    window.addEventListener("hashchange", openInquiry);
    return () => window.removeEventListener("hashchange", openInquiry);
  }, []);
  const page = getPageKind(location.pathname);
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
        page={page}
        menuOpen={menuOpen}
        onMenu={() => setMenuOpen(true)}
      />
      <SmoothPage>
        <main id="main" tabIndex={-1}>
          {page === "certificates" ? (
            <CertificateDetails />
          ) : page === "projects" ? (
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
        <Footer page={page} />
      </SmoothPage>
      <Menu page={page} open={menuOpen} onClose={() => setMenuOpen(false)} />
      <GlobalMotion page={page} menuOpen={menuOpen} />
    </>
  );
}
