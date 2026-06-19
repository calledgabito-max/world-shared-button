"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ClickActivity } from "@/lib/types";
import { getFlag } from "@/lib/utils";

interface ActivityFeedProps {
  activities: ClickActivity[];
}

export default function ActivityFeed({ activities }: ActivityFeedProps) {
  const feedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = 0;
    }
  }, [activities]);

  const displayActivities = activities.slice(0, 30);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5">
        <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">
          Live Activity
        </h3>

        <div
          ref={feedRef}
          className="space-y-1.5 max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
        >
          <AnimatePresence initial={false}>
            {displayActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20, height: 0 }}
                animate={{ opacity: 1, x: 0, height: "auto" }}
                exit={{ opacity: 0, x: 20, height: 0 }}
                transition={{ duration: 0.3, delay: index * 0.02 }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                <span className="text-lg">{getFlag(activity.countryCode)}</span>
                <span className="text-sm text-gray-300">
                  Someone from{" "}
                  <span className="font-semibold text-white">
                    {activity.country}
                  </span>{" "}
                  clicked
                </span>
                <span className="text-[10px] text-gray-500 ml-auto">
                  {new Date(activity.timestamp).toLocaleTimeString()}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>

          {displayActivities.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-8">
              Waiting for the first click...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
