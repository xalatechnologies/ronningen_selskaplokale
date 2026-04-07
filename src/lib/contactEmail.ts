/**
 * Sends contact form notifications via Web3Forms (https://web3forms.com).
 * Set VITE_WEB3FORMS_ACCESS_KEY; set the receiving address in the Web3Forms dashboard
 * (e.g. r.selskapslokale@gmail.com). If the key is missing, this no-ops (Supabase still stores the inquiry).
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

  const message = [
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Phone: ${input.phone || '—'}`,
    '',
    input.message,
  ].join('\n');

  const formData = new FormData();
  formData.append('access_key', accessKey.trim());
  formData.append('subject', input.subject);
  formData.append('name', input.name);
  formData.append('email', input.email);
  formData.append('replyto', input.email);
  formData.append('message', message);

  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { Accept: 'application/json' },
    body: formData,
  });

  const data = (await res.json()) as { success?: boolean; message?: string };

  if (!res.ok || !data.success) {
    throw new Error(data.message || `Email notification failed (${res.status})`);
  }
}
