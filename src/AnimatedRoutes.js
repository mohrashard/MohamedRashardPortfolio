
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Services from "./Services";
import WebApp from "./WebApp";
import MobileApps from "./MobileApp";
import AIAndML from "./AISolution";
import FrontendWeb from "./FrontendWeb";
import PageWrapper from "./PageWrapper";

export default function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/services" element={<PageWrapper><Services /></PageWrapper>} />
        <Route path="/services/web-apps" element={<PageWrapper><WebApp /></PageWrapper>} />
        <Route path="/services/mobile-apps" element={<PageWrapper><MobileApps /></PageWrapper>} />
        <Route path="/services/ai-solutions" element={<PageWrapper><AIAndML /></PageWrapper>} />
        <Route path="/services/frontend-websites" element={<PageWrapper><FrontendWeb /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}