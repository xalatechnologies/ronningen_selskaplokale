export const FRIDAY_SLOT_TIMES = ['12:00', '13:00', '17:00', '18:00', '19:00'] as const;

export type FridaySlotTime = (typeof FRIDAY_SLOT_TIMES)[number];

export type FridaySlot = {
  date: Date;
  dateStr: string;
  displayDate: string;
  times: FridaySlotTime[];
  spotsLeft: number;
};

function toDateStr(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function slotHour(time: FridaySlotTime): number {
  return parseInt(time.split(':')[0], 10);
}

// Viewings are held on Saturdays (identifiers still say "Friday" from the old schedule).
const VIEWING_WEEKDAY = 6;

/** First Saturday offered; earlier Saturdays are hidden. */
const FIRST_VIEWING_DATE = '2026-11-28';

const SATURDAY_TIMES: FridaySlotTime[] = ['12:00', '13:00'];

/** One-off Friday still offered with its old evening times. */
const LEGACY_FRIDAY_DATE = '2026-11-20';
const LEGACY_FRIDAY_TIMES: FridaySlotTime[] = ['17:00', '18:00', '19:00'];

function slotTimesFor(dateStr: string): FridaySlotTime[] {
  return dateStr === LEGACY_FRIDAY_DATE ? LEGACY_FRIDAY_TIMES : SATURDAY_TIMES;
}

function getDaysUntilFriday(day: number): number {
  return (VIEWING_WEEKDAY - day + 7) % 7;
}

function startOfDay(d: Date): Date {
  const copy = new Date(d);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function availableTimesForDate(date: Date, now: Date): FridaySlotTime[] {
  const isToday = toDateStr(date) === toDateStr(now);
  const all = slotTimesFor(toDateStr(date));
  if (!isToday) return [...all];
  const hour = now.getHours();
  const minute = now.getMinutes();
  return all.filter((t) => {
    const h = slotHour(t);
    return h > hour || (h === hour && minute === 0);
  });
}

export function formatFridayDisplay(date: Date, locale: string): string {
  const lang = locale.startsWith('no') ? 'nb-NO' : 'en-GB';
  return new Intl.DateTimeFormat(lang, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(date);
}

export function isValidFridayDate(dateStr: string): boolean {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateStr);
  if (!match) return false;
  const d = new Date(`${dateStr}T12:00:00`);
  if (Number.isNaN(d.getTime())) return false;
  if (dateStr === LEGACY_FRIDAY_DATE) return true;
  return d.getDay() === VIEWING_WEEKDAY && dateStr >= FIRST_VIEWING_DATE;
}

export function isFridayInFuture(dateStr: string, now = new Date()): boolean {
  if (!isValidFridayDate(dateStr)) return false;
  const endOfDay = new Date(`${dateStr}T23:59:59`);
  return endOfDay >= startOfDay(now);
}

export function isValidSlotTime(time: string): time is FridaySlotTime {
  return (FRIDAY_SLOT_TIMES as readonly string[]).includes(time);
}

export function isValidSlot(dateStr: string, time: string): boolean {
  return (slotTimesFor(dateStr) as readonly string[]).includes(time);
}

/** Friday 25 September 2026 (legacy) — all viewing times are booked. */
const FULLY_BOOKED_DATES = new Set(['2026-09-25']);

function seededShuffle<T>(items: T[], seed: string): T[] {
  const arr = [...items];
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  }
  const rand = () => {
    h = (h * 1664525 + 1013904223) >>> 0;
    return h / 0x100000000;
  };
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** 2 or 3 spots — capped by how many slots exist that day. */
function spotsLeftForDate(dateStr: string, maxSpots: number): number {
  if (maxSpots <= 1) return maxSpots;
  const options = [2, 2, 3].filter((n) => n <= maxSpots);
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash * 31 + dateStr.charCodeAt(i)) >>> 0;
  }
  return options[hash % options.length] ?? Math.min(2, maxSpots);
}

function timesForDate(dateStr: string, available: FridaySlotTime[]): {
  times: FridaySlotTime[];
  spotsLeft: number;
} {
  if (available.length === 0) {
    return { times: [], spotsLeft: 0 };
  }
  if (FULLY_BOOKED_DATES.has(dateStr)) {
    return { times: [...available].sort(), spotsLeft: 0 };
  }
  const spotsLeft = spotsLeftForDate(dateStr, available.length);
  const picked = seededShuffle(available, `${dateStr}slots`).slice(0, spotsLeft).sort();
  return { times: picked, spotsLeft: picked.length };
}

export function getUpcomingFridays(count = 8, now = new Date(), locale = 'no'): FridaySlot[] {
  const result: FridaySlot[] = [];
  let cursor = startOfDay(now);
  cursor.setDate(cursor.getDate() + getDaysUntilFriday(cursor.getDay()));

  const legacy = new Date(`${LEGACY_FRIDAY_DATE}T00:00:00`);
  const candidates: Date[] = startOfDay(now) <= legacy ? [legacy] : [];
  while (candidates.length < count + 2) {
    if (toDateStr(cursor) >= FIRST_VIEWING_DATE) candidates.push(cursor);
    cursor = new Date(cursor);
    cursor.setDate(cursor.getDate() + 7);
  }

  for (const day of candidates) {
    if (result.length >= count) break;
    const dateStr = toDateStr(day);
    const available = availableTimesForDate(day, now);
    if (available.length === 0) continue;
    const { times, spotsLeft } = timesForDate(dateStr, available);
    if (times.length === 0) continue;
    result.push({
      date: new Date(day),
      dateStr,
      displayDate: formatFridayDisplay(day, locale),
      times,
      spotsLeft,
    });
  }

  return result;
}
