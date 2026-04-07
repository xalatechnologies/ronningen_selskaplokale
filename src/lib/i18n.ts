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
        blog: 'Blog',
        faq: 'FAQ',
        contact: 'Contact',
        inquiry: 'Inquiry',
        admin: 'Admin'
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
        tagline: 'Everything you need for a celebration to remember.',
        heroImageAlt:
          'Event venue at night with warm lighting, a starry sky, and a festive atmosphere',
        scrollHintAria: 'Scroll down to our concepts',
      },
      homeConcepts: {
        heading: 'Our concepts',
        intro: 'Where the best celebrations begin — surrounded by nature.',
        items: {
          weddings: {
            title: 'Weddings',
            description:
              'A full day tailored to you — from ceremony to celebration.',
            imgAlt:
              'Bride and groom dancing together as red and gold confetti falls in a bright reception hall',
          },
          corporate: {
            title: 'Corporate events',
            description:
              'Conferences, Christmas parties and summer parties in a great setting.',
          },
          private: {
            title: 'Private parties',
            description:
              'Birthdays, confirmations and anniversaries in flexible, informal surroundings.',
          },
          facilities: {
            title: 'Facilities',
            description:
              'Everything in one place — kitchen, dance floor, parking and outdoor areas.',
          },
        },
      },
      homeServices: {
        heading: 'Exclusive services',
        items: {
          soundLight: {
            title: 'Sound & lighting',
            description:
              'Powerful sound and lighting that sets the right mood from start to finish.',
          },
          catering: {
            title: 'Catering & service',
            description:
              'Bring your own food, or use our partners for catering and service tailored to your event.',
          },
          barDancefloor: {
            title: 'Bar & dance floor',
            description:
              'Bring your own drinks and enjoy the evening with music and dancing in a great setting.',
          },
          coordination: {
            title: 'Time with the animals',
            description:
              'Get close to the animals on the estate — a memorable touch for guests young and old.',
          },
          decoration: {
            title: 'Decoration & photography',
            description:
              'Create the right atmosphere with décor in your style, and optional photographers to capture the day.',
          },
          overnight: {
            title: 'Accommodation & childcare',
            description:
              'Overnight stays and childcare can be arranged — ideal for guests travelling from afar and families with young children.',
          },
        },
      },
      homeGallery: {
        heading: 'Inspiration',
        intro:
          'A selection of moments from real celebrations — inspiration for your own event.',
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
        noWebsite: 'Contact us for details',
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
          xala: {
            name: 'Funny Balloons Drammen',
            desc: 'Balloon decor and festive details that elevate visual expression in your event space.',
          },
        },
      },
      weddingsPage: {
        heroImageAlt:
          'Photo collage of celebrations, details and atmosphere at Rønningen',
        heroTitleLine1: 'Weddings in beautiful,',
        heroTitleLine2Accent: 'unique',
        heroTitleLine2Rest: ' surroundings',
        heroTagline: 'Create a celebration that feels personal, warm, and unforgettable.',
        heroScrollHintAria: 'Scroll down to the atmosphere section',
        atmosphere: {
          headingLine1: 'Ceremony and celebration',
          headingLine2: 'in one place',
          intro1:
            'Bring the whole day together in one place — from ceremony to dinner and the party. Surrounded by calm, beautiful nature, with only a short distance between the vows and the dance floor.',
          figureAlt:
            'Wedding rings and lace gown detail beside bride and groom dancing at a reception with guests under warm string lights',
          why: {
            item1: {
              title: 'Atmosphere',
              desc: 'A polished venue with warm details and a great sense of space — a setting that works as well for intimate gatherings as for larger celebrations.',
            },
            item2: {
              title: 'Surroundings',
              desc: 'Nature on the doorstep, peaceful grounds, outdoor areas, and nearby spots that add an extra dimension to your day.',
            },
            item3: {
              title: 'Flexibility',
              desc: 'Shape the day your way. The space adapts to your format, layout, and style.',
            },
            item4: {
              title: 'Easy to host',
              desc: 'We make the practical side run smoothly so you can focus on your guests and the experience — not the logistics.',
            },
          },
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
          },
          item4: {
            title: 'Dancing & celebration',
            desc: 'Drinks and dancing with great energy into the night.',
          },
        },
        servicesSection: {
          headingBefore: 'Tailored to your ',
          headingAccent: 'wishes',
          items: {
            kitchen: {
              title: 'Commercial kitchen & catering',
              desc: 'You are welcome to bring your own food or use our fully equipped commercial kitchen.\n\nWe also work with local caterers who can deliver ready-made meals, or cook on site with experienced chefs and serving staff.',
              imgAlt: 'Professional commercial kitchen equipped for catering and events',
            },
            photography: {
              title: 'Photography',
              desc: 'Recommended photographers who know the light and spaces here — from portraits and ceremony to the reception and small moments you will want to remember.',
              imgAlt:
                'Bride and groom on rocks in front of a waterfall in a forested mountain landscape',
            },
            decoration: {
              title: 'Decoration',
              desc: 'Flexible decor options adapted to your style and expression. Together with our partners we can create a cohesive atmosphere — from table details to styling the entire venue.',
              imgAlt:
                'Outdoor wedding table with pink and white roses, draped chairs, and a floral arch by the water at golden hour',
            },
            bar: {
              title: 'Bar & dance floor',
              desc: 'You may bring your own drinks and use the bar area. With a dedicated dance floor, everything is set for a great atmosphere all evening.',
              imgAlt: 'Evening celebration with bar atmosphere and dance floor',
            },
            soundLight: {
              title: 'Sound & lighting',
              desc: 'A powerful sound system suited to parties and music, combined with lighting that creates the right mood throughout your event.',
              imgAlt:
                'Banquet hall with white table settings, purple and blue stage lighting, and projections on the walls',
            },
            tableSetting: {
              title: 'Table settings & styling',
              desc: 'Fully dressed tables with linens, chair covers, crockery, glassware, and everything you need — plus table decor, menu cards, and details that tie it all together. We align the look with the style of your day so guests meet complete tables from the very first moment.',
              imgAlt:
                'Luxury long dining table with champagne velvet linen, beaded chargers, floral centerpieces, taper candles, and plum glassware in daylight',
            },
          },
        },
        packagesSection: {
          heading: 'Our packages',
          intro:
            'Three clear packages as a starting point — get in touch and we will find a date, adjustments, and a quote that suits your wedding day.',
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
              price: 'NOK 33,000',
              desc: 'A simpler, more ready-made option',
              f1: 'Everything in Basic',
              f2: 'Table setting (tables, chairs, linen, chair covers, napkins)',
              f3: 'Kitchen access with equipment and cold storage',
              f4: 'Extra time before or after your event',
            },
            premium: {
              name: 'Premium',
              price: 'NOK 44,000',
              desc: 'Full package — we take care of most of the details',
              f1: 'Everything in Plus',
              f2: 'Coordination and planning',
              f3: 'Sound system',
              f4: 'Final cleaning',
              f5: 'Decoration and table styling',
              f6: '1 serving staff member',
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
              q: 'Do you offer accommodation?',
              a: 'We offer accommodation in our own flats, as well as options connected to the venue. This can be rented separately according to your needs.',
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
          'Corporate meeting and conference — team collaboration in a professional event setting',
        heroTitleLine1: 'From Christmas parties to kick-offs.',
        heroTitleLine2Prefix: '',
        heroTitleLine2Accent: 'All',
        heroTitleLine2Rest: ' in one place.',
        heroTagline:
          'Host corporate events that feel organised, welcoming, and firmly on brief.',
        heroScrollHintAria: 'Scroll down to the introduction',
        introSection: {
          figureAlt:
            'Event venue with warm light and tables set for a celebration — atmosphere suited to corporate events at Rønningen',
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
            },
            teambuilding: {
              title: 'Team building',
              desc: 'Build cohesion through activities and memorable experiences — indoors and outdoors, tailored to your needs.',
            },
            christmasParty: {
              title: 'Christmas party',
              desc: 'Bring colleagues together for a warm evening with great atmosphere, food, and celebration in cosy surroundings.',
            },
            summerParty: {
              title: 'Summer party',
              desc: 'Enjoy summer with colleagues in open, green surroundings, with plenty of space for both activities and downtime.',
            },
            workshopKickoff: {
              title: 'Workshop & kick-off',
              desc: 'Launch new projects or bring the team together with focus and energy in inspiring surroundings.',
            },
            companyDinner: {
              title: 'Company dinner',
              desc: 'Host a stylish dinner with a setting suited to conversation, celebration, and relationship-building.',
            },
          },
        },
        packagesSection: {
          heading: 'Our corporate packages',
          intro:
            'Choose from three corporate options — in conversation we clarify your needs, guest count, date, and practical details, and put together a proposal that suits you.',
          featuredBadge: 'Most popular',
          requestQuote: 'Request a quote',
          items: {
            venueRental: {
              name: 'Venue hire',
              price: 'On request',
              detail: 'Quote after conversation',
              fit: 'You manage suppliers yourself.',
              bullet1: 'Exclusive use of agreed spaces',
              bullet2: 'Basic tables and chairs',
              bullet3: 'Agreed timeframe',
            },
            flexiblePackage: {
              name: 'Flexible package',
              price: 'On request',
              detail: 'Tailored to needs',
              fit: 'Venue plus selected support from us.',
              bullet1: 'Tailored setup and plan',
              bullet2: 'Coordination with us',
              bullet3: 'Can be expanded',
            },
            bespoke: {
              name: 'Bespoke',
              price: 'Individually priced',
              detail: 'By scope',
              fit: 'The whole journey from idea to delivery.',
              bullet1: 'Dialogue on concept and budget',
              bullet2: 'Collaboration with suppliers',
              bullet3: 'On-the-day follow-up',
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
      privatePage: {
        heroImageAlt:
          'Private celebration and gathering — warm venue atmosphere for birthdays, confirmations, and family events',
        heroTitleLine1: "Life's celebrations, gathered.",
        heroTitleLine2Prefix: '',
        heroTitleLine2Accent: 'With',
        heroTitleLine2Rest: ' us.',
        heroScrollHintAria: 'Scroll down to the introduction',
        introSection: {
          headingBefore: 'Where your celebration gains ',
          headingAccent: 'personality',
          intro:
            'Birthdays, confirmations, baptisms, memorial gatherings and anniversaries — gather in spaces that leave room for your style and how you celebrate, without a standard package setup.',
          panoramaAlt: 'Celebration atmosphere and set tables in the venue',
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
          headingBefore: 'Occasions we often ',
          headingAccent: 'create together',
          intro:
            'From birthdays and confirmations to baptisms, memorial gatherings and anniversaries — we tailor the programme together with you.',
          items: {
            birthday: {
              title: 'Birthday',
              desc: 'Celebrate the day with friends and family in a great setting, with room for both dinner and a party.',
            },
            confirmation: {
              title: 'Confirmation',
              desc: 'An important day gathered in one place, with room for both the formal parts and the social side.',
            },
            baptismNaming: {
              title: 'Baptism & naming day',
              desc: 'Calm, beautiful surroundings for a personal celebration with family and those closest to you.',
            },
            memorial: {
              title: 'Memorial gathering',
              desc: 'A safe, dignified place to come together, with a focus on calm, closeness and good conversation.',
            },
            anniversary: {
              title: 'Anniversary',
              desc: 'Mark big and small milestones with an evening that brings people together and creates lasting memories.',
            },
            gathering: {
              title: 'Gatherings & mingling',
              desc: 'Informal get-togethers with an easy flow, where guests can move freely and enjoy the evening.',
            },
          },
        },
        packagesSection: {
          heading: 'Our private packages',
          intro:
            'Choose from three options. We tailor to your celebration, guests and wishes — straightforward and with no obligation.',
          featuredBadge: 'Most popular',
          requestQuote: 'Request a quote',
          priceNote: 'Prices are indicative — final quote after a conversation.',
          items: {
            venueRental: {
              name: 'Venue hire',
              price: 'On request',
              detail: 'Quote after conversation',
              fit: 'You choose catering and details yourself — we provide the room.',
              bullet1: 'Exclusive use of agreed spaces',
              bullet2: 'Basic tables and chairs',
              bullet3: 'Agreed timeframe',
            },
            flexiblePackage: {
              name: 'Flexible package',
              price: 'On request',
              detail: 'Tailored to needs',
              fit: 'Venue plus practical support for family celebrations.',
              bullet1: 'Tailored setup and flow',
              bullet2: 'Coordination with us',
              bullet3: 'Can be expanded with what you need',
            },
            bespoke: {
              name: 'Bespoke',
              price: 'Individually priced',
              detail: 'By scope',
              fit: 'From idea to delivery — when you want everything in one place.',
              bullet1: 'Dialogue on concept and budget',
              bullet2: 'Collaboration with suppliers',
              bullet3: 'On-the-day follow-up',
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
              a: 'Everything from birthdays and confirmations to baptisms, memorial gatherings and anniversaries. The programme is tailored to your type of celebration.',
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
          'Celebration atmosphere at the venue — lighting and decor suggesting facilities for weddings and events',
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
              imgAlt: 'Children playing together — childcare and family gatherings',
            },
            accommodation: {
              title: 'Accommodation',
              desc: 'Overnight stays for guests travelling from afar — easy to bring the whole weekend together in one place.',
              imgAlt: 'Calm bedroom — guest accommodation',
            },
            bridalSuite: {
              title: 'Bridal suite',
              desc: 'A dedicated room for preparations and quiet moments before the ceremony and party.',
              imgAlt: 'Elegant detail — preparations and bridal suite',
            },
            activities: {
              title: 'Activities',
              desc: 'Options indoors and out that add breaks and variety through the day.',
              imgAlt: 'Outdoor space and nature — activities and breaks',
            },
            animals: {
              title: 'Time with animals',
              desc: 'Close to animals and outdoor areas for a calm, distinctive setting around your event.',
              imgAlt: 'Animals on the farm — natural setting for events',
            },
            barDanceFloor: {
              title: 'Bar & dance floor',
              desc: 'A natural transition from dinner to party, with room for music, speeches and dancing.',
              imgAlt: 'Party and bar atmosphere',
            },
            kitchen: {
              title: 'Commercial kitchen',
              desc: 'A fully equipped kitchen that makes catering and service straightforward.',
              imgAlt: 'Professional kitchen for catering and service',
            },
            universalDesign: {
              title: 'Universally designed',
              desc: 'All on one level with access to an accessible WC — arranged so every guest can take part and feel welcome.',
              imgAlt: 'Accessible building and entrance — universal design',
            },
            parking: {
              title: 'Parking',
              desc: 'Plenty of parking, with EV charging and the option to leave your car.',
              imgAlt: 'Cars and parking — guest arrival',
            },
            barn: {
              title: 'Celebration hall',
              desc: 'The main room with space for dinner, speeches and dancing — all in one place.',
              imgAlt: 'Main celebration room with dinner and party atmosphere',
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
              imgAlt: 'Family gathering — facilities for celebrations with children and adults',
            },
            weddingWeekend: {
              title: 'Wedding weekend',
              desc: 'Celebrate over several days with ceremony, dinner, party and overnight stays all in one place.',
              imgAlt: 'Wedding celebration — weekend use of the venue',
            },
            corporateEvening: {
              title: 'Corporate evening',
              desc: 'Start with professional content or dinner, and finish the evening with social time and a party.',
              imgAlt: 'Corporate event at the venue',
            },
            outdoorsIndoors: {
              title: 'Outdoors and indoors',
              desc: 'Combine outdoor areas and the venue through the day — from activity and mingling to dinner and party.',
              imgAlt: 'Indoor and outdoor spaces at the venue',
            },
            weekendGuests: {
              title: 'Weekend with guests',
              desc: 'Let guests stay over and enjoy a relaxed weekend with more time together.',
              imgAlt: 'Guests staying overnight — weekend at the venue',
            },
            livelyEvening: {
              title: 'An evening with energy',
              desc: 'From dinner to music and dancing — an evening with great energy and life in the venue.',
              imgAlt: 'Evening party — bar and dance floor',
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
        brandSubtitle: 'selskapslokale',
        rights: 'All rights reserved',
        contact: 'Contact Us',
        tagline: 'A premium venue for life’s most beautiful moments.',
        quickLinks: 'Quick links',
        newsletter: 'Newsletter',
        newsletterDesc: 'Stay updated on our events and news.',
        emailPlaceholder: 'Email',
        newsletterCta: 'Subscribe',
        techPartnerLead: 'Technology partner:',
        techPartnerName: 'Xala Technologies AS',
      },
      contactPage: {
        intro:
          'We help you from the first question to a successful event. Get in touch for a viewing, a quote, or an informal chat about your plans.',
        sectionHeading: 'How to reach us',
        phoneLabel: 'Phone',
        phoneValue: '+47 96 66 50 01',
        phoneHint: 'Mon–Fri 09:00–17:00',
        emailLabel: 'Email',
        emailValue: 'r.selskapslokale@gmail.com',
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
        title: 'Blog',
        intro: 'Tips, news and inspiration from Rønningen — more posts are on the way.',
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
        blog: 'Blogg',
        faq: 'FAQ',
        contact: 'Kontakt',
        inquiry: 'Forespørsel',
        admin: 'Admin'
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
        tagline: 'Alt du trenger for en vellykket feiring',
        heroImageAlt:
          'Selskapslokale om kvelden med varmt lys, stjernehimmel og feststemning',
        scrollHintAria: 'Rull ned til neste seksjon',
      },
      homeConcepts: {
        heading: 'Våre konsepter',
        intro: 'Her starter de beste feiringene - omgitt av natur',
        items: {
          weddings: {
            title: 'Bryllup',
            description: 'En hel dag tilpasset dere – fra vielse til fest.',
            imgAlt:
              'Brud og brudgom som danser sammen mens rødt og gullfarget konfetti faller i en lys festsal',
          },
          corporate: {
            title: 'Bedrift',
            description: 'Konferanser, julebord og sommerfester i gode rammer.',
          },
          private: {
            title: 'Selskap',
            description:
              'Bursdager, konfirmasjoner og jubileer i fleksible og uformelle omgivelser.',
          },
          facilities: {
            title: 'Fasiliteter',
            description:
              'Alt samlet på ett sted – kjøkken, dansegulv, parkering og uteområder.',
          },
        },
      },
      homeServices: {
        heading: 'Eksklusive tjenester',
        items: {
          soundLight: {
            title: 'Lyd & lys',
            description:
              'Kraftig lydanlegg og belysning som skaper riktig stemning fra start til slutt.',
          },
          catering: {
            title: 'Catering & servering',
            description:
              'Dere kan ta med egen mat, eller benytte våre samarbeidspartnere som leverer catering og servering tilpasset deres arrangement.',
          },
          barDancefloor: {
            title: 'Bar & dansegulv',
            description:
              'Ta med egen drikke og nyt kvelden med musikk og dans i gode omgivelser.',
          },
          coordination: {
            title: 'Samvær med dyr',
            description:
              'Opplev nærkontakt med dyrene på området – et hyggelig innslag for både store og små.',
          },
          decoration: {
            title: 'Dekorasjon & Fotografering',
            description:
              'Skap riktig stemning med dekor tilpasset deres stil, og mulighet for fotografer som fanger øyeblikkene gjennom dagen.',
          },
          overnight: {
            title: 'Overnatting & barnepass',
            description:
              'Overnatting og barnepass kan avtales – praktisk for gjester som reiser langt og familier med små barn.',
          },
        },
      },
      homeGallery: {
        heading: 'Inspirasjon',
        intro:
          'Et utvalg øyeblikk fra virkelige feiringer – til inspirasjon for ditt eget selskap.',
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
        noWebsite: 'Ta kontakt for mer informasjon',
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
          xala: {
            name: 'Funny Balloons Drammen',
            desc: 'Ballongdekor og festdetaljer som gir et tydelig visuelt uttrykk i lokalet.',
          },
        },
      },
      weddingsPage: {
        heroImageAlt:
          'Bildekolleksjon av feiringer, detaljer og stemning fra Rønningen',
        heroTitleLine1: 'Bryllup i vakre og',
        heroTitleLine2Accent: 'unike',
        heroTitleLine2Rest: ' omgivelser',
        heroTagline: 'Skap en feiring som føles personlig, varm og minneverdig.',
        heroScrollHintAria: 'Rull ned til atmosfæren',
        atmosphere: {
          headingLine1: 'Vielse og fest',
          headingLine2: 'på samme sted',
          intro1:
            'Samle hele dagen på ett sted – fra vielse til middag og fest. Omgitt av rolige omgivelser i vakker natur, med kort vei mellom seremoni og dans.',
          figureAlt:
            'Vielsesringer og blondekjole i nærbilde ved siden av brudepar som danser på fest med gjester under varme lyslenker',
          why: {
            item1: {
              title: 'Atmosfære',
              desc: 'Et gjennomført lokale med varme detaljer og god romfølelse. Her får dere en ramme som fungerer like godt til små som store arrangementer.',
            },
            item2: {
              title: 'Omgivelser',
              desc: 'Omgitt av natur og rolige omgivelser, med flotte uteområder og nærliggende lokasjoner som gir en ekstra dimensjon til dagen.',
            },
            item3: {
              title: 'Fleksibilitet',
              desc: 'Dere står fritt til å forme dagen slik dere ønsker. Lokalet tilpasses både type arrangement, oppsett og stil.',
            },
            item4: {
              title: 'Enkelt å gjennomføre',
              desc: 'Vi legger til rette for en smidig gjennomføring, slik at dere kan fokusere på gjestene og opplevelsen – ikke logistikken.',
            },
          },
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
          },
          item4: {
            title: 'Dans & feiring',
            desc: 'Drikke og dans med god stemning utover kvelden.',
          },
        },
        servicesSection: {
          headingBefore: 'Tilpasset deres ',
          headingAccent: 'ønsker',
          items: {
            kitchen: {
              title: 'Storkjøkken & catering',
              desc: 'Dere står fritt til å ta med egen mat eller benytte vårt fullt utstyrte storkjøkken.\n\nVi samarbeider også med lokale cateringaktører som kan levere ferdig mat, eller stå for matlaging på stedet med erfarne kokker og serveringspersonell.',
              imgAlt: 'Profesjonelt storkjøkken utstyrt til catering og arrangement',
            },
            photography: {
              title: 'Fotografering',
              desc: 'Anbefalte fotografer som kjenner både lyset og rommene her — fra portretter og vielse til fest og små øyeblikk dere vil huske.',
              imgAlt:
                'Brud og brudgom på steiner foran foss i skogkledd fjellandskap',
            },
            decoration: {
              title: 'Dekorasjon',
              desc: 'Vi tilbyr fleksible dekorasjonsløsninger som kan tilpasses deres stil og uttrykk. Sammen med våre samarbeidspartnere kan vi skape en helhetlig og gjennomført atmosfære – fra bordpynt til dekorasjon av hele lokalet.',
              imgAlt:
                'Utendørs bryllupsbord med rosa og hvite roser, pyntede stoler og blomsterbue ved vannet i gyllent lys',
            },
            bar: {
              title: 'Bar & dansegulv',
              desc: 'Dere står fritt til å ta med egen drikke og bruke barområdet. Med eget dansegulv ligger alt til rette for god stemning gjennom hele kvelden.',
              imgAlt: 'Kveldsfest med barstemning og dansegulv',
            },
            soundLight: {
              title: 'Lyd & Lys',
              desc: 'Vi har et kraftig lydanlegg som passer perfekt til fest og musikk, kombinert med belysning som skaper riktig stemning gjennom hele arrangementet.',
              imgAlt:
                'Selskapslokale med hvite festbord, lilla og blå scenelys og lysmønster på veggene',
            },
            tableSetting: {
              title: 'Oppdekking & bordpynt',
              desc: 'Ferdig oppdekket med duker, stoltrekk, servise, glass og det dere trenger på bordet — pluss bordpynt, menykort og små detaljer som binder det hele sammen. Vi avstemmer uttrykket med stilen på dagen deres, så gjestene møter komplette bord fra første minutt.',
              imgAlt:
                'Langt festbord med champagnefarget fløyelsduk, perlebesatte tallerkener, blomsterdekorasjoner, stearinlys og mørkerøde glass i dagslys',
            },
          },
        },
        packagesSection: {
          heading: 'Våre pakker',
          intro:
            'Tre tydelige pakker som utgangspunkt — ta kontakt, så finner vi dato, tilpasninger og et tilbud som passer deres bryllupsdag.',
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
              price: 'kr 33 000',
              desc: 'Enklere og mer ferdig løsning',
              f1: 'Alt i Basis',
              f2: 'Oppdekking (bord, stoler, duk, stoltrekk, servietter)',
              f3: 'Tilgang til kjøkken med utstyr og kjølerom',
              f4: 'Ekstra tid før eller etter arrangement',
            },
            premium: {
              name: 'Premium',
              price: 'kr 44 000',
              desc: 'Full pakke – vi tar oss av det meste',
              f1: 'Alt i Plus',
              f2: 'Koordinering og planlegging',
              f3: 'Lydanlegg',
              f4: 'Sluttrengjøring',
              f5: 'Dekorasjon og bordpynt',
              f6: '1 serveringspersonell',
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
              q: 'Har dere overnattingsmuligheter?',
              a: 'Vi tilbyr overnatting i egne leiligheter, samt mulighet for overnatting i tilknytning til lokalet. Dette kan leies separat etter behov.',
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
          'Bedriftsmøte og konferanse — samarbeid og faglig innhold i profesjonelle rammer',
        heroTitleLine1: 'Fra julebord til kick-off.',
        heroTitleLine2Prefix: '',
        heroTitleLine2Accent: 'Alt',
        heroTitleLine2Rest: ' på ett sted.',
        heroTagline:
          'Bedriftsarrangementer som føles gjennomførte, varme og på deres premisser.',
        heroScrollHintAria: 'Rull ned til introduksjonen',
        introSection: {
          figureAlt:
            'Selskapslokale med varmt lys og dekket til fest — stemning som passer bedriftsarrangement hos Rønningen',
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
            },
            teambuilding: {
              title: 'Teambuilding',
              desc: 'Skap samhold gjennom aktiviteter og gode opplevelser – både inne og ute, tilpasset deres behov.',
            },
            christmasParty: {
              title: 'Julebord',
              desc: 'Samle kollegaene til en hyggelig kveld med god stemning, mat og fest i lune omgivelser.',
            },
            summerParty: {
              title: 'Sommerfest',
              desc: 'Nyt sommeren med kollegaer i åpne og grønne omgivelser, med god plass til både aktiviteter og avslapning.',
            },
            workshopKickoff: {
              title: 'Workshop & kickoff',
              desc: 'Start nye prosjekter eller samle teamet med fokus og energi i inspirerende omgivelser.',
            },
            companyDinner: {
              title: 'Firmamiddag',
              desc: 'Inviter til en stilfull middag med gode rammer for både samtaler, feiring og relasjonsbygging.',
            },
          },
        },
        packagesSection: {
          heading: 'Våre bedriftspakker',
          intro:
            'Velg mellom tre pakker. Vi tar en prat om behov, antall gjester og dato, og setter sammen et opplegg som passer dere.',
          featuredBadge: 'Mest populær',
          requestQuote: 'Be om tilbud',
          items: {
            venueRental: {
              name: 'Lokalleie',
              price: 'På forespørsel',
              detail: 'Tilbud etter samtale',
              fit: 'Dere styrer leverandører selv.',
              bullet1: 'Eksklusiv bruk av avtalte lokaler',
              bullet2: 'Grunnleggende bord og stoler',
              bullet3: 'Avtalt tidsramme',
            },
            flexiblePackage: {
              name: 'Fleksibelt opplegg',
              price: 'På forespørsel',
              detail: 'Tilpasses behov',
              fit: 'Sted pluss utvalgt støtte fra oss.',
              bullet1: 'Tilpasset rigg og plan',
              bullet2: 'Koordinering med oss',
              bullet3: 'Kan utvides',
            },
            bespoke: {
              name: 'Skreddersøm',
              price: 'Individuelt',
              detail: 'Etter omfang',
              fit: 'Helheten fra idé til gjennomføring.',
              bullet1: 'Dialog om konsept og budsjett',
              bullet2: 'Samarbeid med leverandører',
              bullet3: 'Oppfølging på dagen',
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
      privatePage: {
        heroImageAlt:
          'Privat feiring og selskap — varm stemning i lokalet for bursdag, konfirmasjon og familiearrangement',
        heroTitleLine1: 'Livets feiringer samlet.',
        heroTitleLine2Prefix: '',
        heroTitleLine2Accent: 'Hos',
        heroTitleLine2Rest: ' oss.',
        heroScrollHintAria: 'Rull ned til introduksjonen',
        introSection: {
          headingBefore: 'Der feiringen får ',
          headingAccent: 'personlighet',
          intro:
            'Bursdag, konfirmasjon, dåp, minnestund og jubileum – samle dere i lokaler som gir rom for deres stil og måte å feire på, uten standardoppsett.',
          panoramaAlt: 'Feststemning og dekkede bord i selskapslokalet',
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
          headingBefore: 'Anledninger vi ofte ',
          headingAccent: 'skaper sammen',
          intro:
            'Fra bursdag og konfirmasjon til dåp, minnestund og jubileum – vi tilpasser opplegget sammen med dere.',
          items: {
            birthday: {
              title: 'Bursdag',
              desc: 'Feir dagen med venner og familie i gode omgivelser, med plass til både middag og fest.',
            },
            confirmation: {
              title: 'Konfirmasjon',
              desc: 'En viktig dag samlet på ett sted, med rom for både det formelle og det sosiale.',
            },
            baptismNaming: {
              title: 'Dåp & navnefest',
              desc: 'Rolige og fine rammer for en personlig markering med familie og nære.',
            },
            memorial: {
              title: 'Minnestund',
              desc: 'Et trygt og verdig sted å samles, med fokus på ro, nærhet og gode samtaler.',
            },
            anniversary: {
              title: 'Jubileum',
              desc: 'Marker store og små milepæler med en kveld som samler folk og skaper gode minner.',
            },
            gathering: {
              title: 'Selskap & mingling',
              desc: 'Uformelle sammenkomster med god flyt, der gjestene kan bevege seg fritt og nyte kvelden.',
            },
          },
        },
        packagesSection: {
          heading: 'Våre private pakker',
          intro:
            'Velg mellom tre opplegg. Vi tilpasser til feiringen, gjestene og ønskene deres – enkelt og uforpliktende.',
          featuredBadge: 'Mest populær',
          requestQuote: 'Be om tilbud',
          priceNote: 'Priser er veiledende — endelig tilbud etter samtale.',
          items: {
            venueRental: {
              name: 'Lokalleie',
              price: 'På forespørsel',
              detail: 'Tilbud etter samtale',
              fit: 'Dere velger selv catering og detaljer — vi stiller med rommet.',
              bullet1: 'Eksklusiv bruk av avtalte lokaler',
              bullet2: 'Grunnleggende bord og stoler',
              bullet3: 'Avtalt tidsramme',
            },
            flexiblePackage: {
              name: 'Fleksibelt opplegg',
              price: 'På forespørsel',
              detail: 'Tilpasses behov',
              fit: 'Lokale pluss praktisk støtte til familiefeiringer.',
              bullet1: 'Tilpasset rigg og flyt',
              bullet2: 'Koordinering med oss',
              bullet3: 'Kan utvides med det dere trenger',
            },
            bespoke: {
              name: 'Skreddersøm',
              price: 'Individuelt',
              detail: 'Etter omfang',
              fit: 'Fra idé til gjennomføring — når dere vil ha alt samlet.',
              bullet1: 'Dialog om konsept og budsjett',
              bullet2: 'Samarbeid med leverandører',
              bullet3: 'Oppfølging på dagen',
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
              a: 'Alt fra bursdager og konfirmasjoner til dåp, minnestund og jubileer. Opplegget tilpasses etter type feiring.',
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
          'Feststemning i lokalet — lys og dekor som viser fasiliteter for bryllup og arrangement',
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
              imgAlt: 'Barn som leker sammen — barnepass og familieselskap',
            },
            accommodation: {
              title: 'Overnatting',
              desc: 'Mulighet for overnatting for gjester som kommer langveisfra – enkelt å samle hele helgen på ett sted.',
              imgAlt: 'Rolig soverom — overnatting for gjester',
            },
            bridalSuite: {
              title: 'Brudesuite',
              desc: 'Et eget rom for forberedelser og rolige øyeblikk før vielse og fest.',
              imgAlt: 'Elegant detalj — forberedelser og brudesuite',
            },
            activities: {
              title: 'Aktiviteter',
              desc: 'Muligheter for aktiviteter både inne og ute, som gir pauser og variasjon gjennom dagen.',
              imgAlt: 'Uteområde og natur — aktiviteter og pauser',
            },
            animals: {
              title: 'Samvær med dyr',
              desc: 'Nærhet til dyr og uteområder gir en rolig og unik ramme rundt arrangementet.',
              imgAlt: 'Dyr og uteområder — naturlig ramme for arrangement',
            },
            barDanceFloor: {
              title: 'Bar & dansegulv',
              desc: 'Naturlig overgang fra middag til fest, med plass til musikk, taler og dans.',
              imgAlt: 'Stemning fra fest og bar',
            },
            kitchen: {
              title: 'Storkjøkken',
              desc: 'Fullt utstyrt kjøkken som gjør det enkelt for catering og servering.',
              imgAlt: 'Profesjonelt kjøkken til catering og servering',
            },
            universalDesign: {
              title: 'Universelt utformet',
              desc: 'Alt på samme plan med tilgang til HC-toalett. Tilrettelagt slik at alle gjester kan delta og føle seg velkomne.',
              imgAlt: 'Tilgjengelig bygning og inngang — universell utforming',
            },
            parking: {
              title: 'Parkering',
              desc: 'God plass til parkering, med mulighet for elbillading og å la bilen stå igjen.',
              imgAlt: 'Biler og parkering — ankomst for gjester',
            },
            barn: {
              title: 'Selskapslokale',
              desc: 'Hovedrommet med god plass til middag, taler og fest – alt samlet på ett sted.',
              imgAlt: 'Selskapslokale med plass til middag og fest',
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
              imgAlt: 'Familiefeiring — fasiliteter for feiring med barn og voksne',
            },
            weddingWeekend: {
              title: 'Bryllupshelg',
              desc: 'Feir over flere dager med vielse, middag, fest og overnatting samlet på ett sted.',
              imgAlt: 'Bryllupsfeiring — helg på lokalet',
            },
            corporateEvening: {
              title: 'Bedriftskveld',
              desc: 'Start med faglig innhold eller middag, og avslutt kvelden med sosialt samvær og fest.',
              imgAlt: 'Bedriftsarrangement på lokalet',
            },
            outdoorsIndoors: {
              title: 'Ute og inne',
              desc: 'Kombiner uteområder og lokalet gjennom dagen – fra aktivitet og mingling til middag og fest.',
              imgAlt: 'Ute- og innendørs rom på lokalet',
            },
            weekendGuests: {
              title: 'Helg med gjester',
              desc: 'La gjestene bli over, og skap en avslappet helg med mer tid sammen.',
              imgAlt: 'Gjester på overnatting — helg på lokalet',
            },
            livelyEvening: {
              title: 'Kveld med puls',
              desc: 'Fra middag til musikk og dans – en kveld med god energi og liv i lokalet.',
              imgAlt: 'Kveldsfest — bar og dansegulv',
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
        brandSubtitle: 'selskapslokale',
        rights: 'Alle rettigheter reservert',
        contact: 'Kontakt oss',
        tagline: 'Et selskapslokale for livets vakreste øyeblikk.',
        quickLinks: 'Hurtiglenker',
        newsletter: 'Nyhetsbrev',
        newsletterDesc: 'Hold deg oppdatert på arrangementer og nyheter.',
        emailPlaceholder: 'Din e-post',
        newsletterCta: 'Meld meg på',
        techPartnerLead: 'Teknologipartner:',
        techPartnerName: 'Xala Technologies AS',
      },
      contactPage: {
        intro:
          'Få en omvisning helt uforpliktende - i dag!',
        sectionHeading: 'Slik når dere oss',
        phoneLabel: 'Telefon',
        phoneValue: '+47 96 66 50 01',
        phoneHint: 'Man–fre 09:00–17:00',
        emailLabel: 'E-post',
        emailValue: 'r.selskapslokale@gmail.com',
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
        title: 'Blogg',
        intro: 'Tips, nyheter og inspirasjon fra Rønningen — flere innlegg kommer.',
      },
      galleryPage: {
        heroEyebrow: 'Rønningen',
        intro:
          'Øyeblikk fra bryllup, bedrift og private feiringer — alt på Rønningen.',
        filterTablistAria: 'Filtrer galleriet etter kategori',
        filterAll: 'Alle',
        filterWedding: 'Bryllup',
        filterCorporate: 'Bedrift',
        filterPrivate: 'Privat',
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
