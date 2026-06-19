"use client";

import { motion, AnimatePresence } from "framer-motion";
import { SecretEvent } from "@/lib/types";

interface SecretEventsProps {
  activeEvent: SecretEvent | null;
}

export default function SecretEvents({ activeEvent }: SecretEventsProps) {
  return (
    <AnimatePresence>
      {activeEvent && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.8 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
        >
          <motion.div
            animate={{
              boxShadow: [
                "0 0 20px rgba(255,215,0,0.3)",
                "0 0 40px rgba(255,215,0,0.6)",
                "0 0 20px rgba(255,215,0,0.3)",
              ],
            }}
            transition={{ duration: 1, repeat: Infinity }}
            className="backdrop-blur-xl bg-gradient-to-r from-yellow-500/20 via-amber-500/20 to-orange-500/20 border border-yellow-400/40 rounded-2xl px-6 py-4 text-center"
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="text-3xl mb-2"
            >
              ⚡
            </motion.div>
            <h2 className="text-lg md:text-xl font-bold text-yellow-400 mb-1">
              {activeEvent.name}
            </h2>
            <p className="text-sm text-yellow-200/80">{activeEvent.description}</p>
            <div className="mt-2 flex items-center justify-center gap-2">
              <div className="h-1 bg-yellow-400/30 rounded-full w-32 overflow-hidden">
                <motion.div
                  className="h-full bg-yellow-400 rounded-full"
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ duration: activeEvent.duration, ease: "linear" }}
                />
              </div>
              <span className="text-xs text-yellow-400 font-mono">
                {activeEvent.multiplier}X
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
