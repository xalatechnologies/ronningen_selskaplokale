import {
  FRIDAY_SLOT_TIMES,
  isFridayInFuture,
  isValidFridayDate,
  isValidSlotTime,
} from '../../src/lib/visningSlots';

export type VisningApiPayload = {
  name: string;
  phone: string;
  email: string;
  arrangementType: string;
  selectedDate: string;
  selectedTime: string;
  message?: string;
  language?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isVisningApiPayload(raw: unknown): raw is VisningApiPayload {
  if (!raw || typeof raw !== 'object') return false;
  const o = raw as Record<string, unknown>;
  return (
    typeof o.name === 'string' &&
    typeof o.phone === 'string' &&
    typeof o.email === 'string' &&
    typeof o.arrangementType === 'string' &&
    typeof o.selectedDate === 'string' &&
    typeof o.selectedTime === 'string'
  );
}

export function validateVisningPayload(raw: VisningApiPayload): string | null {
  if (raw.name.trim().length < 2) return 'Ugyldig navn';
  if (!EMAIL_RE.test(raw.email.trim())) return 'Ugyldig e-post';
  if (raw.phone.replace(/\D/g, '').length < 8) return 'Ugyldig telefon';
  if (!raw.arrangementType.trim()) return 'Ugyldig arrangement';
  if (!isValidFridayDate(raw.selectedDate) || !isFridayInFuture(raw.selectedDate)) {
    return 'Ugyldig dato';
  }
  if (!isValidSlotTime(raw.selectedTime)) return 'Ugyldig tid';
  if (!(FRIDAY_SLOT_TIMES as readonly string[]).includes(raw.selectedTime)) {
    return 'Ugyldig tid';
  }
  if (raw.message != null && raw.message.length > 2000) return 'Ugyldig melding';
  return null;
}
