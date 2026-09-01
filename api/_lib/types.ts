export type BefaringApiPayload = {
  name: string;
  phone: string;
  email: string;
  address?: string;
  eventType: 'Privat' | 'Bedrift';
  festType?: string;
  preferredEventDate?: string;
  guestCount?: number;
  message?: string;
  language?: 'no' | 'en';
};

export function isBefaringApiPayload(value: unknown): value is BefaringApiPayload {
  if (!value || typeof value !== 'object') return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.name === 'string' &&
    typeof v.phone === 'string' &&
    typeof v.email === 'string' &&
    (v.eventType === 'Privat' || v.eventType === 'Bedrift')
  );
}
