/**
 * Sends a contact form notification via Web3Forms (https://web3forms.com).
 * Set VITE_WEB3FORMS_ACCESS_KEY and your receiving address in the Web3Forms dashboard.
 */
export async function sendContactFormEmailNotification(input: {
  name: string;
  email: string;
  phone: string;
  message: string;
  subject: string;
}): Promise<void> {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
  if (!accessKey?.trim()) return;

  const body = [
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Phone: ${input.phone || '—'}`,
    '',
    input.message,
  ].join('\n');

  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: accessKey.trim(),
      subject: input.subject,
      name: input.name,
      email: input.email,
      replyto: input.email,
      message: body,
    }),
  });

  const data = (await res.json()) as { success?: boolean; message?: string };

  if (!res.ok || !data.success) {
    throw new Error(data.message || `Email notification failed (${res.status})`);
  }
}
