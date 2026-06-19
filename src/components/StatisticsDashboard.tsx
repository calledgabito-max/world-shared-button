"use client";

import { motion } from "framer-motion";
import { formatNumber, getFlag } from "@/lib/utils";

interface StatisticsDashboardProps {
  totalClicks: number;
  onlineUsers: number;
  countriesCount: number;
  clicksToday: number;
  averageCps: number;
  mostActiveCountry: string;
  mostActiveCountryCode: string;
}

export default function StatisticsDashboard({
  totalClicks,
  onlineUsers,
  countriesCount,
  clicksToday,
  averageCps,
  mostActiveCountry,
  mostActiveCountryCode,
}: StatisticsDashboardProps) {
  const stats = [
    {
      label: "Total Clicks",
      value: formatNumber(totalClicks),
      icon: "🖱️",
      change: "+" + formatNumber(clicksToday) + " today",
    },
    {
      label: "Online Users",
      value: formatNumber(onlineUsers),
      icon: "🌎",
      change: "right now",
    },
    {
      label: "Countries",
      value: formatNumber(countriesCount),
      icon: "🏳️",
      change: "represented",
    },
    {
      label: "Avg Clicks/sec",
      value: averageCps.toFixed(1),
      icon: "⚡",
      change: "worldwide",
    },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{stat.icon}</span>
              <span className="text-[10px] text-emerald-400/80 bg-emerald-400/10 px-2 py-0.5 rounded-full">
                {stat.change}
              </span>
            </div>
            <motion.div
              key={stat.value}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="text-2xl md:text-3xl font-bold text-white tabular-nums"
            >
              {stat.value}
            </motion.div>
            <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-4 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
              Most Active Country
            </div>
            <div className="flex items-center gap-2">
              {mostActiveCountryCode && (
                <span className="text-2xl">{getFlag(mostActiveCountryCode)}</span>
              )}
              <span className="text-xl font-bold text-white">
                {mostActiveCountry || "N/A"}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
              Clicks Today
            </div>
            <div className="text-xl font-bold text-white tabular-nums">
              {formatNumber(clicksToday)}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
