// Main.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Services from "./Services";       // Services main page
import WebApp from "./WebApp";           // Your WebApp component
import App from "./App";
import MobileApps from "./MobileApp"; 
import AIAndML from "./AISolution";
import FrontendWeb from "./FrontendWeb";  

export default function Main() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/web-apps" element={<WebApp />} />
        <Route path="/services/mobile-apps" element={< MobileApps />} />
        <Route path="/services/ai-solutions" element={< AIAndML  />} />
        <Route path="/services/frontend-websites" element={< FrontendWeb  />} />
      </Routes>
    </Router>
  );
}
