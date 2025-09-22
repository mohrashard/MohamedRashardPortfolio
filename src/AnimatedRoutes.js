import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import App from "./App";
import Services from "./Services";
import WebApp from "./WebApp";
import MobileApps from "./MobileApp";
import AIAndML from "./AISolution";
import FrontendWeb from "./FrontendWeb";
import Blog from "./Blog";
import Post from "./Post";
import PageWrapper from "./PageWrapper";

export default function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Homepage */}
        <Route path="/" element={<App />} />

        {/* Services */}
        <Route
          path="/services"
          element={<PageWrapper><Services /></PageWrapper>}
        />
        <Route
          path="/services/web-apps"
          element={<PageWrapper><WebApp /></PageWrapper>}
        />
        <Route
          path="/services/mobile-apps"
          element={<PageWrapper><MobileApps /></PageWrapper>}
        />
        <Route
          path="/services/ai-solutions"
          element={<PageWrapper><AIAndML /></PageWrapper>}
        />
        <Route
          path="/services/frontend-websites"
          element={<PageWrapper><FrontendWeb /></PageWrapper>}
        />

        {/* Blog */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<Post />} />
      </Routes>
    </AnimatePresence>
  );
}
