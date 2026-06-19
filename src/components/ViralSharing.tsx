"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface ViralSharingProps {
  totalClicks: number;
  userCountry: string;
}

export default function ViralSharing({ totalClicks }: ViralSharingProps) {
  const [shareUrl, setShareUrl] = useState("https://worldsharedbutton.com");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setShareUrl(window.location.href);
    setMounted(true);
  }, []);

  const shareText = mounted
    ? encodeURIComponent(
        `I just clicked The World's Shared Button! 🌎 ${totalClicks.toLocaleString()} total clicks!\n\nEvery person on Earth shares this button. What happens if humanity keeps clicking?\n\nClick here:`
      )
    : "";

  const encodedUrl = encodeURIComponent(shareUrl);
  const cardText = `I clicked The World's Shared Button #${totalClicks.toLocaleString()}`;

  const handleCopyLink = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(
        `I just clicked The World's Shared Button! 🌎 Every person on Earth shares this button. ${window.location.href}`
      );
      alert("Share link copied to clipboard!");
    }
  };

  if (!mounted) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5">
          <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">
            Share With The World
          </h3>
          <div className="bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-blue-500/20 rounded-xl p-4 mb-4 text-center">
            <p className="text-white font-semibold text-sm leading-snug">
              &ldquo;{cardText}&rdquo;
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {["X", "Facebook", "Copy Link"].map((name) => (
              <div
                key={name}
                className="flex flex-col items-center gap-1 px-3 py-3 rounded-xl bg-white/5 border border-white/10"
              >
                <span className="text-lg font-bold">
                  {name === "X" ? "𝕏" : name === "Facebook" ? "f" : "🔗"}
                </span>
                <span className="text-[10px] text-gray-400">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const platforms = [
    {
      name: "X",
      url: `https://twitter.com/intent/tweet?text=${shareText}&url=${encodedUrl}`,
      color: "hover:bg-white/20",
      icon: "𝕏",
    },
    {
      name: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${shareText}`,
      color: "hover:bg-blue-600/30",
      icon: "f",
    },
    {
      name: "Copy Link",
      url: "#",
      color: "hover:bg-white/20",
      icon: "🔗",
    },
  ];

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5">
        <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">
          Share With The World
        </h3>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-blue-500/20 rounded-xl p-4 mb-4 text-center"
        >
          <p className="text-white font-semibold text-sm leading-snug">
            &ldquo;{cardText}&rdquo;
          </p>
          <p className="text-[10px] text-gray-500 mt-2">
            Share your click with the world
          </p>
        </motion.div>

        <div className="grid grid-cols-3 gap-2">
          {platforms.map((platform) => (
            <motion.a
              key={platform.name}
              href={platform.url === "#" ? undefined : platform.url}
              target={platform.url === "#" ? undefined : "_blank"}
              rel="noopener noreferrer"
              onClick={platform.name === "Copy Link" ? handleCopyLink : undefined}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex flex-col items-center gap-1 px-3 py-3 rounded-xl bg-white/5 border border-white/10 transition-all duration-200 cursor-pointer ${platform.color}`}
            >
              <span className="text-lg font-bold">{platform.icon}</span>
              <span className="text-[10px] text-gray-400">{platform.name}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}
