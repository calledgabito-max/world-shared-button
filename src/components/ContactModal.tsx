"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-lg md:w-full z-[70]"
          >
            <div className="backdrop-blur-xl bg-gray-900/95 border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-400 hover:text-white transition-all"
              >
                ✕
              </button>

              <div className="text-center mb-6">
                <div className="text-4xl mb-3">🤝</div>
                <h2 className="text-2xl font-bold text-white mb-1">
                  Partnerships & Press
                </h2>
                <p className="text-sm text-gray-400">
                  Want to sponsor a milestone, collaborate, or feature this experiment?
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <a
                  href="mailto:calledgabito@gmail.com?subject=Partnership%20-%20World%27s%20Shared%20Button&body=Hi%2C%20I%27d%20love%20to%20collaborate..."
                  className="block w-full p-4 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-200 text-center"
                >
                  <div className="text-2xl mb-2">📧</div>
                  <div className="font-semibold text-white">Email Us</div>
                  <div className="text-xs text-gray-400 mt-1">calledgabito@gmail.com</div>
                </a>

                <a
                  href="https://twitter.com/intent/tweet?text=Hey%20%40calledgabito%2C%20I%20want%20to%20collaborate%20on%20The%20World%27s%20Shared%20Button"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200 text-center"
                >
                  <div className="text-2xl mb-2">𝕏</div>
                  <div className="font-semibold text-white">DM on X</div>
                  <div className="text-xs text-gray-400 mt-1">@calledgabito</div>
                </a>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
                <h3 className="text-sm font-semibold text-green-400 mb-2">🎯 Sponsorship Opportunities</h3>
                <ul className="space-y-1.5 text-xs text-gray-400">
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">•</span>
                    Sponsored milestones (e.g., &ldquo;10M clicks brought to you by [Brand]&rdquo;)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">•</span>
                    Branded leaderboard positions
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">•</span>
                    Featured message to all active users
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">•</span>
                    Custom secret event sponsorship
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
