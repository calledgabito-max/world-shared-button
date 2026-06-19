"use client";

import { motion } from "framer-motion";
import { formatNumber } from "@/lib/utils";

interface GlobalStatsProps {
  totalClicks: number;
  onlineUsers: number;
  countriesCount: number;
  averageCps: number;
}

export default function GlobalStats({
  totalClicks,
  onlineUsers,
  countriesCount,
  averageCps,
}: GlobalStatsProps) {
  const stats = [
    { label: "Total Clicks", value: formatNumber(totalClicks), icon: "🖱️" },
    { label: "Online Now", value: formatNumber(onlineUsers), icon: "🌎" },
    { label: "Countries", value: formatNumber(countriesCount), icon: "🏳️" },
    { label: "Clicks/sec", value: averageCps.toFixed(1), icon: "⚡" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 w-full max-w-4xl mx-auto px-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6 text-center hover:bg-white/10 transition-all duration-300"
        >
          <div className="text-2xl md:text-3xl mb-2">{stat.icon}</div>
          <motion.div
            key={stat.value}
            initial={{ scale: 1.3 }}
            animate={{ scale: 1 }}
            className="text-xl md:text-3xl font-bold text-white mb-1 tabular-nums"
          >
            {stat.value}
          </motion.div>
          <div className="text-xs md:text-sm text-gray-400 uppercase tracking-wider">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
