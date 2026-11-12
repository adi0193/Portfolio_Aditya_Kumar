import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";
import Background from "./components/layout/Background";
import Home from "./pages/Home";

// The résumé page pulls in react-pdf (large), so load it only when visited
const Resume = lazy(() => import("./pages/Resume"));

/** Scroll to #hash targets on navigation, or to the top on page change. */
function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  useEffect(() => {
    if (hash) {
      // Wait a frame so the target section has rendered
      requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView());
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash, key]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Background />
      <ScrollManager />
      <Nav />
      <main id="main">
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resume" element={<Resume />} />
            {/* Old routes from the previous version of the site */}
            <Route path="/about" element={<Navigate to="/#about" replace />} />
            <Route path="/project" element={<Navigate to="/#work" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
