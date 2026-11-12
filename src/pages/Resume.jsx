import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { FiArrowLeft, FiDownload } from "react-icons/fi";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import Button from "../components/ui/Button";
import ReviewNote from "../components/ui/ReviewNote";
import cv from "../assets/cv.pdf";
import "./Resume.css";

// Bundle the PDF.js worker locally instead of loading it from a CDN
pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();

export default function Resume() {
  const frameRef = useRef(null);
  const [width, setWidth] = useState(800);
  const [pages, setPages] = useState(0);

  useEffect(() => {
    document.title = "Résumé — Aditya Kumar";
    const el = frameRef.current;
    const ro = new ResizeObserver(([entry]) => setWidth(Math.min(900, Math.floor(entry.contentRect.width))));
    ro.observe(el);
    return () => {
      ro.disconnect();
      document.title = "Aditya Kumar — Software Engineer";
    };
  }, []);

  return (
    <section className="resume-page" aria-labelledby="resume-title">
      <div className="container">
        <div className="resume-page__head">
          <div>
            <Button to="/" variant="ghost" size="sm">
              <FiArrowLeft aria-hidden="true" /> Back home
            </Button>
            <h1 id="resume-title" className="resume-page__title">
              Résumé
            </h1>
            <ReviewNote>
              This PDF predates your role at Think Future Technologies — consider uploading an updated version to
              src/assets/cv.pdf.
            </ReviewNote>
          </div>
          <Button href={cv} download="Aditya-Kumar-Resume.pdf" icon={<FiDownload />}>
            Download PDF
          </Button>
        </div>

        <div ref={frameRef} className="resume-page__frame">
          <Document
            file={cv}
            onLoadSuccess={({ numPages }) => setPages(numPages)}
            loading={<p className="resume-page__status mono">Loading résumé…</p>}
            error={
              <p className="resume-page__status mono">
                Couldn't display the PDF here. <a href={cv}>Open it directly</a>.
              </p>
            }
          >
            {Array.from({ length: pages }, (_, i) => (
              <Page key={i} pageNumber={i + 1} width={width} className="resume-page__sheet" />
            ))}
          </Document>
        </div>
      </div>
    </section>
  );
}
