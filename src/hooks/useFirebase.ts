"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { db } from "@/lib/firebase";
import {
  doc,
  setDoc,
  onSnapshot,
  increment,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  deleteDoc,
} from "firebase/firestore";
import { ClickActivity, OnlineUser, CountryData, SecretEvent } from "@/lib/types";
import {
  generateUserId,
  getCountryName,
  MILESTONES,
  ACHIEVEMENTS_CONFIG,
  calculateClicksPerSecond,
  SECRET_EVENTS,
} from "@/lib/utils";
import soundManager from "@/lib/sounds";

const ACTIVITIES_COLLECTION = "activities";
const ONLINE_USERS_COLLECTION = "online-users";
const COUNTRY_STATS_COLLECTION = "country-stats";

const FALLBACK_COUNTRY = "United States";
const FALLBACK_COUNTRY_CODE = "US";

const TZ_COUNTRY_MAP: Record<string, string> = {
  "Africa/Dar_es_Salaam": "TZ", "Africa/Nairobi": "KE", "Africa/Kampala": "UG",
  "Africa/Kigali": "RW", "Africa/Bujumbura": "BI", "Africa/Johannesburg": "ZA",
  "Africa/Cairo": "EG", "Africa/Casablanca": "MA", "Africa/Lagos": "NG",
  "Africa/Accra": "GH", "Africa/Ndjamena": "TD", "Africa/Tunis": "TN",
  "Africa/Algiers": "DZ", "Africa/Tripoli": "LY", "Africa/Khartoum": "SD",
  "Africa/Addis_Ababa": "ET", "Africa/Mogadishu": "SO", "Africa/Djibouti": "DJ",
  "Africa/Maputo": "MZ", "Africa/Lusaka": "ZM", "Africa/Harare": "ZW",
  "Africa/Gaborone": "BW", "Africa/Windhoek": "NA", "Africa/Luanda": "AO",
  "Africa/Kinshasa": "CD", "Africa/Douala": "CM", "Africa/Abidjan": "CI",
  "Africa/Dakar": "SN", "Africa/Bamako": "ML", "Africa/Ouagadougou": "BF",
  "Africa/Niamey": "NE", "Africa/Bangui": "CF", "Africa/Libreville": "GA",
  "Africa/Porto-Novo": "BJ", "Africa/Lome": "TG", "Africa/Freetown": "SL",
  "Africa/Monrovia": "LR", "Africa/Conakry": "GN", "Africa/Bissau": "GW",
  "Africa/Nouakchott": "MR", "Africa/El_Aaiun": "EH", "Africa/Asmara": "ER",
  "Africa/Mbabane": "SZ", "Africa/Maseru": "LS", "Africa/Blantyre": "MW",
  "Africa/Kigoma": "TZ", "Africa/Mwanza": "TZ",
  "America/New_York": "US", "America/Chicago": "US", "America/Los_Angeles": "US",
  "America/Denver": "US", "America/Phoenix": "US", "America/Anchorage": "US",
  "America/Toronto": "CA", "America/Vancouver": "CA", "America/Montreal": "CA",
  "America/Mexico_City": "MX", "America/Sao_Paulo": "BR", "America/Argentina/Buenos_Aires": "AR",
  "America/Bogota": "CO", "America/Lima": "PE", "America/Santiago": "CL",
  "America/Caracas": "VE", "America/Panama": "PA", "America/Havana": "CU",
  "Europe/London": "GB", "Europe/Paris": "FR", "Europe/Berlin": "DE",
  "Europe/Madrid": "ES", "Europe/Rome": "IT", "Europe/Amsterdam": "NL",
  "Europe/Brussels": "BE", "Europe/Zurich": "CH", "Europe/Vienna": "AT",
  "Europe/Stockholm": "SE", "Europe/Oslo": "NO", "Europe/Copenhagen": "DK",
  "Europe/Helsinki": "FI", "Europe/Warsaw": "PL", "Europe/Prague": "CZ",
  "Europe/Budapest": "HU", "Europe/Dublin": "IE", "Europe/Athens": "GR",
  "Europe/Bucharest": "RO", "Europe/Sofia": "BG", "Europe/Belgrade": "RS",
  "Europe/Zagreb": "HR", "Europe/Istanbul": "TR", "Europe/Moscow": "RU",
  "Europe/Kiev": "UA", "Europe/Lisbon": "PT", "Europe/Monaco": "MC",
  "Asia/Tokyo": "JP", "Asia/Seoul": "KR", "Asia/Shanghai": "CN",
  "Asia/Hong_Kong": "HK", "Asia/Singapore": "SG", "Asia/Kolkata": "IN",
  "Asia/Karachi": "PK", "Asia/Dhaka": "BD", "Asia/Bangkok": "TH",
  "Asia/Ho_Chi_Minh": "VN", "Asia/Manila": "PH", "Asia/Jakarta": "ID",
  "Asia/Kuala_Lumpur": "MY", "Asia/Riyadh": "SA", "Asia/Dubai": "AE",
  "Asia/Tehran": "IR", "Asia/Baghdad": "IQ", "Asia/Jerusalem": "IL",
  "Asia/Amman": "JO", "Asia/Beirut": "LB", "Asia/Damascus": "SY",
  "Asia/Kathmandu": "NP", "Asia/Colombo": "LK", "Asia/Rangoon": "MM",
  "Asia/Phnom_Penh": "KH", "Asia/Vientiane": "LA", "Asia/Ulaanbaatar": "MN",
  "Asia/Tashkent": "UZ", "Asia/Almaty": "KZ", "Asia/Baku": "AZ",
  "Asia/Tbilisi": "GE", "Asia/Yerevan": "AM", "Asia/Kabul": "AF",
  "Asia/Ashgabat": "TM", "Asia/Dushanbe": "TJ", "Asia/Bishkek": "KG",
  "Asia/Nicosia": "CY", "Asia/Muscat": "OM", "Asia/Doha": "QA",
  "Asia/Bahrain": "BH", "Asia/Kuwait": "KW",
  "Australia/Sydney": "AU", "Australia/Melbourne": "AU", "Australia/Perth": "AU",
  "Australia/Brisbane": "AU", "Australia/Adelaide": "AU",
  "Pacific/Auckland": "NZ", "Pacific/Fiji": "FJ", "Pacific/Honolulu": "US",
  "Pacific/Guam": "GU", "Pacific/Samoa": "WS", "Pacific/Tahiti": "PF",
};

function getCountryFromTimezone(): { name: string; code: string } {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (!timezone) return { name: FALLBACK_COUNTRY, code: FALLBACK_COUNTRY_CODE };
    const code = TZ_COUNTRY_MAP[timezone] || FALLBACK_COUNTRY_CODE;
    return { name: getCountryName(code), code };
  } catch {
    return { name: FALLBACK_COUNTRY, code: FALLBACK_COUNTRY_CODE };
  }
}

export function useFirebase() {
  const [totalClicks, setTotalClicks] = useState(0);
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [activities, setActivities] = useState<ClickActivity[]>([]);
  const [countryStats, setCountryStats] = useState<CountryData[]>([]);
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
  const [currentMilestoneIndex, setCurrentMilestoneIndex] = useState(0);
  const [activeEvent, setActiveEvent] = useState<SecretEvent | null>(null);
  const [userId, setUserId] = useState("");
  const [clicksToday, setClicksToday] = useState(0);
  const [averageCps, setAverageCps] = useState(0);
  const [mostActiveCountry, setMostActiveCountry] = useState("");
  const [muted, setMuted] = useState(false);
  const [disconnected, setDisconnected] = useState(false);
  const [personalClicks, setPersonalClicks] = useState(0);
  const [notification, setNotification] = useState<{
    message: string;
    type: "achievement" | "milestone" | "event" | "unlock";
  } | null>(null);

  const userCountry = useRef(getCountryFromTimezone());
  const lastClicks = useRef(0);
  const lastCpsTime = useRef(Date.now());
  const onlineDocRef = useRef<string | null>(null);
  const heartbeatRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const userClicksRef = useRef(0);
  const eventTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const unlockedRef = useRef<string[]>([]);

  const showNotification = useCallback(
    (message: string, type: "achievement" | "milestone" | "event" | "unlock") => {
      setNotification({ message, type });
      setTimeout(() => setNotification(null), 4000);
    },
    []
  );

  useEffect(() => {
    setUserId(generateUserId());
  }, []);

  useEffect(() => {
    soundManager.setMuted(muted);
  }, [muted]);

  useEffect(() => {
    const allAchievements = ACHIEVEMENTS_CONFIG.map((a) => a.id);
    const allMilestones = MILESTONES.map((m) => ({
      id: `milestone-${m.clicks}`,
      clicks: m.clicks,
    }));
    let currentHighestMilestone = 0;
    for (let i = allMilestones.length - 1; i >= 0; i--) {
      if (totalClicks >= allMilestones[i].clicks) {
        currentHighestMilestone = i;
        break;
      }
    }
    if (currentHighestMilestone > currentMilestoneIndex) {
      setCurrentMilestoneIndex(currentHighestMilestone);
      soundManager.playMilestone();
      showNotification(MILESTONES[currentHighestMilestone].description, "milestone");
    }

    ACHIEVEMENTS_CONFIG.forEach((ach) => {
      if (unlockedRef.current.includes(ach.id)) return;
      if (ach.isCountry) {
        if (countryStats.length >= 100) {
          unlockedRef.current.push(ach.id);
          setUnlockedAchievements((prev) => [...prev, ach.id]);
          soundManager.playAchievement();
          showNotification(`${ach.name} - ${ach.description}`, "achievement");
        }
      } else if (totalClicks >= ach.clicks) {
        unlockedRef.current.push(ach.id);
        setUnlockedAchievements((prev) => [...prev, ach.id]);
        soundManager.playAchievement();
        showNotification(`${ach.name} - ${ach.description}`, "achievement");
      }
    });
  }, [totalClicks, countryStats.length]);

  const handleClick = useCallback(async () => {
    const multiplier = activeEvent?.multiplier || 1;
    const incrementAmount = multiplier;
    userClicksRef.current += incrementAmount;

    if (db) {
      try {
        const statsRef = doc(db, "stats", "global-stats");
        await setDoc(statsRef, { totalClicks: increment(incrementAmount) }, { merge: true });

        const activityRef = collection(db, ACTIVITIES_COLLECTION);
        await addDoc(activityRef, {
          country: userCountry.current.name,
          countryCode: userCountry.current.code,
          timestamp: Date.now(),
          userId,
          multiplier,
        });

        const countryRef = doc(db, COUNTRY_STATS_COLLECTION, userCountry.current.code);
        await setDoc(countryRef, { clicks: increment(incrementAmount) }, { merge: true });
      } catch {
        console.warn("Firebase write failed");
      }
    }

    soundManager.playClick();
    setClicksToday((prev) => prev + incrementAmount);
    setPersonalClicks((prev) => prev + incrementAmount);

    if (Math.random() < 0.08) {
      const eventConfig = SECRET_EVENTS[Math.floor(Math.random() * SECRET_EVENTS.length)];
      const event: SecretEvent = {
        id: eventConfig.id + "-" + Date.now(),
        name: eventConfig.name,
        description: eventConfig.description,
        multiplier: eventConfig.multiplier,
        duration: eventConfig.duration,
        active: true,
        endsAt: Date.now() + eventConfig.duration * 1000,
      };
      setActiveEvent(event);
      soundManager.playSecretEvent();
      showNotification(event.description, "event");

      const timer = setTimeout(() => {
        setActiveEvent((prev) => (prev?.id === event.id ? null : prev));
      }, eventConfig.duration * 1000);
      eventTimersRef.current.push(timer);
    }
  }, [activeEvent, userId, showNotification]);

  useEffect(() => {
    if (!db) {
      setDisconnected(true);
      return;
    }

    const userData = userCountry.current;

    const setupOnlinePresence = async () => {
      try {
        const onlineRef = collection(db, ONLINE_USERS_COLLECTION);
        const docRef = await addDoc(onlineRef, {
          userId,
          country: userData.name,
          countryCode: userData.code,
          joinedAt: Date.now(),
          lastSeen: Date.now(),
          totalUserClicks: 0,
        });
        onlineDocRef.current = docRef.id;

        heartbeatRef.current = setInterval(async () => {
          if (onlineDocRef.current) {
            try {
              const ref = doc(db, ONLINE_USERS_COLLECTION, onlineDocRef.current);
              await setDoc(ref, { lastSeen: Date.now() }, { merge: true });
            } catch {
              /* silently fail */
            }
          }
        }, 5000);
      } catch {
        console.warn("Firebase unavailable, running in offline mode");
        setDisconnected(true);
      }
    };

    setupOnlinePresence();

    return () => {
      if (heartbeatRef.current) clearInterval(heartbeatRef.current);
      if (onlineDocRef.current) {
        const ref = doc(db, ONLINE_USERS_COLLECTION, onlineDocRef.current);
        deleteDoc(ref).catch(() => {});
      }
      eventTimersRef.current.forEach(clearTimeout);
    };
  }, [userId]);

  useEffect(() => {
    if (!db) return;

    const statsRef = doc(db, "stats", "global-stats");
    const unsubStats = onSnapshot(
      statsRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setTotalClicks(data.totalClicks || 0);
        }
      },
      () => setDisconnected(true)
    );

    const activitiesQuery = query(
      collection(db, ACTIVITIES_COLLECTION),
      orderBy("timestamp", "desc"),
      limit(50)
    );
    const unsubActivities = onSnapshot(activitiesQuery, (snapshot) => {
      const acts: ClickActivity[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        acts.push({
          id: docSnap.id,
          country: data.country,
          countryCode: data.countryCode,
          timestamp: data.timestamp,
          userId: data.userId,
        });
      });
      setActivities(acts);
    }, () => {});

    const onlineQuery = query(
      collection(db, ONLINE_USERS_COLLECTION),
      orderBy("joinedAt", "desc")
    );
    const unsubOnline = onSnapshot(onlineQuery, (snapshot) => {
      const users: OnlineUser[] = [];
      const now = Date.now();
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const lastSeen = data.lastSeen || data.joinedAt;
        if (now - lastSeen < 15000) {
          users.push({
            userId: data.userId,
            country: data.country,
            countryCode: data.countryCode,
            joinedAt: data.joinedAt,
          });
        }
      });
      setOnlineUsers(users);
    }, () => {});

    const countryQuery = query(
      collection(db, COUNTRY_STATS_COLLECTION),
      orderBy("clicks", "desc")
    );
    const unsubCountry = onSnapshot(countryQuery, (snapshot) => {
      const stats: CountryData[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        stats.push({
          country: getCountryName(docSnap.id),
          countryCode: docSnap.id,
          clicks: data.clicks || 0,
        });
      });
      setCountryStats(stats);
      if (stats.length > 0) {
        setMostActiveCountry(stats[0].country);
      }
    }, () => {});

    return () => {
      unsubStats();
      unsubActivities();
      unsubOnline();
      unsubCountry();
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = (now - lastCpsTime.current) / 1000;
      if (elapsed >= 2) {
        const cps = calculateClicksPerSecond(totalClicks, lastClicks.current, elapsed);
        setAverageCps(cps);
        lastClicks.current = totalClicks;
        lastCpsTime.current = now;
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [totalClicks]);

  return {
    totalClicks,
    onlineUsers,
    activities,
    countryStats,
    unlockedAchievements,
    currentMilestoneIndex,
    activeEvent,
    userId,
    userCountry: userCountry.current,
    clicksToday,
    averageCps,
    mostActiveCountry,
    muted,
    setMuted,
    disconnected,
    handleClick,
    notification,
    personalClicks,
  };
}
