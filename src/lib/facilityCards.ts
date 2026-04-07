const FACILITIES_SHUFFLEBOARD_HERO_IMG = '/facilities-hero-shuffleboard.png';
const FACILITIES_CHILDCARE_PLAYROOM_IMG = '/facilities-childcare-playroom.png';
const FACILITIES_ANIMALS_GOATS_IMG = '/facilities-animals-goats.png';
const FACILITIES_COMMERCIAL_KITCHEN_IMG = '/facilities-commercial-kitchen.png';
const FACILITIES_BAR_EVENT_HALL_IMG = '/facilities-bar-event-hall.png';
const FACILITIES_VENUE_AERIAL_IMG = '/facilities-venue-aerial.png';
const FACILITIES_PARKING_COACHES_IMG = '/facilities-parking-coaches.png';
const FACILITIES_GUEST_LOUNGE_IMG = '/facilities-guest-lounge.png';
const FACILITIES_BRIDAL_SUITE_BEDROOM_IMG = '/facilities-bridal-suite-bedroom.png';
const FACILITIES_UNIVERSAL_DESIGN_HALLWAY_IMG = '/facilities-universal-design-hallway.png';

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

export const FACILITY_CARD_IMAGES: Record<FacilityCardKey, string> = {
  childCare: FACILITIES_CHILDCARE_PLAYROOM_IMG,
  accommodation: FACILITIES_GUEST_LOUNGE_IMG,
  bridalSuite: FACILITIES_BRIDAL_SUITE_BEDROOM_IMG,
  activities: FACILITIES_SHUFFLEBOARD_HERO_IMG,
  animals: FACILITIES_ANIMALS_GOATS_IMG,
  barDanceFloor: FACILITIES_BAR_EVENT_HALL_IMG,
  kitchen: FACILITIES_COMMERCIAL_KITCHEN_IMG,
  universalDesign: FACILITIES_UNIVERSAL_DESIGN_HALLWAY_IMG,
  parking: FACILITIES_PARKING_COACHES_IMG,
  barn: FACILITIES_VENUE_AERIAL_IMG,
};
