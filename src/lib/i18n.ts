import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav: {
        home: 'Home',
        about: 'About',
        weddings: 'Weddings',
        corporate: 'Corporate',
        private: 'Private',
        packages: 'Packages',
        gallery: 'Gallery',
        faq: 'FAQ',
        contact: 'Contact',
        inquiry: 'Inquiry',
        admin: 'Admin'
      },
      hero: {
        title: 'Rønningen Selskapslokale',
        subtitle: 'Elegant, personal, and flexible venue for your most important celebrations.',
        cta: 'Book an Inquiry',
        bookNow: 'Book now'
      },
      branding: {
        navLine1: 'Rønningen',
        navLine2: 'Selskapslokale'
      },
      common: {
        redirectingBooking: 'Redirecting to booking…',
      },
      footer: {
        rights: 'All rights reserved',
        contact: 'Contact Us',
        tagline: 'A premium venue for life’s most beautiful moments.',
        quickLinks: 'Quick links',
        newsletter: 'Newsletter',
        newsletterDesc: 'Stay updated on our events and news.',
        emailPlaceholder: 'Email',
        newsletterCta: 'Subscribe'
      }
    }
  },
  no: {
    translation: {
      nav: {
        home: 'Hjem',
        about: 'Om oss',
        weddings: 'Bryllup',
        corporate: 'Bedrift',
        private: 'Privat',
        packages: 'Pakker',
        gallery: 'Galleri',
        faq: 'FAQ',
        contact: 'Kontakt',
        inquiry: 'Forespørsel',
        admin: 'Admin'
      },
      hero: {
        title: 'Rønningen Selskapslokale',
        subtitle: 'Elegant, personlig og fleksibelt lokale for dine viktigste feiringer.',
        cta: 'Send forespørsel',
        bookNow: 'Book nå'
      },
      branding: {
        navLine1: 'Rønningen',
        navLine2: 'Selskapslokale'
      },
      common: {
        redirectingBooking: 'Sender deg til booking …',
      },
      footer: {
        rights: 'Alle rettigheter reservert',
        contact: 'Kontakt oss',
        tagline: 'Et selskapslokale for livets vakreste øyeblikk.',
        quickLinks: 'Hurtiglenker',
        newsletter: 'Nyhetsbrev',
        newsletterDesc: 'Hold deg oppdatert på arrangementer og nyheter.',
        emailPlaceholder: 'Din e-post',
        newsletterCta: 'Meld meg på'
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    /** Standardspråk: norsk. Nettleserspråk overstyrer ikke første besøk. */
    lng: 'no',
    fallbackLng: 'no',
    supportedLngs: ['no', 'en'],
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    },
  });

if (typeof document !== 'undefined') {
  const syncHtmlLang = (lng: string) => {
    document.documentElement.lang = lng.startsWith('no') ? 'no' : 'en';
  };
  syncHtmlLang(i18n.language);
  i18n.on('languageChanged', syncHtmlLang);
}

export default i18n;
