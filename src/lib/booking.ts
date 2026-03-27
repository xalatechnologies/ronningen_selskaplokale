/** Ekstern booking (Digilist) — brukes for «Book nå», «Forespørsel» og tilsvarende CTA-er. */
export const BOOKING_URL =
  'https://digilist.no/listing/ronningen-selskapslokale-copy' as const;

export const bookingLinkProps = {
  href: BOOKING_URL,
  target: '_blank' as const,
  rel: 'noopener noreferrer' as const,
};
