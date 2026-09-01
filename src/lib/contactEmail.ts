/**
 * Contact form email: Web3Forms when VITE_WEB3FORMS_ACCESS_KEY is set, otherwise
 * FormSubmit (https://formsubmit.co/ajax) to the venue inbox — works without extra
 * Vercel vars. Optional VITE_CONTACT_NOTIFY_EMAIL overrides FormSubmit recipient only.
 * FormSubmit: activate once via the link they email to that inbox.
 *
 * Set VITE_VENUE_CONTACT_EMAIL on Vercel to use another inbox for footer, contact page,
 * and FormSubmit (when VITE_CONTACT_NOTIFY_EMAIL is unset).
 */

const DEFAULT_VENUE_INBOX = 'post@ronningenselskapslokale.no';

/** Public inbox: footer, contact page, and FormSubmit default when notify override is unset. */
export const VENUE_CONTACT_EMAIL =
  import.meta.env.VITE_VENUE_CONTACT_EMAIL?.trim() || DEFAULT_VENUE_INBOX;

/** Public phone: footer, contact page, and i18n display. */
export const VENUE_CONTACT_PHONE = '+4792977771';
export const VENUE_CONTACT_PHONE_DISPLAY = '+47 92 97 77 71';
export const VENUE_CONTACT_PHONE_HREF = `tel:${VENUE_CONTACT_PHONE}`;

const FORM_SUBMIT_DEFAULT_INBOX = VENUE_CONTACT_EMAIL;

function formSubmitInbox(): string {
  const fromEnv = import.meta.env.VITE_CONTACT_NOTIFY_EMAIL?.trim();
  return fromEnv || FORM_SUBMIT_DEFAULT_INBOX;
}

/** Shown as sender name on Web3Forms notification emails (matches website branding). */
const WEB3FORMS_FROM_NAME = 'Rønningen Selskapslokale';

async function sendViaWeb3Forms(
  accessKey: string,
  input: {
    name: string;
    email: string;
    phone: string;
    message: string;
    subject: string;
  }
): Promise<void> {
  const message = [
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Phone: ${input.phone || '—'}`,
    '',
    input.message,
  ].join('\n');

  const body = {
    access_key: accessKey,
    subject: input.subject,
    name: input.name,
    email: input.email,
    phone: input.phone.trim() || '',
    message,
    from_name: WEB3FORMS_FROM_NAME,
    replyto: input.email,
  };

  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(body),
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
  const to = formSubmitInbox();
  const url = `https://formsubmit.co/ajax/${encodeURIComponent(to)}`;

  const message = [
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Phone: ${input.phone || '—'}`,
    '',
    input.message,
  ].join('\n');

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      _subject: input.subject,
      _replyto: input.email,
      _captcha: 'false',
      name: input.name,
      email: input.email,
      phone: input.phone || '—',
      message,
    }),
  });

  let data: { success?: boolean | string; message?: string } = {};
  try {
    data = (await res.json()) as typeof data;
  } catch {
    throw new Error(`FormSubmit failed (${res.status})`);
  }

  const s = data.success;
  const ok =
    res.ok && (s === true || s === 'true' || (typeof s === 'string' && s.toLowerCase() === 'true'));

  if (!ok) {
    throw new Error(data.message || `FormSubmit failed (${res.status})`);
  }
}

export async function sendContactFormEmailNotification(input: {
  name: string;
  email: string;
  phone: string;
  message: string;
  subject: string;
}): Promise<void> {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim();
  if (accessKey) {
    await sendViaWeb3Forms(accessKey, input);
  } else {
    await sendViaFormSubmit(input);
  }
}

export function buildVisningEmailMessage(input: {
  arrangementType: string;
  displayDate: string;
  selectedTime: string;
  message?: string;
  language: string;
}): { subject: string; body: string } {
  const lang = input.language === 'en' ? 'en' : 'no';
  const userMessage = input.message?.trim();

  if (lang === 'en') {
    return {
      subject: `New viewing request — ${input.arrangementType} — ${input.displayDate} at ${input.selectedTime}`,
      body: [
        '[Viewing request]',
        '',
        `Event type: ${input.arrangementType}`,
        `Date: ${input.displayDate}`,
        `Time: ${input.selectedTime}`,
        '',
        userMessage ? `Questions / message:\n${userMessage}` : 'Questions / message: —',
        '',
        `Source: ${typeof window !== 'undefined' ? window.location.origin : ''}/visning`,
      ].join('\n'),
    };
  }

  return {
    subject: `Ny visningsforespørsel — ${input.arrangementType} — ${input.displayDate} kl. ${input.selectedTime}`,
    body: [
      '[Visningsforespørsel]',
      '',
      `Arrangement: ${input.arrangementType}`,
      `Dato: ${input.displayDate}`,
      `Tid: ${input.selectedTime}`,
      '',
      userMessage ? `Spørsmål / melding:\n${userMessage}` : 'Spørsmål / melding: —',
      '',
      `Kilde: ${typeof window !== 'undefined' ? window.location.origin : ''}/visning`,
    ].join('\n'),
  };
}

/** Same delivery path as the contact form (Web3Forms or FormSubmit). */
export async function sendVisningEmailNotification(input: {
  name: string;
  email: string;
  phone: string;
  arrangementType: string;
  displayDate: string;
  selectedTime: string;
  message?: string;
  language: string;
}): Promise<void> {
  const { subject, body } = buildVisningEmailMessage(input);
  await sendContactFormEmailNotification({
    name: input.name,
    email: input.email,
    phone: input.phone,
    message: body,
    subject,
  });
}
