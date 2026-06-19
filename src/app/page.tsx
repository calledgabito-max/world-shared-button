"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import ReactConfetti from "react-confetti";
import { useFirebase } from "@/hooks/useFirebase";
import MainButton from "@/components/MainButton";
import GlobalStats from "@/components/GlobalStats";
import OnlineUsers from "@/components/OnlineUsers";
import ActivityFeed from "@/components/ActivityFeed";
import EvolutionSystem from "@/components/EvolutionSystem";
import WorldMap from "@/components/WorldMap";
import StatisticsDashboard from "@/components/StatisticsDashboard";
import Achievements from "@/components/Achievements";
import Leaderboard from "@/components/Leaderboard";
import ViralSharing from "@/components/ViralSharing";
import SecretEvents from "@/components/SecretEvents";
import SoundToggle from "@/components/SoundToggle";
import NotificationBanner from "@/components/NotificationBanner";
import DonationModal from "@/components/DonationModal";
import ClickCombo from "@/components/ClickCombo";
import ClickerStats from "@/components/ClickerStats";

function ParticlesBackground() {
  const positions = [
    { l: 55.7, t: 57.7, d: 3.5, dl: 1.2 }, { l: 14.9, t: 74.2, d: 4.2, dl: 3.1 },
    { l: 48.3, t: 11.1, d: 5.1, dl: 0.8 }, { l: 59.5, t: 65.6, d: 3.0, dl: 4.2 },
    { l: 98.0, t: 50.9, d: 6.2, dl: 2.3 }, { l: 94.3, t: 75.1, d: 4.8, dl: 1.7 },
    { l: 80.2, t: 99.4, d: 3.3, dl: 3.9 }, { l: 82.3, t: 95.3, d: 5.5, dl: 0.5 },
    { l: 36.5, t: 15.5, d: 4.1, dl: 2.8 }, { l: 42.4, t: 28.4, d: 6.0, dl: 1.4 },
    { l: 37.4, t: 50.9, d: 3.8, dl: 4.5 }, { l: 24.2, t: 86.1, d: 5.2, dl: 2.1 },
    { l: 19.9, t: 23.4, d: 4.6, dl: 0.9 }, { l: 36.9, t: 94.4, d: 3.1, dl: 3.6 },
    { l: 5.75, t: 87.8, d: 5.9, dl: 1.8 }, { l: 2.55, t: 66.5, d: 4.4, dl: 2.6 },
    { l: 67.4, t: 22.8, d: 3.7, dl: 4.9 }, { l: 55.5, t: 23.0, d: 6.3, dl: 0.3 },
    { l: 68.0, t: 78.4, d: 3.2, dl: 3.4 }, { l: 19.9, t: 80.1, d: 5.4, dl: 1.5 },
    { l: 35.2, t: 48.7, d: 4.9, dl: 2.9 }, { l: 69.5, t: 41.2, d: 3.6, dl: 4.7 },
    { l: 87.8, t: 99.7, d: 5.7, dl: 0.7 }, { l: 63.2, t: 68.2, d: 4.3, dl: 3.8 },
    { l: 96.9, t: 20.6, d: 3.9, dl: 1.1 }, { l: 31.5, t: 42.1, d: 6.1, dl: 2.4 },
    { l: 22.6, t: 75.5, d: 3.4, dl: 4.0 }, { l: 43.6, t: 76.8, d: 5.6, dl: 1.9 },
    { l: 89.3, t: 2.57, d: 4.7, dl: 0.6 }, { l: 52.6, t: 86.4, d: 3.0, dl: 3.3 },
    { l: 54.6, t: 16.1, d: 5.3, dl: 2.7 }, { l: 40.0, t: 76.5, d: 4.0, dl: 1.6 },
    { l: 69.7, t: 48.3, d: 6.4, dl: 4.4 }, { l: 99.1, t: 52.5, d: 3.8, dl: 0.4 },
    { l: 69.9, t: 55.7, d: 5.0, dl: 3.5 }, { l: 30.0, t: 58.5, d: 4.5, dl: 2.0 },
    { l: 9.26, t: 27.5, d: 3.1, dl: 1.3 }, { l: 50.2, t: 1.54, d: 5.8, dl: 4.8 },
    { l: 16.7, t: 16.2, d: 4.2, dl: 0.2 }, { l: 92.8, t: 98.6, d: 6.0, dl: 3.2 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {positions.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
          style={{ left: `${pos.l}%`, top: `${pos.t}%` }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{
            duration: 3 + pos.d, repeat: Infinity,
            delay: pos.dl, ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function Home() {
  const {
    totalClicks, onlineUsers, activities, countryStats,
    unlockedAchievements, currentMilestoneIndex, activeEvent,
    userCountry, clicksToday, averageCps, mostActiveCountry,
    muted, setMuted, disconnected, handleClick, notification,
    userId, personalClicks,
  } = useFirebase();

  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 });
  const [showDonation, setShowDonation] = useState(false);
  const comboRef = useRef<{ registerClick: () => void }>(null);

  useEffect(() => {
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onButtonClick = useCallback(() => {
    handleClick();
    comboRef.current?.registerClick();

    if (Math.random() < 0.1) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }

    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(10);
    }
  }, [handleClick]);

  const mostActiveCountryCode = countryStats.length > 0 ? countryStats[0].countryCode : "";

  return (
    <main className="relative min-h-screen">
      <ParticlesBackground />

      {showConfetti && (
        <ReactConfetti
          width={windowSize.width} height={windowSize.height}
          recycle={false} numberOfPieces={200}
          colors={["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"]}
        />
      )}

      <SecretEvents activeEvent={activeEvent} />
      {notification && (
        <NotificationBanner message={notification.message} type={notification.type} />
      )}

      <ClickCombo ref={comboRef} onCombo={() => {}} />

      {/* Floating Donate Button */}
      <motion.button
        onClick={() => setShowDonation(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-20 z-50 w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-red-500 shadow-lg shadow-red-500/30 flex items-center justify-center text-lg hover:shadow-xl hover:shadow-red-500/40 transition-all"
        title="Support the experiment"
      >
        ❤️
      </motion.button>

      <SoundToggle muted={muted} onToggle={() => setMuted(!muted)} />
      <DonationModal
        isOpen={showDonation}
        onClose={() => setShowDonation(false)}
        totalClicks={totalClicks}
        userCountry={userCountry.name}
      />

      {disconnected && (
        <div className="fixed top-2 left-1/2 -translate-x-1/2 z-50 bg-yellow-500/20 border border-yellow-500/30 backdrop-blur-xl rounded-full px-4 py-1 text-xs text-yellow-300">
          Offline mode — Firebase not connected
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-6 md:py-12 space-y-8 md:space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-6 md:space-y-8 pt-4 md:pt-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent leading-tight"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 8, repeat: Infinity }}
              style={{ backgroundSize: "200% 200%" }}
            >
              THE WORLD&apos;S
              <br />
              SHARED BUTTON
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-base md:text-xl text-gray-400 max-w-2xl mx-auto mt-4 px-4"
            >
              Every person on Earth shares this button.
              <br />
              What happens if humanity keeps clicking?
            </motion.p>
          </motion.div>
        </section>

        {/* Global Stats */}
        <section>
          <GlobalStats
            totalClicks={totalClicks}
            onlineUsers={onlineUsers.length}
            countriesCount={countryStats.length}
            averageCps={averageCps}
          />
        </section>

        {/* Main Button */}
        <section className="flex justify-center py-4 md:py-8">
          <MainButton onClick={onButtonClick} activeEvent={activeEvent} />
        </section>

        {/* Two Column: Clicker Stats + User Info */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ClickerStats
            userCountry={userCountry.name}
            userCountryCode={userCountry.code}
            userId={userId}
            personalClicks={personalClicks}
            totalClicks={totalClicks}
          />
          <OnlineUsers users={onlineUsers} totalOnline={onlineUsers.length} />
        </section>

        {/* Activity Feed */}
        <section>
          <ActivityFeed activities={activities} />
        </section>

        {/* World Map */}
        <section>
          <WorldMap countryStats={countryStats} onlineUsers={onlineUsers} />
        </section>

        {/* Statistics Dashboard */}
        <section>
          <StatisticsDashboard
            totalClicks={totalClicks}
            onlineUsers={onlineUsers.length}
            countriesCount={countryStats.length}
            clicksToday={clicksToday}
            averageCps={averageCps}
            mostActiveCountry={mostActiveCountry}
            mostActiveCountryCode={mostActiveCountryCode}
          />
        </section>

        {/* Evolution + Achievements + Leaderboard */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <EvolutionSystem
            currentMilestoneIndex={currentMilestoneIndex}
            totalClicks={totalClicks}
          />
          <Achievements unlockedAchievements={unlockedAchievements} />
          <Leaderboard countryStats={countryStats} />
        </section>

        {/* Viral Sharing */}
        <section>
          <ViralSharing totalClicks={totalClicks} userCountry={userCountry.name} />
        </section>

        {/* Footer */}
        <footer className="text-center pb-8">
          <p className="text-xs text-gray-600">
            The World&apos;s Shared Button &mdash; A Global Social Experiment
          </p>
          <p className="text-[10px] text-gray-700 mt-1">
            {totalClicks.toLocaleString()} clicks by humanity
          </p>
        </footer>
      </div>
    </main>
  );
}
