"use client";

import { motion } from "framer-motion";

interface ReferralShareProps {
  userId: string;
  totalClicks: number;
}

export default function ReferralShare({ userId, totalClicks }: ReferralShareProps) {
  const referralLink =
    typeof window !== "undefined"
      ? `${window.location.origin}?ref=${userId.slice(0, 8)}`
      : `https://worldsharedbutton.tanlink.site?ref=${userId.slice(0, 8)}`;

  const handleCopy = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(
        `🌎 I'm part of The World's Shared Button experiment!\n\nEvery person on Earth shares this button. ${totalClicks} clicks and counting.\n\nJoin me: ${referralLink}`
      );
      alert("Your invite link is copied! Share it everywhere 🚀");
    }
  };

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5">
      <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">
        🔗 Your Invite Link
      </h3>

      <p className="text-xs text-gray-500 mb-3">
        Share your unique link — when people click through, they join your &ldquo;crew.&rdquo;
      </p>

      <div className="flex gap-2 mb-3">
        <input
          readOnly
          value={referralLink}
          className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300 font-mono outline-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <motion.button
          onClick={handleCopy}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-sm font-semibold text-blue-300 hover:from-blue-500/30 hover:to-purple-500/30 transition-all"
        >
          📋 Copy Link
        </motion.button>

        <motion.a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
            `🌎 I'm clicking The World's Shared Button! Join the experiment: ${referralLink}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm font-semibold text-gray-300 hover:bg-white/10 transition-all text-center block"
        >
          𝕏 Share
        </motion.a>
      </div>
    </div>
  );
}
