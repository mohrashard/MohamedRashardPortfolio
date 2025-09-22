import React, { useEffect } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import AnimatedRoutes from "./AnimatedRoutes";

// GA Listener component to track route changes
function GAListener() {
  const location = useLocation();
  
  useEffect(() => {
    // Ensure gtag is available and track page views
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag("config", "G-3F63E7EG0D", {
        page_path: location.pathname + location.search,
        page_title: document.title
      });


    }
  }, [location]);

  return null;
}

export default function Main() {
  return (
    <Router>
      <ScrollToTop />
      <GAListener />
      <AnimatedRoutes />
    </Router>
  );
}