// PageWrapper.jsx
import { motion } from "framer-motion";

export default function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}   // fade + small slide from bottom
      animate={{ opacity: 1, y: 0 }}    // fully visible
      exit={{ opacity: 0, y: -20 }}     // fade + slide up when leaving
      transition={{
        duration: 0.4,                  // slightly longer for smoothness
        ease: [0.25, 0.1, 0.25, 1],     // cubic-bezier ease (smooth in/out)
      }}
    >
      {children}
    </motion.div>
  );
}
