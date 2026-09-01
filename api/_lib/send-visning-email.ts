import type { VisningApiPayload } from './types';

const DEFAULT_VENUE_INBOX = 'post@ronningenselskapslokale.no';
const WEB3FORMS_FROM_NAME = 'Rønningen Selskapslokale';

function env(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value || undefined;
}

function venueInbox(): string {
  return (
    env('VITE_CONTACT_NOTIFY_EMAIL') ||
    env('CONTACT_NOTIFY_EMAIL') ||
    env('VITE_VENUE_CONTACT_EMAIL') ||
    env('VENUE_CONTACT_EMAIL') ||
    DEFAULT_VENUE_INBOX
  );
}

function web3FormsKey(): string | undefined {
  return env('WEB3FORMS_ACCESS_KEY') || env('VITE_WEB3FORMS_ACCESS_KEY');
}

async function sendViaWeb3Forms(
  accessKey: string,
  input: { name: string; email: string; phone: string; message: string; subject: string }
): Promise<void> {
  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      access_key: accessKey,
      subject: input.subject,
      name: input.name,
      email: input.email,
      phone: input.phone.trim() || '',
      message: input.message,
      from_name: WEB3FORMS_FROM_NAME,
      replyto: input.email,
    }),
  });

  const data = (await res.json()) as { success?: boolean; message?: string };
  if (!res.ok || !data.success) {
    throw new Error(data.message || `Web3Forms failed (${res.status})`);
  }
}

async function sendViaFormSubmit(input: {
  name: string;
  email: string;
  phone: string;
  message: string;
  subject: string;
}): Promise<void> {
  const inbox = venueInbox();
  const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(inbox)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      name: input.name,
      email: input.email,
      phone: input.phone || '—',
      message: input.message,
      _subject: input.subject,
      _template: 'table',
      _captcha: 'false',
    }),
  });

  if (!res.ok) {
    throw new Error(`FormSubmit failed (${res.status})`);
  }
}

export function buildVisningEmailBody(
  form: VisningApiPayload,
  displayDate: string,
  origin: string
): string {
  const lang = form.language === 'en' ? 'en' : 'no';
  const source = `https://${origin.replace(/^https?:\/\//, '')}/visning`;

  if (lang === 'en') {
    return [
      'New viewing request',
      '',
      `Event type: ${form.arrangementType}`,
      `Date: ${displayDate}`,
      `Time: ${form.selectedTime}`,
      '',
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email}`,
      '',
      form.message?.trim() ? `Message:\n${form.message.trim()}` : 'Message: —',
      '',
      `Language: ${lang}`,
      `Source: ${source}`,
    ].join('\n');
  }

  return [
    'Ny visningsforespørsel',
    '',
    `Arrangement: ${form.arrangementType}`,
    `Dato: ${displayDate}`,
    `Tid: ${form.selectedTime}`,
    '',
    `Navn: ${form.name}`,
    `Telefon: ${form.phone}`,
    `E-post: ${form.email}`,
    '',
    form.message?.trim() ? `Melding:\n${form.message.trim()}` : 'Melding: —',
    '',
    `Språk: ${lang}`,
    `Kilde: ${source}`,
  ].join('\n');
}

export async function sendVisningEmail(
  form: VisningApiPayload,
  displayDate: string,
  origin: string
): Promise<void> {
  const subject = `Ny visningsforespørsel — ${form.arrangementType} — ${displayDate} kl. ${form.selectedTime}`;
  const message = buildVisningEmailBody(form, displayDate, origin);
  const input = {
    name: form.name,
    email: form.email,
    phone: form.phone,
    message,
    subject,
  };

  const accessKey = web3FormsKey();
  if (accessKey) {
    await sendViaWeb3Forms(accessKey, input);
    return;
  }

  await sendViaFormSubmit(input);
}
