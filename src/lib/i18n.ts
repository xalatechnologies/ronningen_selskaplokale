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
        subtitle: 'An elegant, personal venue with flexible spaces for weddings, corporate events, and private celebrations.',
        cta: 'Send enquiry',
        bookNow: 'Book now',
      },
      homeHero: {
        welcomeLine: 'Welcome to',
        venueName: 'Rønningen selskapslokale',
        tagline: 'Everything you need for a celebration to remember.',
        scrollHintAria: 'Scroll down to our concepts',
      },
      homeConcepts: {
        heading: 'Our concepts',
        intro: 'Where the best celebrations begin — surrounded by nature.',
        items: {
          weddings: {
            title: 'Weddings',
            description:
              'Ceremony, reception, and mingling in one place — we help you plan the whole journey from wish list to last dance.',
            imgAlt:
              'Bride and groom dancing together as red and gold confetti falls in a bright reception hall',
          },
          corporate: {
            title: 'Corporate events',
            description:
              'Conferences, team building, Christmas parties, and summer parties with professional hosting and flexible spaces.',
          },
          private: {
            title: 'Private celebrations',
            description:
              'Anniversaries, confirmations, and family gatherings with room for children and adults — calm, homely farm surroundings.',
          },
          facilities: {
            title: 'Facilities',
            description:
              'From a professional kitchen and dance floor to easy parking and flexible options for overnight stays.',
          },
        },
      },
      homeServices: {
        heading: 'Exclusive services',
        items: {
          soundLight: {
            title: 'Sound & lighting',
            description:
              'We set up sound and lighting to suit your format — from clear presentations to evenings with music, dancing, and atmosphere.',
          },
          catering: {
            title: 'Catering & service',
            description:
              'We connect you with quality catering and attentive service so menu, flow, and hosting stay in step throughout the day.',
          },
          barDancefloor: {
            title: 'Bar & dance floor',
            description:
              'From the first toast to the last song: we lay out bar and dance floor so energy stays high and the evening flows naturally.',
          },
          coordination: {
            title: 'Event coordination',
            description:
              'We keep details, timelines, and suppliers on track so you can be hosts without spending the day on logistics.',
          },
          decoration: {
            title: 'Decoration',
            description:
              'Flowers, tables, and finishing touches styled to your look — from classic and understated to warm and festive.',
          },
          overnight: {
            title: 'Accommodation',
            description:
              'We help with recommended places to stay nearby and transport plans so guests travel safely there and back.',
          },
        },
      },
      homeGallery: {
        heading: 'Gallery',
        intro:
          'Moments from real celebrations here — weddings, corporate events, and private parties. Let it inspire your own day.',
        ctaFullGallery: 'See the full gallery',
      },
      inspirationGallery: {
        slideAlt: 'Wedding inspiration, photo {{n}}',
        openImageAria: 'Open large image: {{description}}',
      },
      homePartners: {
        heading: 'Our partners',
        intro:
          'We work with trusted suppliers for food, flowers, photo, and more — so you have one coordinated team around your event at Rønningen.',
        listAria: 'Partner logos',
        badge: 'Partner',
        items: {
          cateringKitchen: 'Catering & kitchen',
          flowersDecor: 'Flowers & decor',
          photoVideo: 'Photo & video',
          soundLight: 'Sound & lighting',
          barService: 'Bar & service',
          coordination: 'Coordination',
          digilist: 'Digilist',
          xala: 'Xala technologies',
          hostingStaff: 'Hosting & staff',
          commitcare: 'CommitCare',
        },
      },
      weddingsPage: {
        heroImageAlt:
          'Event venue at night with warm lighting, a starry sky, and a festive atmosphere',
        heroTitleLine1: 'Weddings in beautiful,',
        heroTitleLine2: 'unique surroundings',
        heroTagline: 'Create a celebration that feels personal, warm, and unforgettable.',
        heroScrollHintAria: 'Scroll down to the atmosphere section',
        atmosphere: {
          headingLine1: 'Ceremony and celebration',
          headingLine2: 'in one place',
          intro1:
            'Bring the whole day together in one place — from ceremony to dinner and the party. You set the order and the tone. Surrounded by calm, beautiful nature, with only a short distance between the vows and the dance floor.',
          intro2:
            'We support you with planning and delivery so you can focus on what matters most. Get in touch for a tour and a no-obligation chat about how your day can take shape with us.',
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
          heading: 'Inspiration & gallery',
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
              a: 'We can host up to 300 guests, with space for up to 200 more in a party tent and wedding barn.',
            },
            item4: {
              q: 'Can we hold the ceremony on the farm?',
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
        heroTitleLine2: 'All in one place.',
        heroTagline:
          'Host corporate events that feel organised, welcoming, and firmly on brief.',
        heroScrollHintAria: 'Scroll down to the introduction',
        introSection: {
          figureAlt:
            'Event venue with warm light and tables set for a celebration — atmosphere suited to corporate events at Rønningen',
          headingBefore: 'Where professionalism meets ',
          headingAccent: 'warmth',
          intro:
            'Hosting that knows both formal and informal corporate evenings — and spaces that can be turned up or down to suit the occasion.',
          benefitsEyebrow: 'Three clear advantages',
          benefits: {
            item1: 'A personal setting — not an anonymous conference hall',
            item2: 'Programmes tailored to your date, format, and guest count',
            item3: 'On-site coordination — fewer parallel threads for you to manage',
          },
        },
        eventsSection: {
          headingBefore: 'Typical corporate events ',
          headingAccent: 'with us',
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
          heading: 'Mood from the venue',
          intro:
            'Company, mingling and evening — not just empty rooms. Browse a selection of atmosphere from events with us.',
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
              a: 'The cards show typical formats — from conferences, team building and workshops to Christmas parties, summer parties and company dinners. We clarify capacity and programme details based on date, numbers and what you want to achieve.',
            },
            tailored: {
              q: 'Can the programme be tailored?',
              a: 'Yes — date, guest count and desired format guide how we set up the space and practical arrangements.',
            },
            viewing: {
              q: 'Can we book a viewing?',
              a: 'Yes. Get in touch and we’ll find a time that works.',
            },
            howToInquire: {
              q: 'How do we send an enquiry?',
              a: 'Use our form with date, approximate numbers and plans. We’ll get back to you with a proposal.',
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
          body: 'Tell us briefly what you have in mind — we’ll suggest options that suit your team and guests.',
        },
      },
      privatePage: {
        heroImageAlt:
          'Private celebration and gathering — warm venue atmosphere for birthdays, confirmations, and family events',
        heroTitleLine1: "Life's celebrations, gathered.",
        heroTitleLine2: 'With us.',
        heroTagline:
          "Celebrate life's moments together in a setting that feels personal, warm, and unmistakably yours.",
        heroScrollHintAria: 'Scroll down to the introduction',
        introSection: {
          eyebrow: 'Private at Rønningen',
          headingBefore: 'Where your celebration gains ',
          headingAccent: 'personality',
          intro:
            'Birthdays, confirmations, baptisms and naming days, memorial gatherings and anniversaries — you come together in spaces with soul, where it is about people and traditions, not a standard setup from a catalogue.',
          panoramaAlt: 'Celebration atmosphere and set tables in the venue',
          panoramaCaption:
            'Light, wood and room for both speeches and laughter — a setting that lets the day breathe.',
          highlights: {
            proximity: {
              title: 'Closeness',
              desc: 'Rooms that feel personal — not anonymous party venues. Here it is about you and your guests.',
            },
            tradition: {
              title: 'Your traditions',
              desc: 'Programmes tailored to family, guests and the celebrations you care about — without a ready-made template from us.',
            },
            gathered: {
              title: 'All in one place',
              desc: 'One destination from arrival to the last hug: less stress, more time to be present.',
            },
          },
        },
        eventsSection: {
          headingBefore: 'Occasions we often ',
          headingAccent: 'create together',
          intro:
            'From birthdays and confirmations to baptisms and naming days, memorials and anniversaries — starting points you can mix and match. We work out the details in dialogue with you.',
          items: {
            birthday: {
              title: 'Birthday',
              desc: "From children's parties with simple service to adult celebrations with dinner and dancing. We adapt capacity, sound and timing so the day is yours — not a ready-made template.",
            },
            confirmation: {
              title: 'Confirmation',
              desc: 'After the ceremony, gather for a celebration with room for family and friends. We help with flow, tables and timing so the confirmand and family can be present, not run logistics.',
            },
            baptismNaming: {
              title: 'Baptism & naming day',
              desc: 'A calm, warm setting when you want to bring loved ones together after church — whether for a baptism, naming day, or both in the same weekend. We clarify space for high chairs, coffee tables and speeches in the same room.',
            },
            memorial: {
              title: 'Memorial gathering',
              desc: "Coming together after life's hardest days — a quiet setting for tributes, coffee and time to be together. We coordinate discreetly around what you need.",
            },
            anniversary: {
              title: 'Anniversary',
              desc: 'Silver weddings, milestone years or long marriages — we set the stage for speeches, memories and a celebration that lasts into the evening, without you having to think of everything yourselves.',
            },
            gathering: {
              title: 'Gatherings & mingling',
              desc: 'From intimate dinners to larger parties with mingling — you choose the format, and we shape the space, sound and flow so the mood feels right from arrival to goodbye.',
            },
          },
        },
        packagesSection: {
          heading: 'Our private packages',
          intro:
            'Choose from three private options — we tailor to your celebration, guests and wishes in a no-obligation conversation.',
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
          heading: 'Mood from the venue',
          intro:
            'Celebration, togetherness and evening atmosphere — a glimpse of how private gatherings can take shape with us.',
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
              a: 'Including birthdays, confirmations, baptisms and naming days, memorial gatherings and anniversaries. We clarify guest numbers, timing and preferred format in a no-obligation chat.',
            },
            ownFoodDrink: {
              q: 'Can we bring our own food and drink?',
              a: 'We clarify this based on your chosen package and the venue. Many combine their own cake and drinks with catering — we help you find a clear arrangement.',
            },
            capacity: {
              q: 'Does it work for both small and large parties?',
              a: 'Yes. We tailor tables and rooms to your guest count — from intimate gatherings to larger family events.',
            },
            howToBook: {
              q: 'How do we book?',
              a: 'Send an enquiry with date, approximate numbers and type of celebration. We will get back to you with suggestions and next steps.',
            },
          },
        },
        closingCta: {
          bgImageAlt:
            'Private celebration at the venue — background image for the contact call-to-action',
          eyebrow: 'Next step',
          headingLine1Before: 'Want to ',
          headingLine1Accent: 'plan',
          headingLine2: 'your celebration with us?',
          body: 'Tell us briefly what you are celebrating and when — we will suggest a setting and programme that suit family and guests.',
        },
      },
      facilitiesPage: {
        heroImageAlt:
          'Celebration atmosphere at the venue — lighting and decor suggesting facilities for weddings and events',
        heroTitleLine1: 'All in one place.',
        heroTitleLine2: 'For the whole celebration.',
        heroTagline:
          'Childcare, kitchen, suites, barn and more — everything your celebration needs in one venue.',
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
              desc: 'Safe arrangements for little ones so parents can be present at the celebration without worrying about logistics.',
              imgAlt: 'Children playing together — childcare and family gatherings',
            },
            accommodation: {
              title: 'Accommodation',
              desc: 'Guests travelling from afar can stay overnight — easy to bring the whole weekend together in one place.',
              imgAlt: 'Calm bedroom — guest accommodation',
            },
            bridalSuite: {
              title: 'Bridal suite',
              desc: 'Space for preparation, calm and private moments before the ceremony and party — a natural hub for the bride and her party.',
              imgAlt: 'Elegant detail — preparations and bridal suite',
            },
            activities: {
              title: 'Activities',
              desc: 'Options that engage different ages and add breaks and energy through the day.',
              imgAlt: 'Outdoor space and nature — activities and breaks',
            },
            animals: {
              title: 'Time with animals',
              desc: 'Close to animals and outdoor areas for a relaxing, distinctive setting around your event.',
              imgAlt: 'Animals on the farm — natural setting for events',
            },
            barDanceFloor: {
              title: 'Bar & dance floor',
              desc: 'Natural flow from dinner into the evening with room for music, toastmaster and dancing without changing venue.',
              imgAlt: 'Party and bar atmosphere',
            },
            kitchen: {
              title: 'Commercial kitchen',
              desc: 'Well-equipped kitchen that makes catering, buffet and service on a larger scale straightforward.',
              imgAlt: 'Professional kitchen for catering and service',
            },
            universalDesign: {
              title: 'Universally designed',
              desc: 'Arranged so guests with different needs can access, take part and feel welcome.',
              imgAlt: 'Accessible building and entrance — universal design',
            },
            parking: {
              title: 'Free parking (option to charge or leave your car)',
              desc: 'Plenty of room for cars, charging options and the possibility to agree leaving vehicles — practical for everyone driving.',
              imgAlt: 'Cars and parking — guest arrival',
            },
            barn: {
              title: 'The barn',
              desc: 'The main room with authentic atmosphere — ideal for dinner, speeches, dancing and gathering under one roof.',
              imgAlt: 'Party venue and atmosphere in barn or events space',
            },
          },
        },
        useCasesSection: {
          headingBefore: 'This is how the facilities ',
          headingAccent: 'work in practice',
          items: {
            familyCelebration: {
              title: 'Family celebration',
              desc: 'Room for young and old alike: an authentic barn, safe childcare and outdoor areas for breaks and play — so the whole family can be present without stress.',
              imgAlt: 'Family gathering — facilities for celebrations with children and adults',
            },
            weddingWeekend: {
              title: 'Wedding weekend',
              desc: 'From preparations to the last dance: a suite for you, beds for guests and an evening on the dance floor — one place, one seamless flow you can relax into.',
              imgAlt: 'Wedding celebration — weekend use of the venue',
            },
            corporateEvening: {
              title: 'Corporate evening',
              desc: 'Impress the team with a professional kitchen, clear room flow and technical setup — an event that feels polished, without logistics stealing the spotlight.',
              imgAlt: 'Corporate event at the venue',
            },
            outdoorsIndoors: {
              title: 'Outdoors and indoors',
              desc: 'Let guests catch their breath outside among nature and animals, then gather for dinner and programme inside the barn — a whole that feels relaxed and a little different.',
              imgAlt: 'Indoor and outdoor spaces at the venue',
            },
            weekendGuests: {
              title: 'Weekend with guests',
              desc: 'When people travel from afar: accommodation, parking and celebration on the same farm — fewer arrangements and drives, more time to host.',
              imgAlt: 'Guests staying overnight — weekend at the venue',
            },
            livelyEvening: {
              title: 'An evening with energy',
              desc: 'Natural flow from dinner and speeches to bar and dancing — without packing up and moving guests. The atmosphere can build all evening.',
              imgAlt: 'Evening party — bar and dance floor',
            },
          },
        },
        packagesSection: {
          heading: 'Choose your facilities level',
          intro:
            'Three levels to combine — we adjust scope and content with you so the facilities suit the event and budget.',
          items: {
            basic: {
              name: 'Core facilities',
              price: 'On request',
              detail: 'Quote after conversation',
              fit: 'A clear baseline with the most important frameworks in place.',
              bullet1: 'The barn',
              bullet2: 'Commercial kitchen',
              bullet3: 'Universally designed',
              bullet4: 'Free parking (option to charge or leave your car)',
            },
            comfortStay: {
              name: 'Comfort & stay',
              price: 'On request',
              detail: 'Tailored to needs',
              fit: 'When you want more comfort for hosts and guests over time.',
              bullet1: 'Accommodation',
              bullet2: 'Bridal suite',
              bullet3: 'Bar & dance floor',
              bullet4: 'Activities',
            },
            completeFamily: {
              name: 'Complete family package',
              price: 'Individually priced',
              detail: 'By scope',
              fit: 'For those who want a cohesive setup for both children and adults.',
              bullet1: 'Childcare',
              bullet2: 'Time with animals',
              bullet3: 'Activities',
              bullet4: 'Tailored flow between outdoors and indoors',
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
              a: 'Yes — we emphasise that the venue should be accessible for guests with different needs.',
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
        scrollHintAria: 'Rull ned til neste seksjon',
      },
      homeConcepts: {
        heading: 'Våre konsepter',
        intro: 'Her starter de beste feiringene - omgitt av natur',
        items: {
          weddings: {
            title: 'Bryllup',
            description:
              'Vielse, fest og mingling på ett sted — vi hjelper dere med helhetsplan fra ønskeliste til siste dans.',
            imgAlt:
              'Brud og brudgom som danser sammen mens rødt og gullfarget konfetti faller i en lys festsal',
          },
          corporate: {
            title: 'Firmaeventer',
            description:
              'Konferanse, teambuilding, julebord og sommerfest med profesjonelt vertskap og fleksible rammer.',
          },
          private: {
            title: 'Private selskaper',
            description:
              'Jubileer, konfirmasjon og familieselskap med plass til barn og voksne — rolige, hjemlige omgivelser på gården.',
          },
          facilities: {
            title: 'Fasiliteter',
            description:
              'Alt fra storkjøkken og dansegulv til gode parkeringsmuligheter og fleksible løsninger rundt opphold.',
          },
        },
      },
      homeServices: {
        heading: 'Eksklusive tjenester',
        items: {
          soundLight: {
            title: 'Lyd og lys',
            description:
              'Vi setter opp lyd og lys som passer formatet deres - fra tydelige presentasjoner til kveld med musikk, dans og stemning.',
          },
          catering: {
            title: 'Catering og servering',
            description:
              'Vi kobler dere med kvalitetscatering og trygg servering, slik at meny, flyt og vertskap henger sammen gjennom hele dagen.',
          },
          barDancefloor: {
            title: 'Bar og dansegulv',
            description:
              'Fra første skål til siste låt: vi tilrettelegger barområde og dansegulv som gir god energi og naturlig flyt utover kvelden.',
          },
          coordination: {
            title: 'Event koordinering',
            description:
              'Vi holder oversikt på detaljer, tidsplan og leverandører, så dere kan være vertskap uten å bruke dagen på logistikk.',
          },
          decoration: {
            title: 'Dekorasjon',
            description:
              'Blomster, bord og detaljer settes opp etter uttrykket dere ønsker - fra klassisk og rent til varmt og festlig.',
          },
          overnight: {
            title: 'Overnatting',
            description:
              'Vi hjelper med anbefalte overnattingsmuligheter i nærheten og plan for transport, slik at gjestene kommer trygt frem og tilbake.',
          },
        },
      },
      homeGallery: {
        heading: 'Galleri',
        intro:
          'Øyeblikk fra virkelige feiringer her — bryllup, bedrift og private selskaper. La deg inspirere til deres egen dag.',
        ctaFullGallery: 'Se hele galleriet',
      },
      inspirationGallery: {
        slideAlt: 'Bryllupsinspirasjon {{n}}',
        openImageAria: 'Åpne stort bilde: {{description}}',
      },
      homePartners: {
        heading: 'Våre partnere',
        intro:
          'Vi jobber med anbefalte leverandører innen mat, dekor, foto og mer — slik at dere får ett koordinert team rundt arrangementet på Rønningen.',
        listAria: 'Partnerlogoer',
        badge: 'Partner',
        items: {
          cateringKitchen: 'Catering & kjøkken',
          flowersDecor: 'Blomster & dekor',
          photoVideo: 'Foto & film',
          soundLight: 'Lyd & lys',
          barService: 'Bar & servering',
          coordination: 'Koordinering',
          digilist: 'Digilist',
          xala: 'Xala technologies',
          hostingStaff: 'Vertskap & personell',
          commitcare: 'CommitCare',
        },
      },
      weddingsPage: {
        heroImageAlt:
          'Selskapslokale om kvelden med varmt lys, stjernehimmel og feststemning',
        heroTitleLine1: 'Bryllup i vakre og',
        heroTitleLine2: 'unike omgivelser',
        heroTagline: 'Skap en feiring som føles personlig, varm og minneverdig.',
        heroScrollHintAria: 'Rull ned til atmosfæren',
        atmosphere: {
          headingLine1: 'Vielse og fest',
          headingLine2: 'på samme sted',
          intro1:
            'Samle hele dagen på ett sted – fra vielse til middag og fest. Dere bestemmer rekkefølgen og stilen. Omgitt av rolige omgivelser i vakker natur, med kort vei mellom seremoni og dans.',
          intro2:
            'Vi hjelper dere med planlegging og gjennomføring, slik at dere kan fokusere på det som betyr mest. Ta kontakt for omvisning og en uforpliktende prat om hvordan dagen kan gjennomføres hos oss.',
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
          heading: 'Inspirasjon og Galleri',
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
              a: 'Vi har plass til inntil 300 gjester og muligheter for 200 ekstra i partitelt og bryllupslåve.',
            },
            item4: {
              q: 'Er det mulig med vielse på gården?',
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
        heroTitleLine2: 'Alt på ett sted.',
        heroTagline:
          'Bedriftsarrangementer som føles gjennomførte, varme og på deres premisser.',
        heroScrollHintAria: 'Rull ned til introduksjonen',
        introSection: {
          figureAlt:
            'Selskapslokale med varmt lys og dekket til fest — stemning som passer bedriftsarrangement hos Rønningen',
          headingBefore: 'Der profesjon møter ',
          headingAccent: 'varme',
          intro:
            'Vertskap som kjenner både formelle og uformelle bedriftskvelder — og lokaler som kan tones opp eller ned etter anledningen.',
          benefitsEyebrow: 'Tre tydelige fordeler',
          benefits: {
            item1: 'Personlig ramme — ikke anonym konferansesal',
            item2: 'Opplegg tilpasset dato, format og antall gjester',
            item3: 'Koordinering på stedet — færre parallelle tråder for dere å holde i',
          },
        },
        eventsSection: {
          headingBefore: 'Typiske bedriftsarrangement ',
          headingAccent: 'hos oss',
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
            'Velg blant tre bedriftsopplegg — i samtalen avklarer vi behov, antall gjester, dato og det praktiske, og setter sammen et forslag som passer dere.',
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
          heading: 'Stemning fra lokalet',
          intro:
            'Selskap, mingling og kveld — ikke bare tomme rom. Bla gjennom et utvalg av stemning fra arrangement hos oss.',
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
              a: 'Kortene viser typiske former — fra konferanser, teambuilding og workshop til julebord, sommerfest og firmamiddag. Kapasitet og detaljer i opplegget avklarer vi ut fra dato, antall og hva dere vil oppnå.',
            },
            tailored: {
              q: 'Kan opplegget tilpasses?',
              a: 'Ja — dato, antall gjester og ønsket form styrer hvordan vi setter opp lokaler og praktisk rundt arrangementet.',
            },
            viewing: {
              q: 'Kan vi komme på omvisning?',
              a: 'Ja. Ta kontakt så finner vi et tidspunkt som passer.',
            },
            howToInquire: {
              q: 'Hvordan sender vi forespørsel?',
              a: 'Bruk skjemaet vårt med dato, omtrentlig antall og plan. Vi tar kontakt med forslag.',
            },
          },
        },
        closingCta: {
          bgImageAlt: 'Bedriftsfeiring på lokalet — bakgrunnsbilde for kontaktoppfordring',
          eyebrow: 'Neste steg',
          headingLine1Before: 'Klar for å ',
          headingLine1Accent: 'planlegge',
          headingLine2: 'bedriftens dag hos oss?',
          body: 'Kort fortalt hva dere tenker på — så foreslår vi opplegg som passer team og gjester.',
        },
      },
      privatePage: {
        heroImageAlt:
          'Privat feiring og selskap — varm stemning i lokalet for bursdag, konfirmasjon og familiearrangement',
        heroTitleLine1: 'Livets feiringer samlet.',
        heroTitleLine2: 'Hos oss.',
        heroTagline:
          'Feir livets øyeblikk sammen i en ramme som føles personlig, varm og tydelig deres.',
        heroScrollHintAria: 'Rull ned til introduksjonen',
        introSection: {
          eyebrow: 'Privat hos Rønningen',
          headingBefore: 'Der feiringen får ',
          headingAccent: 'personlighet',
          intro:
            'Bursdag, konfirmasjon, dåp og navnefest, minnestund og jubileum — dere samles i lokaler med sjel, der det handler om mennesker og tradisjoner, ikke om standard oppsett fra en katalog.',
          panoramaAlt: 'Feststemning og dekkede bord i selskapslokalet',
          panoramaCaption:
            'Lys, treverk og plass til både taler og latter — en ramme som lar dagen puste.',
          highlights: {
            proximity: {
              title: 'Nærhet',
              desc: 'Rom som føles personlige — ikke anonyme festlokaler. Her handler det om dere og gjestene.',
            },
            tradition: {
              title: 'Deres tradisjon',
              desc: 'Opplegg tilpasset familie, gjester og høytider dere bryr dere om — uten ferdig mal fra oss.',
            },
            gathered: {
              title: 'Samlet på ett sted',
              desc: 'Én destinasjon fra ankomst til siste klem: mindre stress, mer tid til å være til stede.',
            },
          },
        },
        eventsSection: {
          headingBefore: 'Anledninger vi ofte ',
          headingAccent: 'skaper sammen',
          intro:
            'Fra bursdag og konfirmasjon til dåp og navnefest, minnestund og jubileum — utgangspunkter dere kan blande og tilpasse. Vi lander detaljene i dialog med dere.',
          items: {
            birthday: {
              title: 'Bursdag',
              desc: 'Fra barnebursdag med enkel servering til voksne selskap med middag og dans. Vi tilpasser kapasitet, lyd og tidsplan slik at dagen blir deres — ikke en ferdig mal.',
            },
            confirmation: {
              title: 'Konfirmasjon',
              desc: 'Etter seremonien samles dere til fest med plass til slekt og venner. Vi hjelper med flyt, bord og tidsrom — slik at konfirmanten og familien kan være til stede, ikke styre logistikk.',
            },
            baptismNaming: {
              title: 'Dåp & Navnefest',
              desc: 'Rolig og varm ramme når dere vil samle nærmeste etter kirken — enten det gjelder dåp, navnefest eller begge deler i samme helg. Vi avklarer plass til barnestoler, kaffebord og taler i samme rom.',
            },
            memorial: {
              title: 'Minnestund',
              desc: 'Samling etter livets tunge dager — en rolig ramme for minneord, kaffe og tid til å være sammen. Vi koordinerer diskret med dere om det dere trenger.',
            },
            anniversary: {
              title: 'Jubileum',
              desc: 'Sølvbryllup, runde år eller langt ekteskap — vi legger til rette for taler, minner og fest som varer ut kvelden, uten at dere må tenke på alt selv.',
            },
            gathering: {
              title: 'Selskap & mingling',
              desc: 'Fra intime middager til større lag med mingling — dere bestemmer formen, vi tilpasser rom, lyd og flyt slik at stemningen blir riktig fra ankomst til avskjed.',
            },
          },
        },
        packagesSection: {
          heading: 'Våre private pakker',
          intro:
            'Velg blant tre private opplegg — vi tilpasser til feiringen, gjestene og ønskene deres i en uforpliktende prat.',
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
          heading: 'Stemning fra lokalet',
          intro:
            'Fest, samvær og kveldsstemning — et glimt av hvordan private selskap kan ta form hos oss.',
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
              a: 'Blant annet bursdag, konfirmasjon, dåp og navnefest, minnestund og jubileum. Vi avklarer antall gjester, tidsrom og ønsket form i en uforpliktende prat.',
            },
            ownFoodDrink: {
              q: 'Kan vi ta med egen mat og drikke?',
              a: 'Det avklarer vi ut fra valgt opplegg og lokale. Mange kombinerer egen kake og drikke med catering — vi hjelper dere å finne en ryddig løsning.',
            },
            capacity: {
              q: 'Passer det for både små og store selskap?',
              a: 'Ja. Vi tilpasser bordoppsett og rom etter antall gjester — fra intime samlinger til større familielag.',
            },
            howToBook: {
              q: 'Hvordan booker vi?',
              a: 'Send forespørsel med dato, omtrentlig antall og type feiring. Vi kommer tilbake med forslag og neste steg.',
            },
          },
        },
        closingCta: {
          bgImageAlt: 'Privat feiring på lokalet — bakgrunnsbilde for kontaktoppfordring',
          eyebrow: 'Neste steg',
          headingLine1Before: 'Lyst å ',
          headingLine1Accent: 'planlegge',
          headingLine2: 'feiringen hos oss?',
          body: 'Fortell kort hva dere feirer og når — så foreslår vi ramme og opplegg som passer familie og gjester.',
        },
      },
      facilitiesPage: {
        heroImageAlt:
          'Feststemning i lokalet — lys og dekor som viser fasiliteter for bryllup og arrangement',
        heroTitleLine1: 'Alt på ett sted.',
        heroTitleLine2: 'For hele feiringen.',
        heroTagline:
          'Barnepass, kjøkken, suiter, låve og mer — alt feiringen trenger på samme tun.',
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
              desc: 'Trygt opplegg for de minste, slik at foreldre kan være til stede i feiringen uten å bekymre seg for logistikken.',
              imgAlt: 'Barn som leker sammen — illustrerer barnepass og familieselskap',
            },
            accommodation: {
              title: 'Overnatting',
              desc: 'Gjester som kommer langveisfra kan bli natten over — enkelt å samle hele helgen på samme sted.',
              imgAlt: 'Rolig soverom — overnatting for gjester',
            },
            bridalSuite: {
              title: 'Brudesuite',
              desc: 'Rom for forberedelser, ro og private øyeblikk før vielse og fest — et naturlig knutepunkt for bruden og følget.',
              imgAlt: 'Elegant detalj — forberedelser og brudesuite',
            },
            activities: {
              title: 'Aktiviteter',
              desc: 'Mulighet for opplegg som engasjerer ulike aldre og gir pauser og energi gjennom dagen.',
              imgAlt: 'Uteområde og natur — aktiviteter og pauser',
            },
            animals: {
              title: 'Samvær med dyr',
              desc: 'Nærhet til dyr og uteområder som gir en avslappende og særegen ramme rundt arrangementet.',
              imgAlt: 'Dyr på bondegård — naturlig ramme for arrangement',
            },
            barDanceFloor: {
              title: 'Bar & Dansegulv',
              desc: 'Naturlig flyt fra middag til kveld med plass til musikk, toastmaster og dans uten å skifte lokasjon.',
              imgAlt: 'Stemning fra fest og bar',
            },
            kitchen: {
              title: 'Storkjøkken',
              desc: 'Godt utstyrt kjøkken som gjør det enkelt for catering, buffét og servering i større skala.',
              imgAlt: 'Profesjonelt kjøkken til catering og servering',
            },
            universalDesign: {
              title: 'Universelt utformet',
              desc: 'Tilrettelagt slik at gjester med ulike behov kan komme seg inn, delta og føle seg velkomne.',
              imgAlt: 'Tilgjengelig bygning og inngang — universell utforming',
            },
            parking: {
              title: 'Gratis parkering (mulighet til å lade eller la bilen stå igjen)',
              desc: 'God plass til biler, lademuligheter og mulighet til å avtale at bilen kan stå — praktisk for alle som kjører.',
              imgAlt: 'Biler og parkering — ankomst for gjester',
            },
            barn: {
              title: 'Låve',
              desc: 'Hovedrommet med autentisk stemning — ideelt til middag, taler, dans og fellesskap under samme tak.',
              imgAlt: 'Festlokale og feststemning i låve eller selskapslokale',
            },
          },
        },
        useCasesSection: {
          headingBefore: 'Slik kan fasilitetene ',
          headingAccent: 'brukes i praksis',
          items: {
            familyCelebration: {
              title: 'Familiefeiring',
              desc: 'Rom for både små og store: autentisk låve, trygt barnepass og uteområder som gir pauser og lek — slik at hele familien kan være til stede uten stress.',
              imgAlt: 'Familiefeiring — fasiliteter for feiring med barn og voksne',
            },
            weddingWeekend: {
              title: 'Bryllupshelg',
              desc: 'Fra forberedelser til siste dans: suite til dere, sengeplass for gjester og kveld på dansegulvet — ett sted, ett sammenhengende løp dere kan slappe av i.',
              imgAlt: 'Bryllupsfeiring — helg på lokalet',
            },
            corporateEvening: {
              title: 'Bedriftskveld',
              desc: 'Imponer teamet med profesjonelt kjøkken, tydelig romflyt og teknisk oppsett — dere får et arrangement som føles gjennomført, uten at logistikken stjeler oppmerksomheten.',
              imgAlt: 'Bedriftsarrangement på lokalet',
            },
            outdoorsIndoors: {
              title: 'Ute og inne',
              desc: 'La gjestene trekke pusten ute blant natur og dyr, og samle dere til middag og program inne i låven — en helhet som føles avslappet og litt annerledes.',
              imgAlt: 'Ute- og innendørs rom på lokalet',
            },
            weekendGuests: {
              title: 'Helg med gjester',
              desc: 'Når folk kommer langveisfra: overnatting, parkering og fest på samme tun — færre avtaler og kjøring, mer tid til å være vertskap.',
              imgAlt: 'Gjester på overnatting — helg på lokalet',
            },
            livelyEvening: {
              title: 'Kveld med puls',
              desc: 'Naturlig flyt fra middag og taler til bar og dans — uten å pakke sammen og flytte gjestene. Stemningen får lov til å bygge seg hele kvelden.',
              imgAlt: 'Kveldsfest — bar og dansegulv',
            },
          },
        },
        packagesSection: {
          heading: 'Velg nivå for fasiliteter',
          intro:
            'Tre nivåer å kombinere — vi justerer omfang og innhold med dere slik at fasilitetene passer arrangementet og budsjettet.',
          items: {
            basic: {
              name: 'Basis fasiliteter',
              price: 'På forespørsel',
              detail: 'Tilbud etter samtale',
              fit: 'Et tydelig grunnoppsett med de viktigste rammene på plass.',
              bullet1: 'Låve',
              bullet2: 'Storkjøkken',
              bullet3: 'Universelt utformet',
              bullet4: 'Gratis parkering (mulighet til å lade eller la bilen stå igjen)',
            },
            comfortStay: {
              name: 'Komfort + opphold',
              price: 'På forespørsel',
              detail: 'Tilpasses behov',
              fit: 'Når dere ønsker mer komfort for vertskap og gjester over tid.',
              bullet1: 'Overnatting',
              bullet2: 'Brudesuite',
              bullet3: 'Bar & Dansegulv',
              bullet4: 'Aktiviteter',
            },
            completeFamily: {
              name: 'Komplett familiesett',
              price: 'Individuelt',
              detail: 'Etter omfang',
              fit: 'For dere som ønsker et helhetlig oppsett for både barn og voksne.',
              bullet1: 'Barnepass',
              bullet2: 'Samvær med dyr',
              bullet3: 'Aktiviteter',
              bullet4: 'Tilpasset flyt mellom ute og inne',
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
              a: 'Ja, vi legger vekt på at lokalet skal være tilgjengelig for gjester med ulike behov.',
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
