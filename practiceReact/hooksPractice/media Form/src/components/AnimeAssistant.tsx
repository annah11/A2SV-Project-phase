import React from "react";
import { motion } from "framer-motion";

export default function AnimeAssistant() {
  return (
    <motion.div
      initial={{ y: 30 }}
      animate={{ y: [30, 10, 30] }}
      transition={{ repeat: Infinity, duration: 2 }}
      className="assistant"
    >
      <p>🌸 Hello! Need help? Hover over the form!</p>
    </motion.div>
  );
}
