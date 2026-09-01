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

/** Stable urgency label per date — varies between 2, 3 and 4 spots. */
function spotsLeftForDate(dateStr: string): number {
  const options = [2, 2, 3, 3, 4];
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash * 31 + dateStr.charCodeAt(i)) >>> 0;
  }
  return options[hash % options.length] ?? 2;
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
    const times = availableTimesForDate(cursor, now);
    if (times.length > 0) {
      const dateStr = toDateStr(cursor);
      result.push({
        date: new Date(cursor),
        dateStr,
        displayDate: formatFridayDisplay(cursor, locale),
        times,
        spotsLeft: spotsLeftForDate(dateStr),
      });
    }
    cursor = new Date(cursor);
    cursor.setDate(cursor.getDate() + 7);
  }

  return result;
}
