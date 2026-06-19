"use client";

import { motion, AnimatePresence } from "framer-motion";

interface NotificationBannerProps {
  message: string | null;
  type: "achievement" | "milestone" | "event" | "unlock";
}

export default function NotificationBanner({
  message,
  type,
}: NotificationBannerProps) {
  const getColors = () => {
    switch (type) {
      case "achievement":
        return {
          bg: "from-yellow-500/30 to-amber-500/30",
          border: "border-yellow-400/40",
          text: "text-yellow-300",
        };
      case "milestone":
        return {
          bg: "from-purple-500/30 to-pink-500/30",
          border: "border-purple-400/40",
          text: "text-purple-300",
        };
      case "event":
        return {
          bg: "from-rose-500/30 to-red-500/30",
          border: "border-rose-400/40",
          text: "text-rose-300",
        };
      case "unlock":
        return {
          bg: "from-emerald-500/30 to-teal-500/30",
          border: "border-emerald-400/40",
          text: "text-emerald-300",
        };
    }
  };

  const colors = getColors();

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -20, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: -20, x: "-50%" }}
          className={`fixed top-28 left-1/2 z-50 pointer-events-none bg-gradient-to-r ${colors.bg} backdrop-blur-xl border ${colors.border} rounded-2xl px-6 py-4 shadow-2xl`}
        >
          <motion.p
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 0.5 }}
            className={`text-sm md:text-base font-bold ${colors.text} text-center whitespace-nowrap`}
          >
            {message}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
