"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MILESTONES, formatNumber } from "@/lib/utils";

interface EvolutionSystemProps {
  currentMilestoneIndex: number;
  totalClicks: number;
}

export default function EvolutionSystem({
  currentMilestoneIndex,
  totalClicks,
}: EvolutionSystemProps) {
  const nextMilestone = MILESTONES[currentMilestoneIndex + 1];

  const progress = nextMilestone
    ? Math.min(
        ((totalClicks - MILESTONES[currentMilestoneIndex].clicks) /
          (nextMilestone.clicks - MILESTONES[currentMilestoneIndex].clicks)) *
          100,
        100
      )
    : 100;

  const themeColors: Record<string, string> = {
    blue: "from-blue-500 to-indigo-600",
    purple: "from-purple-500 to-pink-600",
    pink: "from-pink-500 to-rose-600",
    gold: "from-yellow-400 to-amber-600",
    cosmic: "from-purple-600 via-pink-500 to-red-500",
  };

  const currentTheme = MILESTONES[currentMilestoneIndex]?.theme || "blue";

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5">
        <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
          Evolution Progress
        </h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>
              Stage {currentMilestoneIndex + 1}: {MILESTONES[currentMilestoneIndex].name}
            </span>
            {nextMilestone && (
              <span>{formatNumber(nextMilestone.clicks)} clicks</span>
            )}
          </div>

          <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${themeColors[currentTheme]}`}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>

          {nextMilestone && (
            <p className="text-xs text-gray-500 text-center">
              {formatNumber(nextMilestone.clicks - totalClicks)} clicks until next stage
            </p>
          )}
        </div>

        <div className="mt-4 space-y-2">
          {MILESTONES.slice(1).map((milestone, index) => {
            const stageIndex = index + 1;
            const unlocked = currentMilestoneIndex >= stageIndex;
            return (
              <motion.div
                key={milestone.clicks}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 ${
                  unlocked
                    ? "bg-white/10 border border-white/10"
                    : "opacity-40"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                    unlocked
                      ? `bg-gradient-to-r ${themeColors[milestone.theme]}`
                      : "bg-white/10"
                  }`}
                >
                  {unlocked ? "✓" : milestone.clicks >= 1000000 ? "?" : stageIndex + 1}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-white">
                    {unlocked ? milestone.name : "???"}
                  </div>
                  <div className="text-[10px] text-gray-500">
                    {unlocked
                      ? milestone.description
                      : `Unlocks at ${formatNumber(milestone.clicks)} clicks`}
                  </div>
                </div>
                {unlocked && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-emerald-400"
                  >
                    ●
                  </motion.span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
