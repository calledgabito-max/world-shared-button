"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MainButtonProps {
  onClick: () => void;
  activeEvent: { multiplier: number; name: string } | null;
}

export default function MainButton({ onClick, activeEvent }: MainButtonProps) {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const [shaking, setShaking] = useState(false);
  const rippleId = useRef(0);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = ++rippleId.current;

      setRipples((prev) => [...prev, { id, x, y }]);
      setShaking(true);
      setTimeout(() => setShaking(false), 300);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 1000);

      onClick();
    },
    [onClick]
  );

  const [pulsing, setPulsing] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      setPulsing((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const isGolden = activeEvent?.name?.toLowerCase().includes("golden");
  const isCosmic = activeEvent?.name?.toLowerCase().includes("cosmic");
  const isFrenzy = activeEvent?.name?.toLowerCase().includes("frenzy");

  return (
    <div className="relative flex items-center justify-center">
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={
          isGolden
            ? {
                boxShadow: [
                  "0 0 40px rgba(255,215,0,0.3)",
                  "0 0 80px rgba(255,215,0,0.6)",
                  "0 0 40px rgba(255,215,0,0.3)",
                ],
              }
            : isCosmic
            ? {
                boxShadow: [
                  "0 0 40px rgba(147,51,234,0.3)",
                  "0 0 80px rgba(147,51,234,0.6)",
                  "0 0 40px rgba(147,51,234,0.3)",
                ],
              }
            : pulsing
            ? {
                boxShadow: [
                  "0 0 30px rgba(59,130,246,0.3)",
                  "0 0 60px rgba(59,130,246,0.5)",
                  "0 0 30px rgba(59,130,246,0.3)",
                ],
              }
            : {
                boxShadow: "0 0 30px rgba(59,130,246,0.3)",
              }
        }
        transition={{ duration: isGolden || isCosmic ? 1 : 2, repeat: Infinity }}
      />

      <motion.button
        ref={buttonRef}
        onClick={handleClick}
        className={`
          relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72
          rounded-full font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl
          cursor-pointer select-none overflow-hidden
          transition-all duration-300
          ${
            isGolden
              ? "bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-600 text-gray-900"
              : isCosmic
              ? "bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 text-white"
              : isFrenzy
              ? "bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 text-white"
              : "bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 text-white"
          }
          ${shaking ? "animate-[shake_0.3s_ease-in-out]" : ""}
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={
          pulsing
            ? { scale: [1, 1.02, 1] }
            : { scale: 1 }
        }
        transition={
          pulsing
            ? { duration: 2, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.3 }
        }
      >
        <div className="absolute inset-0 bg-white/10 rounded-full" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
          <span className="leading-tight text-center">
            {activeEvent ? (
              <motion.span
                initial={{ scale: 1.5 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring" }}
              >
                {activeEvent.name}
              </motion.span>
            ) : (
              <>
                CLICK
                <br />
                THE
                <br />
                BUTTON
              </>
            )}
          </span>
          {activeEvent && (
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs mt-1 opacity-80"
            >
              {activeEvent.multiplier}X MODE
            </motion.span>
          )}
        </div>

        <AnimatePresence>
          {ripples.map((ripple) => (
            <motion.span
              key={ripple.id}
              initial={{
                width: 0,
                height: 0,
                x: ripple.x,
                y: ripple.y,
                opacity: 0.6,
              }}
              animate={{
                width: 400,
                height: 400,
                x: ripple.x - 200,
                y: ripple.y - 200,
                opacity: 0,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute rounded-full bg-white/30 pointer-events-none"
              style={{ translateX: "-50%", translateY: "-50%" }}
            />
          ))}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
