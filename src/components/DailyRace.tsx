"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface DailyRaceProps {
  countryStats: { country: string; countryCode: string; clicks: number }[];
}

function getTimeUntilMidnight(): { hours: number; minutes: number; seconds: number } {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  const diff = midnight.getTime() - now.getTime();
  return {
    hours: Math.floor(diff / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

export default function DailyRace({ countryStats }: DailyRaceProps) {
  const [timeLeft, setTimeLeft] = useState(getTimeUntilMidnight());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeUntilMidnight());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const top3 = [...countryStats].sort((a, b) => b.clicks - a.clicks).slice(0, 3);

  const podiumEmojis = ["🥇", "🥈", "🥉"];

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
          🏆 Daily Race
        </h3>
        <div className="flex items-center gap-1 text-xs font-mono text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded-full">
          <span className="animate-pulse">⏱</span>
          <span>{String(timeLeft.hours).padStart(2, "0")}:{String(timeLeft.minutes).padStart(2, "0")}:{String(timeLeft.seconds).padStart(2, "0")}</span>
        </div>
      </div>

      <div className="space-y-1.5">
        {top3.map((country, i) => (
          <motion.div
            key={country.countryCode}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
              i === 0
                ? "bg-yellow-400/10 border border-yellow-400/20"
                : i === 1
                ? "bg-gray-300/5 border border-gray-300/10"
                : "bg-amber-600/5 border border-amber-600/10"
            }`}
          >
            <span className="text-lg">{podiumEmojis[i]}</span>
            <span className="text-base">{getFlagEmoji(country.countryCode)}</span>
            <span className="text-sm text-gray-200 flex-1 truncate">{country.country}</span>
            <span className="text-sm font-bold text-white tabular-nums">
              {country.clicks.toLocaleString()}
            </span>
          </motion.div>
        ))}
        {top3.length === 0 && (
          <p className="text-xs text-gray-500 text-center py-4">No clicks yet today</p>
        )}
      </div>

      <p className="text-[10px] text-gray-600 text-center mt-3">
        Leaderboard resets daily. Your country needs you! 🇺🇳
      </p>
    </div>
  );
}

function getFlagEmoji(countryCode: string): string {
  if (!countryCode || countryCode.length !== 2) return "🏳️";
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}
