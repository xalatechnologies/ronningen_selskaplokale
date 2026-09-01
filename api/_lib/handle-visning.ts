import { formatFridayDisplay } from '../../src/lib/visningSlots';
import { sendVisningEmail } from './send-visning-email';
import { isVisningApiPayload, validateVisningPayload, type VisningApiPayload } from './types';

export type HandleVisningResult = {
  ok: boolean;
  error?: string;
};

export async function handleVisningSubmission(
  raw: unknown,
  { origin }: { origin: string }
): Promise<HandleVisningResult> {
  if (!isVisningApiPayload(raw)) {
    return { ok: false, error: 'invalid_payload' };
  }

  const validationError = validateVisningPayload(raw);
  if (validationError) {
    return { ok: false, error: validationError };
  }

  const form: VisningApiPayload = {
    ...raw,
    name: raw.name.trim(),
    phone: raw.phone.trim(),
    email: raw.email.trim(),
    arrangementType: raw.arrangementType.trim(),
    selectedDate: raw.selectedDate.trim(),
    selectedTime: raw.selectedTime.trim(),
    message: raw.message?.trim() || undefined,
    language: raw.language === 'en' ? 'en' : 'no',
  };

  const displayDate = formatFridayDisplay(
    new Date(`${form.selectedDate}T12:00:00`),
    form.language ?? 'no'
  );

  try {
    await sendVisningEmail(form, displayDate, origin);
    return { ok: true };
  } catch (err) {
    console.error('[visning] email error', err);
    return { ok: false, error: 'delivery_failed' };
  }
}
