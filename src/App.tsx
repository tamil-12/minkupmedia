import { Suspense, lazy, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import WhatsAppButton from "./components/common/WhatsAppButton";
import ApeWalker from "./components/common/ApeWalker";

const Home = lazy(() => import("./pages/Home"));
const Work = lazy(() => import("./pages/Work"));
const Services = lazy(() => import("./pages/Services"));
const SocialMediaMarketing = lazy(() => import("./pages/SocialMediaMarketing"));
const PerformanceMarketing = lazy(() => import("./pages/PerformanceMarketing"));
const CreativeStudio = lazy(() => import("./pages/CreativeStudio"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

function ScrollToTopOnRouteChange() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // Retry a handful of times — the target may be inside a lazy-loaded
      // route chunk that hasn't mounted on the first animation frame.
      const id = hash.slice(1);
      let tries = 0;
      let frame = 0;
      const findAndScroll = () => {
        tries += 1;
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
        if (tries < 20) {
          frame = window.requestAnimationFrame(findAndScroll);
        } else {
          // Last-ditch fallback — land the user at the top of the new page.
          window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
        }
      };
      frame = window.requestAnimationFrame(findAndScroll);
      return () => window.cancelAnimationFrame(frame);
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTopOnRouteChange />
      <Header />
      <main>
        <Suspense fallback={<div className="route-fallback" aria-hidden="true" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/services" element={<Services />} />
            <Route
              path="/services/social-media-marketing"
              element={<SocialMediaMarketing />}
            />
            <Route
              path="/services/performance-marketing"
              element={<PerformanceMarketing />}
            />
            <Route path="/creative-studio" element={<CreativeStudio />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <WhatsAppButton />
      <ApeWalker />
    </>
  );
}
