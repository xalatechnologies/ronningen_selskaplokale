export type InspirationSlide = {
  key: string;
  src: string;
  alt: string;
};

/**
 * Extract trailing number from keys like `wedding-12` or `inspirasjon-301`.
 * Returns 1 when no number is present.
 */
export function inspirationSlideFileNumber(key: string): number {
  const m = /(\d+)$/.exec(key);
  return m ? parseInt(m[1], 10) : 1;
}

export type GalleryPageCategory = 'wedding' | 'corporate' | 'private' | 'facilities';

export type GalleryPageItem = {
  id: string;
  url: string;
  category: GalleryPageCategory;
};

function toPublicUrl(folder: string, fileName: string): string {
  return `/${folder}/${encodeURIComponent(fileName)}`;
}

function buildGalleryItems(
  category: GalleryPageCategory,
  folder: string,
  fileNames: readonly string[],
): GalleryPageItem[] {
  return fileNames.map((fileName, i) => ({
    id: `${category}-${i + 1}`,
    url: toPublicUrl(folder, fileName),
    category,
  }));
}

const WEDDING_FILES = [
  'FOTOGRAF_CAMILLAST_BRYLLUP_RENATE_ISMAIL__OKT7588.jpg',
  'DSCF1061_1_Fotograf_Torstein_Gamst.jpg',
  '486000730_1197330552393845_8558538757157227869_n.jpg',
  '__N855326_Drammen_lier_fotografering_bryllupsfotograf.webp',
  '3N5A5143.jpg',
  '480968692_1173225488137685_6022005434932860215_n.jpg',
  '124763272_402074017838492_5032804299840479610_n.jpg',
  '509415705_1277755954351304_6737020321976226634_n.jpg',
  '505288593_1266621682131398_3221353277174805191_n.jpg',
  '180478553_510286967017196_2660724699262069454_n.jpg',
  'DSCF0884__Fotograf_Torstein_Gamst-1.jpg',
  '487812626_1204100395050194_6729314883999306629_n.jpg',
  '_DSCF1246_Drammen_lier_fotografering_bryllupsfotograf.webp',
  'DSCF0875__Fotograf_Torstein_Gamst.jpg',
  '528292538_1316573757136190_4866440439777684407_n.jpg',
  '124971143_402983291080898_43553304584249275_n.jpg',
  '71486954_125668162145747_4433751231365644288_n.jpg',
  'FOTOGRAF_CAMILLAST_BRYLLUP_RENATE_ISMAIL__SEP7195.jpg',
  '480708245_1173942134732687_2097158906874032185_n.jpg',
  '481449686_1179241184202782_2331229709842482525_n.jpg',
  '473582504_1355892295789988_3073514870773246244_n.jpg',
  '_DSCF1292_Drammen_lier_fotografering_bryllupsfotograf1.webp',
  '505410390_1266621778798055_2195692700491283204_n.jpg',
  '471194349_18480927070060866_7570505825853593368_n.jpg',
  'Bryllupp.PNG',
  '473651132_1355892275789990_5413735998366007780_n.jpg',
  '123955039_402074097838484_5820509645511667279_n.jpg',
  '504705549_1266621512131415_3316916307162109045_n.jpg',
  'DSCF0951__Fotograf_Torstein_Gamst1.jpg',
  '71169880_125668518812378_1550295950461763584_n.jpg',
  '473191296_1355892392456645_2116736943343447535_n.jpg',
  '481348989_1179238057536428_1662563578222076540_n.jpg',
  '485868864_1197330589060508_5902149943546090836_n.jpg',
  '487774017_1207928398000727_8575613689543372645_n.jpg',
  '948_d4df05bf-25eb-4bbf-a60b-831935db70ec.avif',
  '122898400_389717899074104_8499580724299318997_n.jpg',
  '470191411_1334938444552040_1990592040269819386_n.jpg',
  '473582537_1355892212456663_3673740049295204865_n.jpg',
  'inngang1.jpeg',
  '125183551_402983067747587_8005590713137565178_n.jpg',
  '476804095_1160986412694926_953877492841957620_n.jpg',
  '487698923_1231043195695420_2510561597320243896_n.jpg',
  '473643148_1355892045790013_246058716173367902_n.jpg',
  'DSCF0876__Fotograf_Torstein_Gamst.jpg',
  '_DSCF1309_Drammen_lier_fotografering_bryllupsfotograf1.webp',
  '480538859_1167801728680061_5163813937802317927_n.jpg',
  '509361752_1277756071017959_4871698513545194257_n.jpg',
  'DSCF9558__Fotograf_Torstein_Gamst-1-scaled.jpg',
  'DSCF0881__Fotograf_Torstein_Gamst.jpg',
  '__N855330_Drammen_lier_fotografering_bryllupsfotograf.webp',
  '490382610_1243637534435393_9106670154673679538_n.jpg',
  'DSCF9457__Fotograf_Torstein_Gamst.jpg',
] as const;

const CORPORATE_FILES = [
  '3N5A5146.jpg',
  '470871719_1340264450686106_5687357889666154707_n.jpg',
  '487971993_1232518452214561_3537245602222992365_n.jpg',
  'business2.jpg',
  '125033577_402983234414237_9216218742794933471_n.jpg',
  'N855611__Fotograf_Torstein_Gamst.jpg',
  '544555426_1346594767467422_2574032772675353295_n.jpg',
  '121235330_375957500450144_5655252724515907133_o.jpg',
  '484031124_1190284376431796_2046750860727456566_n.jpg',
  '242577914_602746734437885_3560592875800790056_n.jpg',
  'dekor.jpg',
  '3N5A5145.jpg',
  '2.jpg',
  '3N5A5138.jpg',
  '504947622_1266621368798096_778325639992523412_n.jpg',
  '544925103_1346594607467438_6565403714224831763_n.jpg',
  'natur.avif',
] as const;

const PRIVATE_FILES = [
  '545347092_1346594657467433_5633100872561727374_n.jpg',
  '476121304_1160284759431758_7889260629837865618_n – Kopi.jpg',
  '485849618_1197330585727175_4608906197906304068_n.jpg',
  '475993586_1160284769431757_3859191165553136702_n – Kopi.jpg',
  '503623334_1262547762538790_8964792636061054096_n.jpg',
  '473553205_1355891999123351_9091933293073228266_n.jpg',
  '470187232_1334950477884170_1574430429956827671_n – Kopi.jpg',
  '241464266_592913102087915_8556216086109985848_n.jpg',
  '477803631_1167801292013438_5028879310500559083_n.jpg',
  'folk.jpeg',
  '470232627_1334938161218735_1963125604391382128_n – Kopi.jpg',
  '475462937_1160284889431745_4307138492438241255_n – Kopi.jpg',
  '473323072_1355892252456659_2748641669319294729_n – Kopi.jpg',
] as const;

const FACILITIES_FILES = [
  '948_2e68cafd-755e-44c3-99b3-a9a584bcca38.avif',
  '948_d37b1bf2-6805-4d9c-a559-eea68a1bf023.avif',
  '37319914_10214030408207206_378276062024433664_o.jpg',
  '948_734e4299-f6ad-4911-a9c1-d32cfa110315.avif',
  '948_40737654-e46b-4ee5-aac5-00e3862c5aad.avif',
  '948_2fda58de-0689-4e5b-b064-8c94e0eb5dd8.avif',
  '480631115_1173949504731950_7206440589519207182_n.jpg',
  '948_11075e88-8fda-4cb1-b9a7-b0b6c941c4f1.avif',
  'Skjermbilde-2019-06-23-kl.-09.48.10.jpg',
  '948_39fca355-56f2-476a-aaec-b55b5a83e24a.avif',
  '21NYH_07-14-Ronningen-Liesl-og-Kai-19-scaled.jpg',
  '309910477_530317215761852_3907366418443697538_n.jpeg',
  'inngang2.jpeg',
  '948_4d21cc7e-7cb5-499d-9af3-98498b86d24d.avif',
  '948_84261e09-741a-4bcc-8790-1bb6e2133971.avif',
  '948_fb724556-64cd-409d-b74a-fe3814b29dd2.avif',
  '515555313_1290902759703290_743986379646951307_n.jpg',
  'IMG_8632-scaled.jpg',
  '948_1f0201a4-ddef-4ac3-9608-fd3f3868f085.avif',
  '21NYH_12-14-Rønningen-Liesl-og-Kai-24.jpg',
  '473188148_1353716696007548_6143376265790451072_n.jpg',
  '468752200_1326561468723071_2651641691333451860_n.jpg',
  '470876633_1340265430686008_300663239583926768_n.jpg',
  '21NYH_14-14-Rønningen-Liesl-og-Kai-26.jpg',
  '948_ed824d64-5e71-49fc-a39c-a3e98e1b0072.avif',
] as const;

function buildInspirationSlides(
  keyPrefix: string,
  folder: string,
  fileNames: readonly string[],
): InspirationSlide[] {
  return fileNames.map((fileName, i) => ({
    key: `${keyPrefix}-${i + 1}`,
    src: toPublicUrl(folder, fileName),
    alt: '',
  }));
}

/** Home hero + bryllup route — same files as galleri filter «Bryllup». */
export const inspirationGallerySlides: InspirationSlide[] = buildInspirationSlides(
  'wedding',
  'bryllup',
  WEDDING_FILES,
);

/** Bedrift route inspirasjon — same files as galleri filter «Bedrift». */
export const corporateInspirationSlides: InspirationSlide[] = buildInspirationSlides(
  'corporate',
  'bedrift',
  CORPORATE_FILES,
);

/** Selskap route inspirasjon — same files as galleri filter «Selskap». */
export const privateInspirationSlides: InspirationSlide[] = buildInspirationSlides(
  'private',
  'selskap',
  PRIVATE_FILES,
);

/** Fasiliteter — same files as galleri filter «Fasiliteter» (for reuse on route pages). */
export const facilitiesInspirationSlides: InspirationSlide[] = buildInspirationSlides(
  'facilities',
  'fasiliteter',
  FACILITIES_FILES,
);

export function inspirationSlidesForCategory(category: GalleryPageCategory): InspirationSlide[] {
  switch (category) {
    case 'wedding':
      return inspirationGallerySlides;
    case 'corporate':
      return corporateInspirationSlides;
    case 'private':
      return privateInspirationSlides;
    case 'facilities':
      return facilitiesInspirationSlides;
  }
}

/**
 * Forside inspirasjon — én fra hver kategori om gangen (round-robin), så stripa ikke matcher én rute-side.
 * Samme kildefiler som fullt galleri, stabil rekkefølge ved hver lasting.
 */
export const homeInspirationGallerySlides: InspirationSlide[] = (() => {
  const groups = [
    inspirationGallerySlides,
    corporateInspirationSlides,
    privateInspirationSlides,
    facilitiesInspirationSlides,
  ];
  const maxLen = Math.max(...groups.map((g) => g.length));
  const result: InspirationSlide[] = [];
  for (let i = 0; i < maxLen; i++) {
    for (let g = 0; g < groups.length; g++) {
      const slide = groups[g][i];
      if (slide) {
        result.push({
          key: `home-${result.length + 1}`,
          src: slide.src,
          alt: '',
        });
      }
    }
  }
  return result;
})();

/** /gallery grid: all category folders merged (shown under "ALLE" and per category). */
export const inspirationGalleryPageItems: GalleryPageItem[] = [
  ...buildGalleryItems('wedding', 'bryllup', WEDDING_FILES),
  ...buildGalleryItems('corporate', 'bedrift', CORPORATE_FILES),
  ...buildGalleryItems('private', 'selskap', PRIVATE_FILES),
  ...buildGalleryItems('facilities', 'fasiliteter', FACILITIES_FILES),
];
