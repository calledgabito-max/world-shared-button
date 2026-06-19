"use client";

import { motion } from "framer-motion";
import { CountryData } from "@/lib/types";
import { getFlag, formatNumber } from "@/lib/utils";

interface LeaderboardProps {
  countryStats: CountryData[];
}

export default function Leaderboard({ countryStats }: LeaderboardProps) {
  const sorted = [...countryStats].sort((a, b) => b.clicks - a.clicks).slice(0, 10);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5">
        <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">
          Country Leaderboard
        </h3>

        <div className="space-y-2">
          {sorted.map((country, index) => (
            <motion.div
              key={country.countryCode}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              <span className="text-xs font-mono text-gray-500 w-5 text-right">
                #{index + 1}
              </span>
              <span className="text-xl">{getFlag(country.countryCode)}</span>
              <span className="text-sm text-gray-200 flex-1 truncate">
                {country.country}
              </span>
              <motion.span
                key={country.clicks}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="text-sm font-bold text-white tabular-nums"
              >
                {formatNumber(country.clicks)}
              </motion.span>
            </motion.div>
          ))}

          {sorted.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-8">
              No countries yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
