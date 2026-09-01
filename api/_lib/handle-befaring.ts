import { forwardToCrm } from './forward-to-crm';
import { sendBefaringEmail } from './send-befaring-email';
import { isBefaringApiPayload, type BefaringApiPayload } from './types';

export type HandleBefaringResult = {
  ok: boolean;
  email: 'ok' | 'failed';
  crm: 'ok' | 'failed' | 'skipped';
  error?: string;
};

function buildStructuredMessage(form: BefaringApiPayload): string {
  const lang = form.language === 'en' ? 'en' : 'no';
  const labels =
    lang === 'no'
      ? {
          prefix: '[Befaring]',
          eventType: 'Kundetype',
          festType: 'Type arrangement',
          date: 'Ønsket befaring',
          guests: 'Antall gjester',
          address: 'Adresse',
          message: 'Melding',
        }
      : {
          prefix: '[Viewing request]',
          eventType: 'Customer type',
          festType: 'Event type',
          date: 'Preferred viewing date',
          guests: 'Guest count',
          address: 'Address',
          message: 'Message',
        };

  return [
    labels.prefix,
    '',
    `${labels.eventType}: ${form.eventType}`,
    form.festType?.trim() ? `${labels.festType}: ${form.festType.trim()}` : null,
    form.preferredEventDate ? `${labels.date}: ${form.preferredEventDate}` : null,
    `${labels.guests}: ${form.guestCount ?? 0}`,
    form.address?.trim() ? `${labels.address}: ${form.address.trim()}` : null,
    '',
    `${labels.message}:`,
    form.message?.trim() || '',
  ]
    .filter((line) => line != null)
    .join('\n');
}

export async function handleBefaringSubmission(
  raw: unknown,
  { origin }: { origin: string }
): Promise<HandleBefaringResult> {
  if (!isBefaringApiPayload(raw)) {
    return { ok: false, email: 'failed', crm: 'failed', error: 'invalid_payload' };
  }

  if (raw.name.trim().length < 2 || raw.phone.trim().length < 8) {
    return { ok: false, email: 'failed', crm: 'failed', error: 'invalid_payload' };
  }

  const form: BefaringApiPayload = {
    ...raw,
    name: raw.name.trim(),
    phone: raw.phone.trim(),
    email: raw.email.trim(),
    address: raw.address?.trim() || undefined,
    festType: raw.festType?.trim() || undefined,
    preferredEventDate: raw.preferredEventDate?.trim() || undefined,
    guestCount: typeof raw.guestCount === 'number' ? raw.guestCount : 0,
    message: buildStructuredMessage(raw),
  };

  const [emailResult, crmResult] = await Promise.allSettled([
    sendBefaringEmail(form),
    forwardToCrm(form, { origin }),
  ]);

  const email: HandleBefaringResult['email'] =
    emailResult.status === 'fulfilled' ? 'ok' : 'failed';

  let crm: HandleBefaringResult['crm'] = 'failed';
  if (crmResult.status === 'fulfilled') {
    crm = crmResult.value === 'skipped' ? 'skipped' : 'ok';
  } else {
    console.error('[befaring] CRM forward error', crmResult.reason);
  }

  if (emailResult.status === 'rejected') {
    console.error('[befaring] email error', emailResult.reason);
  }

  const ok = email === 'ok' || crm === 'ok';
  return {
    ok,
    email,
    crm,
    error: ok ? undefined : 'delivery_failed',
  };
}
