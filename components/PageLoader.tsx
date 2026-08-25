"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PageLoaderProps {
  onComplete: () => void;
}

export default function PageLoader({ onComplete }: PageLoaderProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Start fade out at 1000ms
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Call onComplete after exit animation completes (1200ms total)
      setTimeout(onComplete, 200); 
    }, 1000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#09090b]"
        >
          <div className="flex flex-col items-center">
            {/* Monogram */}
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="text-4xl font-light text-white mb-6"
            >
              M
            </motion.div>

            {/* Progress Line */}
            <div className="w-32 h-[1px] relative mb-4">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 bg-white/30 origin-left"
              />
            </div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
              className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase"
            >
              Marcellinus Alfrits
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
