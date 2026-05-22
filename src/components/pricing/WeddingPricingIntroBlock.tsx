import { PackageIntroBlock } from './PackageIntroBlock';
import { WeddingPackagesBlock } from './WeddingPackagesBlock';

export function WeddingPricingIntroBlock() {
  return (
    <>
      <PackageIntroBlock pageKey="weddingsPage" headingId="wedding-prices-heading" />
      <WeddingPackagesBlock />
    </>
  );
}
