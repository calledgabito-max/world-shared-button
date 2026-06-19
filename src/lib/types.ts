export interface ClickActivity {
  id: string;
  country: string;
  countryCode: string;
  timestamp: number;
  userId: string;
}

export interface OnlineUser {
  userId: string;
  country: string;
  countryCode: string;
  joinedAt: number;
}

export interface GlobalStats {
  totalClicks: number;
  onlineUsers: number;
  countries: number;
  clicksToday: number;
  averageCps: number;
  mostActiveCountry: string;
  lastResetDate: string;
}

export interface CountryData {
  country: string;
  countryCode: string;
  clicks: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  unlockedAt: number | null;
  icon: string;
}

export interface Milestone {
  clicks: number;
  name: string;
  description: string;
  reached: boolean;
}

export interface SecretEvent {
  id: string;
  name: string;
  description: string;
  multiplier: number;
  duration: number;
  active: boolean;
  endsAt: number | null;
}

export interface AppState {
  globalClicks: number;
  onlineUsers: OnlineUser[];
  activities: ClickActivity[];
  countryStats: CountryData[];
  achievements: Achievement[];
  currentMilestone: number;
  activeEvent: SecretEvent | null;
  userId: string;
  userCountry: string;
  userCountryCode: string;
  muted: boolean;
}
