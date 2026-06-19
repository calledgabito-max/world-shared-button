"use client";

import { useState, useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ClickComboProps {
  onCombo: (multiplier: number) => void;
}

export interface ClickComboHandle {
  registerClick: () => void;
}

const ClickCombo = forwardRef<ClickComboHandle, ClickComboProps>(
  function ClickCombo({ onCombo }, ref) {
    const [combo, setCombo] = useState(0);
    const [showCombo, setShowCombo] = useState(false);
    const [multiplier, setMultiplier] = useState(1);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const clickRef = useRef(0);
    const lastClickRef = useRef(0);

    useImperativeHandle(ref, () => ({
      registerClick: () => {
        const now = Date.now();

        if (now - lastClickRef.current < 800) {
          clickRef.current += 1;
        } else {
          clickRef.current = 1;
        }

        lastClickRef.current = now;

        const newCombo = Math.min(clickRef.current, 50);

        let newMultiplier = 1;
        if (newCombo >= 30) newMultiplier = 5;
        else if (newCombo >= 20) newMultiplier = 3;
        else if (newCombo >= 10) newMultiplier = 2;
        else if (newCombo >= 5) newMultiplier = 1.5;

        setCombo(newCombo);
        setMultiplier(newMultiplier);
        setShowCombo(true);

        if (newMultiplier > 1) {
          onCombo(newMultiplier);
        }

        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
          setShowCombo(false);
          setCombo(0);
          clickRef.current = 0;
          setMultiplier(1);
        }, 1500);
      },
    }));

    useEffect(() => {
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }, []);

    return (
      <AnimatePresence>
        {showCombo && combo > 0 && (
          <motion.div
            key={combo}
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -20 }}
            className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-40 text-center"
          >
            <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 0.3 }}>
              <span
                className={`text-4xl md:text-6xl font-black ${
                  multiplier >= 5
                    ? "text-purple-400"
                    : multiplier >= 3
                    ? "text-pink-400"
                    : multiplier >= 2
                    ? "text-orange-400"
                    : "text-yellow-400"
                }`}
              >
                {combo}x
              </span>
              {multiplier > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-lg md:text-xl font-bold text-white mt-1"
                >
                  {multiplier}x Multiplier!
                </motion.div>
              )}
            </motion.div>
            <div className="flex justify-center gap-1 mt-2">
              {Array.from({ length: Math.min(combo, 10) }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 4 }}
                  animate={{ height: 8 + Math.random() * 16 }}
                  className={`w-2 rounded-full ${
                    multiplier >= 5
                      ? "bg-purple-400"
                      : multiplier >= 3
                      ? "bg-pink-400"
                      : multiplier >= 2
                      ? "bg-orange-400"
                      : "bg-yellow-400"
                  }`}
                  transition={{ duration: 0.2 }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

export default ClickCombo;
