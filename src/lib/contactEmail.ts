/**
 * Contact form email: Web3Forms when VITE_WEB3FORMS_ACCESS_KEY is set, otherwise
 * FormSubmit (https://formsubmit.co/ajax) to the venue inbox — works without extra
 * Vercel vars. Optional VITE_CONTACT_NOTIFY_EMAIL overrides FormSubmit recipient.
 * FormSubmit: activate once via the link they email to that inbox.
 */

/** Public inbox: footer, contact page, and FormSubmit default when env override is unset. */
export const VENUE_CONTACT_EMAIL = 'post@ronningenselskapslokale.no';

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
