import type { BefaringApiPayload } from './types';

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

async function sendViaWeb3Forms(
  accessKey: string,
  input: { name: string; email: string; phone: string; message: string; subject: string }
): Promise<void> {
  const message = [
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Phone: ${input.phone || '—'}`,
    '',
    input.message,
  ].join('\n');

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
      message,
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

/** Email notification path (same providers as the public contact form). */
export async function sendBefaringEmail(form: BefaringApiPayload): Promise<void> {
  const lang = form.language === 'en' ? 'en' : 'no';
  const subject =
    lang === 'no' ? `[Befaring] ${form.name.trim()}` : `[Viewing] ${form.name.trim()}`;

  const structuredMessage = form.message?.trim() || '';
  const input = {
    name: form.name.trim(),
    email: form.email.trim(),
    phone: form.phone.trim(),
    message: structuredMessage,
    subject,
  };

  const accessKey = env('VITE_WEB3FORMS_ACCESS_KEY') || env('WEB3FORMS_ACCESS_KEY');
  if (accessKey) {
    await sendViaWeb3Forms(accessKey, input);
    return;
  }

  await sendViaFormSubmit(input);
}
