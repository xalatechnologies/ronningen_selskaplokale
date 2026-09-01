import type { VercelRequest, VercelResponse } from '@vercel/node';
import { handleVisningSubmission } from './_lib/handle-visning';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  const originHeader = req.headers['x-forwarded-host'] || req.headers.host;
  const origin =
    typeof originHeader === 'string' && originHeader.trim()
      ? originHeader.trim()
      : 'ronningenselskapslokale.no';

  const result = await handleVisningSubmission(req.body, { origin });

  if (!result.ok) {
    const status =
      result.error === 'invalid_payload' ||
      result.error?.startsWith('Ugyldig')
        ? 400
        : 502;
    return res.status(status).json(result);
  }

  return res.status(200).json({ success: true });
}
