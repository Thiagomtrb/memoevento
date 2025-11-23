import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Slideshow({ gallery }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!gallery || gallery.length === 0) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % gallery.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [gallery]);

  if (!gallery || gallery.length === 0) {
    return (
      <div className="h-screen w-screen bg-black text-white flex items-center justify-center text-2xl">
        Nenhuma mídia enviada ainda…
      </div>
    );
  }

  const item = gallery[index];

  return (
    <div className="h-screen w-screen bg-black overflow-hidden flex items-center justify-center">
      <AnimatePresence>
        <motion.div
          key={item.id}
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
        >
          {item.type === "image" ? (
            <img
              src={item.url}
              className="max-h-full max-w-full object-contain"
            />
          ) : (
            <video
              src={item.url}
              className="max-h-full max-w-full object-contain"
              autoPlay
              muted
              loop
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
