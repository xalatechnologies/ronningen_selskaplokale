import { EventPackagesBlock, PACKAGE_HEADING_IDS } from './EventPackagesBlock';

/** Stable id for in-page anchors and deep links from other pages. */
export const WEDDING_PACKAGES_HEADING_ID = PACKAGE_HEADING_IDS.wedding;

export function WeddingPackagesBlock() {
  return <EventPackagesBlock type="wedding" />;
}
