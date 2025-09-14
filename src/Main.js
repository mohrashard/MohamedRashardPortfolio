// Main.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";      // your current single-page portfolio
import Services from "./Services"; // new page

export default function Main() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/services" element={<Services />} />
      </Routes>
    </Router>
  );
}
