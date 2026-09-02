export const FRIDAY_SLOT_TIMES = ['17:00', '18:00', '19:00'] as const;

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

function getDaysUntilFriday(day: number): number {
  if (day === 5) return 0;
  if (day < 5) return 5 - day;
  return 5 + 7 - day;
}

function startOfDay(d: Date): Date {
  const copy = new Date(d);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function availableTimesForDate(date: Date, now: Date): FridaySlotTime[] {
  const isToday = toDateStr(date) === toDateStr(now);
  if (!isToday) return [...FRIDAY_SLOT_TIMES];
  const hour = now.getHours();
  const minute = now.getMinutes();
  return FRIDAY_SLOT_TIMES.filter((t) => {
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
  return !Number.isNaN(d.getTime()) && d.getDay() === 5;
}

export function isFridayInFuture(dateStr: string, now = new Date()): boolean {
  if (!isValidFridayDate(dateStr)) return false;
  const endOfDay = new Date(`${dateStr}T23:59:59`);
  return endOfDay >= startOfDay(now);
}

export function isValidSlotTime(time: string): time is FridaySlotTime {
  return (FRIDAY_SLOT_TIMES as readonly string[]).includes(time);
}

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
  const spotsLeft = spotsLeftForDate(dateStr, available.length);
  const picked = seededShuffle(available, `${dateStr}slots`).slice(0, spotsLeft).sort();
  return { times: picked, spotsLeft: picked.length };
}

export function getUpcomingFridays(count = 8, now = new Date(), locale = 'no'): FridaySlot[] {
  const result: FridaySlot[] = [];
  let cursor = startOfDay(now);
  cursor.setDate(cursor.getDate() + getDaysUntilFriday(cursor.getDay()));

  if (cursor.getDay() === 5 && availableTimesForDate(cursor, now).length === 0) {
    cursor = new Date(cursor);
    cursor.setDate(cursor.getDate() + 7);
  }

  while (result.length < count) {
    const available = availableTimesForDate(cursor, now);
    if (available.length > 0) {
      const dateStr = toDateStr(cursor);
      const { times, spotsLeft } = timesForDate(dateStr, available);
      if (times.length > 0) {
        result.push({
          date: new Date(cursor),
          dateStr,
          displayDate: formatFridayDisplay(cursor, locale),
          times,
          spotsLeft,
        });
      }
    }
    cursor = new Date(cursor);
    cursor.setDate(cursor.getDate() + 7);
  }

  return result;
}
