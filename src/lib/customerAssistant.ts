/**
 * RAG-style assistant: retrieve from JSON knowledge (FAQ, venue facts, packages),
 * then compose a short reply. No LLM — no information outside the knowledge base.
 * Specific dates, prices, and calendar checks always defer to direct contact.
 */
import venueFacts from '../chatbot-data/venue_facts.json';
import faqEntries from '../chatbot-data/faq_no_en.json';
import packageGuidance from '../chatbot-data/packages_no_en.json';
import contactInfo from '../chatbot-data/contact_info.json';
import systemGuidelines from '../chatbot-data/system_guidelines.json';

type Lang = 'no' | 'en';

type Message = {
  role: 'assistant' | 'user';
  text: string;
};

const tokenise = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter(Boolean);

const includesAny = (text: string, terms: string[]) => terms.some((t) => text.includes(t));

/** Norwegian content words (single-token match via tokenise). */
const NO_LEX = new Set([
  'hei',
  'hva',
  'hvordan',
  'kan',
  'dere',
  'pris',
  'tilgjengelig',
  'bryllup',
  'kontakt',
  'og',
  'takk',
  'jeg',
  'vi',
  'hjelp',
  'informasjon',
  'bestille',
  'lokalet',
  'fest',
  'arrangement',
  'gjester',
  'ønsket',
  'skriv',
  'gjerne',
  'når',
  'hvor',
  'antall',
  'oppsett',
]);

/** English content words (single-token match). */
const EN_LEX = new Set([
  'the',
  'what',
  'how',
  'when',
  'where',
  'please',
  'thank',
  'thanks',
  'hello',
  'wedding',
  'event',
  'your',
  'our',
  'book',
  'booking',
  'price',
  'guest',
  'guests',
  'capacity',
  'facility',
  'facilities',
  'package',
  'contact',
  'help',
  'information',
  'available',
  'cost',
]);

/**
 * Detect reply language from the user's message. `siteLang` breaks ties and
 * applies when the message is empty (e.g. whitespace).
 */
export const detectLanguage = (text: string, siteLang: Lang = 'en'): Lang => {
  const trimmed = text.trim();
  if (!trimmed) return siteLang;
  if (/[æøå]/i.test(trimmed)) return 'no';
  const lower = trimmed.toLowerCase();
  const tokens = tokenise(trimmed);
  let noScore = tokens.filter((t) => NO_LEX.has(t)).length;
  let enScore = tokens.filter((t) => EN_LEX.has(t)).length;
  if (/\bhi\b/i.test(trimmed)) enScore += 1;
  if (includesAny(lower, ['can we', 'can i', 'do you', 'thank you', 'what is', 'how much', 'is there'])) enScore += 2;
  if (includesAny(lower, ['hva er', 'hvordan kan', 'kan dere', 'takk skal'])) noScore += 2;
  if (noScore > enScore) return 'no';
  if (enScore > noScore) return 'en';
  return siteLang;
};

const withEnding = (body: string, lang: Lang, replyCount: number) => {
  const endings = lang === 'no' ? contactInfo.contactCtaNo : contactInfo.contactCtaEn;
  const ending = endings[replyCount % endings.length];
  return `${body}\n\n${ending}`;
};

const faqScore = (queryTokens: string[], candidateQuestions: string[]) => {
  let score = 0;
  for (const q of candidateQuestions) {
    const qTokens = tokenise(q);
    const qLower = q.toLowerCase();
    let overlap = queryTokens.filter((t) => qTokens.includes(t)).length;
    if (overlap < 2) {
      for (const t of queryTokens) {
        if (t.length >= 4 && qLower.includes(t)) {
          overlap = Math.max(overlap, 1);
          break;
        }
      }
    }
    score = Math.max(score, overlap);
  }
  return score;
};

const intentBoost = (intent: string, lower: string): number => {
  if (intent === 'availability_unknown' && includesAny(lower, ['ledig', 'available', 'free', 'kalender', 'calendar', 'book']))
    return 2;
  if (
    intent === 'availability_unknown' &&
    includesAny(lower, ['dato', 'date']) &&
    !includesAny(lower, ['pris', 'price', 'cost', 'koster', 'kostnad', 'honorar', 'fee'])
  )
    return 1;
  if (intent === 'pricing_unknown' && includesAny(lower, ['pris', 'price', 'cost', 'koster', 'kostnad', 'fee', 'honorar']))
    return 2;
  if (intent === 'wedding_fit' && includesAny(lower, ['bryllup', 'wedding', 'vielse', 'ceremony'])) return 2;
  if (intent === 'corporate_fit' && includesAny(lower, ['bedrift', 'corporate', 'firma', 'company', 'julebord', 'konferanse', 'møte', 'meeting']))
    return 2;
  if (intent === 'private_fit' && includesAny(lower, ['bursdag', 'birthday', 'konfirmasjon', 'confirmation', 'familie', 'family', 'privat', 'private']))
    return 2;
  if (intent === 'parking' && includesAny(lower, ['park', 'lade', 'charging', 'cars', 'bil', 'parker']))
    return 2;
  if (intent === 'basis_inclusions' && includesAny(lower, ['basis', 'inkludert', 'included', 'følger med', 'come with']))
    return 2;
  if (
    intent === 'partners_catering' &&
    includesAny(lower, [
      'catering',
      'leverandør',
      'supplier',
      'fotograf',
      'photographer',
      'dj',
      'blomster',
      'flowers',
      'samarbeid',
      'partner',
      'styling',
      'musikk',
      'music',
    ])
  )
    return 2;
  if (
    intent === 'how_to_book' &&
    includesAny(lower, ['kontakt', 'contact', 'e-post', 'email', 'telefon', 'phone', 'skjema', 'form', 'booking', 'bestill'])
  )
    return 2;
  if (intent === 'plus_premium_diff' && includesAny(lower, ['plus', 'premium', 'forskjell', 'difference', 'nivå', 'level']))
    return 2;
  if (
    intent === 'accessibility_universal' &&
    includesAny(lower, ['rullestol', 'wheelchair', 'universell', 'universal', 'tilrettelegg', 'handicap', 'bevegelses'])
  )
    return 2;
  if (intent === 'pets_policy' && includesAny(lower, ['hund', 'dog', 'dyr', 'pet', 'katt', 'cat']))
    return 2;
  if (
    intent === 'music_dance' &&
    includesAny(lower, ['musikk', 'music', 'band', 'danse', 'dance', 'toastmaster', 'playlist', 'spotify', 'diskotek'])
  )
    return 2;
  if (intent === 'outdoor_area' && includesAny(lower, ['ute', 'utendørs', 'outdoor', 'hage', 'garden', 'telt', 'tent', 'vær', 'weather']))
    return 2;
  if (
    intent === 'timing_schedule' &&
    includesAny(lower, ['hvor lenge', 'how long', 'duration', 'tidspunkt', 'oppstilling', 'setup', 'slutt', 'end time', 'åpning', 'steng'])
  )
    return 2;
  if (
    intent === 'payment_cancel' &&
    includesAny(lower, ['deposit', 'innskudd', 'faktura', 'invoice', 'betaling', 'payment', 'avbestilling', 'cancel', 'refund', 'vilkår', 'terms'])
  )
    return 2;
  if (intent === 'viewing_tour' && includesAny(lower, ['omvisning', 'visning', 'tour', 'viewing', 'se lokalet', 'see the venue', 'befaring']))
    return 2;
  if (intent === 'transport_public' && includesAny(lower, ['tog', 'train', 'buss', 'bus', 'kollektiv', 'public transport', 'ankomst']))
    return 2;
  if (intent === 'wifi_av' && includesAny(lower, ['wifi', 'wi-fi', 'internet', 'projektor', 'projector', 'mikrofon', 'microphone', 'skjerm', 'screen']))
    return 2;
  if (intent === 'decoration' && includesAny(lower, ['dekorasjon', 'decoration', 'pynt', 'ballong', 'lys', 'candles']))
    return 2;
  if (intent === 'smoking_policy' && includesAny(lower, ['røyk', 'smok', 'tobacco', 'sigarett']))
    return 2;
  if (intent === 'overnight_stay' && includesAny(lower, ['overnatting', 'overnight', 'soverom', 'rom til gjester', 'guest room', 'hotel']))
    return 2;
  if (intent === 'cleanup_policy' && includesAny(lower, ['opprydding', 'cleaning', 'vask', 'søppel', 'trash']))
    return 2;
  if (intent === 'insurance_damage' && includesAny(lower, ['forsikring', 'insurance', 'skade', 'damage', 'tyveri', 'theft']))
    return 2;
  if (intent === 'photo_video_policy' && includesAny(lower, ['foto', 'photo', 'video', 'drone', 'instagram', 'opptak', 'filming']))
    return 2;
  if (intent === 'table_layout' && includesAny(lower, ['runde bord', 'round tables', 'langbord', 'oppsett', 'layout', 'plassering']))
    return 2;
  if (intent === 'season_pricing_hint' && includesAny(lower, ['høysesong', 'lavsesong', 'helg', 'weekend', 'ukedag', 'weekday', 'sesong']))
    return 2;
  if (intent === 'noise_neighbors' && includesAny(lower, ['støy', 'noise', 'nabo', 'neighbor', 'lydnivå', 'sound level']))
    return 2;
  if (intent === 'external_vendor' && includesAny(lower, ['leverandør', 'vendor', 'egen tekniker', 'own technician', 'leie av']))
    return 2;
  if (intent === 'dressing_bridal' && includesAny(lower, ['brudesuite', 'bride suite', 'forberedelse', 'smink', 'getting ready']))
    return 2;
  if (intent === 'gift_table_coat' && includesAny(lower, ['gavebord', 'gift table', 'kleshenger', 'coat rack', 'garderobe']))
    return 2;
  if (intent === 'address_directions' && includesAny(lower, ['adresse', 'address', 'kart', 'map', 'finne fram', 'directions', 'kjørerute']))
    return 2;
  if (intent === 'opening_hours_office' && includesAny(lower, ['åpning', 'opening hours', 'når svarer', 'when do you reply', 'kundeservice']))
    return 2;
  if (intent === 'bring_own_alcohol' && includesAny(lower, ['vin', 'wine', 'øl', 'beer', 'sprit', 'skjenk', 'alkohol', 'alcohol']))
    return 2;
  if (intent === 'presentation_meeting' && includesAny(lower, ['presentasjon', 'presentation', 'flipover', 'flipchart', 'workshop', 'møte']))
    return 2;
  if (intent === 'kids_entertainment' && includesAny(lower, ['aktivitet', 'underholdning', 'lek', 'entertainment', 'activities for']))
    return 2;
  if (intent === 'what_to_prepare' && includesAny(lower, ['forberede', 'prepare', 'sjekkliste', 'checklist', 'tenke på', 'what should we']))
    return 2;
  if (intent === 'family_friendly' && includesAny(lower, ['barnevennlig', 'family friendly', 'lekerom', 'playroom']))
    return 2;
  return 0;
};

const MONTH_WORD =
  /\b(januar|februar|mars|april|mai|juni|juli|august|september|oktober|november|desember|january|february|march|april|may|june|july|august|september|october|november|december)\b/i;

const hasSpecificTimeInQuery = (lower: string, raw: string) =>
  MONTH_WORD.test(lower) || /\b20[2-3]\d\b/.test(raw);

const needsDirectContactForCalendarOrQuote = (lower: string, raw: string) => {
  if (!hasSpecificTimeInQuery(lower, raw)) return false;
  const bookingOrPrice = includesAny(lower, [
    'ledig',
    'tilgjengelig',
    'available',
    'booke',
    'booking',
    'book ',
    'reserver',
    'pris',
    'price',
    'koster',
    'kostnad',
    'how much',
    'hvor mye',
    'helg',
    'weekend',
    'uke ',
    ' week',
  ]);
  const eventOrHire = includesAny(lower, [
    'bryllup',
    'wedding',
    'konfirmasjon',
    'confirmation',
    'julebord',
    'bursdag',
    'birthday',
    'arrangement',
    'fest',
    'leie',
    'lokalet',
    'oktober',
    'october',
  ]);
  return bookingOrPrice || eventOrHire;
};

const getBestFaq = (input: string, _lang: Lang) => {
  const queryTokens = tokenise(input);
  const lower = input.toLowerCase();
  let best: (typeof faqEntries)[number] | null = null;
  let bestScore = 0;
  for (const entry of faqEntries) {
    const questions = [...entry.questions_no, ...entry.questions_en];
    const score = faqScore(queryTokens, questions) + intentBoost(entry.intent, lower);
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }
  return bestScore >= 2 && best ? best : null;
};

const packageAnswer = (lang: Lang) => {
  if (lang === 'no') {
    const lines = packageGuidance.map((p) => `${p.name_no}: ${p.guidance_no}`);
    return `Pakketyper:\n• ${lines.join('\n• ')}`;
  }
  const lines = packageGuidance.map((p) => `${p.name_en}: ${p.guidance_en}`);
  return `Packages:\n• ${lines.join('\n• ')}`;
};

const fallback = (lang: Lang) =>
  lang === 'no'
    ? 'Avhenger av arrangement og oppsett — eksakte detaljer avklares direkte.'
    : 'Depends on event and layout — exact details are confirmed directly.';

const asksEventOverview = (lower: string) =>
  includesAny(lower, [
    'what events',
    'what kind',
    'what types',
    'which events',
    'hvilke arrangement',
    'hvilke typer',
    'hva slags',
    'arrangementstype',
    'what do you host',
    'what can you host',
    'hva tilbyr',
    'passer lokalet',
    'event types',
    'types of events',
  ]);

export const generateAssistantReply = (input: string, replyCount: number, siteLang: Lang = 'en'): string => {
  const text = input.trim();
  const lang = detectLanguage(input, siteLang);
  const lower = text.toLowerCase();

  if (!text) {
    return withEnding(
      lang === 'no'
        ? 'Skriv gjerne arrangementstype, antall gjester og ønsket tidspunkt.'
        : 'Please share your event type, guest count, and preferred timing.',
      lang,
      replyCount,
    );
  }

  if (
    /^\s*(hei|hallo|hello|hey|morn|god\s?(morgen|dag|kveld))\b[!?.,\s]*$/i.test(text) ||
    /^\s*(hi)\b[!?.,\s]*$/i.test(text)
  ) {
    return withEnding(
      lang === 'no'
        ? 'Hei! Hva lurer du på om Rønningen Selskapslokale — lokalet, kapasitet, fasiliteter eller booking?'
        : 'Hello! What would you like to know about Rønningen Selskapslokale — the venue, capacity, facilities, or booking?',
      lang,
      replyCount,
    );
  }

  if (/^(takk|thank|thanks)\b/i.test(lower) && text.length < 60) {
    return withEnding(
      lang === 'no'
        ? 'Bare hyggelig! Ta kontakt om du vil gå videre med dato eller tilbud.'
        : 'You’re welcome! Contact us when you’re ready to discuss dates or a quote.',
      lang,
      replyCount,
    );
  }

  if (needsDirectContactForCalendarOrQuote(lower, text)) {
    return withEnding(
      lang === 'no' ? systemGuidelines.specificDateOrPeriodNo : systemGuidelines.specificDateOrPeriodEn,
      lang,
      replyCount,
    );
  }

  if (includesAny(lower, ['package', 'pakke', 'basis', 'plus', 'premium'])) {
    const pkgFaq = getBestFaq(text, lang);
    if (pkgFaq) {
      return withEnding(lang === 'no' ? pkgFaq.answer_no : pkgFaq.answer_en, lang, replyCount);
    }
    return withEnding(packageAnswer(lang), lang, replyCount);
  }

  if (includesAny(lower, ['where', 'location', 'hvor', 'lier', 'sylling'])) {
    const loc = lang === 'no' ? venueFacts.location.no : venueFacts.location.en;
    return withEnding(loc, lang, replyCount);
  }

  if (includesAny(lower, ['capacity', 'kapasitet', 'gjester', 'guests', 'seated'])) {
    const body =
      lang === 'no'
        ? `Ca. ${venueFacts.capacity.seatedApprox} sittende — endelig tall avhenger av oppsett og type.`
        : `About ${venueFacts.capacity.seatedApprox} seated — final count depends on layout and event type.`;
    return withEnding(body, lang, replyCount);
  }

  if (includesAny(lower, ['price', 'pris', 'cost', 'koster', 'available', 'tilgjengelig', 'date', 'dato', 'book'])) {
    const best = getBestFaq(text, lang);
    const answer = best ? (lang === 'no' ? best.answer_no : best.answer_en) : fallback(lang);
    return withEnding(answer, lang, replyCount);
  }

  if (includesAny(lower, ['what is', 'hva er', 'venue', 'lokale', 'atmosphere', 'stemning'])) {
    const body = lang === 'no' ? venueFacts.positioning.no : venueFacts.positioning.en;
    return withEnding(body, lang, replyCount);
  }

  if (
    includesAny(lower, [
      'facility',
      'fasilitet',
      'kitchen',
      'kjøkken',
      'bar',
      'playroom',
      'lekerom',
      'wifi',
      'wi-fi',
      'toalett',
      'garderobe',
      'prosjektor',
      'projector',
      'uteplass',
      'outdoor area',
      'lydanlegg',
    ])
  ) {
    const list = lang === 'no' ? venueFacts.facilities_no : venueFacts.facilities_en;
    const intro = lang === 'no' ? 'Fasiliteter:' : 'Facilities:';
    return withEnding(`${intro} ${list.join('; ')}.`, lang, replyCount);
  }

  const best = getBestFaq(text, lang);
  if (best) {
    return withEnding(lang === 'no' ? best.answer_no : best.answer_en, lang, replyCount);
  }

  if (asksEventOverview(lower)) {
    const list = (lang === 'no' ? venueFacts.events_no : venueFacts.events_en).slice(0, 8);
    const body =
      lang === 'no'
        ? `Vi passer bl.a. til: ${list.join(', ')}. Ca. ${venueFacts.capacity.seatedApprox} sittende.`
        : `We host: ${list.join(', ')}. About ${venueFacts.capacity.seatedApprox} seated.`;
    return withEnding(body, lang, replyCount);
  }

  return withEnding(
    lang === 'no' ? systemGuidelines.unknownOutOfKbNo : systemGuidelines.unknownOutOfKbEn,
    lang,
    replyCount,
  );
};

export const appendConversation = (
  current: Message[],
  userText: string,
  replyCount: number,
  siteLang: Lang = 'en',
): { nextMessages: Message[]; nextReplyCount: number } => {
  const reply = generateAssistantReply(userText, replyCount, siteLang);
  return {
    nextMessages: [...current, { role: 'user', text: userText }, { role: 'assistant', text: reply }],
    nextReplyCount: replyCount + 1,
  };
};
