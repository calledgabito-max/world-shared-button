"use client";

import { motion } from "framer-motion";
import { getFlag } from "@/lib/utils";

interface ClickerStatsProps {
  userCountry: string;
  userCountryCode: string;
  userId: string;
  personalClicks: number;
  totalClicks: number;
}

export default function ClickerStats({
  userCountry,
  userCountryCode,
  userId,
  personalClicks,
  totalClicks,
}: ClickerStatsProps) {
  const contribution =
    totalClicks > 0
      ? ((personalClicks / totalClicks) * 100).toFixed(4)
      : "0.0000";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5"
    >
      <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">
        Your Clicker Stats
      </h3>

      <div className="flex items-center gap-3 mb-4 p-3 rounded-xl bg-white/5">
        <span className="text-3xl">{getFlag(userCountryCode)}</span>
        <div>
          <div className="text-sm font-semibold text-white">{userCountry}</div>
          <div className="text-[10px] text-gray-500 font-mono">
            ID: {userId.slice(0, 8).toUpperCase()}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="p-3 rounded-xl bg-white/5 text-center">
          <div className="text-lg font-bold text-white">
            {personalClicks.toLocaleString()}
          </div>
          <div className="text-[10px] text-gray-500 uppercase">Your Clicks</div>
        </div>
        <div className="p-3 rounded-xl bg-white/5 text-center">
          <div className="text-lg font-bold text-emerald-400">
            {contribution}%
          </div>
          <div className="text-[10px] text-gray-500 uppercase">
            Of All Clicks
          </div>
        </div>
      </div>

      {/* Share Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => {
          const text = `🌎 I've clicked the World's Shared Button ${personalClicks.toLocaleString()} times!\n\nI'm ${contribution}% of all ${totalClicks.toLocaleString()} clicks.\n\nJoin the experiment:`;
          if (typeof navigator !== "undefined") {
            navigator.clipboard.writeText(text + " " + window.location.href);
            alert("Stats copied to clipboard — share it everywhere!");
          }
        }}
        className="w-full mt-3 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-sm font-semibold text-blue-300 hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-200"
      >
        📋 Copy Your Stats to Share
      </motion.button>

      <p className="text-[10px] text-gray-600 text-center mt-2">
        Your contribution to humanity&apos;s greatest experiment
      </p>
    </motion.div>
  );
}
