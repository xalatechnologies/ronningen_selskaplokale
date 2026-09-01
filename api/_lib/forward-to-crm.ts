import type { BefaringApiPayload } from './types';

/**
 * Forwards a website befaring submission to Rønningen CRM inbound API.
 * No-ops (resolves) when env is missing so local/email-only setups still work.
 * Throws on non-OK CRM response so callers can use Promise.allSettled.
 */
export async function forwardToCrm(
  form: BefaringApiPayload,
  { origin }: { origin: string }
): Promise<'forwarded' | 'skipped'> {
  const url = process.env.RONNINGEN_CRM_INBOUND_URL?.trim();
  const secret = process.env.RONNINGEN_CRM_INBOUND_SECRET?.trim();
  if (!url || !secret) {
    console.warn('[befaring] CRM forwarding disabled: env vars missing');
    return 'skipped';
  }

  const organizationSlug =
    process.env.RONNINGEN_CRM_ORG_SLUG?.trim().toLowerCase() || 'ronningen';

  const body = {
    organizationSlug,
    source: `website:${origin}`,
    customer: {
      name: form.name,
      phone: form.phone,
      email: form.email || undefined,
      address: form.address || undefined,
    },
    inquiry: {
      eventType: form.eventType,
      festType: form.festType || undefined,
      preferredEventDate: form.preferredEventDate || undefined,
      guestCount: form.guestCount ?? 0,
    },
    message: form.message || undefined,
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-inbound-secret': secret,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`CRM forward failed ${res.status}: ${text}`);
  }

  return 'forwarded';
}
