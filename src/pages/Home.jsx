import Hero from "../sections/Hero";
import About from "../sections/About";
import CaseFiles from "../sections/CaseFiles";
import Experience from "../sections/Experience";
import Toolkit from "../sections/Toolkit";
import Contact from "../sections/Contact";

export default function Home() {
  return (
    <div className="page">
      <Hero />
      <About />
      <CaseFiles />
      <Experience />
      <Toolkit />
      <Contact />
    </div>
  );
}
