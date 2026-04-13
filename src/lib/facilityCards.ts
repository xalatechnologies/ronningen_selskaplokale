/** Activities card on prices + `/fasiliteter` intro grids (shuffleboard, foosball, air hockey room). */
const FACILITIES_ACTIVITIES_GAME_ROOM_IMG = '/facilities-pricing-activities-game-room.png';
const FACILITIES_CHILDCARE_PLAYROOM_IMG = '/facilities-childcare-playroom.png';
const FACILITIES_ANIMALS_GOATS_IMG = '/facilities-animals-goats.png';
const FACILITIES_COMMERCIAL_KITCHEN_IMG = '/facilities-commercial-kitchen.png';
const FACILITIES_BAR_EVENT_HALL_IMG = '/facilities-bar-event-hall.png';
const FACILITIES_VENUE_AERIAL_IMG = '/facilities-venue-aerial.png';
const FACILITIES_PARKING_COACHES_IMG = '/facilities-parking-coaches.png';
const FACILITIES_GUEST_LOUNGE_IMG = '/facilities-guest-lounge.png';
const FACILITIES_BRIDAL_SUITE_BEDROOM_IMG = '/facilities-bridal-suite-bedroom.png';
const FACILITIES_UNIVERSAL_DESIGN_HALLWAY_IMG =
  'https://images.unsplash.com/photo-1576864333223-db90dadfb975?auto=format&fit=crop&w=1600&q=80';

export const FACILITY_CARD_KEYS = [
  'childCare',
  'accommodation',
  'bridalSuite',
  'activities',
  'animals',
  'barDanceFloor',
  'kitchen',
  'universalDesign',
  'parking',
  'barn',
] as const;

export type FacilityCardKey = (typeof FACILITY_CARD_KEYS)[number];

/**
 * Facility cards omitted from the **prices** page grid (`FacilityPricingBlock`) only.
 * Dedicated `/fasiliteter` page may be disabled in production (`facilitiesPageAvailability.ts`);
 * i18n + images stay so restoring the page or the prices-grid card is trivial:
 * remove the key from the set below and switch nothing else.
 */
const FACILITY_CARD_KEYS_HIDDEN_FROM_PRICING: ReadonlySet<FacilityCardKey> = new Set(['bridalSuite']);

export const FACILITY_PRICING_CARD_KEYS: FacilityCardKey[] = FACILITY_CARD_KEYS.filter(
  (key) => !FACILITY_CARD_KEYS_HIDDEN_FROM_PRICING.has(key),
);

export const FACILITY_CARD_IMAGES: Record<FacilityCardKey, string> = {
  childCare: FACILITIES_CHILDCARE_PLAYROOM_IMG,
  accommodation: FACILITIES_GUEST_LOUNGE_IMG,
  bridalSuite: FACILITIES_BRIDAL_SUITE_BEDROOM_IMG,
  activities: FACILITIES_ACTIVITIES_GAME_ROOM_IMG,
  animals: FACILITIES_ANIMALS_GOATS_IMG,
  barDanceFloor: FACILITIES_BAR_EVENT_HALL_IMG,
  kitchen: FACILITIES_COMMERCIAL_KITCHEN_IMG,
  universalDesign: FACILITIES_UNIVERSAL_DESIGN_HALLWAY_IMG,
  parking: FACILITIES_PARKING_COACHES_IMG,
  barn: FACILITIES_VENUE_AERIAL_IMG,
};
