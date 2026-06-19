"use client";

import { motion } from "framer-motion";
import { formatNumber, getFlag } from "@/lib/utils";

const RECENT_SUPPORTERS = [
  { name: "Anonymous", country: "United States", code: "US", amount: "$20" },
  { name: "Anonymous", country: "Germany", code: "DE", amount: "$5" },
  { name: "Anonymous", country: "Japan", code: "JP", amount: "$1" },
  { name: "Anonymous", country: "United Kingdom", code: "GB", amount: "$5" },
  { name: "Anonymous", country: "Canada", code: "CA", amount: "$1" },
];

interface DonationTickerProps {
  totalClicks: number;
}

export default function DonationTicker({ totalClicks }: DonationTickerProps) {
  const monthlyGoal = 500;
  const raised = Math.min(Math.floor(totalClicks / 100), monthlyGoal);
  const progress = Math.min(raised / monthlyGoal, 1);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="backdrop-blur-xl bg-gradient-to-r from-pink-500/10 to-red-500/10 border border-pink-500/20 rounded-2xl p-4 md:p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-pink-300 uppercase tracking-wider">
            ❤️ Support The Experiment
          </h3>
          <span className="text-xs text-pink-400/80 bg-pink-400/10 px-2 py-1 rounded-full">
            ${raised} / ${monthlyGoal} monthly goal
          </span>
        </div>

        {/* Progress Bar */}
        <div className="h-3 bg-white/10 rounded-full overflow-hidden mb-3">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-pink-500 to-red-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>

        <div className="flex items-center justify-between text-[10px] text-gray-500 mb-3">
          <span>🎯 ${monthlyGoal} keeps the servers running for everyone</span>
          <span>{Math.round(progress * 100)}% funded</span>
        </div>

        {/* Supporter Ticker */}
        <div className="overflow-hidden">
          <div className="flex gap-2 animate-scroll">
            {[...RECENT_SUPPORTERS, ...RECENT_SUPPORTERS].map((s, i) => (
              <div
                key={i}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 whitespace-nowrap"
              >
                <span>{getFlag(s.code)}</span>
                <span className="text-xs text-gray-300">{s.name}</span>
                <span className="text-xs font-semibold text-pink-400">{s.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
