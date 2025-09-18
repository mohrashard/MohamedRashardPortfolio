// Main.js
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Services from "./Services";       // Services main page
import WebApp from "./WebApp";           // WebApp component
import App from "./App";
import MobileApps from "./MobileApp"; 
import AIAndML from "./AISolution";
import FrontendWeb from "./FrontendWeb";  
import ScrollToTop from './ScrollToTop'; 
import Post from './Post';
import Blog from './Blog';


// GA Listener component to track route changes
function GAListener() {
  const location = useLocation();
  useEffect(() => {
    if (window.gtag) {
      window.gtag('config', 'G-3F63E7EG0D', { page_path: location.pathname }); // Replace with your GA Measurement ID
    }
  }, [location]);
  return null;
}

export default function Main() {
  return (
    <Router>
   
      <ScrollToTop />
      <GAListener /> {/* Tracks page views on route change */}
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/web-apps" element={<WebApp />} />
        <Route path="/services/mobile-apps" element={<MobileApps />} />
        <Route path="/services/ai-solutions" element={<AIAndML />} />
        <Route path="/services/frontend-websites" element={<FrontendWeb />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<Post />} />
      </Routes>
    </Router>
  );
}
