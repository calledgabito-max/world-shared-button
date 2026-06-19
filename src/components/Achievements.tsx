"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ACHIEVEMENTS_CONFIG } from "@/lib/utils";

interface AchievementsProps {
  unlockedAchievements: string[];
}

export default function Achievements({ unlockedAchievements }: AchievementsProps) {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5">
        <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">
          Humanity Achievements
        </h3>

        <div className="grid grid-cols-2 gap-2">
          {ACHIEVEMENTS_CONFIG.map((achievement, index) => {
            const unlocked = unlockedAchievements.includes(achievement.id);
            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`relative p-3 rounded-xl border transition-all duration-300 ${
                  unlocked
                    ? "bg-gradient-to-br from-yellow-500/10 to-amber-500/5 border-yellow-500/30"
                    : "bg-white/5 border-white/10 opacity-50"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{achievement.icon}</span>
                  <span className="text-xs font-bold text-white leading-tight">
                    {achievement.name}
                  </span>
                </div>
                <p className="text-[10px] text-gray-500 leading-tight">
                  {unlocked ? achievement.description : "???"}
                </p>
                {unlocked && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full flex items-center justify-center"
                  >
                    <span className="text-[8px] text-black font-bold">✓</span>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
