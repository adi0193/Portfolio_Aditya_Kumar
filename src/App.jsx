import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ObservationProvider } from "./context/ObservationMode";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";
import RedThread from "./components/layout/RedThread";
import Cursor from "./components/layout/Cursor";
import Home from "./pages/Home";

// The résumé page pulls in react-pdf (large), so load it only when visited
const Resume = lazy(() => import("./pages/Resume"));

/** Scroll to #hash targets on navigation, or to the top on page change. */
function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  useEffect(() => {
    if (hash) {
      requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView());
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash, key]);
  return null;
}

export default function App() {
  return (
    <ObservationProvider>
      <BrowserRouter>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <ScrollManager />
        <Nav />
        <RedThread />
        <Cursor />
        <main id="main">
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/resume" element={<Resume />} />
              {/* Routes from earlier versions of the site */}
              <Route path="/about" element={<Navigate to="/#observations" replace />} />
              <Route path="/project" element={<Navigate to="/#case-files" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </BrowserRouter>
    </ObservationProvider>
  );
}
