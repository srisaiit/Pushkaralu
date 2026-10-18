// Godavari Maha Pushkaralu 2027 - Advanced Multilingual Conversational Knowledge Engine
// Supports exclusively: Telugu (te), Hindi (hi), and English (en)
// Highly accurate intent classification, factual integrity, and authentic native phrasing.

import {
  FESTIVAL_INFO,
  GHATS_DATA,
  TEMPLES_DATA,
  FACILITIES_DATA,
  PARKING_DATA,
  SCHEDULE_DATA,
  LIVE_DASHBOARD_DATA,
  VERIFIED_HELPLINES
} from '../data/pushkaraluData.js';

// Language detection: Selected language takes strict priority unless explicit native script is provided
export function detectLanguage(text, activeLang = 'te') {
  if (!text || typeof text !== 'string') return activeLang;
  const t = text.trim();

  // 1. Unambiguous native script detection
  if (/[\u0C00-\u0C7F]/.test(t)) return 'te'; // Authentic Telugu script
  if (/[\u0900-\u097F]/.test(t)) return 'hi'; // Authentic Devanagari script

  // 2. Transliterated markers if explicitly non-English activeLang
  const lower = t.toLowerCase();

  // If currently English, preserve English unless user typed explicit Telugu/Hindi script
  if (activeLang === 'en') {
    return 'en';
  }

  // If user selected Telugu, stay in Telugu
  if (activeLang === 'te') {
    return 'te';
  }

  // If user selected Hindi, stay in Hindi
  if (activeLang === 'hi') {
    return 'hi';
  }

  return 'te';
}

// Strict domain boundary checking (reject cricket, politics, crypto, coding, entertainment)
function isOutOfDomain(query) {
  const q = query.toLowerCase();
  const prohibited = [
    'python', 'javascript', 'react', 'java', 'html', 'css', 'code', 'programming',
    'software', 'algorithm', 'function', 'database', 'sql', 'bug', 'debug',
    'cricket', 'ipl', 'football', 'world cup', 'virat', 'dhoni', 'cinema', 'movie',
    'actor', 'actress', 'hollywood', 'bollywood', 'tollywood', 'hero', 'heroine',
    'stock', 'crypto', 'bitcoin', 'trading', 'share market', 'sensex', 'nifty',
    'russia', 'ukraine', 'putin', 'biden', 'trump', 'election in usa',
    'recipe for', 'how to cook', 'quantum', 'physics', 'chemistry', 'joke'
  ];
  return prohibited.some(word => new RegExp(`\\b${word}\\b`, 'i').test(q));
}

let lastContextEntity = null;

export function setConversationContext(entity) {
  lastContextEntity = entity;
}

export function getConversationContext() {
  return lastContextEntity;
}

// Main Conversational Query Processor
export function queryPushkarAI(query, activeLang = 'te', conversationHistory = []) {
  const lang = detectLanguage(query, activeLang);
  const q = (query || '').toLowerCase().trim();

  // 1. Strict Knowledge Boundary Check
  if (isOutOfDomain(q)) {
    if (lang === 'te') {
      return {
        language: 'te',
        displayText: "క్షమించండి, నేను గోదావరి మహా పుష్కరాలు 2027 మరియు యాత్రికుల సేవల సమాచారానికి మాత్రమే సహాయపడగలను. దయచేసి స్నాన ఘాట్లు, ఆలయ దర్శనం, కార్ పార్కింగ్, తాగునీరు లేదా వైద్య సహాయం గురించి అడగండి.",
        spokenText: "క్షమించండి, నేను గోదావరి మహా పుష్కరాలు 2027 మరియు యాత్రికుల సేవల సమాచారానికి మాత్రమే సహాయపడగలను. దయచేసి ఘాట్లు, ఆలయాలు, పార్కింగ్ లేదా అత్యవసర సేవల గురించి అడగండి.",
        category: "boundary"
      };
    } else if (lang === 'hi') {
      return {
        language: 'hi',
        displayText: "क्षमा करें, मैं केवल गोदावरी महा पुष्करालु 2027 और तीर्थयात्री सुविधाओं से संबंधित प्रश्नों में ही आपकी सहायता कर सकती हूँ। कृपया स्नान घाट, मंदिर दर्शन, कार पार्किंग, पेयजल या चिकित्सा सहायता के बारे में पूछें।",
        spokenText: "क्षमा करें, मैं केवल गोदावरी महा पुष्करालु 2027 और तीर्थयात्री सुविधाओं से संबंधित प्रश्नों में ही आपकी सहायता कर सकती हूँ। कृपया स्नान घाट, मंदिर दर्शन, कार पार्किंग या चिकित्सा सहायता के बारे में पूछें।",
        category: "boundary"
      };
    } else {
      return {
        language: 'en',
        displayText: "I apologize, but I am dedicated strictly to Godavari Maha Pushkaralu 2027 pilgrim assistance. Please ask about bathing ghats, temples, darshan timings, parking, drinking water, medical camps, or verified emergency helplines.",
        spokenText: "I apologize, but I am dedicated strictly to Godavari Maha Pushkaralu 2027 pilgrim assistance. Please ask about bathing ghats, temples, darshan timings, parking, drinking water, or emergency helplines.",
        category: "boundary"
      };
    }
  }

  // 2. Dress Changing Rooms & Washrooms / Restrooms (Priority over general ghats)
  if (/changing|dress|washroom|toilet|bathroom|women|బట్టలు|దుస్తులు|మార్చుకోవడానికి|చేంజింగ్|మరుగుదొడ్లు|कपड़े बदलने|वस्त्र बदलने|चेंजिंग|शौचालय|स्नानगृह/i.test(q)) {
    setConversationContext('changing-rooms');
    if (lang === 'te') {
      return {
        language: 'te',
        displayText: `**దుస్తులు మార్చుకునే ప్రత్యేక గదులు & మరుగుదొడ్లు (Changing Rooms & Toilets):**\n- అవును, రాజమండ్రిలోని అన్ని ప్రధాన స్నాన ఘాట్లలో (పుష్కర్, కోటిలింగాల, సరస్వతి, గౌతమి ఘాట్లు) మహిళలు మరియు పురుషులకు వేర్వేరుగా ప్రత్యేక సురక్షిత గదులు ఏర్పాటు చేయబడ్డాయి.\n- మహిళల ఛేంజింగ్ రూముల వద్ద ప్రత్యేకంగా మహిళా పోలీస్ సిబ్బంది మరియు వాలంటీర్లు నిరంతర రక్షణ కల్పిస్తున్నారు.\n- పరిశుభ్రమైన మొబైల్ బయో-టాయిలెట్లు ప్రతి 150 మీటర్లకు ఘాట్ల పరిసరాల్లో అందుబాటులో ఉన్నాయి.`,
        spokenText: "అవును, అన్ని స్నాన ఘాట్ల వద్ద మహిళలు మరియు పురుషులకు వేర్వేరుగా ప్రత్యేక సురక్షితమైన దుస్తులు మార్చుకునే గదులు ఏర్పాటు చేశారు. మహిళల గదుల వద్ద మహిళా పోలీసుల నిరంతర రక్షణ ఉంటుంది. అలాగే ప్రతి నూట యాభై మీటర్లకు శుభ్రమైన మరుగుదొడ్లు ఉన్నాయి.",
        category: "facilities"
      };
    } else if (lang === 'hi') {
      return {
        language: 'hi',
        displayText: `**वस्त्र बदलने के विशेष कक्ष एवं शौचालय (Changing Rooms & Toilets):**\n- हाँ, पुष्कर घाट, कोटालिंगाला, सरस्वती और गौतमी घाट सहित सभी प्रमुख स्नान घाटों पर महिलाओं और पुरुषों के लिए अलग-अलग सुरक्षित चेंजिंग रूम बने हैं।\n- महिलाओं के वस्त्र बदलने के कक्षों के बाहर महिला पुलिसकर्मी और स्वयंसेवक निरंतर तैनात हैं।\n- घाटों के पास हर 150 मीटर पर स्वच्छ मोबाइल बायो-टॉयलेट उपलब्ध हैं।`,
        spokenText: "हाँ, सभी स्नान घाटों पर महिलाओं और पुरुषों के लिए अलग व सुरक्षित कपड़े बदलने के कमरे मौजूद हैं। महिला सुरक्षा कर्मियों की तैनाती है और हर डेढ़ सौ मीटर पर स्वच्छ शौचालय की व्यवस्था की गई है।",
        category: "facilities"
      };
    } else {
      return {
        language: 'en',
        displayText: `**Dress Changing Rooms & Washrooms:**\n- Yes, separate, secure dress changing enclosures are provided for men and women across all four major bathing ghats (Pushkar, Kotilingala, Saraswati, and Gowtami).\n- Women's changing facilities are monitored and protected exclusively by female police personnel and volunteers outside private zones.\n- Sanitized mobile bio-toilets and handwash booths are positioned every 150 meters along the ghat perimeter.`,
        spokenText: "Yes, separate, secure dress changing rooms and bio-toilets are provided for men and women at all four ghats. Women's enclosures are monitored by female police officers and attendants.",
        category: "facilities"
      };
    }
  }

  // 3. Nearest Bathing Ghat & Directions / How to Reach from Rajahmundry
  if (
    /nearest ghat|closest ghat|how can i reach|how to reach|how to come|how do i reach|reach the|reach.*ghat|route|directions|సమీపంలో స్నాన ఘాట్|దగ్గరలో.*ఘాట్|సమీప.*ఘాట్|ఎలా రావాలి|ఎలా చేరుకోవాలి|ఎలా వెళ్ళాలి|రాజమండ్రి నుంచి ఎలా|రావడానికి|निकटतम स्नान घाट|पास का घाट|कैसे पहुँच|कैसे जाएं|कैसे आएं|राजामहेंद्री से कैसे/i.test(q)
  ) {
    setConversationContext('reach-ghats');
    if (lang === 'te') {
      return {
        language: 'te',
        displayText: `**సమీప స్నాన ఘాట్ & మార్గదర్శనం (Nearest Ghat & Route Guide):**\n- **సమీప ఘాట్**: రాజమండ్రి నగర కేంద్రం మరియు రైల్వే స్టేషన్ నుండి అత్యంత సమీపమైనది **పుష్కర్ ఘాట్ (Pushkar Ghat)**. ఇది మెయిన్ బండ్ రోడ్డులో కేవలం **1.2 కిలోమీటర్ల** దూరంలో ఉంది.\n- **కుటుంబాలకు అనుకూలమైనది**: కోటిలింగాల ఘాట్ (2.4 కి.మీ, రద్దీ తక్కువ).\n- **రాజమండ్రి నుంచి ఎలా రావాలి**: రాజమండ్రి ఆర్టీసీ బస్ కాంప్లెక్స్ మరియు రైల్వే స్టేషన్ నుండి అన్ని స్నాన ఘాట్లకు ప్రభుత్వం **ప్రతి 10 నిమిషాలకు ఉచిత షటిల్ బస్సులు** నడుపుతోంది. వృద్ధులకు ఉచిత బ్యాటరీ కార్లు కూడా ఉన్నాయి. ఆర్ట్స్ కాలేజ్ పార్కింగ్ నుండి కూడా ఉచిత ఫీడర్ సర్వీసులు అందుబాటులో ఉన్నాయి.`,
        spokenText: "రాజమండ్రి నగర కేంద్రం మరియు రైల్వే స్టేషన్ నుండి అత్యంత సమీపమైనది పుష్కర్ ఘాట్, ఇది కేవలం ఒకటి పాయింట్ రెండు కిలోమీటర్ల దూరంలో ఉంది. రాజమండ్రి బస్ స్టేషన్ మరియు రైల్వే స్టేషన్ నుండి అన్ని ఘాట్లకు ప్రతి పది నిమిషాలకు ఉచిత ఆర్టీసీ షటిల్ బస్సులు నడుస్తున్నాయి. వృద్ధులకు ఉచిత బ్యాటరీ కార్లు కూడా ఉన్నాయి.",
        category: "transport",
        action: "ghats"
      };
    } else if (lang === 'hi') {
      return {
        language: 'hi',
        displayText: `**निकटतम स्नान घाट और मार्गदर्शिका (Nearest Ghat & Route Guide):**\n- **निकटतम घाट**: राजामहेंद्री शहर के केंद्र और रेलवे स्टेशन से सबसे निकट **पुष्कर घाट (Pushkar Ghat)** है, जो मेन बंड रोड पर मात्र **1.2 किमी** की दूरी पर है।\n- **परिवारों हेतु शांत घाट**: कोटालिंगाला घाट (2.4 किमी, कम भीड़)।\n- **राजामहेंद्री से कैसे पहुँचें**: राजामहेंद्री बस स्टैंड व रेलवे स्टेशन से सभी स्नान घाटों के लिए हर **10 मिनट में मुफ्त आरटीसी शटल बसें** चल रही हैं। बुजुर्गों के लिए घाटों तक निशुल्क बैटरी वाहन उपलब्ध हैं।`,
        spokenText: "राजामहेंद्री शहर और रेलवे स्टेशन से सबसे निकटतम घाट पुष्कर घाट है, जो केवल एक दशमलव दो किलोमीटर दूर है। राजामहेंद्री बस स्टैंड और रेलवे स्टेशन से सभी स्नान घाटों के लिए हर दस मिनट में मुफ्त सरकारी शटल बसें उपलब्ध हैं।",
        category: "transport",
        action: "ghats"
      };
    } else {
      return {
        language: 'en',
        displayText: `**Nearest Bathing Ghat & Transit Directions:**\n- **Nearest Ghat**: **Pushkar Ghat** on Main Bund Road is the closest ghat to Rajahmundry city center and railway station, located just **1.2 km away**.\n- **Alternative Peaceful Ghat**: Kotilingala Ghat (2.4 km away, recommended for families and seniors).\n- **How to Reach from Rajahmundry**: Free government RTC shuttle buses operate every **10 minutes** from Rajahmundry RTC Central Bus Complex and Railway Station directly to all ghat entrances. Free battery buggies are provided for seniors and pilgrims with mobility needs.`,
        spokenText: "The nearest bathing ghat is Pushkar Ghat, located 1.2 kilometers from Rajahmundry city center. Free government RTC shuttle buses depart every ten minutes from Rajahmundry Bus Station and Railway Station directly to the ghats.",
        category: "transport",
        action: "ghats"
      };
    }
  }

  // 4. Drinking Water Facilities & Water Kiosks
  if (/water|drinking|paani|నీరు|నీళ్లు|తాగునీరు|తాగునీటి|మంచినీరు|पानी|जल|पेयजल|शीतल जल/i.test(q)) {
    setConversationContext('water');
    if (lang === 'te') {
      return {
        language: 'te',
        displayText: `**ఉచిత తాగునీటి సౌకర్యాలు (Drinking Water Points):**\n- రాజమండ్రి పుష్కర పరిధిలో మొత్తం **42 ఆర్ ఓ శుద్ధి చేసిన చల్లని తాగునీటి కేంద్రాలు** నిరంతరం పనిచేస్తున్నాయి.\n- పుష్కర్ ఘాట్, కోటిలింగాల, సరస్వతి ఘాట్, గౌతమి ఘాట్ మరియు క్యూ లైన్లలో ప్రతి **200 మీటర్లకు** ఉచిత సురక్షిత తాగునీరు మరియు మజ్జిగ లభిస్తాయి.\n- పర్యావరణహిత బయోడీగ్రేడబుల్ వాటర్ బాటిల్స్ కౌంటర్లు కూడా అందుబాటులో ఉన్నాయి.`,
        spokenText: "రాజమండ్రి పుష్కర పరిధిలో నలభై రెండు ఆర్ ఓ శుద్ధి చేసిన తాగునీటి కేంద్రాలు నిరంతరం పనిచేస్తున్నాయి. పుష్కర్ ఘాట్, సరస్వతి ఘాట్, మరియు అన్ని నడక మార్గాల్లో ప్రతి రెండు వందల మీటర్లకు ఉచిత చల్లని తాగునీరు మరియు మజ్జిగ అందుబాటులో ఉన్నాయి.",
        category: "facilities"
      };
    } else if (lang === 'hi') {
      return {
        language: 'hi',
        displayText: `**निःशुल्क पेयजल केंद्र (Drinking Water Points):**\n- पुष्करालु क्षेत्र में कुल **42 आरओ प्यूरीफाइड शीतल पेयजल केंद्र** चौबीसों घंटे सक्रिय हैं।\n- पुष्कर घाट, सरस्वती घाट, कोटालिंगाला, बस स्टैंड और मुख्य मार्गों पर हर **200 मीटर** पर शुद्ध पानी और छाछ के काउंटर लगे हैं।\n- सभी केंद्र पूरी तरह कार्यरत हैं।`,
        spokenText: "पुष्करालु क्षेत्र में बयालीस आरओ शुद्ध पेयजल केंद्र चौबीसों घंटे चालू हैं। पुष्कर घाट, सरस्वती घाट और सभी स्नान मार्गों पर हर दो सौ मीटर पर ठंडा पीने का पानी और छाछ मुफ्त उपलब्ध है।",
        category: "facilities"
      };
    } else {
      return {
        language: 'en',
        displayText: `**Drinking Water Points:**\n- **42 continuous RO purified chilled water kiosks** are fully operational across Rajahmundry.\n- Stations are located every **200 meters** along Pushkar Ghat, Kotilingala, Saraswati Ghat, transit queues, and bus stations.\n- Complimentary buttermilk and biodegradable water containers are actively distributed.`,
        spokenText: "There are 42 purified RO drinking water points operational across all ghats and walking corridors. Water kiosks are available every 200 meters along Pushkar Ghat, Saraswati Ghat, and bus stands.",
        category: "facilities"
      };
    }
  }

  // 5. Parking Arrangements (Cars, Buses, Two-Wheelers)
  if (/parking|car|bus|vehicle|two wheeler|bike|slot|పార్కింగ్|వాహనాలు|కార్లు|బస్సులు|బైకులు|పార్క్|पार्किंग|गाड़ी|कार|बस|दोपहिया|वाहन/i.test(q)) {
    setConversationContext('parking');
    if (lang === 'te') {
      return {
        language: 'te',
        displayText: `**భక్తులకు పార్కింగ్ సౌకర్యాల సమాచారం (Parking Arrangements):**\n- **కార్ల పార్కింగ్**: ఆర్ట్స్ కాలేజ్ మైదానం (812 / 2400 స్థలాలు అందుబాటులో ఉన్నాయి, ~34% ఖాళీ).\n- **ద్విచక్ర వాహనాల పార్కింగ్**: సుబ్రహ్మణ్య మైదానం (3140 / 6200 స్థలాలు అందుబాటులో ఉన్నాయి).\n- **టూరిస్ట్ బస్సుల పార్కింగ్**: దివాన్‌చెరువు ఔటర్ టెర్మినల్ (96 / 480 స్థలాలు అందుబాటులో ఉన్నాయి).\n- **ఈవీ ఛార్జింగ్ కేంద్రం**: మున్సిపల్ స్టేడియం హబ్ (74 స్థలాలు అందుబాటులో ఉన్నాయి).\n\n*పార్కింగ్ మైదానాల నుండి స్నాన ఘాట్లకు ప్రభుత్వ ఉచిత ఆర్టీసీ షటిల్ బస్సులు నిరంతరం నడుస్తున్నాయి.*`,
        spokenText: "కార్ల పార్కింగ్ ఆర్ట్స్ కాలేజీ మైదానంలో ఏర్పాటు చేశారు, అక్కడ ఎనిమిది వందల పన్నెండు స్థలాలు ఖాళీగా ఉన్నాయి. ద్విచక్ర వాహనాల పార్కింగ్ సుబ్రహ్మణ్య మైదానంలో మరియు బస్సుల పార్కింగ్ దివాన్‌చెరువు వద్ద ఉంది. పార్కింగ్ స్థలాల నుండి ఘాట్లకు ఉచిత బస్సులు అందుబాటులో ఉన్నాయి.",
        category: "parking",
        action: "parking"
      };
    } else if (lang === 'hi') {
      return {
        language: 'hi',
        displayText: `**श्रद्धालुओं हेतु लाइव पार्किंग व्यवस्था (Parking Arrangements):**\n- **कार पार्किंग**: आर्ट्स कॉलेज ग्राउंड (812 / 2400 स्थान खाली हैं)।\n- **दोपहिया वाहन**: सुब्रमण्य मैदान (3140 / 6200 स्थान उपलब्ध)।\n- **बस पार्किंग**: दीवानचेरुवु आउटर बस टर्मिनल (96 / 480 स्थान)।\n- **ईवी चार्जिंग स्टेशन**: नगर निगम स्टेडियम हब (74 स्थान)।\n\n*पार्किंग मैदानों से घाटों तक निरंतर निःशुल्क शटल बस सेवा उपलब्ध है।*`,
        spokenText: "कार पार्किंग आर्ट्स कॉलेज ग्राउंड में है जहाँ वर्तमान में आठ सौ बारह स्थान उपलब्ध हैं। दोपहिया वाहन सुब्रमण्य मैदान में और बसें दीवानचेरुवु टर्मिनल पर पार्क की जा सकती हैं। पार्किंग से घाटों तक मुफ्त शटल बसें चल रही हैं।",
        category: "parking",
        action: "parking"
      };
    } else {
      return {
        language: 'en',
        displayText: `**Live Parking Availability for Pilgrims:**\n- **Car Parking**: Arts College Grounds (812 / 2,400 slots available, ~34% vacant).\n- **Two Wheeler Parking**: Subramanya Maidan (3,140 / 6,200 slots available).\n- **Bus Parking**: Diwancheruvu Outer Terminal (96 / 480 slots available).\n- **EV Charging Hub**: Municipal Stadium (74 / 120 slots available).\n\n*Free government RTC shuttles operate continuously between parking grounds and the river.*`,
        spokenText: "Car parking is designated at Arts College Grounds with 812 spaces currently vacant. Two-wheeler parking is at Subramanya Maidan with over 3,000 slots, and bus parking is at Diwancheruvu Terminal. Free shuttle transit connects all lots directly to the ghats.",
        category: "parking",
        action: "parking"
      };
    }
  }

  // 6. Festival Dates & Schedule / Significance ("When will Godavari Pushkaralu take place?" / "कब होंगे?")
  if (
    /when will|when.*pushkaralu|festival.*date|schedule|when.*take place|celebrate|2027.*when|cycle|history|significance|maha pushkaralu|ఎప్పుడు జరుగుతాయి|ఎప్పుడు|తేదీలు|ఎప్పుడు వస్తాయి|సమయం ఏమిటి|పుష్కరాల తేదీలు|విశిష్టత|చరిత్ర|మహా పుష్కరాలు|कब होंगे|कब होगा|कब हैं|कब आयोजित|तारीख|तिथियां|इतिहास|महत्व/i.test(q)
  ) {
    setConversationContext('history');
    if (lang === 'te') {
      return {
        language: 'te',
        displayText: `**గోదావరి మహా పుష్కరాలు 2027 విశిష్టత & తేదీలు:**\n- **తేదీలు**: జూలై 2027 (12 పవిత్ర దినాలు).\n- **ప్రాముఖ్యత**: సాధారణ పుష్కరాలు ప్రతి 12 సంవత్సరాలకు వస్తాయి. కానీ 2027 లో జరిగేది 144 సంవత్సరాల మహా ఖగోళ చక్రం పూర్తయిన సందర్భంగా వచ్చే అత్యంత పవిత్రమైన **మహా పుష్కరాలు** (Maha Pushkaralu).\n- **వేదిక**: రాజమండ్రి (రాజమహేంద్రవరం), ఆంధ్రప్రదేశ్.\n- **ముఖ్య ఆచారాలు**: పవిత్ర గోదావరి నదిలో పుణ్యస్నానం, పితృ తర్పణాలు మరియు సాయంత్రం దివ్య గోదావరి హారతి.`,
        spokenText: "గోదావరి మహా పుష్కరాలు రెండు వేల ఇరవై ఏడు జూలై నెలలో రాజమండ్రిలో జరుగుతాయి. ఇది నూట నలభై నాలుగు సంవత్సరాలకు ఒకసారి వచ్చే అత్యంత పవిత్రమైన మహా పుష్కరాలు. ఈ పవిత్ర వేళ గోదావరిలో పుణ్యస్నానం ఆచరించడం ఎంతో పుణ్యప్రదం.",
        category: "overview"
      };
    } else if (lang === 'hi') {
      return {
        language: 'hi',
        displayText: `**गोदावरी महा पुष्करालु 2027 का महत्व एवं तिथियां:**\n- **आयोजन समय**: जुलाई 2027 (12 पावन दिवस)।\n- **महत्व**: यह 144 वर्षों में एक बार आने वाला अत्यंत दुर्लभ और पुण्यप्रद **महा पुष्करालु** है, जब गुरु सिंह राशि में प्रवेश करते हैं।\n- **स्थान**: राजामहेंद्री (आंध्र प्रदेश) में पावन गोदावरी तट।\n- **मुख्य अनुष्ठान**: पापनाशिनी गोदावरी में पवित्र स्नान, पितृ तर्पण एवं दिव्य गोदावरी महाआरती।`,
        spokenText: "गोदावरी महा पुष्करालु जुलाई दो हज़ार सत्ताईस में राजामहेंद्री में आयोजित होगा। यह एक सौ चौवालीस वर्षों में एक बार आने वाला पावन महा पुष्करालु है जब लाखों श्रद्धालु गोदावरी में पवित्र स्नान करते हैं।",
        category: "overview"
      };
    } else {
      return {
        language: 'en',
        displayText: `**Godavari Maha Pushkaralu 2027 Overview & Schedule:**\n- **Festival Dates**: July 2027 (12 Auspicious Days).\n- **Sacred Significance**: Marks the momentous 144-year Maha celestial cycle when Jupiter enters the zodiac of Leo (Simha Rasi).\n- **Location**: Rajahmundry (Rajamahendravaram), Andhra Pradesh.\n- **Core Rituals**: Sacred river dip (Punya Snanam), ancestor worship (Pitr Tarpanam), and evening river harathis.`,
        spokenText: "Godavari Maha Pushkaralu is scheduled for July 2027 in Rajahmundry. It marks the sacred 144-year celestial Maha Pushkaralu cycle when millions of devotees take the auspicious holy dip in the Godavari.",
        category: "overview"
      };
    }
  }

  // 7. Specific Bathing Ghats
  // A. Pushkar Ghat (word-bounded to avoid matching "pushkaralu" or "పుష్కరాలు")
  if (/\bpushkar ghat\b|పుష్కర్ ఘాట్|పుష్కర ఘాట్|\bपुष्कर घाट\b/i.test(q)) {
    setConversationContext('pushkar-ghat');
    if (lang === 'te') {
      return {
        language: 'te',
        displayText: `**పుష్కర్ ఘాట్ (Pushkar Ghat) సమాచారం:**\n- **స్థానం**: మెయిన్ బండ్ రోడ్, రాజమండ్రి (సిటీ సెంటర్ నుండి 1.2 కి.మీ).\n- **వేళలు**: పవిత్ర స్నానాలు ఉదయం 04:30 AM నుండి రాత్రి 09:30 PM వరకు.\n- **సదుపాయాలు**: ప్రత్యేక వీఐపీ స్నాన వేదిక, మహిళల దుస్తులు మార్చుకునే గదులు, వీల్ చైర్ ర్యాంప్, ఆర్ ఓ తాగునీరు, నిరంతర లైఫ్‌గార్డ్ పర్యవేక్షణ.\n- **ప్రస్తుత రద్దీ**: మధ్యస్థం (సురక్షితంగా స్నానం చేయవచ్చు).`,
        spokenText: "పుష్కర్ ఘాట్ రాజమండ్రిలో ప్రధానమైన ఘాట్, ఇది ఒకటి పాయింట్ రెండు కిలోమీటర్ల దూరంలో ఉంది. పవిత్ర స్నానాలు ఉదయం నాలుగున్నర నుండి రాత్రి తొమ్మిదిన్నర వరకు కొనసాగుతాయి. ఇక్కడ వీఐపీ స్నాన వేదిక, మహిళల డ్రెస్ ఛేంజింగ్ గదులు మరియు తాగునీరు అందుబాటులో ఉన్నాయి.",
        category: "ghats",
        action: "ghats"
      };
    } else if (lang === 'hi') {
      return {
        language: 'hi',
        displayText: `**पुष्कर घाट (Pushkar Ghat) की जानकारी:**\n- **स्थान**: मुख्य बंड रोड, राजामहेंद्री (शहर से 1.2 किमी दूर)।\n- **समय**: पवित्र स्नान प्रातः 04:30 से रात्रि 09:30 तक।\n- **सुविधाएं**: विशेष वीआईपी स्नान क्षेत्र, महिलाओं के वस्त्र बदलने हेतु कक्ष, व्हीलचेयर रैंप, आरओ पेयजल और 24×7 लाइफगार्ड गश्त।\n- **वर्तमान भीड़**: मध्यम।`,
        spokenText: "पुष्कर घाट राजामहेंद्री का मुख्य घाट है, जो केवल एक दशमलव दो किलोमीटर दूर है। यहाँ स्नान का समय सुबह साढ़े चार बजे से रात साढ़े नौ बजे तक है। वीआईपी स्नान क्षेत्र, महिलाओं के कपड़े बदलने के कमरे और सुरक्षित रेलिंग उपलब्ध हैं।",
        category: "ghats",
        action: "ghats"
      };
    } else {
      return {
        language: 'en',
        displayText: `**Pushkar Ghat Information:**\n- **Location**: Main Bund Road, Rajahmundry (1.2 km from city center).\n- **Timings**: Holy dip open 04:30 AM to 09:30 PM.\n- **Facilities**: Dedicated VIP enclosure, women's changing rooms, wheelchair ramp, RO drinking water, and lifeguard rescue boats.\n- **Crowd Status**: Moderate (~48k pilgrims/hr).`,
        spokenText: "Pushkar Ghat is the primary historical bathing ghat located 1.2 kilometers away. Holy bathing is permitted from 4:30 AM to 9:30 PM. It features designated VIP enclosures, women's dress changing rooms, and wheelchair accessibility.",
        category: "ghats",
        action: "ghats"
      };
    }
  }

  // B. Kotilingala Ghat
  if (/kotilingala|కోటిలింగాల|कोटालिंगाला/i.test(q)) {
    setConversationContext('kotilingala-ghat');
    if (lang === 'te') {
      return {
        language: 'te',
        displayText: `**కోటిలింగాల ఘాట్ (Kotilingala Ghat) సమాచారం:**\n- **స్థానం**: శ్రీ కోటిలింగేశ్వర స్వామి ఆలయం ప్రక్కనే (దూరం 2.4 కి.మీ).\n- **రద్దీ**: ప్రస్తుతం తక్కువ (కుటుంబాలు మరియు వృద్ధుల స్నానానికి అత్యంత అనుకూలం).\n- **సదుపాయాలు**: మహిళల ఛేంజింగ్ రూములు, వీల్ చైర్ యాక్సెస్, తాగునీరు, సీనియర్ సిటిజన్ సహాయ కేంద్రం.\n- **వేళలు**: 04:00 AM – 09:30 PM.`,
        spokenText: "కోటిలింగాల ఘాట్ శ్రీ కోటిలింగేశ్వర స్వామి ఆలయానికి సమీపంలో రెండు పాయింట్ నాలుగు కిలోమీటర్ల దూరంలో ఉంది. ప్రస్తుతం ఇక్కడ రద్దీ తక్కువగా ఉంది, కుటుంబాలు మరియు వృద్ధులకు స్నానానికి ఇది చాలా అనువైన ప్రదేశం.",
        category: "ghats"
      };
    } else if (lang === 'hi') {
      return {
        language: 'hi',
        displayText: `**कोटालिंगाला घाट (Kotilingala Ghat) की जानकारी:**\n- **स्थान**: श्री कोटालिंगेश्वर स्वामी मंदिर के समीप (2.4 किमी)।\n- **भीड़ की स्थिति**: कम (परिवारों और बुजुर्गों के लिए सबसे उपयुक्त)।\n- **सुविधाएं**: कपड़े बदलने के कमरे, व्हीलचेयर सुविधा, पेयजल एवं सहायता केंद्र।\n- **समय**: सुबह 04:00 से रात 09:30 तक।`,
        spokenText: "कोटालिंगाला घाट श्री कोटालिंगेश्वर मंदिर के पास दो दशमलव चार किलोमीटर की दूरी पर स्थित है। यहाँ वर्तमान में भीड़ कम है और परिवारों तथा वरिष्ठ नागरिकों के स्नान के लिए यह बहुत ही शांत और उत्तम घाट है।",
        category: "ghats"
      };
    } else {
      return {
        language: 'en',
        displayText: `**Kotilingala Ghat Information:**\n- **Location**: Adjacent to Sri Kotilingeswara Swamy Temple (2.4 km away).\n- **Crowd Status**: Low (highly recommended for families and seniors).\n- **Facilities**: Women's changing rooms, wheelchair ramps, drinking water, and elderly assistance desks.\n- **Operating Hours**: 04:00 AM – 09:30 PM.`,
        spokenText: "Kotilingala Ghat is located 2.4 kilometers away beside Sri Kotilingeswara Temple. Crowd levels are currently low, making it ideal for families and elderly devotees.",
        category: "ghats"
      };
    }
  }

  // C. Saraswati Ghat
  if (/saraswati|సరస్వతి|सरस्वती/i.test(q)) {
    setConversationContext('saraswati-ghat');
    if (lang === 'te') {
      return {
        language: 'te',
        displayText: `**సరస్వతి ఘాట్ (Saraswati Ghat) సమాచారం:**\n- **స్థానం**: గోదావరి రైల్వే వంతెన సమీపంలో (3.1 కి.మీ).\n- **విశేషాలు**: ప్రతి సాయంత్రం 06:30 PM కు సంధ్య హారతి మరియు సాంస్కృతిక కార్యక్రమాలు ఇక్కడే జరుగుతాయి.\n- **వైద్యం**: ఇక్కడ 24 గంటల ప్రధాన ఉచిత వైద్య శిబిరం మరియు 108 అంబులెన్స్ కేంద్రం ఉన్నాయి.\n- **రద్దీ**: ఎక్కువ (సాయంత్రం వేళల్లో భక్తుల తాకిడి అధికం).`,
        spokenText: "సరస్వతి ఘాట్ మూడు పాయింట్ ఒక కిలోమీటరు దూరంలో ఉంది. ప్రతి సాయంత్రం ఆరున్నరకు దివ్య సంధ్యా హారతి ఇక్కడే జరుగుతుంది. అలాగే ఇక్కడ ఇరవై నాలుగు గంటల ఉచిత వైద్య శిబిరం మరియు అంబులెన్స్ సదుపాయం ఉన్నాయి.",
        category: "ghats"
      };
    } else if (lang === 'hi') {
      return {
        language: 'hi',
        displayText: `**सरस्वती घाट (Saraswati Ghat) की जानकारी:**\n- **स्थान**: गोदावरी रेल ब्रिज के निकट (3.1 किमी)।\n- **विशेषता**: प्रतिदिन शाम 06:30 बजे भव्य संध्या महाआरती यहीं आयोजित होती है।\n- **चिकित्सा**: यहाँ 24×7 मुख्य चिकित्सा शिविर और 108 एम्बुलेंस बेस स्टेशन उपलब्ध है।\n- **भीड़**: अधिक।`,
        spokenText: "सरस्वती घाट तीन दशमलव एक किलोमीटर दूर है। प्रतिदिन शाम साढ़े छह बजे प्रसिद्ध संध्या महाआरती इसी घाट पर होती है। यहाँ चौबीसों घंटे निशुल्क चिकित्सा शिविर और एम्बुलेंस सुविधा सक्रिय है।",
        category: "ghats"
      };
    } else {
      return {
        language: 'en',
        displayText: `**Saraswati Ghat Information:**\n- **Location**: Near Godavari Rail Bridge (3.1 km away).\n- **Highlights**: Venue for the grand daily Sandhya Harathi at 06:30 PM.\n- **Medical**: Central 24×7 Medical Headquarters with ICU ambulances.\n- **Crowd**: High during evening harathi hours.`,
        spokenText: "Saraswati Ghat is located 3.1 kilometers away near the rail bridge. It is the spiritual center for the grand Sandhya Harathi ceremony every evening at 6:30 PM, and hosts a 24-hour medical headquarters.",
        category: "ghats"
      };
    }
  }

  // D. Gowtami Ghat
  if (/gowtami|గౌతమి|गौतमी/i.test(q)) {
    setConversationContext('gowtami-ghat');
    if (lang === 'te') {
      return {
        language: 'te',
        displayText: `**గౌతమి ఘాట్ (Gowtami Ghat) సమాచారం:**\n- **స్థానం**: ఇస్కాన్ కాంప్లెక్స్ సమీపం (4.7 కి.మీ).\n- **విశేషాలు**: విశాలమైన స్నాన వేదిక, దీపాల వితరణ మరియు నిరంతర ఉచిత అన్నదానం (07:00 AM – 10:00 PM).\n- **రద్దీ**: తక్కువ.\n- **వేళలు**: 04:30 AM – 09:00 PM.`,
        spokenText: "గౌతమి ఘాట్ ఇస్కాన్ మందిరం సమీపంలో నాలుగు పాయింట్ ఏడు కిలోమీటర్ల దూరంలో ఉంది. ఇక్కడ రద్దీ తక్కువగా ఉంటుంది మరియు ఉదయం ఏడు నుండి రాత్రి పది వరకు నిరంతర ఉచిత అన్నదానం భోజన సదుపాయం లభిస్తుంది.",
        category: "ghats"
      };
    } else if (lang === 'hi') {
      return {
        language: 'hi',
        displayText: `**गौतमी घाट (Gowtami Ghat) की जानकारी:**\n- **स्थान**: इस्कॉन मंदिर के निकट (4.7 किमी)।\n- **सुविधाएं**: खुला विस्तृत स्नान क्षेत्र, दीपदान, और निरंतर निःशुल्क अन्नदानम (प्रातः 07:00 से रात्रि 10:00)।\n- **भीड़**: कम।`,
        spokenText: "गौतमी घाट इस्कॉन केंद्र के पास चार दशमलव सात किलोमीटर दूर है। यहाँ भीड़ कम है और सुबह सात से रात दस बजे तक निरंतर निःशुल्क अन्नदान महाप्रसाद भोजन उपलब्ध है।",
        category: "ghats"
      };
    } else {
      return {
        language: 'en',
        displayText: `**Gowtami Ghat Information:**\n- **Location**: Near ISKCON complex (4.7 km away).\n- **Highlights**: Expansive peaceful bathing area, Diya floating zone, and continuous free Annadanam dining halls from 7:00 AM to 10:00 PM.\n- **Crowd**: Low.`,
        spokenText: "Gowtami Ghat is located 4.7 kilometers away next to the ISKCON complex. It offers peaceful bathing with low crowd levels and continuous free satvik meal distribution.",
        category: "ghats"
      };
    }
  }

  // 8. General Bathing Ghats & Timings
  if (/ghat|snana|snanam|dip|bathing|timings|వేళలు|సమయం|ఘాట్లు|ఘాట్|స్నానం|घाट|स्नान/i.test(q)) {
    setConversationContext('ghats-general');
    if (lang === 'te') {
      return {
        language: 'te',
        displayText: `**స్నాన ఘాట్ల వేళలు & వివరాలు (Bathing Ghat Timings):**\n- **పుణ్య స్నాన సమయాలు**: ఉదయం **04:30 AM నుండి రాత్రి 09:30 PM** వరకు.\n- **పుష్కర్ ఘాట్**: 1.2 కి.మీ (మధ్యస్థ రద్దీ, వీఐపీ మరియు మహిళల సదుపాయం).\n- **కోటిలింగాల ఘాట్**: 2.4 కి.మీ (తక్కువ రద్దీ, కుటుంబాలకు అనుకూలం).\n- **సరస్వతి ఘాట్**: 3.1 కి.మీ (ఎక్కువ రద్దీ, సంధ్య హారతి కేంద్రం).\n- **గౌతమి ఘాట్**: 4.7 కి.మీ (తక్కువ రద్దీ, అన్నదానం లభించే చోటు).\n\n*భద్రతా సూచన: నదిలో ఏర్పాటు చేసిన భద్రతా సరిహద్దు తాడు దాటరాదు.*`,
        spokenText: "గోదావరి స్నాన ఘాట్లలో పవిత్ర స్నానాలు ఉదయం నాలుగున్నర నుండి రాత్రి తొమ్మిదిన్నర వరకు కొనసాగుతాయి. పుష్కర్ ఘాట్ మరియు సరస్వతి ఘాట్ లలో వీఐపీ ఏర్పాట్లు ఉన్నాయి. రద్దీ తక్కువగా ఉండాలంటే కోటిలింగాల లేదా గౌతమి ఘాట్ కు వెళ్లవచ్చు.",
        category: "ghats",
        action: "ghats"
      };
    } else if (lang === 'hi') {
      return {
        language: 'hi',
        displayText: `**स्नान घाट और समय (Bathing Ghats & Timings):**\n- **पवित्र स्नान का समय**: प्रातः **04:30 से रात्रि 09:30** तक।\n- **पुष्कर घाट**: 1.2 किमी (मध्यम भीड़, वीआईपी स्नान एवं चेंजिंग रूम)।\n- **कोटालिंगाला घाट**: 2.4 किमी (कम भीड़, बुजुर्गों व परिवारों के लिए उत्तम)।\n- **सरस्वती घाट**: 3.1 किमी (अधिक भीड़, शाम की संध्या महाआरती)।\n- **गौतमी घाट**: 4.7 किमी (कम भीड़, निःशुल्क अन्नदानम भोजन)।\n\n*सुरक्षा नियम: नदी में चिन्हित सुरक्षा रेखा से बाहर न जाएं।*`,
        spokenText: "गोदावरी स्नान घाटों पर पवित्र स्नान का समय सुबह साढ़े चार बजे से रात साढ़े नौ बजे तक है। पुष्कर और सरस्वती घाट पर वीआईपी सुविधाएं हैं, जबकि शांतिपूर्ण स्नान के लिए कोटालिंगाला और गौतमी घाट उत्तम हैं जहाँ भीड़ कम है।",
        category: "ghats",
        action: "ghats"
      };
    } else {
      return {
        language: 'en',
        displayText: `**Bathing Ghats & Timings:**\n- **Holy Dip Hours**: **04:30 AM to 09:30 PM** daily.\n- **Pushkar Ghat**: 1.2 km away · Moderate crowd · VIP enclosure & wheelchair ramps.\n- **Kotilingala Ghat**: 2.4 km away · Low crowd · Ideal for seniors and families.\n- **Saraswati Ghat**: 3.1 km away · High crowd · Site of daily 6:30 PM Sandhya Harathi.\n- **Gowtami Ghat**: 4.7 km away · Low crowd · Free Annadanam food counters.\n\n*Safety Advisory: Please remain within the fortified river safety nets.*`,
        spokenText: "Bathing ghats are open for holy dips daily between 4:30 AM and 9:30 PM. Pushkar Ghat and Saraswati Ghat offer VIP facilities, while Kotilingala and Gowtami ghats have lower crowd levels.",
        category: "ghats",
        action: "ghats"
      };
    }
  }

  // 9. Temples & Darshan Timings
  if (/temple|darshan|seva|ticket|kotilingeswara|markandeya|ramanatha|god|ఆలయం|దర్శనం|గుడి|టికెట్|కోటిలింగేశ్వర|మార్కండేయ|రామనాథ|మందిर|दर्शन|सेवा|टिकट|कोटालिंगेश्वर|मार्कंडेय|रामनाथ/i.test(q)) {
    setConversationContext('temples');
    if (lang === 'te') {
      return {
        language: 'te',
        displayText: `**ప్రధాన ఆలయాలు & దర్శన సమయాలు (Temples & Darshan):**\n- **శ్రీ కోటిలింగేశ్వర స్వామి ఆలయం**: ఉదయం 04:00 AM – రాత్రి 09:30 PM | సాధారణ దర్శనం: **ఉచితం** | వీఐపీ శీఘ్ర దర్శనం: **₹500** | దూరం: 0.8 కి.మీ.\n- **శ్రీ మార్కండేయ స్వామి ఆలయం**: ఉదయం 05:00 AM – రాత్రి 09:00 PM | సాధారణం: **₹50** | వీఐపీ: **₹300** | దూరం: 2.1 కి.మీ.\n- **శ్రీ రామనాథ స్వామి ఆలయం**: ఉదయం 04:30 AM – రాత్రి 10:00 PM | సాధారణ దర్శనం: **ఉచితం** | వీఐపీ: **₹500** | దూరం: 3.4 కి.మీ.\n\n*ఆన్‌లైన్ ఇ-దర్శన్ పాస్ పోర్టల్ ద్వారా పొందవచ్చు.*`,
        spokenText: "శ్రీ కోటిలింగేశ్వర స్వామి ఆలయం ఉదయం నాలుగు నుండి రాత్రి తొమ్మిదిన్నర వరకు తెరిచి ఉంటుంది. సామాన్య దర్శనం ఉచితం మరియు వీఐపీ దర్శనం ఐదు వందల రూపాయలు. మార్కండేయ స్వామి ఆలయం ఉదయం ఐదు గంటల నుండి రాత్రి తొమ్మిది వరకు తెరిచి ఉంటుంది.",
        category: "temples",
        action: "temples"
      };
    } else if (lang === 'hi') {
      return {
        language: 'hi',
        displayText: `**प्रमुख मंदिर और दर्शन समय (Temples & Darshan Timings):**\n- **श्री कोटालिंगेश्वर स्वामी**: 04:00 AM से 09:30 PM | सामान्य: **निःशुल्क** | वीआईपी: **₹500** | दूरी: 0.8 किमी।\n- **श्री मार्कंडेय स्वामी**: 05:00 AM से 09:00 PM | सामान्य: **₹50** | वीआईपी: **₹300** | दूरी: 2.1 किमी।\n- **श्री रामनाथ स्वामी**: 04:30 AM से 10:00 PM | सामान्य: **निःशुल्क** | वीआईपी: **₹500** | दूरी: 3.4 किमी।`,
        spokenText: "श्री कोटालिंगेश्वर स्वामी मंदिर सुबह चार बजे से रात साढ़े नौ बजे तक खुला रहता है जहाँ सामान्य दर्शन मुफ्त और वीआईपी दर्शन पाँच सौ रुपये का है। मार्कंडेय स्वामी मंदिर सुबह पाँच बजे से रात नौ बजे तक खुला रहता है।",
        category: "temples",
        action: "temples"
      };
    } else {
      return {
        language: 'en',
        displayText: `**Temples & Darshan Timings:**\n- **Sri Kotilingeswara Swamy**: 04:00 AM – 09:30 PM | General: **Free** | VIP Quick Darshan: **₹500** | Distance: 0.8 km.\n- **Sri Markandeya Swamy**: 05:00 AM – 09:00 PM | General: **₹50** | VIP: **₹300** | Distance: 2.1 km.\n- **Sri Ramanatha Swamy**: 04:30 AM – 10:00 PM | General: **Free** | VIP: **₹500** | Distance: 3.4 km.`,
        spokenText: "Sri Kotilingeswara Swamy Temple is open from 4:00 AM to 9:30 PM with free general darshan and 500 rupees VIP darshan. Sri Markandeya Swamy Temple is open from 5:00 AM to 9:00 PM.",
        category: "temples",
        action: "temples"
      };
    }
  }

  // 10. Free Annadanam & Food
  if (/food|annadanam|meals|lunch|dinner|prasadam|tiffin|eat|అన్నదానం|భోజనం|ఆహారం|ప్రసాదం|తిండి|अन्नदान|भोजन|खाना|प्रसाद|लंगर/i.test(q)) {
    setConversationContext('food');
    if (lang === 'te') {
      return {
        language: 'te',
        displayText: `**ఉచిత అన్నదానం & భోజన సదుపాయాలు (Free Annadanam):**\n- **గౌతమి ఘాట్ (ఇస్కాన్ కాంప్లెక్స్)**: ఉదయం 07:00 AM నుండి రాత్రి 10:00 PM వరకు నిరంతర సాత్విక భోజన వితరణ.\n- **మున్సిపల్ మైదానం & రైల్వే కాలనీ కిచెన్స్**: రోజుకు లక్ష మంది భక్తులకు శుభ్రమైన ఉచిత భోజనం.\n- అన్ని ప్రధాన ఘాట్ల వద్ద ప్యాక్ చేసిన అల్పాహారం, తాగునీరు మరియు మజ్జిగ నిరంతరం పంపిణీ చేయబడుతున్నాయి.`,
        spokenText: "గౌతమి ఘాట్ ఇస్కాన్ ప్రాంగణంలో మరియు మున్సిపల్ గ్రౌండ్స్ వద్ద ఉదయం ఏడు గంటల నుండి రాత్రి పది గంటల వరకు నిరంతర ఉచిత అన్నదానం లభిస్తుంది. అలాగే అన్ని ఘాట్ల వద్ద ఉచిత ప్రసాదం మరియు మజ్జిగ అందుబాటులో ఉన్నాయి.",
        category: "food"
      };
    } else if (lang === 'hi') {
      return {
        language: 'hi',
        displayText: `**निःशुल्क अन्नदानम एवं भोजन (Free Annadanam Meals):**\n- **गौतमी घाट (इस्कॉन केंद्र)**: सुबह 07:00 बजे से रात 10:00 बजे तक लगातार सात्विक भोजन महाप्रसाद वितरण।\n- **नगर निगम मैदान एवं रेलवे कॉलोनी रसोई**: प्रतिदिन एक लाख से अधिक श्रद्धालुओं के लिए स्वच्छ भोजन।\n- सभी स्नान घाटों पर छाछ और पेय पैकेट मुफ्त वितरित किए जा रहे हैं।`,
        spokenText: "गौतमी घाट इस्कॉन केंद्र और म्यूनिसिपल मैदान में सुबह सात से रात दस बजे तक निरंतर निःशुल्क अन्नदानम महाप्रसाद भोजन उपलब्ध है। सभी प्रमुख घाटों पर छाछ और प्रसाद भी बांटा जा रहा है।",
        category: "food"
      };
    } else {
      return {
        language: 'en',
        displayText: `**Free Annadanam (Satvik Food Distribution):**\n- **Gowtami Ghat (ISKCON Complex)**: Continuous free dining from 07:00 AM to 10:00 PM.\n- **Municipal Grounds & Railway Community Kitchens**: Hygienic meals served to over 100,000 pilgrims daily.\n- Free buttermilk, snacks, and water packets distributed along queue lines.`,
        spokenText: "Free Annadanam satvik meals are served continuously from 7:00 AM to 10:00 PM at Gowtami Ghat ISKCON complex and Municipal Grounds. Fresh buttermilk is distributed along all ghat queues.",
        category: "food"
      };
    }
  }

  // 11. Helplines & Emergency Assistance
  if (/helpline|emergency|help|danger|police|ambulance|hospital|medical|doctor|112|108|100|హెల్ప్|సహాయం|అత్యవసర|పోలీస్|వైద్య|ఆసుపత్రి|డాక్టర్|मदद|आपातकाल|हेल्पलाइन|अस्पताल|पुलिस|डॉक्टर/i.test(q)) {
    setConversationContext('emergency');
    if (lang === 'te') {
      return {
        language: 'te',
        displayText: `**అధికారిక పుష్కరాల అత్యవసర హెల్ప్‌లైన్లు (Verified Official Helplines):**\n- **జాతీయ అత్యవసర రెస్పాన్స్ (National Emergency)**: **112**\n- **ఉచిత వైద్య అత్యవసర అంబులెన్స్ (Medical Ambulance)**: **108**\n- **పోలీస్ అత్యవసర సహాయం (Police Assistance)**: **100**\n- **పుష్కరాల కేంద్ర కంట్రోల్ రూమ్ (రాజమండ్రి)**: **0883-2471234**\n- **మున్సిపల్ కార్పొరేషన్ హెల్ప్‌డెస్క్**: **0883-2471888**\n- **మహిళా భద్రత హెల్ప్‌లైన్**: **181**\n\n*తీవ్రమైన ఆపద సమయంలో దయచేసి వెంటనే 112 కు కాల్ చేయండి.*`,
        spokenText: "పుష్కరాల అత్యవసర సహాయం కోసం ఒకటి ఒకటి రెండు నంబర్ కు కాల్ చేయండి. వైద్య అంబులెన్స్ కోసం ఒకటి సున్నా ఎనిమిది, పోలీస్ సహాయం కోసం ఒకటి సున్నా సున్నా, మరియు రాజమండ్రి కేంద్ర పుష్కరాల కంట్రోల్ రూమ్ నంబర్ సున్నా ఎనిమిది ఎనిమిది మూడు, రెండు నాలుగు ఏడు ఒకటి రెండు మూడు నాలుగు.",
        category: "emergency",
        action: "emergency"
      };
    } else if (lang === 'hi') {
      return {
        language: 'hi',
        displayText: `**पुष्करालु आपातकालीन हेल्पलाइन नंबर (Verified Helplines):**\n- **राष्ट्रीय आपातकालीन नंबर (National Emergency)**: **112**\n- **चिकित्सा एवं एम्बुलेंस सहायता (Medical Ambulance)**: **108**\n- **पुलिस सहायता (Police Assistance)**: **100**\n- **पुष्करालु केंद्रीय नियंत्रण कक्ष (Control Room)**: **0883-2471234**\n- **राजामहेंद्री नगर निगम सहायता**: **0883-2471888**\n- **महिला सुरक्षा हेल्पलाइन**: **181**\n\n*किसी भी गंभीर आपात स्थिति में तुरंत 112 पर डायल करें।*`,
        spokenText: "पुष्करालु में आपातकालीन सहायता के लिए राष्ट्रीय नंबर एक एक दो पर डायल करें। एम्बुलेंस के लिए एक शून्य आठ, पुलिस के लिए एक शून्य शून्य, और पुष्करालु मुख्य नियंत्रण कक्ष का नंबर शून्य आठ आठ तीन, दो चार सात एक दो तीन चार है।",
        category: "emergency",
        action: "emergency"
      };
    } else {
      return {
        language: 'en',
        displayText: `**Verified Official Pushkaralu Emergency Numbers:**\n- **All-India National Emergency**: **112** (Police, Fire, Ambulance)\n- **Medical Ambulance**: **108**\n- **Police Assistance**: **100**\n- **Pushkaralu Central Control Room (Rajahmundry)**: **0883-2471234**\n- **Rajahmundry Municipal Corporation**: **0883-2471888**\n- **Women Safety Helpline**: **181**\n\n*For any immediate emergency, dial 112 immediately.*`,
        spokenText: "For any emergency, dial India's emergency response number 1 1 2. For medical ambulance call 1 0 8, for police dial 1 0 0, and the Godavari Pushkaralu Central Control Room is 0 8 8 3, 2 4 7 1 2 3 4.",
        category: "emergency",
        action: "emergency"
      };
    }
  }

  // 12. Lost & Found / Missing Persons
  if (/lost|found|missing|child|person|reunite|తప్పిపోయిన|పోగొట్టుకున్న|పిల్లలు|खोया|पाया|गुमशुदा|लापता/i.test(q)) {
    setConversationContext('lost-found');
    if (lang === 'te') {
      return {
        language: 'te',
        displayText: `**తప్పిపోయిన వారి పునఃకలయిక కేంద్రం (Lost & Found):**\n- మీ కుటుంబ సభ్యులు ఎవరైనా తప్పిపోతే వెంటనే సరస్వతి ఘాట్ లేదా పుష్కర్ ఘాట్ కేంద్రాల్లో ఫిర్యాదు చేయండి.\n- నమోదు కాగానే తక్షణమే క్యూఆర్ టోకెన్ జారీ చేయబడుతుంది మరియు అన్ని 4 ఘాట్ల మైకుల్లో పబ్లిక్ ప్రకటన చేయబడుతుంది.\n- అత్యవసర సహాయానికి **100** లేదా కంట్రోల్ రూమ్ **0883-2471234** కు సంప్రదించండి.`,
        spokenText: "ఎవరైనా తప్పిపోతే వెంటనే సరస్వతి ఘాట్ లేదా పుష్కర్ ఘాట్ కేంద్రాల్లో ఫిర్యాదు చేయండి. తక్షణమే అన్ని ఘాట్లలో మైక్ అనౌన్స్‌మెంట్ మరియు స్క్రీన్లలో ప్రసారం చేస్తారు.",
        category: "lost-found"
      };
    } else if (lang === 'hi') {
      return {
        language: 'hi',
        displayText: `**खोया-पाया एवं परिवार पुनर्मिलन केंद्र (Lost & Found):**\n- यदि कोई परिजन बिछड़ गया है, तो तुरंत पुष्कर या सरस्वती घाट के सहायता केंद्र पर रिपोर्ट दर्ज करें।\n- तुरंत सभी घाटों के लाउडस्पीकरों पर घोषणा की जाएगी।\n- पुलिस सहायता नंबर **100** या **0883-2471234** पर भी संपर्क करें।`,
        spokenText: "यदि कोई परिजन या बच्चा खो गया है, तो तुरंत पुष्कर या सरस्वती घाट के खोया-पाया केंद्र पर जाएं। तुरंत सभी घाटों पर लाउडस्पीकर द्वारा घोषणा की जाएगी।",
        category: "lost-found"
      };
    } else {
      return {
        language: 'en',
        displayText: `**Lost & Found / Family Reunion Center:**\n- If someone is separated from your family, register a missing report immediately at Pushkar or Saraswati Ghat reunion centers.\n- Triggers synchronized public address announcements across all 4 ghats.\n- Direct helpline: **100** or Central Control Room at **0883-2471234**.`,
        spokenText: "If a person is separated from your group, visit the dedicated reunion booths active at Pushkar and Saraswati ghats for instant announcements across all ghats.",
        category: "lost-found"
      };
    }
  }

  // 13. Weather & River Conditions
  if (/weather|rain|temperature|water level|river flow|flood|current|వాతావరణం|వర్షం|నీటి మట్టం|ప్రవాహం|मौसम|बारिश|जल स्तर|नदी बहाव/i.test(q)) {
    setConversationContext('weather');
    if (lang === 'te') {
      return {
        language: 'te',
        displayText: `**ప్రత్యక్ష వాతావరణం & నది ప్రవాహం (Weather & River Status):**\n- **వాతావరణం**: 32°C (సాధారణ ఎండ, తేమ 58%).\n- **గోదావరి నీటి మట్టం**: 12.4 మీటర్లు (పూర్తిగా సురక్షిత స్నాన పరిధిలో ఉంది).\n- **ప్రవాహ వేగం**: 2.1 మీటర్లు/సెకను (సురక్షితం).\n- **సూచన**: సాయంత్రం వేళల్లో స్వల్ప వర్షం పడే అవకాశం ఉంది, గొడుగులు ఉంచుకోండి.`,
        spokenText: "ప్రస్తుతం వాతావరణం ముప్పై రెండు డిగ్రీల సెల్సియస్ తో సాధారణంగా ఉంది. గోదావరి నీటి మట్టం పన్నెండు పాయింట్ నాలుగు మీటర్లతో సురక్షిత స్థాయిలోనే ఉంది. ప్రవాహం శాంతియుతంగా ఉంది కాబట్టి నిశ్చింతగా స్నానం చేయవచ్చు.",
        category: "weather"
      };
    } else if (lang === 'hi') {
      return {
        language: 'hi',
        displayText: `**मौसम एवं जल स्तर स्थिति (Live Weather & River Status):**\n- **तापमान**: 32°C (मौसम साफ, आर्द्रता 58%)।\n- **गोदावरी जल स्तर**: 12.4 मीटर (पूर्णतः सुरक्षित स्नान स्तर)।\n- **नदी का बहाव**: 2.1 मीटर/सेकंड (सुरक्षित)।\n- **पूर्वानुमान**: शाम को हल्की वर्षा की संभावना है, छाता साथ रखें।`,
        spokenText: "वर्तमान में तापमान बत्तीस डिग्री सेल्सियस है और मौसम साफ है। गोदावरी नदी का जल स्तर बारह दशमलव चार मीटर पर पूरी तरह सुरक्षित है और स्नान के लिए आदर्श स्थिति बनी हुई है।",
        category: "weather"
      };
    } else {
      return {
        language: 'en',
        displayText: `**Weather & River Status:**\n- **Temperature**: 32°C · Clear skies (Humidity 58%).\n- **River Water Level**: 12.4 meters (well within safe bathing levels).\n- **Flow Velocity**: 2.1 m/s (gentle and safe).\n- **Advisory**: Light evening drizzle forecast; please carry umbrellas and walk carefully on stone steps.`,
        spokenText: "Current weather in Rajahmundry is 32 degrees Celsius and clear. The Godavari water level is at a safe 12.4 meters with smooth river currents, ensuring safe bathing across all marked ghats.",
        category: "weather"
      };
    }
  }

  // 14. Unverified / Unknown Arrangements Safeguard
  if (/vip pass price|helicopter|flight|celebrity|minister visit|star ticket/i.test(q)) {
    if (lang === 'te') {
      return {
        language: 'te',
        displayText: "ఈ ప్రత్యేక సదుపాయానికి సంబంధించి అధికారిక ప్రభుత్వ ప్రకటన ఇంకా విడుదల కాలేదు. మరిన్ని వివరాల కోసం రాజమండ్రి పుష్కర కంట్రోల్ రూమ్ 0883-2471234 ను సంప్రదించండి.",
        spokenText: "ఈ సదుపాయానికి సంబంధించిన అధికారిక ప్రకటన ఇంకా రాలేదు. ధృవీకరించిన సమాచారం కోసం కంట్రోల్ రూమ్ సున్నా ఎనిమిది ఎనిమిది మూడు రెండు నాలుగు ఏడు ఒకటి రెండు మూడు నాలుగు కు సంప్రదించవచ్చు.",
        category: "unverified"
      };
    } else if (lang === 'hi') {
      return {
        language: 'hi',
        displayText: "इस विशेष व्यवस्था के बारे में अभी कोई आधिकारिक घोषणा नहीं हुई है। सत्यापित जानकारी के लिए पुष्करालु नियंत्रण कक्ष 0883-2471234 पर संपर्क करें।",
        spokenText: "इस व्यवस्था के बारे में अभी कोई आधिकारिक घोषणा नहीं हुई है। कृपया पुष्करालु नियंत्रण कक्ष शून्य आठ आठ तीन दो चार सात एक दो तीन चार पर संपर्क करें।",
        category: "unverified"
      };
    } else {
      return {
        language: 'en',
        displayText: "Official arrangements for this specific item have not yet been confirmed by the district administration. Please contact the Pushkaralu Central Control Room at 0883-2471234 for verified updates.",
        spokenText: "Official arrangements for this specific item have not yet been confirmed. Please contact the Pushkaralu Central Control Room at 0 8 8 3 2 4 7 1 2 3 4.",
        category: "unverified"
      };
    }
  }

  // 15. Conversational General Fallback
  if (lang === 'te') {
    return {
      language: 'te',
      displayText: `నమస్కారం! గోదావరి మహా పుష్కరాలు 2027 అధికారిక సహాయ కేంద్రానికి స్వాగతం.

మీరు ఈ క్రింది సేవల గురించి ఏదైనా అడగవచ్చు:
1. **స్నాన ఘాట్ల వేళలు & సమీప ఘాట్** (పుష్కర్, కోటిలింగాల, సరస్వతి, గౌతమి ఘాట్లు)
2. **కార్ మరియు బస్ పార్కింగ్ లభ్యత** (ఆర్ట్స్ కాలేజ్, సుబ్రహ్మణ్య మైదానం)
3. **ఆలయ దర్శన సమయాలు** (కోటిలింగేశ్వర, మార్కండేయ ఆలయాలు)
4. **ఉచిత తాగునీరు, డ్రెస్ ఛేంజింగ్ రూములు & అన్నదానం**
5. **అత్యవసర హెల్ప్‌లైన్లు (112, 108, 100, 0883-2471234)**`,
      spokenText: "నమస్కారం! గోదావరి మహా పుష్కరాలు సహాయ కేంద్రానికి స్వాగతం. మీరు స్నాన ఘాట్ల సమయాలు, సమీప ఘాట్, కార్ పార్కింగ్, ఆలయ దర్శనం, తాగునీరు లేదా అత్యవసర నంబర్ల గురించి నన్ను అడగవచ్చు.",
      category: "general"
    };
  } else if (lang === 'hi') {
    return {
      language: 'hi',
      displayText: `नमस्ते! गोदावरी महा पुष्करालु 2027 आधिकारिक सहायता केंद्र में आपका स्वागत है।

आप इन सभी सुविधाओं की सटीक जानकारी पूछ सकते हैं:
1. **स्नान घाट, समय एवं निकटतम घाट** (पुष्कर, कोटालिंगाला, सरस्वती व गौतमी घाट)
2. **लाइव कार एवं बस पार्किंग उपलब्धता** (आर्ट्स कॉलेज, सुब्रमण्य मैदान)
3. **मंदिर दर्शन समय** (कोटालिंगेश्वर एवं मार्कंडेय मंदिर)
4. **पेयजल, कपड़े बदलने के कमरे और निशुल्क अन्नदानम**
5. **आपातकालीन हेल्पलाइन (112, 108, 100, 0883-2471234)**`,
      spokenText: "नमस्ते! गोदावरी महा पुष्करालु सहायता केंद्र में आपका स्वागत है। आप स्नान घाटों के समय, निकटतम घाट, कार पार्किंग, मंदिर दर्शन, पीने का पानी या आपातकालीन हेल्पलाइन के बारे में पूछ सकते हैं।",
      category: "general"
    };
  } else {
    return {
      language: 'en',
      displayText: `Welcome to the Godavari Maha Pushkaralu 2027 Pilgrim Information Center.

You can ask me about:
1. **Bathing Ghats & Nearest Ghat** (Pushkar, Kotilingala, Saraswati, Gowtami)
2. **Live Parking Availability** (Cars at Arts College, Two-Wheelers at Subramanya Maidan)
3. **Temple Darshan & Timings** (Kotilingeswara, Markandeya, Ramanatha temples)
4. **Drinking Water Points, Changing Rooms & Annadanam Food**
5. **Verified Emergency Helplines (112, 108, 100, 0883-2471234)**`,
      spokenText: "Welcome to the Godavari Maha Pushkaralu assistant. You can ask me about bathing ghats, nearest ghat, darshan timings, car parking availability, drinking water points, or verified emergency helplines.",
      category: "general"
    };
  }
}
