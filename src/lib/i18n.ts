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
        cta: 'Book an Inquiry'
      },
      footer: {
        rights: 'All rights reserved',
        contact: 'Contact Us'
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
        cta: 'Send forespørsel'
      },
      footer: {
        rights: 'Alle rettigheter reservert',
        contact: 'Kontakt oss'
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'no',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
