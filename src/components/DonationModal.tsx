"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalClicks: number;
  userCountry: string;
}

const TIERS = [
  {
    id: "sponsored-click",
    name: "Sponsored Click",
    price: "$1",
    paypal: "1",
    description: "Your name + country appear on the global activity feed with a golden badge",
    icon: "⭐",
    color: "from-yellow-400 to-amber-500",
  },
  {
    id: "golden-clicker",
    name: "Golden Clicker",
    price: "$5",
    paypal: "5",
    description: "Golden click animation + your name featured on sidebar for 1 hour",
    icon: "👑",
    color: "from-amber-400 to-orange-500",
  },
  {
    id: "world-hero",
    name: "World Hero",
    price: "$20",
    paypal: "20",
    description: "Custom message broadcast to all users + permanent Hall of Fame spot",
    icon: "🌍",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "milestone-boost",
    name: "Milestone Boost",
    price: "$50",
    paypal: "50",
    description: "Name the next milestone + exclusive 'Founder' badge forever",
    icon: "🚀",
    color: "from-blue-500 to-cyan-500",
  },
];

export default function DonationModal({
  isOpen,
  onClose,
  totalClicks,
  userCountry,
}: DonationModalProps) {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDonate = (tier: (typeof TIERS)[0]) => {
    setSelectedTier(tier.id);
    const paypalUrl = `https://www.paypal.com/paypalme/calledgabito/${tier.paypal}USD`;
    window.open(paypalUrl, "_blank", "noopener,noreferrer");
    setTimeout(() => setSelectedTier(null), 3000);
  };

  if (!mounted) return null;

  const currentGoal = 1000;
  const progress = Math.min((totalClicks % currentGoal) / currentGoal, 1);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-xl md:w-full z-[70] overflow-y-auto max-h-[90vh]"
          >
            <div className="backdrop-blur-xl bg-gray-900/95 border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-400 hover:text-white transition-all"
              >
                ✕
              </button>

              <div className="text-center mb-6">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-4xl mb-3"
                >
                  ❤️
                </motion.div>
                <h2 className="text-2xl font-bold text-white mb-1">
                  Support The Experiment
                </h2>
                <p className="text-sm text-gray-400">
                  Help keep The World&apos;s Shared Button alive and reach the next evolution stage.
                </p>
              </div>

              {/* Milestone Progress */}
              <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
                <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                  <span>🎯 Next Milestone: {totalClicks + currentGoal - (totalClicks % currentGoal)} clicks</span>
                  <span>{Math.round(progress * 100)}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <p className="text-[10px] text-gray-500 mt-2 text-center">
                  Donations help us reach milestones faster and keep the servers running
                </p>
              </div>

              {/* Tiers */}
              <div className="space-y-3 mb-6">
                {TIERS.map((tier) => (
                  <motion.button
                    key={tier.id}
                    onClick={() => handleDonate(tier)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 ${
                      selectedTier === tier.id
                        ? "bg-gradient-to-r " + tier.color + " border-white/30"
                        : "bg-white/5 border-white/10 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{tier.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-white text-sm">
                            {tier.name}
                          </span>
                          <span className="font-bold text-white text-sm">
                            {tier.price}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-400 mt-0.5">
                          {tier.description}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Hall of Fame Preview */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/20">
                <h3 className="text-xs font-semibold text-yellow-400 uppercase tracking-wider mb-2">
                  🌟 Hall of Fame — Top Supporters
                </h3>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <span className="text-yellow-400">👑</span>
                    <span className="font-semibold text-yellow-300">Anonymous Hero</span>
                    <span className="text-[10px] text-gray-500">— World Hero</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span className="text-gray-500">⭐</span>
                    <span>Be the first supporter</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="text-gray-600">⭐</span>
                    <span className="italic">Your name here?</span>
                  </div>
                </div>
              </div>

              <p className="text-[10px] text-gray-600 text-center mt-4">
                All donations go toward server costs and development.
                Thank you for being part of this experiment! 🌍
              </p>
              <div className="mt-3 p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-center">
                <p className="text-[10px] text-yellow-400/80">
                  ⚡ Donations processed via PayPal. If the link doesn&apos;t open,
                  make sure your PayPal Business account is verified and set up for donations.
                  <br />
                  <a
                    href="https://www.paypal.com/bizsignup/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-yellow-300"
                  >
                    Set up PayPal Business account →
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
