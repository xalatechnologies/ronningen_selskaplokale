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
        facilities: 'Facilities',
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
      chat: {
        openAssistant: 'Open customer assistant',
        closeAssistant: 'Close customer assistant',
        launcherTitle: 'Customer Assistant — Norwegian or English',
        panelBadge: 'Customer Assistant · Kundehjelp',
        panelTitle: 'Rønningen Selskapslokale',
        panelHint: 'General guidance — contact us for quotes and binding details',
        welcomeMessage:
          'Hello. Welcome to Rønningen Selskapslokale. I can help with general questions about the venue. For quotes, dates, and specific arrangements, please use the contact link below or reach out to us directly.',
        sendMessage: 'Send message',
        directContact: 'Contact us directly',
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
      },
      contactPage: {
        intro:
          'We help you from the first question to a successful event. Get in touch for a viewing, a quote, or an informal chat about your plans.',
        sectionHeading: 'How to reach us',
        phoneLabel: 'Phone',
        phoneValue: '+47 123 45 678',
        phoneHint: 'Mon–Fri 09:00–17:00',
        emailLabel: 'Email',
        emailValue: 'post@ronningen.no',
        emailHint: 'We usually reply within one business day.',
        addressLabel: 'Address',
        addressValue: 'Baneveien 290, 3410 SYLLING',
        addressHint: 'Easy access by car and public transport.',
        hoursLabel: 'Viewings',
        hoursValue: 'By appointment only',
        hoursHint: 'Contact us to schedule a visit to the venue.',
        mapTitle: 'Location',
        mapPillLabel: 'Rønningen',
        mapOpen: 'Open in Google Maps',
        ctaRing: 'Call now',
        ctaMail: 'Send email',
        bottomLine:
          'Questions about capacity, dates, or catering? We are happy to help — no obligation.',
        formSectionTitle: 'Contact form',
        formSectionIntro: 'Write a few lines and we will get back to you as soon as we can.',
        formNameLabel: 'Name',
        formNamePlaceholder: 'Your full name',
        formEmailLabel: 'Email',
        formEmailPlaceholder: 'you@example.com',
        formPhoneLabel: 'Phone',
        formPhoneHint: 'optional',
        formPhonePlaceholder: '+47 …',
        formMessageLabel: 'Message',
        formMessagePlaceholder: 'What would you like to ask us about?',
        formSubmit: 'Send message',
        formSubmitting: 'Sending…',
        formSuccess: 'Thank you — your message was sent.',
        formError: 'Something went wrong. Please try again.',
        formPrivacy: 'We only use your details to answer your enquiry.',
        formErrName: 'Please enter at least two characters.',
        formErrEmail: 'Enter a valid email address.',
        formErrPhone: 'If you add a phone number, use at least 8 digits.',
        formErrMessage: 'Please write at least 10 characters.',
      },
      galleryPage: {
        intro:
          'Moments from weddings, companies, and private celebrations — all hosted here at Rønningen.',
        filterAll: 'All',
        filterWedding: 'Weddings',
        filterCorporate: 'Corporate',
        filterPrivate: 'Private',
        filterFacilities: 'Facilities',
        expandHint: 'Open',
        emptyTitle: 'No images in this category yet',
        emptyBody: 'Try another filter or check back soon.',
        lightboxClose: 'Close',
        lightboxPrev: 'Previous image',
        lightboxNext: 'Next image',
        counter: '{{current}} / {{total}}',
        imageAlt: 'Gallery image {{n}} — {{category}}',
        ctaLine: 'Inspired?',
        ctaHeadingLine1: 'Picture',
        ctaHeadingAccent: 'your event here',
        ctaBody: 'Tell us what you are planning — we would love to show you Rønningen.',
        ctaLink: 'Contact us',
        swipeHint: 'Swipe or use arrows to browse',
        photoCount: '{{count}} photographs',
      },
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
        facilities: 'Fasiliteter',
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
      chat: {
        openAssistant: 'Åpne kundehjelp',
        closeAssistant: 'Lukk kundehjelp',
        launcherTitle: 'Kundehjelp — norsk eller engelsk',
        panelBadge: 'Kundehjelp · Customer Assistant',
        panelTitle: 'Rønningen Selskapslokale',
        panelHint: 'Generell veiledning — kontakt oss for tilbud og bindende avtaler',
        welcomeMessage:
          'Hei. Velkommen til Rønningen Selskapslokale. Jeg kan hjelpe deg med generelle spørsmål om lokalet. For tilbud, datoer og konkrete avtaler, bruk kontaktlenken under eller ta kontakt med oss direkte.',
        sendMessage: 'Send melding',
        directContact: 'Kontakt oss direkte',
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
      },
      contactPage: {
        intro:
          'Få en omvisning helt uforpliktende - i dag!',
        sectionHeading: 'Slik når dere oss',
        phoneLabel: 'Telefon',
        phoneValue: '+47 123 45 678',
        phoneHint: 'Man–fre 09:00–17:00',
        emailLabel: 'E-post',
        emailValue: 'post@ronningen.no',
        emailHint: 'Vi svarer vanligvis innen én virkedag.',
        addressLabel: 'Adresse',
        addressValue: 'Baneveien 290, 3410 SYLLING',
        addressHint: 'God adkomst med bil og kollektivt.',
        hoursLabel: 'Omvisning',
        hoursValue: 'Kun etter avtale',
        hoursHint: 'Ta kontakt for å avtale visning på gården.',
        mapTitle: 'Her finner dere oss',
        mapPillLabel: 'Rønningen',
        mapOpen: 'Åpne i Google Maps',
        ctaRing: 'Ring nå',
        ctaMail: 'Send e-post',
        bottomLine:
          'Spørsmål om kapasitet, dato eller meny? Vi hjelper gjerne — helt uforpliktende.',
        formSectionTitle: 'Kontakt skjema',
        formSectionIntro: 'Skriv noen linjer, så tar vi kontakt så snart vi kan.',
        formNameLabel: 'Navn',
        formNamePlaceholder: 'Fullt navn',
        formEmailLabel: 'E-post',
        formEmailPlaceholder: 'deg@eksempel.no',
        formPhoneLabel: 'Telefon',
        formPhoneHint: 'valgfritt',
        formPhonePlaceholder: '+47 …',
        formMessageLabel: 'Melding',
        formMessagePlaceholder: 'Hva lurer du på?',
        formSubmit: 'Send melding',
        formSubmitting: 'Sender …',
        formSuccess: 'Takk — meldingen er sendt.',
        formError: 'Noe gikk galt. Prøv igjen.',
        formPrivacy: 'Vi bruker bare opplysningene til å svare på henvendelsen.',
        formErrName: 'Skriv inn minst to tegn.',
        formErrEmail: 'Oppgi en gyldig e-postadresse.',
        formErrPhone: 'Hvis du fyller inn telefon, bruk minst 8 siffer.',
        formErrMessage: 'Skriv minst 10 tegn.',
      },
      galleryPage: {
        intro:
          'Øyeblikk fra bryllup, bedrift og private feiringer — alt på Rønningen.',
        filterAll: 'Alle',
        filterWedding: 'Bryllup',
        filterCorporate: 'Bedrift',
        filterPrivate: 'Privat',
        filterFacilities: 'Fasiliteter',
        expandHint: 'Åpne',
        emptyTitle: 'Ingen bilder i denne kategorien ennå',
        emptyBody: 'Prøv et annet filter eller kom tilbake senere.',
        lightboxClose: 'Lukk',
        lightboxPrev: 'Forrige bilde',
        lightboxNext: 'Neste bilde',
        counter: '{{current}} / {{total}}',
        imageAlt: 'Galleribilde {{n}} — {{category}}',
        ctaLine: 'Inspirert?',
        ctaHeadingLine1: 'Deres arrangement',
        ctaHeadingAccent: 'starter her',
        ctaBody: 'Fortell om planene deres — vi viser gjerne rundt på Rønningen.',
        ctaLink: 'Ta kontakt',
        swipeHint: 'Sveip eller bruk pilene for å bla',
        photoCount: '{{count}} bilder',
      },
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
