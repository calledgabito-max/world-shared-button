"use client";

import { motion, AnimatePresence } from "framer-motion";
import { OnlineUser } from "@/lib/types";
import { getFlag } from "@/lib/utils";

interface OnlineUsersProps {
  users: OnlineUser[];
  totalOnline: number;
}

export default function OnlineUsers({ users, totalOnline }: OnlineUsersProps) {
  const displayUsers = users.slice(0, 8);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
            Online Now
          </h3>
          <motion.span
            key={totalOnline}
            initial={{ scale: 1.3 }}
            animate={{ scale: 1 }}
            className="text-sm font-bold text-emerald-400"
          >
            {totalOnline.toLocaleString()} online
          </motion.span>
        </div>

        <div className="flex flex-wrap gap-2">
          <AnimatePresence>
            {displayUsers.map((user) => (
              <motion.div
                key={user.userId}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm"
                title={user.country}
              >
                <span className="text-base">{getFlag(user.countryCode)}</span>
                <span className="text-gray-300 text-xs truncate max-w-[80px]">
                  {user.country}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {users.length > 8 && (
          <p className="text-xs text-gray-500 mt-3 text-center">
            and {users.length - 8} more...
          </p>
        )}
      </div>
    </div>
  );
}
