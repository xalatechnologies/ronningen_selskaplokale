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
        prices: 'Prices',
        facilities: 'Facilities',
        gallery: 'Gallery',
        blog: 'Blog',
        faq: 'FAQ',
        contact: 'Contact',
        contactUs: 'Contact us',
        inquiry: 'Inquiry',
        admin: 'Admin',
        menuLabel: 'Main menu',
        menuOpen: 'Open menu',
        menuClose: 'Close menu',
        language: 'Language',
        switchToNorwegian: 'Switch to Norwegian',
        switchToEnglish: 'Switch to English',
        languageNorwegianShort: 'NO',
        languageEnglishShort: 'EN',
        themeSwitchToDark: 'Switch to dark mode',
        themeSwitchToLight: 'Switch to light mode',
      },
      hero: {
        title: 'Rønningen Selskapslokale',
        subtitle: 'An elegant, personal venue with flexible spaces for weddings, corporate events, and private celebrations.',
        cta: 'Send enquiry',
        bookNow: 'Book now',
      },
      homeHero: {
        welcomeLine: 'Welcome to',
        venueName: 'Rønningen selskapslokale',
        heroImageLightAlt:
          'Venue entrance in daylight with a large floral arch over glass doors, gravel courtyard with lemon trees in terracotta pots, and forested hills behind the building',
        heroImageAlt:
          'Event venue at night with warm lighting, a starry sky, and a festive atmosphere',
        scrollHintAria: 'Scroll down to our concepts',
      },
      homeConcepts: {
        heading: 'Our concepts',
        items: {
          weddings: {
            title: 'Weddings',
            description:
              'A full day tailored to you — from ceremony to celebration.',
            imgAlt:
              'Bride and groom cutting their wedding cake together in front of tall windows with a blurred forest outside',
          },
          corporate: {
            title: 'Corporate events',
            description:
              'Conferences, Christmas parties and summer parties in a great setting.',
            imgAlt:
              'Outdoor evening gathering with guests playing darts by a wooden stand, string lights and trees in the background',
          },
          private: {
            title: 'Private parties',
            description:
              'Birthdays, confirmations and anniversaries in flexible, informal surroundings.',
            imgAlt:
              'Gold hexagonal metal frame decorated with cream, beige and sage balloon garlands and pampas grass, on a grey floor against a dark teal wall',
          },
          facilities: {
            title: 'Facilities',
            description:
              'Various activities, commercial kitchen, bar, dance floor and more.',
            imgAlt:
              'Shuffleboard table with pucks on a polished wooden surface — indoor social activities at the venue',
          },
        },
      },
      homeServices: {
        heading: 'Highlights',
        items: {
          soundLight: {
            title: 'Sound and lighting',
            description:
              'Sound and lighting tailored for music, speeches and your event.',
            imgAlt:
              'Banquet hall with round tables in black linens, purple accent lighting on the walls, tall floral centrepieces and formal place settings',
          },
          catering: {
            title: 'Bring your own',
            description:
              'You may bring your own food and drinks, and use the commercial kitchen and catering options.',
          },
          barDancefloor: {
            title: 'Bar and dance floor',
            description:
              'A dedicated bar and a spacious dance floor for a sociable, lively evening.',
            imgAlt:
              'Black and white photo of a bride and groom on their first dance on a large floor, guests watching in a semicircle in a dimly lit venue',
          },
          coordination: {
            title: 'Table dressing',
            description:
              'Tables, chairs, tableware, linens and chair covers — ready to use or tailored to your style.',
            imgAlt:
              'Round banquet table in a white floor-length cloth with covered chairs, glassware and silver cutlery, napkins tied with green ribbon, and a soft pink and white floral centrepiece',
          },
          decoration: {
            title: 'Activities',
            description:
              'We offer activities including shuffleboard, darts, poker, air hockey and team building.',
            imgAlt:
              'Shuffleboard table with pucks on a polished wooden surface — indoor social activities at the venue',
          },
          overnight: {
            title: 'Childcare',
            description: 'Childcare can be arranged for events by agreement.',
            imgAlt:
              "Bright children's playroom with toys, small table and large window overlooking a green garden",
          },
        },
      },
      homeGallery: {
        heading: 'Inspiration',
        ctaFullGallery: 'See the full gallery',
      },
      inspirationGallery: {
        slideAlt: 'Wedding inspiration, photo {{n}}',
        openImageAria: 'Open large image: {{description}}',
      },
      homePartners: {
        eyebrow: 'Curated collaborators',
        heading: 'Our partners',
        intro:
          'Trusted partners for catering, styling, technology, and event support — all tailored to your celebration.',
        listAria: 'Partner list',
        websiteLabel: 'Visit website',
        noWebsite: 'Contact us',
        items: {
          cateringKitchen: {
            name: 'Svensefjøset',
            desc: 'Based in Lierbyen with a focus on local produce. Delivers flavorful food for both small and large events.',
          },
          flowersDecor: {
            name: 'OsloEvent',
            desc: 'Provides event equipment and practical solutions, from decor elements to technical needs.',
          },
          photoVideo: {
            name: 'Villa Boligstyling',
            desc: 'Supports table setup and venue styling, tailored to your style and event format.',
          },
          soundLight: {
            name: 'Festpartner',
            desc: 'Rental of chair covers, table linens and accessories for a complete table setting.',
          },
          barService: {
            name: 'Digilist',
            desc: 'Booking platform that simplifies guest lists, registrations and practical planning.',
          },
          digilist: {
            name: 'Xala Technologies AS',
            desc: 'Technology and digital operations partner supporting platform delivery and reliability.',
          },
        },
      },
      weddingsPage: {
        heroImageAlt:
          'Photo collage of celebrations, details and atmosphere at Rønningen',
        heroTitleBefore: 'Weddings in beautiful, ',
        heroTitleAccent: 'unique',
        heroTitleAfter: ' surroundings',
        heroScrollHintAria: 'Scroll down to the atmosphere section',
        atmosphere: {
          headingLine1: 'Ceremony and celebration',
          headingLine2: '',
          intro1:
            'Bring the whole day together in one place — from ceremony to dinner and the party. Surrounded by calm, beautiful nature, with only a short distance between the vows and the dance floor. The venue can be prepared for a ceremony in parallel with table setting, while generous green spaces are ideal for a ceremony beneath open skies.',
          figureAlt:
            'Bride and groom embracing at night on a stone path as guests line both sides holding lit sparklers, candles along the walkway',
        },
        dayTimeline: {
          headingLine1: 'This is how',
          headingLine2: 'your day can look',
          item1: {
            title: 'Ceremony & photography',
            desc: 'Surrounded by our beautiful outdoor areas, with a waterfall within easy reach.',
          },
          item2: {
            title: 'Dinner & speeches',
            desc: 'Wedding dinner with local produce and plenty of room for speeches and toasts.',
          },
          item3: {
            title: 'Coffee & dessert',
            desc: 'Coffee and dessert in calm shared spaces before the evening takes over.',
            imgAlt:
              'Chocolate-frosted wedding cakes on rustic log-slice stands, topped with fresh fruit, greenery on the table and guests in the background',
          },
          item4: {
            title: 'Dancing & celebration',
            desc: 'Drinks and dancing with great energy into the night.',
          },
        },
        servicesSection: {
          headingBefore: 'Tailored to ',
          headingAccent: 'your',
          headingAfter: ' wishes',
          items: {
            kitchen: {
              title: 'Commercial kitchen & Catering',
              desc: 'Bring your own food, or use our fully equipped commercial kitchen and catering partners.',
              imgAlt: 'Professional commercial kitchen equipped for catering and events',
            },
            photography: {
              title: 'Photography & Film',
              desc: 'Recommended photographers who know the venue and capture the moments.',
              imgAlt:
                'Bride in a white gown and groom in a dark suit standing on dark rocks facing each other beside a bright cascading waterfall',
            },
            decoration: {
              title: 'Table dressing & Decoration',
              desc: 'Flexible solutions for table dressing and décor tailored to your style.',
              imgAlt:
                'Event backdrop with cream arched panels, organic balloon arch in cream, gold and black, pampas grass, and a chocolate cake on a clear pedestal',
            },
            bar: {
              title: 'Bar & Dance Floor',
              desc: 'Bring your own drinks and enjoy the bar area and dance floor.',
              imgAlt:
                'Spacious event room with dark walls, polished concrete floor, tall windows with snow outside, industrial pendant lights and screens on stands',
            },
            soundLight: {
              title: 'Sound & Lighting',
              desc: 'Sound and lighting that create the right atmosphere.',
              imgAlt:
                'Banquet hall with white table settings, purple and blue stage lighting, and projections on the walls',
            },
            tableSetting: {
              title: 'Activities',
              desc: 'Space for activities indoors and out, tailored to your event.',
              imgAlt:
                'Banquet hall with round tables in black linens, white plates, glassware, floral centerpieces with candles, and floor-to-ceiling windows to greenery outside',
            },
          },
        },
        packagesSection: {
          heading: 'Our packages',
          intro:
            'Three clear packages as a starting point — get in touch and we will find a date, adjustments, and a quote that suits your needs.',
          popularBadge: 'Most popular',
          ctaQuote: 'Request a quote',
          items: {
            basic: {
              name: 'Basic',
              price: 'NOK 26,000',
              desc: 'For couples who want to handle most of it themselves',
              f1: 'Venue hire',
              f2: 'Parking',
              f3: 'Outdoor areas',
            },
            plus: {
              name: 'Plus',
              price: 'Price on request',
              desc: 'A simpler, more ready-made option',
              f1: 'Everything in Basic',
              f2: 'Table setting (tables, chairs, linen, chair covers, napkins)',
              f3: 'Kitchen access with equipment and cold storage',
              f4: 'Sound & lighting',
              f5: 'Final cleaning',
            },
            premium: {
              name: 'Premium',
              price: 'Price on request',
              desc: 'Full package — we take care of most of the details',
              f1: 'Everything in Plus',
              f2: 'Coordination and planning',
              f3: 'Decoration and table styling',
              f4: 'Catering & serving staff',
              f5: 'Additional services as needed',
            },
          },
        },
        gallerySection: {
          heading: 'Inspiration',
          intro: 'A small selection from past weddings hosted here.',
          ctaFullGallery: 'See the full gallery',
        },
        faqSection: {
          headingBefore: 'Frequently asked ',
          headingAccent: 'questions',
          items: {
            item1: {
              q: 'Do you offer table dressing and décor?',
              a: 'Yes — we offer table dressing and décor that can be tailored to your style and preferences.',
            },
            item2: {
              q: 'Can we bring our own food and drinks?',
              a: 'Yes, you are welcome to bring your own food and drinks. We also work with local catering companies who can supply food and service if you prefer a simpler setup.',
            },
            item3: {
              q: 'How many guests can you host?',
              a: 'We can host up to 300 guests, with space for up to 200 more in a party tent.',
            },
            item4: {
              q: 'Can we hold the ceremony at the venue or outdoors?',
              a: 'Absolutely! We have several beautiful outdoor spots that are perfect for a ceremony, plus great opportunities for photos in the natural surroundings and at a nearby waterfall.',
            },
            item5: {
              q: 'When do we get access to the venue?',
              a: 'We are flexible and are happy to give you access before and after your event for planning and delivery. We also offer services so you can focus on the party and your guests.',
            },
            item6: {
              q: 'Do you have parking and EV charging?',
              a: 'We have good parking with room for all guests. You can also charge an electric car or leave your car overnight for an easier, safer end to the evening.',
            },
          },
        },
        finalCta: {
          bgImageAlt: 'Wedding atmosphere — background for the contact call-to-action',
          headingLine1: 'Shall we create',
          headingLine2: 'magic together?',
          body: 'Get in touch for a no-obligation chat or to arrange a private viewing of the venue.',
        },
      },
      corporatePage: {
        heroImageAlt:
          'Dessert table with small cakes on rustic log stands, greenery and white linen, bright venue with tall windows and guests in formal dress',
        heroTitleLine1: 'From Christmas parties to kick-offs.',
        heroTitleLine2Prefix: '',
        heroTitleLine2Accent: 'All',
        heroTitleLine2Rest: ' in one place.',
        heroTagline:
          'Host corporate events that feel organised, welcoming, and firmly on brief.',
        heroScrollHintAria: 'Scroll down to the introduction',
        introSection: {
          figureAlt:
            'Guests in suits at a round table with white linen, glassware, floral centrepiece and place cards, large windows to greenery outside',
          headingBefore: 'Where professionalism meets ',
          headingAccent: 'warmth',
          intro:
            'From professional content to activities and social time — the venue gives you room for team building, dinner and celebration in the same setting.',
          benefitsEyebrow: 'Three clear advantages',
          benefits: {
            item1: 'Activities and team building',
            item2: 'Flexible programme',
            item3: 'Social wrap-up',
          },
        },
        eventsSection: {
          headingBefore: 'Suggestions for ',
          headingAccent: 'company events',
          items: {
            conference: {
              title: 'Conference & seminar',
              desc: 'Strong facilities for professional content, with room for both presentations and breaks in calm surroundings.',
              imgAlt: 'Large conference or seminar room set up for a professional audience',
            },
            teambuilding: {
              title: 'Team building',
              desc: 'Build cohesion through activities and memorable experiences — indoors and outdoors, tailored to your needs.',
              imgAlt: 'Colleagues collaborating together around a table in a bright office',
            },
            christmasParty: {
              title: 'Christmas party',
              desc: 'Create a warm Christmas celebration with colleagues, friends or family, with room for dinner, speeches and a festive evening.',
              imgAlt:
                'Long dining table with red check cloth, candles and place settings, fairy lights and red-green drapes overhead, Christmas tree and dark walls',
            },
            summerParty: {
              title: 'Summer party',
              desc: 'Enjoy summer with colleagues in open, green surroundings, with plenty of space for both activities and downtime.',
              imgAlt:
                'Two stacked photos: guests in formal wear chatting indoors by wood and glass, and men in suits laughing together outdoors by a fence with a green hillside',
            },
            workshopKickoff: {
              title: 'Workshop & kick-off',
              desc: 'Launch new projects or bring the team together with focus and energy in inspiring surroundings.',
              imgAlt: 'Team workshop in a modern office with a presenter and seated colleagues',
            },
            companyDinner: {
              title: 'Company dinner',
              desc: 'Host a stylish dinner with a setting suited to conversation, celebration, and relationship-building.',
              imgAlt: 'Guests raising glasses for a toast at an elegant seated dinner',
            },
          },
        },
        gallerySection: {
          heading: 'Inspiration',
          slideAlt: 'Mood from the venue {{n}}',
          prevImageAria: 'Previous image',
          nextImageAria: 'Next image',
          openLargeImage: 'Open large image: {{caption}}',
          fullGalleryCta: 'See the full gallery',
        },
        faqSection: {
          headingBefore: 'Frequently asked ',
          headingAccent: 'questions',
          items: {
            eventTypes: {
              q: 'What types of corporate events work well?',
              a: 'We suit everything from conferences and seminars to Christmas parties, summer parties, workshops and company dinners. The programme is tailored to your needs.',
            },
            tailored: {
              q: 'Can the programme be tailored?',
              a: 'Yes. We adapt layout, timing and content based on your wishes and the type of event.',
            },
            viewing: {
              q: 'Can we book a viewing?',
              a: 'Yes — we offer private viewings by appointment. Get in touch and we’ll find a time that works.',
            },
            howToInquire: {
              q: 'How do we send an enquiry?',
              a: 'You can email us or use the contact form. Please share date, guest count and type of event, and we’ll follow up quickly.',
            },
          },
        },
        closingCta: {
          bgImageAlt:
            'Corporate celebration at the venue — background image for the contact call-to-action',
          eyebrow: 'Next step',
          headingLine1Before: 'Ready to ',
          headingLine1Accent: 'plan',
          headingLine2: "your company's day with us?",
          body: 'Tell us briefly what you envision, and we’ll put together a programme that suits both your team and guests.',
        },
      },
      pricesPage: {
        heroEyebrow: 'Pricing',
        title: 'Our packages and services',
        intro: 'We tailor the right package to your needs.',
        bottomCta: {
          heading: 'Questions or ready to book?',
          body: 'Contact us for a no-obligation chat — we will help with date, programme and quote.',
          primary: 'Contact us',
        },
        facilityPricing: {
          heading: 'Facilities and additional services',
          intro:
            'The facilities and services below are part of what makes the venue complete for your day. Pricing for some services is agreed separately.',
          showMore: 'Show {{count}} more',
          showLess: 'Show fewer',
          items: {
            childCare: {
              price: 'On request',
              note: 'Playroom by arrangement; childcare or staffing quoted separately when booked.',
            },
            accommodation: {
              price: 'On request',
              note: 'Indicative; depends on season, room type and availability.',
            },
            bridalSuite: {
              price: 'Included on wedding day',
              note: 'Other event types and extra nights are priced on request.',
            },
            activities: {
              price: 'On request',
              note: 'Indoor games and shuffleboard with standard venue hire.',
            },
            animals: {
              price: 'Included',
              note: 'Farm visit or animal programme as an add-on — quoted with your event.',
            },
            barDanceFloor: {
              price: 'Included',
              note: 'Bar area and dance floor with venue hire.',
            },
            kitchen: {
              price: 'On request',
              note: 'Full commercial kitchen; access level follows your package (see wedding/private cards above).',
            },
            universalDesign: {
              price: 'Included',
              note: 'Single-level flow and accessible WC — no extra facility fee.',
            },
            parking: {
              price: 'Included',
              note: 'Guest parking on site; EV charging available.',
            },
            barn: {
              price: 'From NOK 26,000',
              note: 'Main celebration hall — wedding Basic; Plus & Premium shown in the packages above.',
            },
          },
        },
      },
      privatePage: {
        heroImageAlt:
          'Banquet room with round white tables, floral centerpieces, candles and fairy lights draped across the ceiling',
        heroTitleLine1: "Life's celebrations, gathered.",
        heroTitleLine2Prefix: '',
        heroTitleLine2Accent: 'With',
        heroTitleLine2Rest: ' us.',
        heroScrollHintAria: 'Scroll down to the introduction',
        introSection: {
          headingBefore: 'Where your celebration gains ',
          headingAccent: 'personality',
          intro:
            'Birthdays, confirmations, baptisms, baby showers and anniversaries — gather in spaces that leave room for your style and how you celebrate, without a standard package setup.',
          panoramaAlt:
            'Evening party room with a long candlelit table, fairy lights overhead, cocktail tables, tricolour ceiling banner, tall glass doors and a small lit tree',
          highlights: {
            proximity: {
              title: 'Closeness',
              desc: 'Rooms that feel personal — here it is about you and your guests, not a standard setup.',
            },
            tradition: {
              title: 'Your traditions',
              desc: 'Your celebration is shaped around your wishes, family and traditions — without fixed templates.',
            },
            gathered: {
              title: 'All in one place',
              desc: 'Everything happens in one place, from start to finish — less stress, more time to be together.',
            },
          },
        },
        eventsSection: {
          headingBefore: 'Occasions that ',
          headingAccent: 'suit our venue',
          items: {
            birthday: {
              title: 'Birthday',
              desc: 'Celebrate the day with friends and family in a great setting, with room for both dinner and a party.',
              imgAlt:
                'Dessert table with pink tiered cake, cupcakes, candy jars, balloons and candles against a dark wall',
            },
            confirmation: {
              title: 'Confirmation',
              desc: 'An important day gathered in one place, with room for both the formal parts and the social side.',
              imgAlt:
                'Bright event room with white-draped tables and chairs, pink and white floral centrepieces, dark walls and sunlight through large windows to a green outdoor view',
            },
            baptismNaming: {
              title: 'Baptism & naming day',
              desc: 'Calm, beautiful surroundings for a personal celebration with family and those closest to you.',
              imgAlt:
                'Round tables with white linens, folded napkins, place cards, pink balloon centrepieces and glassware in a bright room with large windows to greenery',
            },
            babyShower: {
              title: 'Baby shower',
              desc: 'Celebrate the expected arrival with friends and family — room for games, speeches, cake and a relaxed gathering in warm, welcoming surroundings.',
              imgAlt:
                'Close-up of a pastel balloon arch for a celebration',
            },
            anniversary: {
              title: 'Anniversary',
              desc: 'Mark big and small milestones with an evening that brings people together and creates lasting memories.',
              imgAlt:
                'Large illuminated marquee letters spelling MR & MRS on a polished floor by floor-to-ceiling windows overlooking trees and green hills',
            },
            memorial: {
              title: 'Memorial gathering',
              desc: 'Calm, dignified surroundings for family and friends after a loss — with space for speeches, floral tributes and quiet time together.',
              imgAlt: 'White roses and lit candles in a calm, respectful setting',
            },
          },
        },
        gallerySection: {
          heading: 'Inspiration',
          slideAlt: 'Mood from the venue {{n}}',
          prevImageAria: 'Previous image',
          nextImageAria: 'Next image',
          openLargeImage: 'Open large image: {{caption}}',
          fullGalleryCta: 'See the full gallery',
        },
        faqSection: {
          headingBefore: 'Frequently asked ',
          headingAccent: 'questions',
          items: {
            celebrations: {
              q: 'What private celebrations can we host with you?',
              a: 'Everything from birthdays and confirmations to baptisms, baby showers and anniversaries. The programme is tailored to your type of celebration.',
            },
            ownFoodDrink: {
              q: 'Can we bring our own food and drink?',
              a: 'Yes, you are welcome to. We also work with catering partners who can provide food and service.',
            },
            capacity: {
              q: 'Does it work for both small and large parties?',
              a: 'Yes. The venue works well for both smaller and larger groups, with flexible layouts.',
            },
            howToBook: {
              q: 'How do we book?',
              a: 'Send us an enquiry with date, guest count and type of event, and we’ll take it from there.',
            },
          },
        },
        closingCta: {
          bgImageAlt:
            'Private celebration at the venue — background image for the contact call-to-action',
          headingLine1Before: 'Want to ',
          headingLine1Accent: 'plan',
          headingLine2: 'your celebration with us?',
          body: 'Tell us briefly what you are celebrating and when, and we will suggest a setting and a programme that suit you and your guests.',
        },
      },
      facilitiesPage: {
        heroImageAlt:
          'Shuffleboard table with pucks on a polished wooden surface — indoor social activities at the venue',
        heroTitleLine1: 'All in one place.',
        heroTitleLine2Prefix: 'For the ',
        heroTitleLine2Accent: 'whole celebration',
        heroTitleLine2Rest: '.',
        heroTagline:
          'Childcare, kitchen, accommodation and great facilities — everything you need gathered in one place.',
        heroScrollHintAria: 'Scroll down to the introduction',
        introCardsSection: {
          headingBefore: 'From preparations to the last dance — ',
          headingAccent: 'one place, many possibilities.',
          scrollHintDesktop: 'Use arrows or swipe',
          scrollHintMobile: 'Swipe',
          prevAria: 'Previous facilities',
          nextAria: 'Next facilities',
          items: {
            childCare: {
              title: 'Childcare',
              desc: 'Safe solutions for little ones so parents can relax and be fully present at the celebration.',
              imgAlt:
                'Bright children’s playroom with toys, small table and large window overlooking a green garden',
            },
            accommodation: {
              title: 'Accommodation',
              desc: 'Overnight stays for guests travelling from afar — easy to bring the whole weekend together in one place.',
              imgAlt:
                'Guest lounge with sofa, TV, wood floor and tall windows — view of trees and Norwegian flag outside',
            },
            bridalSuite: {
              title: 'Bridal suite',
              desc: 'A dedicated room for preparations and quiet moments before the ceremony and party.',
              imgAlt:
                'Attic bedroom with sloped white paneled ceiling, dark grey walls, upholstered bed and woven pendant light',
            },
            activities: {
              title: 'Activities',
              desc: 'Options indoors and out that add breaks and variety through the day.',
              imgAlt: 'Shuffleboard table with pucks — indoor games and activities',
            },
            animals: {
              title: 'Time with animals',
              desc: 'Close to animals and outdoor areas for a calm, distinctive setting around your event.',
              imgAlt:
                'White goats resting by grey wooden shelters on a grassy hillside with green fields beyond',
            },
            barDanceFloor: {
              title: 'Bar & dance floor',
              desc: 'A natural transition from dinner to party, with room for music, speeches and dancing.',
              imgAlt:
                'Event hall with bar counter, cocktail tables, draped ceiling and tall windows to a green garden',
            },
            kitchen: {
              title: 'Commercial kitchen',
              desc: 'A fully equipped kitchen that makes catering and service straightforward.',
              imgAlt:
                'Commercial kitchen with stainless steel worktops, combi oven, large exhaust hood and prep stations',
            },
            universalDesign: {
              title: 'Universally designed',
              desc: 'All on one level with access to an accessible WC — arranged so every guest can take part and feel welcome.',
              imgAlt:
                'Accessible restroom sign (wheelchair symbol)',
            },
            parking: {
              title: 'Parking',
              desc: 'Plenty of parking, with EV charging and the option to leave your car.',
              imgAlt:
                'Tour coaches parked on a gravel lot with forest behind — space for large groups to arrive',
            },
            barn: {
              title: 'Celebration hall',
              desc: 'The main room with space for dinner, speeches and dancing — all in one place.',
              imgAlt:
                'Aerial view of the estate — main venue, white guest house with pool, red outbuilding, picnic tables, gravel paths, Norwegian flag and forested hills',
            },
          },
        },
        useCasesSection: {
          headingBefore: 'This is how the facilities ',
          headingAccent: 'work in practice',
          items: {
            familyCelebration: {
              title: 'Family celebration',
              desc: 'Bring family and friends together for a full celebration with time for meals, company and calm.',
              imgAlt:
                'Large group of guests in formal dress for a celebration on the patio in front of the modern glass-front venue, countryside beyond',
            },
            weddingWeekend: {
              title: 'Wedding weekend',
              desc: 'Celebrate over several days with ceremony, dinner, party and overnight stays all in one place.',
              imgAlt:
                'Classic green Mini with wedding trim — pennants in the rear window and tin cans on strings, parked on a rural gravel road',
            },
            corporateEvening: {
              title: 'Corporate evening',
              desc: 'Start with professional content or dinner, and finish the evening with social time and a party.',
              imgAlt:
                'Banquet hall set for dinner — round tables with white linens, candles and greenery, tall windows and venue sign at the far end',
            },
            outdoorsIndoors: {
              title: 'Outdoors and indoors',
              desc: 'Combine outdoor areas and the venue through the day — from activity and mingling to dinner and party.',
              imgAlt:
                'Waterfall pouring over dark cliffs into a pool where someone is swimming — outdoor nature and activity',
            },
            weekendGuests: {
              title: 'Weekend with guests',
              desc: 'Let guests stay over and enjoy a relaxed weekend with more time together.',
              imgAlt:
                'Bright guest living area with seating and TV — comfortable space for overnight guests',
            },
            livelyEvening: {
              title: 'An evening with energy',
              desc: 'From dinner to music and dancing — an evening with great energy and life in the venue.',
              imgAlt:
                'Bright event hall with bar, high tables and garden views — space for party and dancing',
            },
          },
        },
        gallerySection: {
          heading: 'Facilities in pictures',
          intro: 'A short glimpse of our rooms, atmosphere and what we can offer.',
          imageAlt: 'Gallery image {{number}}',
          openLargeImageAria: 'Open large image: {{alt}}',
          fullGalleryCta: 'See the full gallery',
        },
        faqSection: {
          headingBefore: 'Frequently asked ',
          headingAccent: 'questions',
          items: {
            combineFacilities: {
              q: 'Can we combine several facilities in the same arrangement?',
              a: 'Yes. We put together a flow that fits your day and combine facilities according to needs and budget.',
            },
            universalDesign: {
              q: 'Is the venue universally designed?',
              a: 'Yes — the venue is arranged on one level with access to an accessible WC, so every guest can take part and feel welcome.',
            },
            parkingCharging: {
              q: 'Do you have parking and charging?',
              a: 'Yes. We have free parking and the option to charge. It can also be agreed for cars to be left on site.',
            },
            howToBook: {
              q: 'How do we book facilities with you?',
              a: 'Send an enquiry with date, type of event and number of guests. We will follow up with suggestions.',
            },
          },
        },
        closingCta: {
          eyebrow: 'Facilities',
          headingLine1Before: 'Ready to see what ',
          headingLine1Accent: 'fits your day?',
          body: 'Tell us what you are planning and we will put together an arrangement with the right facilities.',
          ctaSecondary: 'Contact us',
        },
      },
      branding: {
        navLine1: 'RØNNINGEN',
        navLine2: 'Selskapslokale'
      },
      common: {
        redirectingBooking: 'Redirecting to booking…',
      },
      chat: {
        openAssistant: 'Open customer assistant',
        closeAssistant: 'Close customer assistant',
        launcherTitle: 'Customer Assistant — Norwegian or English',
        panelEyebrow: 'Customer assistant',
        panelHeading: 'Rønningen Selskapslokale — customer assistant',
        panelBadge: 'Customer Assistant · Kundehjelp',
        panelTitle: 'Rønningen Selskapslokale',
        panelHint: 'General guidance — contact us for quotes and binding details',
        welcomeMessage:
          'Hello. Welcome to Rønningen Selskapslokale. I can help with general questions about the venue. For quotes, dates, and specific arrangements, please use the contact link below or reach out to us directly.',
        sendMessage: 'Send message',
        directContact: 'Contact us directly',
      },
      footer: {
        brandSubtitle: 'Selskapslokale',
        rights: 'All rights reserved',
        contact: 'Contact Us',
        iconNavAriaLabel: 'Social media',
        newsletter: 'Newsletter',
        newsletterDesc: 'Stay updated on our events and news.',
        emailPlaceholder: 'Email',
        newsletterCta: 'Subscribe',
        developedBy: 'Developed by:',
        xalaLinkAria: 'Xala — xala.no (opens in a new tab)',
        openInMapsAria: 'Open {{address}} in Google Maps (opens in a new tab)',
      },
      contactPage: {
        intro:
          'We help you from the first question to a successful event. Get in touch for a viewing, a quote, or an informal chat about your plans.',
        sectionHeading: 'How to reach us',
        phoneLabel: 'Phone',
        phoneValue: '+47 96 66 50 01',
        phoneHint: 'Mon–Fri 09:00–17:00',
        emailLabel: 'Email',
        emailValue: 'post@ronningenselskapslokale.no',
        emailHint: 'We usually reply within one business day.',
        addressLabel: 'Address',
        addressValue: 'Baneveien 290, 3410 SYLLING',
        addressHint: 'Easy access by car and public transport.',
        hoursLabel: 'Viewings',
        hoursValue: 'By appointment only',
        hoursHint: 'Contact us to schedule a visit to the venue.',
        mapTitle: 'Location',
        mapPillLabel: 'Rønningen',
        mapAddressLine: 'Rønningen Selskapslokale – Baneveien 290, 3410 Sylling',
        ctaRing: 'Call now',
        ctaMail: 'Send email',
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
        formSuccessEmailOnly: 'Thank you — your message was sent by email.',
        formEmailNotifyError:
          'Your message was saved, but we could not send the email notification. We will still see your enquiry in our system.',
        formError: 'Something went wrong. Please try again.',
        formPrivacy: 'We only use your details to answer your enquiry.',
        formErrName: 'Please enter at least two characters.',
        formErrEmail: 'Enter a valid email address.',
        formErrPhone: 'If you add a phone number, use at least 8 digits.',
        formErrMessage: 'Please write at least 10 characters.',
      },
      blogPage: {
        heroEyebrow: 'Journal',
        title: 'Blog',
        comingSoonBadge: 'Coming soon',
        comingSoonTitle: 'Stories from the venue, ongoing',
        comingSoonBody:
          'We are preparing articles about celebrations, seasonal inspiration, and practical tips from Rønningen. Follow along!',
        intro:
          'Ideas for your celebration, practical tips from the venue, and stories from real events — gathered in one place.',
        latestHeading: 'Latest articles',
        latestSub: 'A curated mix of inspiration and know-how from Rønningen.',
        featuredBadge: 'Featured',
        readMore: 'Read more',
        backToBlog: 'Back to blog',
        postImageAlt: 'Article image: {{title}}',
        posts: {
          springWedding: {
            category: 'Weddings',
            date: 'March 2026',
            dateIso: '2026-03-01',
            title: 'Spring light, long evenings, and a venue that adapts to your day',
            excerpt:
              'How we think about flow from ceremony to party — and small details that make the atmosphere feel effortless.',
            body: [
              'Spring at Rønningen is about soft light through tall windows, doors that can open to the garden, and a schedule that does not fight the season. We often start with a calm arrival, time for greetings and photographs, then move guests naturally from one moment to the next.',
              'The building is divided into rooms that can be opened up or closed off, so you can keep dinner intimate and still have space for dancing later. We work with you on sound, lighting and flow so nobody feels rushed from ceremony to toast to party.',
              'Small touches matter: where the cake is placed, how speeches are lit, where older relatives can sit with a clear view and a short path to quiet if they need it. We have hosted enough spring weddings to anticipate the usual pinch points and plan around them.',
              'If you are planning a spring celebration, ask us about timing for outdoor photos, backup plans for rain, and how early we can access the venue for styling. We are happy to shape the day with you — from a tight timeline to a looser, more Mediterranean rhythm.',
            ],
          },
          corporateHost: {
            category: 'Corporate',
            date: 'February 2026',
            dateIso: '2026-02-01',
            title: 'When the brief is tight but the evening should still feel human',
            excerpt:
              'From welcome drink to last song: spaces that work for both focused sessions and relaxed mingling.',
            body: [
              'Corporate events often arrive with a clear agenda: presentations, awards, dinner, maybe entertainment. Our job is to make those beats land while the room still feels like a place people want to stay in, not a conference centre they cannot wait to leave.',
              'We can set one zone for focus — seating, sightlines, sound for speeches — and another for informal conversation, coffee and networking. Moving between them should feel obvious, not like herding.',
              'Catering and bar flow are part of the experience. We coordinate with your suppliers so service does not collide with programme items, and so guests are never stuck hungry while a slide deck runs long.',
              'Tell us the tone you want: celebratory, understated, or somewhere in between. We will align lighting, furniture and timing so the evening matches your brand without feeling stiff.',
            ],
          },
          familyCelebration: {
            category: 'Private',
            date: 'January 2026',
            dateIso: '2026-01-15',
            title: 'Room for every generation — without a one-size-fits-all setup',
            excerpt:
              'Birthdays, confirmations and family milestones: flexible layouts and calm hosting on the day.',
            body: [
              'Family celebrations bring together children, parents and grandparents — each with different needs for noise, seating and meal times. We plan layouts so the youngest have space to move and the eldest are not stranded far from toilets or quiet corners.',
              'You might want a formal sit-down, a buffet, or a mix. Our kitchen and serving areas are set up so food can be staged without disrupting conversation, and dietary needs can be handled discreetly.',
              'Speeches and games are part of the fun; we help with microphones, music and timing so nobody is shouting across the room. If you need a short break between courses for photos or rituals, we build that into the run sheet.',
              'On the day, our team focuses on calm hosting: one point of contact, clear communication with your suppliers, and flexibility when speeches run long or a surprise toast appears. You celebrate; we handle the room.',
            ],
          },
          venueTour: {
            category: 'Practical',
            date: 'December 2025',
            dateIso: '2025-12-01',
            title: 'What to look for on a viewing — questions guests forget to ask',
            excerpt:
              'Parking, timing, sound, catering flow, and rain plans — a short checklist before you decide.',
            body: [
              'A viewing is your chance to test the venue with real questions, not just aesthetics. Start with capacity: not only how many fit legally, but how the room feels when tables, stage and dance floor are in place.',
              'Ask about parking and arrival — especially if many guests drive, or if you expect coaches. Walk the path from car to cloakroom to main room as if you were a guest in heels or with a pushchair.',
              'Sound and light matter for speeches and music. Where can PA and lighting go? Are there noise limits or time restrictions? If you plan a band or DJ, confirm power and load-in.',
              'Finally, ask about rain plans for photos or outdoor moments, catering logistics (kitchen access, waste, timing), and who your contact is on the day. A good venue answers plainly and offers a written overview of what is included.',
            ],
          },
          seasonalGathering: {
            category: 'Seasonal',
            date: 'November 2025',
            dateIso: '2025-11-01',
            title: 'Autumn and winter gatherings with warmth built in',
            excerpt:
              'Lighting, comfort and rhythm through the evening when the days are short and the party is long.',
            body: [
              'When the sun sets early, lighting becomes part of the design. We layer ambient light, pin spots where needed, and softer tones in lounge areas so the room feels warm rather than harsh.',
              'Heating and airflow matter when doors stay closed. We monitor comfort throughout the evening, especially as the dance floor fills and body heat rises.',
              'Seasonal menus and drinks fit naturally — hearty mains, citrus or spice in cocktails, desserts that feel right in cold weather. We align service timing with daylight so guests are not eating in pitch black unless you want that mood.',
              'Long parties need rhythm: peaks of energy and quieter stretches. We help you plan music, breaks and surprises so the last hour feels as intentional as the first.',
            ],
          },
        },
      },
      galleryPage: {
        heroEyebrow: 'Rønningen',
        intro:
          'Moments from weddings, companies, and private celebrations — all hosted here at Rønningen.',
        filterTablistAria: 'Filter gallery by category',
        filterAll: 'All',
        filterWedding: 'Weddings',
        filterCorporate: 'Corporate',
        filterPrivate: 'Private',
        filterFacilities: 'Facilities',
        expandHint: 'Open',
        emptyTitle: 'No images in this category yet',
        emptyBody: 'Try another filter or check back soon.',
        lightboxClose: 'Close',
        lightboxDialog: 'Enlarged image',
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
      },
      faqPage: {
        heroEyebrow: 'Questions & answers',
        intro:
          'Find answers to the most common questions about our venue and services.',
      },
      testimonialsPage: {
        heroEyebrow: 'Guest stories',
        title: 'Testimonials',
        intro:
          'Read what our clients have to say about their experiences at Rønningen Selskapslokale.',
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
        private: 'Selskap',
        packages: 'Pakker',
        prices: 'Priser',
        facilities: 'Fasiliteter',
        gallery: 'Galleri',
        blog: 'Blogg',
        faq: 'FAQ',
        contact: 'Kontakt',
        contactUs: 'Kontakt oss',
        inquiry: 'Forespørsel',
        admin: 'Admin',
        menuLabel: 'Hovedmeny',
        menuOpen: 'Åpne meny',
        menuClose: 'Lukk meny',
        language: 'Språk',
        switchToNorwegian: 'Bytt til norsk',
        switchToEnglish: 'Bytt til engelsk',
        languageNorwegianShort: 'NO',
        languageEnglishShort: 'EN',
        themeSwitchToDark: 'Bytt til mørk modus',
        themeSwitchToLight: 'Bytt til lys modus',
      },
      hero: {
        title: 'Rønningen Selskapslokale',
        subtitle: 'Elegant, personlig og fleksibelt lokale for dine viktigste feiringer.',
        cta: 'Send forespørsel',
        bookNow: 'Book nå',
      },
      homeHero: {
        welcomeLine: 'Velkommen til',
        venueName: 'Rønningen selskapslokale',
        heroImageLightAlt:
          'Lokalets inngang i dagslys med stor blomsterbue over glassdører, grusgård med sitrontrær i terrakottakrukker og skogkledt ås bak bygningen',
        heroImageAlt:
          'Selskapslokale om kvelden med varmt lys, stjernehimmel og feststemning',
        scrollHintAria: 'Rull ned til neste seksjon',
      },
      homeConcepts: {
        heading: 'Våre konsepter',
        items: {
          weddings: {
            title: 'Bryllup',
            description: 'En hel dag tilpasset dere – fra vielse til fest.',
            imgAlt:
              'Brud og brudgom som skjærer bryllupskaken sammen foran høye vinduer med utsikt mot skog',
          },
          corporate: {
            title: 'Bedrift',
            description: 'Konferanser, julebord og sommerfester i gode rammer.',
            imgAlt:
              'Kveldsarrangement ute med gjester som spiller dart ved et trestativ, lysslynger og skog i bakgrunnen',
          },
          private: {
            title: 'Selskap',
            description:
              'Bursdager, konfirmasjoner og jubileer i fleksible og uformelle omgivelser.',
            imgAlt:
              'Gullfarget sekskantet metallramme med ballongkrans i krem, beige og salvi, pampasstrå og mørk blågrønn vegg',
          },
          facilities: {
            title: 'Fasiliteter',
            description: 'Ulike aktiviteter, storkjøkken, bar, dansegulv m.m.',
            imgAlt:
              'Shuffleboard-bord med klyper på blankpolert tre — sosiale aktiviteter innendørs i lokalet',
          },
        },
      },
      homeServices: {
        heading: 'Høydepunkter',
        items: {
          soundLight: {
            title: 'Lyd og lys',
            description:
              'Lydanlegg og belysning tilpasset musikk, taler og arrangement.',
            imgAlt:
              'Selskapslokale med runde festbord i svarte duker, lilla stemningslys mot veggene, høye blomsterdekorasjoner og pent dekkede plasser',
          },
          catering: {
            title: 'Medbrakt',
            description:
              'Tillatt med medbrakt mat og drikke, samt bruk av storkjøkken og catering.',
          },
          barDancefloor: {
            title: 'Bar og dansegulv',
            description:
              'Egen bar og romslig dansegulv for en sosial og livlig kveld.',
            imgAlt:
              'Svart-hvitt bilde av brud og brudgom som danser sammen på et stort gulv, gjester i halvsirkel i et mørkt lokale',
          },
          coordination: {
            title: 'Oppdekking',
            description:
              'Bord, stoler, servise, duker og stoltrekk – klart til bruk eller tilpasset deres stil.',
            imgAlt:
              'Rundt festbord med hvit gulvlang duk og hvite stoltrekk, glass og sølvbestikk, servietter med grønt bånd, og blomsterdekorasjon i myke rosa og hvitt',
          },
          decoration: {
            title: 'Aktiviteter',
            description:
              'Vi har ulike aktiviteter som shuffleboard, dart, poker, airhockey og teambuilding.',
            imgAlt:
              'Shuffleboard-bord med klyper på blankpolert tre — sosiale aktiviteter innendørs i lokalet',
          },
          overnight: {
            title: 'Barnepass',
            description: 'Mulighet for barnepass ved arrangementer etter avtale.',
            imgAlt:
              'Lyst lekerom med leker, lite bord og stort vindu mot grønn hage — barnepass på lokalet',
          },
        },
      },
      homeGallery: {
        heading: 'Inspirasjon',
        ctaFullGallery: 'Se hele galleriet',
      },
      inspirationGallery: {
        slideAlt: 'Bryllupsinspirasjon {{n}}',
        openImageAria: 'Åpne stort bilde: {{description}}',
      },
      homePartners: {
        eyebrow: 'Utvalgte samarbeidspartnere',
        heading: 'Våre partnere',
        intro:
          'Faste samarbeidspartnere innen mat, styling, teknologi og eventstøtte — tilpasset arrangementet deres.',
        listAria: 'Partnerliste',
        websiteLabel: 'Besøk nettside',
        noWebsite: 'Ta kontakt',
        items: {
          cateringKitchen: {
            name: 'Svensefjøset',
            desc: 'Lokalisert i Lierbyen, med fokus på lokale råvarer. Leverer smakfull mat til både små og store arrangementer.',
          },
          flowersDecor: {
            name: 'OsloEvent',
            desc: 'Leverer utstyr og løsninger til arrangementer, fra dekor til praktiske behov.',
          },
          photoVideo: {
            name: 'Villa Boligstyling',
            desc: 'Hjelper med oppdekking og styling av lokalet, tilpasset deres stil og type arrangement.',
          },
          soundLight: {
            name: 'Festpartner',
            desc: 'Utleie av stoltrekk, duker og annet tilbehør for en gjennomført borddekking.',
          },
          barService: {
            name: 'Digilist',
            desc: 'Bookingsystem som gjør det enkelt å håndtere gjestelister, påmeldinger og praktisk planlegging.',
          },
          digilist: {
            name: 'Xala Technologies AS',
            desc: 'Teknologi- og driftsstøtte som bidrar til stabile plattformer og digitale leveranser.',
          },
        },
      },
      weddingsPage: {
        heroImageAlt:
          'Bildekolleksjon av feiringer, detaljer og stemning fra Rønningen',
        heroTitleBefore: 'Bryllup i vakre og ',
        heroTitleAccent: 'unike',
        heroTitleAfter: ' omgivelser',
        heroScrollHintAria: 'Rull ned til atmosfæren',
        atmosphere: {
          headingLine1: 'Vielse og fest',
          headingLine2: '',
          intro1:
            'Samle hele dagen på ett sted – fra vielse til middag og fest. Omgitt av rolige omgivelser i vakker natur, med kort vei mellom seremoni og dans. Lokalet kan tilrettelegges for vielse parallelt med oppdekking av bord. Samtidig vil store grønne arealer fremstå ypperlig for en vielse under åpen himmel.',
          figureAlt:
            'Brud og brudgom som klemmer hverandre om kvelden på en steinlagt sti, gjester i to rekker med tente stjerneskudd langs veien',
        },
        dayTimeline: {
          headingLine1: 'Slik kan',
          headingLine2: 'dagen se ut',
          item1: {
            title: 'Vielse & fotografering',
            desc: 'Omgitt av våre vakre uteområder, samt fossefall i umiddelbar nærhet.',
          },
          item2: {
            title: 'Middag & taler',
            desc: 'Festmiddag med lokale råvarer og god plass til taler og toasts.',
          },
          item3: {
            title: 'Kaffe & dessert',
            desc: 'Kaffe og dessert i rolige fellesområder før kvelden tar over.',
            imgAlt:
              'Sjokoladeglaserte bryllupskaker på trestubber, pyntet med fersk frukt, grønt på bordet og gjester i bakgrunnen',
          },
          item4: {
            title: 'Dans & feiring',
            desc: 'Drikke og dans med god stemning utover kvelden.',
          },
        },
        servicesSection: {
          headingBefore: 'Tilpasset ',
          headingAccent: 'deres',
          headingAfter: ' ønsker',
          items: {
            kitchen: {
              title: 'Storkjøkken & Catering',
              desc: 'Ta med egen mat, eller bruk vårt fullt utstyrte storkjøkken og cateringpartnere.',
              imgAlt: 'Profesjonelt storkjøkken utstyrt til catering og arrangement',
            },
            photography: {
              title: 'Fotografering & Film',
              desc: 'Anbefalte fotografer som kjenner lokalet og fanger øyeblikkene.',
              imgAlt:
                'Brud i hvit kjole og brudgom i mørk dress på mørke steiner foran hverandre ved en lys, fallende foss',
            },
            decoration: {
              title: 'Oppdekking & Dekorasjon',
              desc: 'Fleksible løsninger for borddekking og dekor tilpasset deres stil.',
              imgAlt:
                'Arrangement med kremfargede buer, organisk ballongbue i krem, gull og sort, pampasgress og sjokoladekake på klar sokkel',
            },
            bar: {
              title: 'Bar & Dansegulv',
              desc: 'Ta med egen drikke og nyt barområde og dansegulv.',
              imgAlt:
                'Stort lokale med mørke vegger, lyst polert betonggulv, høye vinduer med snø ute, industrielle taklamper og skjermer på stativ',
            },
            soundLight: {
              title: 'Lyd & Lys',
              desc: 'Lydanlegg og belysning som skaper riktig stemning.',
              imgAlt:
                'Selskapslokale med hvite festbord, lilla og blå scenelys og lysmønster på veggene',
            },
            tableSetting: {
              title: 'Aktiviteter',
              desc: 'Plass til aktiviteter både inne og ute, tilpasset deres arrangement.',
              imgAlt:
                'Selskapslokale med runde bord i mørke duker, hvite tallerkener, glass og blomsterdekorasjoner med lys, store vinduer mot grønt ute',
            },
          },
        },
        packagesSection: {
          heading: 'Våre pakker',
          intro:
            'Tre tydelige pakker som utgangspunkt — ta kontakt, så finner vi dato, tilpasninger og et tilbud som passer deres behov.',
          popularBadge: 'Mest populær',
          ctaQuote: 'Be om tilbud',
          items: {
            basic: {
              name: 'Basis',
              price: 'kr 26 000',
              desc: 'For deg som vil gjøre det meste selv',
              f1: 'Lokalleie',
              f2: 'Parkering',
              f3: 'Uteområde',
            },
            plus: {
              name: 'Plus',
              price: 'Pris etter avtale',
              desc: 'Enklere og mer ferdig løsning',
              f1: 'Alt i Basis',
              f2: 'Oppdekking (bord, stoler, duk, stoltrekk, servietter)',
              f3: 'Tilgang til kjøkken med utstyr og kjølerom',
              f4: 'Lyd og Lys',
              f5: 'Sluttrengjøring',
            },
            premium: {
              name: 'Premium',
              price: 'Pris etter avtale',
              desc: 'Full pakke – vi tar oss av det meste',
              f1: 'Alt i Plus',
              f2: 'Koordinering og planlegging',
              f3: 'Dekorasjon og bordpynt',
              f4: 'Catering & serveringspersonell',
              f5: 'Ekstra tjenester ved behov',
            },
          },
        },
        gallerySection: {
          heading: 'Inspirasjon',
          intro: 'Et lite utvalg fra tidligere bryllup hos oss.',
          ctaFullGallery: 'Se hele galleriet',
        },
        faqSection: {
          headingBefore: 'Ofte stilte ',
          headingAccent: 'spørsmål',
          items: {
            item1: {
              q: 'Tilbyr dere oppdekking og dekorasjon?',
              a: 'Ja, vi tilbyr oppdekking og dekorasjon som kan tilpasses etter deres stil og ønsker.',
            },
            item2: {
              q: 'Kan vi ta med egen mat og drikke?',
              a: 'Ja, dere står fritt til å ta med egen mat og drikke. Samtidig samarbeider vi med lokale cateringsselskaper som kan levere mat og stå for servering dersom dere ønsker en enklere løsning.',
            },
            item3: {
              q: 'Hvor mange gjester er det plass til?',
              a: 'Vi har plass til inntil 300 gjester og muligheter for 200 ekstra i partitelt.',
            },
            item4: {
              q: 'Er det mulig med vielse på lokalet/utendørs?',
              a: 'Absolutt! Vi har flere vakre steder utendørs som egner seg perfekt for vielse, samt gode muligheter for flotte bilder i vakker natur med og nærliggende fossefall.',
            },
            item5: {
              q: 'Når får vi tilgang til lokalet?',
              a: 'Vi er fleksible og gir dere gjerne tilgang før og etter arrangementet for planlegging og gjennomføring. Samtidig tilbyr vi tjenester som gjør at dere kan fokusere på festen og gjestene.',
            },
            item6: {
              q: 'Har dere parkeringsmuligheter og elbillader?',
              a: 'Vi har gode parkeringsmuligheter med god plass til alle gjester. Det er også mulig å lade elbil eller la bilen stå igjen for en enklere og trygg avslutning på kvelden.',
            },
          },
        },
        finalCta: {
          bgImageAlt: 'Bryllup og fest — bakgrunn for kontaktoppfordring',
          headingLine1: 'Skal vi skape',
          headingLine2: 'magi sammen?',
          body: 'Ta gjerne kontakt for en uforpliktende prat eller for å avtale en privat visning av selskapslokalet.',
        },
      },
      corporatePage: {
        heroImageAlt:
          'Dessertbord med små kaker på trestubber, grønt og hvit duk, lyst lokale med høye vinduer og gjester i finstas',
        heroTitleLine1: 'Fra julebord til kick-off.',
        heroTitleLine2Prefix: '',
        heroTitleLine2Accent: 'Alt',
        heroTitleLine2Rest: ' på ett sted.',
        heroTagline:
          'Bedriftsarrangementer som føles gjennomførte, varme og på deres premisser.',
        heroScrollHintAria: 'Rull ned til introduksjonen',
        introSection: {
          figureAlt:
            'Gjester i dresser ved et rundt bord med hvit duk, glass, blomsterdekor og plasskort, store vinduer mot grønt ute',
          headingBefore: 'Der profesjon møter ',
          headingAccent: 'varme',
          intro:
            'Fra faglig innhold til aktiviteter og sosialt samvær – lokalet gir rom for både teambuilding, middag og fest i samme ramme.',
          benefitsEyebrow: 'Tre tydelige fordeler',
          benefits: {
            item1: 'Aktiviteter og teambuilding',
            item2: 'Fleksibelt opplegg',
            item3: 'Sosial avslutning',
          },
        },
        eventsSection: {
          headingBefore: 'Forslag på ',
          headingAccent: 'firmaeventer',
          items: {
            conference: {
              title: 'Konferanse & seminar',
              desc: 'Gode fasiliteter for faglig innhold, med rom for både presentasjoner og pauser i rolige omgivelser.',
              imgAlt: 'Stort konferanse- eller seminarrom klargjort for publikum',
            },
            teambuilding: {
              title: 'Teambuilding',
              desc: 'Skap samhold gjennom aktiviteter og gode opplevelser – både inne og ute, tilpasset deres behov.',
              imgAlt: 'Kollegaer som samarbeider rundt et bord i lyst lokale',
            },
            christmasParty: {
              title: 'Julebord',
              desc: 'Skap en varm julefeiring for kollegaer, venner eller familie, med rom for middag, taler og en hyggelig kveld.',
              imgAlt:
                'Langt festbord med rødrutete duk, lys og dekketallerkener, lyslenker og rød-grønn drapering i taket, juletre og mørke vegger',
            },
            summerParty: {
              title: 'Sommerfest',
              desc: 'Nyt sommeren med kollegaer i åpne og grønne omgivelser, med god plass til både aktiviteter og avslapning.',
              imgAlt:
                'To bilder under hverandre: gjester i finstas som prater innendørs ved tre og glass, og menn i dresser som ler sammen ute ved gjerde og grønn åsside',
            },
            workshopKickoff: {
              title: 'Workshop & kickoff',
              desc: 'Start nye prosjekter eller samle teamet med fokus og energi i inspirerende omgivelser.',
              imgAlt: 'Teamworkshop i moderne kontorlokale med foreleser og deltakere',
            },
            companyDinner: {
              title: 'Firmamiddag',
              desc: 'Inviter til en stilfull middag med gode rammer for både samtaler, feiring og relasjonsbygging.',
              imgAlt: 'Gjester som hever glassene til en skål ved elegant middag',
            },
          },
        },
        gallerySection: {
          heading: 'Inspirasjon',
          slideAlt: 'Stemning fra lokalet {{n}}',
          prevImageAria: 'Forrige bilde',
          nextImageAria: 'Neste bilde',
          openLargeImage: 'Åpne stort bilde: {{caption}}',
          fullGalleryCta: 'Se hele galleriet',
        },
        faqSection: {
          headingBefore: 'Ofte stilte ',
          headingAccent: 'spørsmål',
          items: {
            eventTypes: {
              q: 'Hvilke typer bedriftsarrangement passer?',
              a: 'Vi passer til alt fra konferanser og seminarer til julebord, sommerfester, workshops og firmamiddager. Opplegget tilpasses etter behov.',
            },
            tailored: {
              q: 'Kan opplegget tilpasses?',
              a: 'Ja. Vi tilpasser oppsett, tidspunkt og innhold basert på deres ønsker og type arrangement.',
            },
            viewing: {
              q: 'Kan vi komme på omvisning?',
              a: 'Ja, vi tilbyr private visninger etter avtale. Ta kontakt, så finner vi et tidspunkt som passer.',
            },
            howToInquire: {
              q: 'Hvordan sender vi forespørsel?',
              a: 'Du kan sende oss en e-post eller fylle ut kontaktskjema. Oppgi gjerne dato, antall gjester og type arrangement, så følger vi opp raskt.',
            },
          },
        },
        closingCta: {
          bgImageAlt: 'Bedriftsfeiring på lokalet — bakgrunnsbilde for kontaktoppfordring',
          eyebrow: 'Neste steg',
          headingLine1Before: 'Klar for å ',
          headingLine1Accent: 'planlegge',
          headingLine2: 'bedriftens dag hos oss?',
          body: 'Fortell oss kort hva dere ser for dere, så setter vi sammen et opplegg som passer både team og gjester.',
        },
      },
      pricesPage: {
        heroEyebrow: 'Priser',
        title: 'Våre pakker og tjenester',
        intro: 'Vi skreddersyr riktig pakke etter deres behov',
        bottomCta: {
          heading: 'Spørsmål eller klar for å booke?',
          body: 'Ta kontakt for en uforpliktende prat — vi hjelper med dato, opplegg og tilbud.',
          primary: 'Kontakt oss',
        },
        facilityPricing: {
          heading: 'Fasiliteter og tilleggstjenester',
          intro:
            'Fasiliteter og tjenestene under er en del av det som gjør lokalet komplett for deres dag. Pris for enkelte tjenester avtales nærmere.',
          showMore: 'Vis {{count}} flere',
          showLess: 'Vis færre',
          items: {
            childCare: {
              price: 'Etter avtale',
              note: 'Barnerom etter avtale; barnevakt eller bemanning pristes separat ved bestilling.',
            },
            accommodation: {
              price: 'Etter avtale',
              note: 'Veiledende; avhenger av sesong, romtype og tilgjengelighet.',
            },
            bridalSuite: {
              price: 'Inkludert på bryllupsdagen',
              note: 'Andre arrangementstyper og ekstra netter prises på forespørsel.',
            },
            activities: {
              price: 'Etter avtale',
              note: 'Shuffleboard og spill innendørs ved standard lokalleie.',
            },
            animals: {
              price: 'Inkludert',
              note: 'Besøk til dyr eller bondeprogram som tillegg — pristes sammen med arrangementet.',
            },
            barDanceFloor: {
              price: 'Inkludert',
              note: 'Barområde og dansegulv ved lokalleie.',
            },
            kitchen: {
              price: 'Etter avtale',
              note: 'Fullt utstyrt storkjøkken; tilgang følger pakken (se bryllup/private kort over).',
            },
            universalDesign: {
              price: 'Inkludert',
              note: 'Ett plan og tilgjengelig WC — ingen ekstra fasilitetsavgift.',
            },
            parking: {
              price: 'Inkludert',
              note: 'Gjesteparkering på området; elbillading tilgjengelig.',
            },
            barn: {
              price: 'Fra kr 26 000',
              note: 'Hovedlokale — bryllup Basis; Plus og Premium står i pakkene over.',
            },
          },
        },
      },
      privatePage: {
        heroImageAlt:
          'Bankettsal med runde hvite bord, blomster på bordene, telys og lyslenker i taket mot mørk bakgrunn',
        heroTitleLine1: 'Livets feiringer samlet.',
        heroTitleLine2Prefix: '',
        heroTitleLine2Accent: 'Hos',
        heroTitleLine2Rest: ' oss.',
        heroScrollHintAria: 'Rull ned til introduksjonen',
        introSection: {
          headingBefore: 'Der feiringen får ',
          headingAccent: 'personlighet',
          intro:
            'Bursdag, konfirmasjon, dåp, babyshower og jubileum – samle dere i lokaler som gir rom for deres stil og måte å feire på, uten standardoppsett.',
          panoramaAlt:
            'Kveldsfest i lokalet med langt stearinlysdekket bord, lyslenker i taket, ståbord, trefarget banner i taket, høye glassdører og lite opplyst tre i bakgrunnen',
          highlights: {
            proximity: {
              title: 'Nærhet',
              desc: 'Rom som føles personlige – her handler det om dere og gjestene, ikke standard oppsett.',
            },
            tradition: {
              title: 'Deres tradisjon',
              desc: 'Arrangementet formes etter deres ønsker, familie og tradisjoner – uten faste rammer.',
            },
            gathered: {
              title: 'Samlet på ett sted',
              desc: 'Alt skjer på ett sted, fra start til slutt – mindre stress, mer tid til å være sammen.',
            },
          },
        },
        eventsSection: {
          headingBefore: 'Anledninger som ',
          headingAccent: 'egner seg hos oss',
          items: {
            birthday: {
              title: 'Bursdag',
              desc: 'Feir dagen med venner og familie i gode omgivelser, med plass til både middag og fest.',
              imgAlt:
                'Dessertbord med rosa etasjekake, cupcakes, godteriglass, ballonger og lys mot en mørk vegg',
            },
            confirmation: {
              title: 'Konfirmasjon',
              desc: 'En viktig dag samlet på ett sted, med rom for både det formelle og det sosiale.',
              imgAlt:
                'Lyst selskapslokale med hvite duker og stoler, rosa og hvite blomster på bordene, mørke vegger og sollys gjennom store vinduer mot grønt ute',
            },
            baptismNaming: {
              title: 'Dåp & navnefest',
              desc: 'Rolige og fine rammer for en personlig markering med familie og nære.',
              imgAlt:
                'Runde bord med hvite duker, brettede servietter, plasskort, rosa ballongdekorasjoner og glass i lyst lokale med store vinduer mot grønt ute',
            },
            babyShower: {
              title: 'Babyshower',
              desc: 'Feir den kommende babyen med venner og familie – med plass til leker, taler, kake og en koselig markering i trygge og hyggelige rammer.',
              imgAlt:
                'Nærbilde av en ballongbue i pastellfarger til en feiring',
            },
            anniversary: {
              title: 'Jubileum',
              desc: 'Marker store og små milepæler med en kveld som samler folk og skaper gode minner.',
              imgAlt:
                'Store opplyste bokstaver som staver MR & MRS på blankt gulv foran høye vinduer med utsikt mot trær og grønne åser',
            },
            memorial: {
              title: 'Minnestund',
              desc: 'Rolige og verdige rammer for å samle familie og venner i sorg – med plass til taler, kransenedleggelse og stille samvær.',
              imgAlt: 'Hvite roser og tente lys i en rolig og respektfull stemning',
            },
          },
        },
        gallerySection: {
          heading: 'Inspirasjon',
          slideAlt: 'Stemning fra lokalet {{n}}',
          prevImageAria: 'Forrige bilde',
          nextImageAria: 'Neste bilde',
          openLargeImage: 'Åpne stort bilde: {{caption}}',
          fullGalleryCta: 'Se hele galleriet',
        },
        faqSection: {
          headingBefore: 'Ofte stilte ',
          headingAccent: 'spørsmål',
          items: {
            celebrations: {
              q: 'Hvilke private feiringer kan vi ha hos dere?',
              a: 'Alt fra bursdager og konfirmasjoner til dåp, babyshower og jubileer. Opplegget tilpasses etter type feiring.',
            },
            ownFoodDrink: {
              q: 'Kan vi ta med egen mat og drikke?',
              a: 'Ja, dere står fritt til det. Vi samarbeider også med cateringleverandører som kan levere mat og servering.',
            },
            capacity: {
              q: 'Passer det for både små og store selskap?',
              a: 'Ja. Lokalet fungerer godt for både mindre og større grupper, med fleksible oppsett.',
            },
            howToBook: {
              q: 'Hvordan booker vi?',
              a: 'Send oss en forespørsel med dato, antall gjester og type arrangement, så tar vi det derfra.',
            },
          },
        },
        closingCta: {
          bgImageAlt: 'Privat feiring på lokalet — bakgrunnsbilde for kontaktoppfordring',
          headingLine1Before: 'Lyst til å ',
          headingLine1Accent: 'planlegge',
          headingLine2: 'feiringen hos oss?',
          body: 'Fortell kort hva dere skal feire og når, så foreslår vi en ramme og et opplegg som passer dere og gjestene.',
        },
      },
      facilitiesPage: {
        heroImageAlt:
          'Shuffleboard-bord med klyper på blankpolert tre — sosiale aktiviteter innendørs i lokalet',
        heroTitleLine1: 'Alt på ett sted.',
        heroTitleLine2Prefix: 'For ',
        heroTitleLine2Accent: 'hele feiringen',
        heroTitleLine2Rest: '.',
        heroTagline:
          'Barnepass, kjøkken, overnatting og gode fasiliteter – alt dere trenger samlet på ett sted.',
        heroScrollHintAria: 'Rull ned til introduksjonen',
        introCardsSection: {
          headingBefore: 'Fra forberedelser til siste dans — ',
          headingAccent: 'én plass, mange muligheter.',
          scrollHintDesktop: 'Piler eller sveip',
          scrollHintMobile: 'Sveip',
          prevAria: 'Forrige fasiliteter',
          nextAria: 'Neste fasiliteter',
          items: {
            childCare: {
              title: 'Barnepass',
              desc: 'Trygge løsninger for de minste, slik at foreldre kan slappe av og være til stede i feiringen.',
              imgAlt:
                'Lyst lekerom med leker, lite bord og stort vindu mot grønn hage — barnepass på lokalet',
            },
            accommodation: {
              title: 'Overnatting',
              desc: 'Mulighet for overnatting for gjester som kommer langveisfra – enkelt å samle hele helgen på ett sted.',
              imgAlt:
                'Oppholdsrom for gjester med sofa, TV, tregulv og høye vinduer — utsikt til trær og norsk flagg ute',
            },
            bridalSuite: {
              title: 'Brudesuite',
              desc: 'Et eget rom for forberedelser og rolige øyeblikk før vielse og fest.',
              imgAlt:
                'Soverom under skråtak med hvitt paneltak, mørkegrå vegger, polstret seng og flettet takpendel',
            },
            activities: {
              title: 'Aktiviteter',
              desc: 'Muligheter for aktiviteter både inne og ute, som gir pauser og variasjon gjennom dagen.',
              imgAlt: 'Shuffleboard-bord med klyper — spill og aktiviteter innendørs',
            },
            animals: {
              title: 'Samvær med dyr',
              desc: 'Nærhet til dyr og uteområder gir en rolig og unik ramme rundt arrangementet.',
              imgAlt:
                'Hvite geiter ved grå trehus på en gressbakke med grønne åser i bakgrunnen',
            },
            barDanceFloor: {
              title: 'Bar & dansegulv',
              desc: 'Naturlig overgang fra middag til fest, med plass til musikk, taler og dans.',
              imgAlt:
                'Selskapslokale med bar, ståbord, drapert tak og høye vinduer mot grønn hage',
            },
            kitchen: {
              title: 'Storkjøkken',
              desc: 'Fullt utstyrt kjøkken som gjør det enkelt for catering og servering.',
              imgAlt:
                'Storkjøkken med rustfrie benker, kombidampovn, stor ventilasjonshette og arbeidsstasjoner',
            },
            universalDesign: {
              title: 'Universelt utformet',
              desc: 'Alt på samme plan med tilgang til HC-toalett. Tilrettelagt slik at alle gjester kan delta og føle seg velkomne.',
              imgAlt:
                'Skilt for tilgjengelig HC-toalett (rullestolsymbol)',
            },
            parking: {
              title: 'Parkering',
              desc: 'God plass til parkering, med mulighet for elbillading og å la bilen stå igjen.',
              imgAlt:
                'Turbusser på grusparkering med skog i bakgrunnen — plass til at store grupper kan komme med buss',
            },
            barn: {
              title: 'Selskapslokale',
              desc: 'Hovedrommet med god plass til middag, taler og fest – alt samlet på ett sted.',
              imgAlt:
                'Luftfoto av tunet — hovedbygg, hvitt gjestehus med basseng, rødt driftsbygg, langbord ute, grusveier, norsk flagg og skogkledde åser',
            },
          },
        },
        useCasesSection: {
          headingBefore: 'Slik kan fasilitetene ',
          headingAccent: 'brukes i praksis',
          items: {
            familyCelebration: {
              title: 'Familiefeiring',
              desc: 'Samle familie og venner til en helhetlig feiring med god tid til både måltid, samvær og ro.',
              imgAlt:
                'Stor gjeng i festantrekk på terrassen foran det moderne lokalet med glassfasade — landskap i bakgrunnen',
            },
            weddingWeekend: {
              title: 'Bryllupshelg',
              desc: 'Feir over flere dager med vielse, middag, fest og overnatting samlet på ett sted.',
              imgAlt:
                'Klassisk grønn Mini med bryllupspynt — vimpelrekke i bakruten og boksar på snorer, parkert på grusvei på landet',
            },
            corporateEvening: {
              title: 'Bedriftskveld',
              desc: 'Start med faglig innhold eller middag, og avslutt kvelden med sosialt samvær og fest.',
              imgAlt:
                'Bankettsal dekket til middag — runde bord med hvite duker, lys og grønt, høye vinduer og skilt med stedsnavn bakerst i rommet',
            },
            outdoorsIndoors: {
              title: 'Ute og inne',
              desc: 'Kombiner uteområder og lokalet gjennom dagen – fra aktivitet og mingling til middag og fest.',
              imgAlt:
                'Foss over mørke bergvegger ned i badekulpe med en person i vannet — friluft og natur',
            },
            weekendGuests: {
              title: 'Helg med gjester',
              desc: 'La gjestene bli over, og skap en avslappet helg med mer tid sammen.',
              imgAlt:
                'Lyst oppholdsrom med sittegruppe og TV — komfortabelt for gjester som blir over',
            },
            livelyEvening: {
              title: 'Kveld med puls',
              desc: 'Fra middag til musikk og dans – en kveld med god energi og liv i lokalet.',
              imgAlt:
                'Lyst selskapslokale med bar, ståbord og utsikt mot hage — rom for fest og dans',
            },
          },
        },
        gallerySection: {
          heading: 'Fasiliteter i bilder',
          intro: 'Et lite innblikk i rom, stemning og muligheter hos oss.',
          imageAlt: 'Galleribilde {{number}}',
          openLargeImageAria: 'Åpne stort bilde: {{alt}}',
          fullGalleryCta: 'Se hele galleriet',
        },
        faqSection: {
          headingBefore: 'Ofte stilte ',
          headingAccent: 'spørsmål',
          items: {
            combineFacilities: {
              q: 'Kan vi kombinere flere fasiliteter i samme opplegg?',
              a: 'Ja. Vi setter sammen et løp som passer dagen deres, og kombinerer fasiliteter etter behov og budsjett.',
            },
            universalDesign: {
              q: 'Er lokalet universelt utformet?',
              a: 'Ja, lokalet er tilrettelagt med alt på ett plan og tilgang til HC-toalett, slik at alle gjester kan delta og føle seg velkomne.',
            },
            parkingCharging: {
              q: 'Har dere parkering og lademuligheter?',
              a: 'Ja, vi har gratis parkering og mulighet til å lade. Det kan også avtales å la bilen stå igjen.',
            },
            howToBook: {
              q: 'Hvordan booker vi fasiliteter hos dere?',
              a: 'Send forespørsel med dato, type arrangement og antall gjester. Vi følger opp med forslag.',
            },
          },
        },
        closingCta: {
          eyebrow: 'Fasiliteter',
          headingLine1Before: 'Klar for å se hva som',
          headingLine1Accent: 'passer deres dag?',
          body: 'Fortell oss hva dere planlegger, så setter vi sammen et opplegg med riktige fasiliteter.',
          ctaSecondary: 'Se kontakt',
        },
      },
      branding: {
        navLine1: 'RØNNINGEN',
        navLine2: 'Selskapslokale'
      },
      common: {
        redirectingBooking: 'Sender deg til booking …',
      },
      chat: {
        openAssistant: 'Åpne kundehjelp',
        closeAssistant: 'Lukk kundehjelp',
        launcherTitle: 'Kundehjelp — norsk eller engelsk',
        panelEyebrow: 'Kundehjelp',
        panelHeading: 'Rønningen selskapslokale — kundehjelp',
        panelBadge: 'Kundehjelp',
        panelTitle: 'Rønningen Selskapslokale',
        panelHint: 'Generell veiledning — kontakt oss for tilbud og bindende avtaler',
        welcomeMessage:
          'Hei. Velkommen til Rønningen Selskapslokale. Jeg kan hjelpe deg med generelle spørsmål om lokalet. For tilbud, datoer og konkrete avtaler, bruk kontaktlenken under eller ta kontakt med oss direkte.',
        sendMessage: 'Send melding',
        directContact: 'Kontakt oss direkte',
      },
      footer: {
        brandSubtitle: 'Selskapslokale',
        rights: 'Alle rettigheter reservert',
        contact: 'Kontakt oss',
        iconNavAriaLabel: 'Sosiale medier',
        newsletter: 'Nyhetsbrev',
        newsletterDesc: 'Hold deg oppdatert på arrangementer og nyheter.',
        emailPlaceholder: 'Din e-post',
        newsletterCta: 'Meld meg på',
        developedBy: 'Utviklet av:',
        xalaLinkAria: 'Xala — xala.no (åpnes i ny fane)',
        openInMapsAria: 'Åpne {{address}} i Google Maps (åpnes i ny fane)',
      },
      contactPage: {
        intro:
          'Få en omvisning helt uforpliktende - i dag!',
        sectionHeading: 'Slik når dere oss',
        phoneLabel: 'Telefon',
        phoneValue: '+47 96 66 50 01',
        phoneHint: 'Man–fre 09:00–17:00',
        emailLabel: 'E-post',
        emailValue: 'post@ronningenselskapslokale.no',
        emailHint: 'Vi svarer vanligvis innen én virkedag.',
        addressLabel: 'Adresse',
        addressValue: 'Baneveien 290, 3410 SYLLING',
        addressHint: 'God adkomst med bil og kollektivt.',
        hoursLabel: 'Omvisning',
        hoursValue: 'Kun etter avtale',
        hoursHint: 'Ta kontakt for å avtale visning på gården.',
        mapTitle: 'Her finner dere oss',
        mapPillLabel: 'Rønningen',
        mapAddressLine: 'Rønningen Selskapslokale – Baneveien 290, 3410 Sylling',
        ctaRing: 'Ring nå',
        ctaMail: 'Send e-post',
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
        formSuccessEmailOnly: 'Takk — meldingen er sendt på e-post.',
        formEmailNotifyError:
          'Meldingen ble lagret, men e-postvarselet kunne ikke sendes. Vi ser fortsatt henvendelsen i systemet vårt.',
        formError: 'Noe gikk galt. Prøv igjen.',
        formPrivacy: 'Vi bruker bare opplysningene til å svare på henvendelsen.',
        formErrName: 'Skriv inn minst to tegn.',
        formErrEmail: 'Oppgi en gyldig e-postadresse.',
        formErrPhone: 'Hvis du fyller inn telefon, bruk minst 8 siffer.',
        formErrMessage: 'Skriv minst 10 tegn.',
      },
      blogPage: {
        heroEyebrow: 'Journal',
        title: 'Blogg',
        comingSoonBadge: 'Kommer snart',
        comingSoonTitle: 'Historier fra lokalet kommer fortløpende',
        comingSoonBody:
          'Vi jobber med artikler om feiringer, sesonginspirasjon og praktiske tips fra Rønningen. Følg med!',
        intro:
          'Ideer til feiringen, praktiske tips fra lokalet og historier fra ekte arrangementer — samlet på ett sted.',
        latestHeading: 'Siste artikler',
        latestSub: 'Et utvalg av inspirasjon og faglig stoff fra Rønningen.',
        featuredBadge: 'Utvalgt',
        readMore: 'Les mer',
        backToBlog: 'Tilbake til bloggen',
        postImageAlt: 'Artikkelbilde: {{title}}',
        posts: {
          springWedding: {
            category: 'Bryllup',
            date: 'mars 2026',
            dateIso: '2026-03-01',
            title: 'Vårlys, lange kvelder og et lokale som tilpasses deres dag',
            excerpt:
              'Hvordan vi tenker på flyt fra vielse til fest — og små detaljer som gjør stemningen enkel og helhetlig.',
            body: [
              'Vår på Rønningen handler om mykt lys i høye vinduer, dører som kan stå åpne mot hagen og et tidsskjema som ikke kjemper mot årstiden. Vi starter gjerne med en rolig ankomst, tid til hilsener og bilder, og flytter gjestene naturlig fra ett øyeblikk til det neste.',
              'Bygget er delt i rom som kan åpnes eller lukkes, så dere kan ha en intim middag og likevel plass til dans senere. Vi jobber med dere om lyd, lys og flyt, slik at ingen føler seg jaget fra vielse til tale til fest.',
              'Små grep teller: hvor kaken står, hvordan taler lyssettes, hvor eldre slektninger kan sitte med god oversikt og kort vei til ro hvis de trenger det. Vi har arrangert nok vårbryllup til å forutse de vanlige knepunktene og planlegge rundt dem.',
              'Planlegger dere vårfeiring, spør oss om tidspunkt for bilder utendørs, reserveplan ved regn, og hvor tidlig dere kan få tilgang til lokalet for styling. Vi hjelper dere gjerne å forme dagen — fra stramt program til en løsere, mer sørlig rytme.',
            ],
          },
          corporateHost: {
            category: 'Bedrift',
            date: 'februar 2026',
            dateIso: '2026-02-01',
            title: 'Når briefen er stram, men kvelden skal føles menneskelig',
            excerpt:
              'Fra velkomstdrink til siste sang: rom som fungerer til både fokus og uformelt samvær.',
            body: [
              'Bedriftsarrangement kommer ofte med tydelig program: presentasjoner, prisutdeling, middag, kanskje underholdning. Vår oppgave er at punktene sitter, samtidig som rommet føles som et sted folk vil være — ikke et konferansesenter de vil ut av.',
              'Vi kan ha én sone for fokus — sitteplasser, siktlinjer, lyd til taler — og en annen for uformelt samvær, kaffe og nettverk. Overgangen skal føles naturlig, ikke som gjeting.',
              'Catering og barflyt er en del av opplevelsen. Vi koordinerer med leverandørene slik at servering ikke kolliderer med programpunkter, og at gjestene ikke står sultne mens en presentasjon drar ut.',
              'Fortell oss tonen dere ønsker: festlig, diskret, eller midt imellom. Vi tilpasser lys, møbler og timing slik at kvelden matcher merkevaren uten å bli stiv.',
            ],
          },
          familyCelebration: {
            category: 'Privat',
            date: 'januar 2026',
            dateIso: '2026-01-15',
            title: 'Plass til hver generasjon — uten standardoppsett for alle',
            excerpt:
              'Bursdag, konfirmasjon og milepæler i familien: fleksible løsninger og rolig vertskap på dagen.',
            body: [
              'Familiefester samler barn, foreldre og besteforeldre — med ulike behov for lyd, sitteplasser og måltider. Vi planlegger oppsett slik at de minste har rom å bevege seg på, og de eldste ikke står langt fra toalett eller en rolig krok.',
              'Dere kan ønske formell langbordsmiddag, buffet eller en miks. Kjøkken og serveringsområder er lagt opp slik at mat kan settes inn uten å ødelegge samtalen, og kosthold kan håndteres diskret.',
              'Taler og leker hører med; vi bistår med mikrofon, musikk og timing slik at ingen trenger å rope over bordet. Om dere trenger pause mellom retter til bilder eller tradisjoner, bygger vi det inn i kjøreplanen.',
              'På selve dagen er fokus rolig vertskap: ett kontaktpunkt, tydelig dialog med leverandører, og fleksibilitet når taler drar ut eller en overraskelse dukker opp. Dere feirer; vi tar oss av rommet.',
            ],
          },
          venueTour: {
            category: 'Praktisk',
            date: 'desember 2025',
            dateIso: '2025-12-01',
            title: 'Hva dere bør se etter på omvisning — spørsmål mange glemmer',
            excerpt:
              'Parkering, tidspunkt, lyd, cateringflyt og regnvær — en kort sjekkliste før dere bestemmer dere.',
            body: [
              'Omvisning er sjansen til å teste lokalet med ekte spørsmål, ikke bare utseende. Start med kapasitet: ikke bare hvor mange som er tillatt, men hvordan rommet føles når bord, scene og dansegulv står på plass.',
              'Spør om parkering og ankomst — særlig om mange kjører, eller dere forventer buss. Gå ruten fra bil til garderobe til hovedrom som om dere var gjest med hæler eller barnevogn.',
              'Lyd og lys betyr noe for taler og musikk. Hvor kan PA og lys settes? Finnes det støygrenser eller tidsbegrensninger? Om dere skal ha band eller DJ, bekreft strøm og rigg.',
              'Til slutt: spør om regnvær for bilder eller uteøyeblikk, cateringlogistikk (kjøkkenadgang, avfall, timing), og hvem som er kontakt på dagen. Et godt lokale svarer tydelig og kan gi en skriftlig oversikt over hva som inngår.',
            ],
          },
          seasonalGathering: {
            category: 'Sesong',
            date: 'november 2025',
            dateIso: '2025-11-01',
            title: 'Høst- og vinterfeiring med varme i rammene',
            excerpt:
              'Lys, komfort og rytme gjennom kvelden når dagene er korte og festen skal vare lenge.',
            body: [
              'Når sola går tidlig, blir lys en del av uttrykket. Vi bygger lag med stemningslys, spot der det trengs, og mykere soner i sittegrupper slik at rommet føles varmt, ikke sterilt.',
              'Oppvarming og luftsirkulasjon betyr noe når dører forblir lukket. Vi følger med på komfort utover kvelden, særlig når dansegulvet fylles og kroppsvarmen stiger.',
              'Sesongbasert mat og drikke passer naturlig — kraftige hovedretter, sitrus eller krydder i drinker, desserter som passer i kald årstid. Vi tilpasser servering til dagslys slik at gjestene ikke spiser i stummende mørke med mindre dere ønsker nettopp den stemningen.',
              'Lange fester trenger rytme: topper av energi og rolige partier. Vi hjelper dere å planlegge musikk, pauser og overraskelser slik at siste time føles like gjennomtenkt som den første.',
            ],
          },
        },
      },
      galleryPage: {
        heroEyebrow: 'Rønningen',
        intro:
          'Øyeblikk fra bryllup, bedrift og private feiringer — alt på Rønningen.',
        filterTablistAria: 'Filtrer galleriet etter kategori',
        filterAll: 'Alle',
        filterWedding: 'Bryllup',
        filterCorporate: 'Bedrift',
        filterPrivate: 'Selskap',
        filterFacilities: 'Fasiliteter',
        expandHint: 'Åpne',
        emptyTitle: 'Ingen bilder i denne kategorien ennå',
        emptyBody: 'Prøv et annet filter eller kom tilbake senere.',
        lightboxClose: 'Lukk',
        lightboxDialog: 'Forstørret bilde',
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
      },
      faqPage: {
        heroEyebrow: 'Spørsmål og svar',
        intro:
          'Svar på de vanligste spørsmålene om lokalet og tjenestene våre.',
      },
      testimonialsPage: {
        heroEyebrow: 'Historier fra gjester',
        title: 'Anbefalinger',
        intro:
          'Dette sier noen av gjestene våre om opplevelsen på Rønningen selskapslokale.',
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
