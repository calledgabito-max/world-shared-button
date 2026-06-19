export function generateUserId(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 12; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

const countryNames: Record<string, string> = {
  AF: "Afghanistan", AL: "Albania", DZ: "Algeria", AD: "Andorra", AO: "Angola",
  AR: "Argentina", AM: "Armenia", AU: "Australia", AT: "Austria", AZ: "Azerbaijan",
  BS: "Bahamas", BH: "Bahrain", BD: "Bangladesh", BB: "Barbados", BY: "Belarus",
  BE: "Belgium", BZ: "Belize", BJ: "Benin", BT: "Bhutan", BO: "Bolivia",
  BA: "Bosnia", BW: "Botswana", BR: "Brazil", BN: "Brunei", BG: "Bulgaria",
  BF: "Burkina Faso", BI: "Burundi", CV: "Cabo Verde", KH: "Cambodia", CM: "Cameroon",
  CA: "Canada", CF: "Central African Republic", TD: "Chad", CL: "Chile", CN: "China",
  CO: "Colombia", KM: "Comoros", CG: "Congo", CD: "DRC", CR: "Costa Rica",
  CI: "Côte d'Ivoire", HR: "Croatia", CU: "Cuba", CY: "Cyprus", CZ: "Czechia",
  DK: "Denmark", DJ: "Djibouti", DM: "Dominica", DO: "Dominican Republic", EC: "Ecuador",
  EG: "Egypt", SV: "El Salvador", GQ: "Equatorial Guinea", ER: "Eritrea", EE: "Estonia",
  SZ: "Eswatini", ET: "Ethiopia", FJ: "Fiji", FI: "Finland", FR: "France",
  GA: "Gabon", GM: "Gambia", GE: "Georgia", DE: "Germany", GH: "Ghana",
  GR: "Greece", GD: "Grenada", GT: "Guatemala", GN: "Guinea", GW: "Guinea-Bissau",
  GY: "Guyana", HT: "Haiti", HN: "Honduras", HU: "Hungary", IS: "Iceland",
  IN: "India", ID: "Indonesia", IR: "Iran", IQ: "Iraq", IE: "Ireland",
  IL: "Israel", IT: "Italy", JM: "Jamaica", JP: "Japan", JO: "Jordan",
  KZ: "Kazakhstan", KE: "Kenya", KI: "Kiribati", KW: "Kuwait", KG: "Kyrgyzstan",
  LA: "Laos", LV: "Latvia", LB: "Lebanon", LS: "Lesotho", LR: "Liberia",
  LY: "Libya", LI: "Liechtenstein", LT: "Lithuania", LU: "Luxembourg", MG: "Madagascar",
  MW: "Malawi", MY: "Malaysia", MV: "Maldives", ML: "Mali", MT: "Malta",
  MH: "Marshall Islands", MR: "Mauritania", MU: "Mauritius", MX: "Mexico", FM: "Micronesia",
  MD: "Moldova", MC: "Monaco", MN: "Mongolia", ME: "Montenegro", MA: "Morocco",
  MZ: "Mozambique", MM: "Myanmar", NA: "Namibia", NR: "Nauru", NP: "Nepal",
  NL: "Netherlands", NZ: "New Zealand", NI: "Nicaragua", NE: "Niger", NG: "Nigeria",
  KP: "North Korea", MK: "North Macedonia", NO: "Norway", OM: "Oman", PK: "Pakistan",
  PW: "Palau", PS: "Palestine", PA: "Panama", PG: "Papua New Guinea", PY: "Paraguay",
  PE: "Peru", PH: "Philippines", PL: "Poland", PT: "Portugal", QA: "Qatar",
  RO: "Romania", RU: "Russia", RW: "Rwanda", KN: "Saint Kitts", LC: "Saint Lucia",
  VC: "Saint Vincent", WS: "Samoa", SM: "San Marino", ST: "Sao Tome", SA: "Saudi Arabia",
  SN: "Senegal", RS: "Serbia", SC: "Seychelles", SL: "Sierra Leone", SG: "Singapore",
  SK: "Slovakia", SI: "Slovenia", SB: "Solomon Islands", SO: "Somalia", ZA: "South Africa",
  KR: "South Korea", SS: "South Sudan", ES: "Spain", LK: "Sri Lanka", SD: "Sudan",
  SR: "Suriname", SE: "Sweden", CH: "Switzerland", SY: "Syria", TW: "Taiwan",
  TJ: "Tajikistan", TZ: "Tanzania", TH: "Thailand", TL: "Timor-Leste", TG: "Togo",
  TO: "Tonga", TT: "Trinidad and Tobago", TN: "Tunisia", TR: "Turkey", TM: "Turkmenistan",
  TV: "Tuvalu", UG: "Uganda", UA: "Ukraine", AE: "United Arab Emirates",
  GB: "United Kingdom", US: "United States", UY: "Uruguay", UZ: "Uzbekistan",
  VU: "Vanuatu", VA: "Vatican City", VE: "Venezuela", VN: "Vietnam", YE: "Yemen",
  ZM: "Zambia", ZW: "Zimbabwe",
};

export function getCountryName(code: string): string {
  return countryNames[code] || code;
}

export function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num.toLocaleString();
}

export const MILESTONES = [
  { clicks: 0, name: "The Beginning", description: "Humanity's journey begins", theme: "blue", unlocked: true },
  { clicks: 10000, name: "Awakening", description: "HUMANITY HAS REACHED 10,000 CLICKS", theme: "purple" },
  { clicks: 100000, name: "Transformation", description: "Something is changing...", theme: "pink" },
  { clicks: 1000000, name: "Ascension", description: "A new chapter unfolds", theme: "gold" },
  { clicks: 10000000, name: "Mystery", description: "The unknown awaits", theme: "cosmic" },
];

export const ACHIEVEMENTS_CONFIG = [
  { id: "first-click", name: "FIRST CLICK", description: "The journey of a thousand miles begins with a single click", clicks: 1, icon: "👆" },
  { id: "thousand-clicks", name: "1,000 CLICKS", description: "A thousand voices, one button", clicks: 1000, icon: "🎯" },
  { id: "ten-thousand", name: "10,000 CLICKS", description: "Humanity is awakening", clicks: 10000, icon: "🔥" },
  { id: "hundred-countries", name: "100 COUNTRIES", description: "The world is united", clicks: 0, icon: "🌍", isCountry: true },
  { id: "million-clicks", name: "1 MILLION CLICKS", description: "An unstoppable force", clicks: 1000000, icon: "💫" },
  { id: "hundred-thousand", name: "100,000 CLICKS", description: "Something is happening", clicks: 100000, icon: "⚡" },
];

export const SECRET_EVENTS = [
  { id: "double-click", name: "DOUBLE CLICKS!", description: "DOUBLE CLICKS FOR 30 SECONDS", multiplier: 2, duration: 30 },
  { id: "golden-button", name: "GOLDEN BUTTON!", description: "GLOBAL GOLDEN BUTTON ACTIVATED", multiplier: 5, duration: 20 },
  { id: "bonus-mode", name: "BONUS MODE!", description: "10X BONUS MODE ACTIVATED", multiplier: 10, duration: 15 },
  { id: "click-frenzy", name: "CLICK FRENZY!", description: "3X MEGA CLICK MODE", multiplier: 3, duration: 25 },
  { id: "cosmic-click", name: "COSMIC CLICK!", description: "100X COSMIC POWER", multiplier: 100, duration: 10 },
];

export function getFlag(countryCode: string): string {
  if (!countryCode || countryCode.length !== 2) return "🏳️";
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

export function calculateClicksPerSecond(
  currentTotal: number,
  lastTotal: number,
  elapsedSeconds: number
): number {
  if (elapsedSeconds <= 0) return 0;
  return Math.round(((currentTotal - lastTotal) / elapsedSeconds) * 10) / 10;
}
