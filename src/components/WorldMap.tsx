"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { CountryData } from "@/lib/types";

interface WorldMapProps {
  countryStats: CountryData[];
  onlineUsers: { countryCode: string }[];
}

const countryPositions: Record<string, { x: number; y: number }> = {
  US: { x: 15, y: 35 }, CA: { x: 15, y: 25 }, GB: { x: 45, y: 25 },
  FR: { x: 46, y: 30 }, DE: { x: 48, y: 27 }, IT: { x: 49, y: 33 },
  ES: { x: 43, y: 34 }, PT: { x: 40, y: 35 }, NL: { x: 47, y: 25 },
  BE: { x: 47, y: 27 }, CH: { x: 49, y: 30 }, AT: { x: 50, y: 28 },
  SE: { x: 51, y: 18 }, NO: { x: 48, y: 15 }, DK: { x: 50, y: 22 },
  FI: { x: 54, y: 15 }, PL: { x: 52, y: 25 }, CZ: { x: 51, y: 27 },
  SK: { x: 52, y: 28 }, HU: { x: 52, y: 30 }, RO: { x: 55, y: 30 },
  GR: { x: 54, y: 35 }, TR: { x: 57, y: 33 }, RU: { x: 65, y: 20 },
  CN: { x: 75, y: 30 }, JP: { x: 85, y: 28 }, KR: { x: 82, y: 28 },
  IN: { x: 70, y: 38 }, TH: { x: 75, y: 42 }, VN: { x: 77, y: 40 },
  PH: { x: 80, y: 42 }, ID: { x: 77, y: 48 }, MY: { x: 75, y: 45 },
  SG: { x: 76, y: 47 }, AU: { x: 87, y: 55 }, NZ: { x: 90, y: 60 },
  BR: { x: 30, y: 55 }, AR: { x: 25, y: 65 }, CL: { x: 20, y: 60 },
  CO: { x: 25, y: 48 }, PE: { x: 22, y: 55 }, MX: { x: 12, y: 38 },
  ZA: { x: 50, y: 65 }, NG: { x: 48, y: 45 }, KE: { x: 55, y: 48 },
  EG: { x: 55, y: 38 }, TZ: { x: 54, y: 50 }, GH: { x: 44, y: 45 },
  MA: { x: 42, y: 38 }, DZ: { x: 44, y: 35 }, IL: { x: 54, y: 35 },
  SA: { x: 58, y: 38 }, AE: { x: 60, y: 37 }, IQ: { x: 56, y: 35 },
  IR: { x: 59, y: 33 }, PK: { x: 65, y: 35 }, AF: { x: 63, y: 35 },
  UA: { x: 55, y: 27 }, BY: { x: 54, y: 23 },
};

export default function WorldMap({ countryStats, onlineUsers }: WorldMapProps) {
  const maxClicks = useMemo(
    () => Math.max(...countryStats.map((c) => c.clicks), 1),
    [countryStats]
  );

  const onlineCodes = useMemo(
    () => new Set(onlineUsers.map((u) => u.countryCode)),
    [onlineUsers]
  );

  const countryMap = useMemo(
    () =>
      countryStats.reduce(
        (acc, c) => {
          acc[c.countryCode] = c.clicks;
          return acc;
        },
        {} as Record<string, number>
      ),
    [countryStats]
  );

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6">
        <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
          Live World Map
        </h3>

        <div className="relative w-full aspect-[2/1] bg-gradient-to-br from-blue-900/20 via-transparent to-indigo-900/20 rounded-xl overflow-hidden">
          <svg viewBox="0 0 100 70" className="w-full h-full">
            {Object.entries(countryPositions).map(([code, pos]) => {
              const clicks = countryMap[code] || 0;
              const isOnline = onlineCodes.has(code);
              const intensity = maxClicks > 0 ? clicks / maxClicks : 0;

              let color: string;
              let radius: number;

              if (isOnline) {
                color = `rgba(52, 211, 153, ${0.4 + intensity * 0.6})`;
                radius = 0.8 + intensity * 1.2;
              } else if (clicks > 0) {
                color = `rgba(96, 165, 250, ${0.2 + intensity * 0.5})`;
                radius = 0.4 + intensity * 0.8;
              } else {
                color = "rgba(255,255,255,0.08)";
                radius = 0.3;
              }

              return (
                <g key={code}>
                  <motion.circle
                    cx={pos.x}
                    cy={pos.y}
                    r={radius}
                    fill={color}
                    initial={{ r: 0, opacity: 0 }}
                    animate={{ r: radius, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="cursor-pointer"
                  >
                    <title>{code}</title>
                  </motion.circle>
                  {isOnline && (
                    <motion.circle
                      cx={pos.x}
                      cy={pos.y}
                      r={radius + 0.5}
                      fill="none"
                      stroke="rgba(52, 211, 153, 0.4)"
                      strokeWidth="0.1"
                      animate={{
                        r: [radius + 0.5, radius + 1.5],
                        opacity: [0.4, 0],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </g>
              );
            })}
          </svg>

          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] text-gray-500">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Online
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                Active
              </span>
            </div>
            <span>{Object.keys(countryPositions).length} countries tracked</span>
          </div>
        </div>
      </div>
    </div>
  );
}
