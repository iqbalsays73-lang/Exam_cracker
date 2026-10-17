"use strict";

window.IQBAL_DATA = {
  version: "1.0.0",
  academy: "PROJECT IQBAL",

  // =========================================
  // 1. EXAMS
  // =========================================

  exams: [
    { id: "chsl", name: "SSC CHSL", category: "SSC", description: "10+2 level examination" },
    { id: "cgl", name: "SSC CGL", category: "SSC", description: "Graduate-level examination" },
    { id: "mts", name: "SSC MTS", category: "SSC", description: "Multi-tasking staff" },
    { id: "gd", name: "SSC GD", category: "SSC", description: "Constable recruitment" },
    { id: "cpo", name: "SSC CPO", category: "SSC", description: "Sub-Inspector examination" },
    { id: "pet", name: "UPSSSC PET", category: "Other", description: "Preliminary Eligibility Test" },
    { id: "up-police", name: "UP Police Constable", category: "Police", description: "Constable preparation" },
    { id: "upsi", name: "UP Police SI", category: "Police", description: "Sub-Inspector preparation" },
    { id: "ntpc", name: "Railway NTPC", category: "Railway", description: "Railway recruitment" },
    { id: "group-d", name: "Railway Group D", category: "Railway", description: "Railway Group D preparation" },
    { id: "ibps", name: "IBPS Clerk", category: "Banking", description: "Banking examination" },
    { id: "sbi", name: "SBI Clerk", category: "Banking", description: "Bank clerk preparation" },
    { id: "ctet", name: "CTET", category: "Teaching", description: "Teacher eligibility test" },
    { id: "nda", name: "NDA", category: "Other", description: "Defence entrance examination" },
    { id: "other", name: "Other Government Exams", category: "Other", description: "General exam preparation" }
  ],

  // =========================================
  // 2. SUBJECTS AND CHAPTERS
  // =========================================

  subjects: [
    {
      id: "Maths",
      name: "Maths",
      icon: "📐",
      description: "Arithmetic and advanced mathematics",
      topics: [
        {
          id: "Number System",
          title: "Number System",
          difficulty: "Basic",
          content: `<h3>Number System</h3>
          <p>Natural numbers: 1, 2, 3...</p>
          <p>Whole numbers: 0, 1, 2, 3...</p>
          <p>Integers: ..., -2, -1, 0, 1, 2...</p>
          <h3>Divisibility Rules</h3>
          <ul>
          <li>2: Last digit even ho.</li>
          <li>3: Digits ka sum 3 se divisible ho.</li>
          <li>5: Last digit 0 ya 5 ho.</li>
          <li>9: Digits ka sum 9 se divisible ho.</li>
          <li>10: Last digit 0 ho.</li>
          </ul>
          <p>Yaad rakho: 1 na prime hai, na composite.</p>`
        },
        {
          id: "Simplification",
          title: "Simplification and BODMAS",
          difficulty: "Basic",
          content: `<h3>BODMAS</h3>
          <p>Brackets, Orders, Division, Multiplication, Addition, Subtraction.</p>
          <p>Example: 12 ÷ 3 × 2 = 4 × 2 = 8.</p>
          <p>Multiplication aur division mein left-to-right chalo.</p>`
        },
        {
          id: "Percentage",
          title: "Percentage",
          difficulty: "Basic",
          content: `<h3>Formula</h3>
          <p>Percentage = Part ÷ Total × 100</p>
          <ul>
          <li>10% = 1/10</li><li>20% = 1/5</li>
          <li>25% = 1/4</li><li>50% = 1/2</li>
          <li>75% = 3/4</li><li>12.5% = 1/8</li>
          <li>33⅓% = 1/3</li><li>66⅔% = 2/3</li>
          </ul>
          <p>Example: 25% of 240 = 240 ÷ 4 = 60.</p>`
        },
        {
          id: "Ratio",
          title: "Ratio and Proportion",
          difficulty: "Basic",
          content: `<p>12:18 = 2:3.</p>
          <p>Ratio simplify karne ke liye dono terms ko HCF se divide karo.</p>
          <p>A:B = C:D, toh A × D = B × C.</p>`
        },
        {
          id: "Profit Loss",
          title: "Profit, Loss and Discount",
          difficulty: "Medium",
          content: `<p>Profit = SP − CP</p>
          <p>Loss = CP − SP</p>
          <p>Profit% = Profit ÷ CP × 100</p>
          <p>Loss% = Loss ÷ CP × 100</p>
          <p>Discount = Marked Price − Selling Price.</p>`
        },
        {
          id: "Average",
          title: "Average",
          difficulty: "Basic",
          content: `<p>Average = Total sum ÷ Number of observations.</p>
          <p>Example: 10, 20, 30 ka average = 60 ÷ 3 = 20.</p>`
        },
        {
          id: "Interest",
          title: "Simple and Compound Interest",
          difficulty: "Medium",
          content: `<p>Simple Interest = P × R × T ÷ 100.</p>
          <p>Compound interest mein interest principal mein add hota rehta hai.</p>
          <p>Rate aur time ki units hamesha check karo.</p>`
        },
        {
          id: "Time Work",
          title: "Time and Work",
          difficulty: "Medium",
          content: `<p>Agar A kaam 10 din mein karta hai, one-day work = 1/10.</p>
          <p>Aur B 15 din mein karta hai, one-day work = 1/15.</p>
          <p>Combined work = 1/10 + 1/15 = 1/6.</p>
          <p>Dono milkar kaam 6 din mein karenge.</p>`
        },
        {
          id: "Speed",
          title: "Time, Speed and Distance",
          difficulty: "Medium",
          content: `<p>Speed = Distance ÷ Time.</p>
          <p>Distance = Speed × Time.</p>
          <p>km/h to m/s: multiply by 5/18.</p>
          <p>m/s to km/h: multiply by 18/5.</p>`
        },
        {
          id: "Algebra",
          title: "Algebra",
          difficulty: "Medium",
          content: `<p>(a+b)² = a² + 2ab + b²</p>
          <p>(a−b)² = a² − 2ab + b²</p>
          <p>a²−b² = (a−b)(a+b)</p>
          <p>x²−(a+b)x+ab = (x−a)(x−b).</p>`
        },
        {
          id: "Geometry",
          title: "Geometry",
          difficulty: "Medium",
          content: `<p>Triangle area = ½ × base × height.</p>
          <p>Rectangle area = length × breadth.</p>
          <p>Square area = side².</p>
          <p>Circle area = πr².</p>
          <p>Circle circumference = 2πr.</p>`
        },
        {
          id: "Mensuration",
          title: "Mensuration",
          difficulty: "Medium",
          content: `<p>Cube volume = a³.</p>
          <p>Cuboid volume = l × b × h.</p>
          <p>Cylinder volume = πr²h.</p>
          <p>Cone volume = ⅓πr²h.</p>
          <p>Sphere volume = ⁴⁄₃πr³.</p>`
        },
        {
          id: "DI",
          title: "Data Interpretation",
          difficulty: "Advanced",
          content: `<p>Tables, bar graphs, pie charts aur line graphs practice karo.</p>
          <p>Units, labels aur scale check karna mat bhoolna.</p>`
        },
        {
          id: "Mixture",
          title: "Mixture and Alligation",
          difficulty: "Advanced",
          content: `<p>Mixture mein quantities aur unke rates ko compare karo.</p>
          <p>Alligation ka use average price aur mixing ratio nikalne mein hota hai.</p>`
        },
        {
          id: "Partnership",
          title: "Partnership",
          difficulty: "Medium",
          content: `<p>Profit-sharing ratio = Capital × Time ke products ka ratio.</p>`
        },
        {
          id: "Problems Ages",
          title: "Problems on Ages",
          difficulty: "Medium",
          content: `<p>Present age ko x maan kar equations banao.</p>
          <p>Past aur future age ke liye same time difference use karo.</p>`
        },
        {
          id: "Number HCF LCM",
          title: "HCF and LCM",
          difficulty: "Basic",
          content: `<p>Do positive integers ke liye HCF × LCM = unka product.</p>
          <p>Prime factorisation se HCF aur LCM nikal sakte ho.</p>`
        }
      ]
    },

    {
      id: "Reasoning",
      name: "Reasoning",
      icon: "🧩",
      description: "Verbal and non-verbal reasoning",
      topics: [
        { id: "Analogy", title: "Analogy", difficulty: "Basic", content: `<p>Objects ke beech relation identify karo aur wahi relation doosre pair par lagao.</p>` },
        { id: "Series", title: "Number and Alphabet Series", difficulty: "Basic", content: `<p>Difference, multiplication, division aur alternating patterns check karo.</p><p>A=1, B=2 ... Z=26.</p>` },
        { id: "Coding", title: "Coding-Decoding", difficulty: "Medium", content: `<p>Letter shifting, reverse alphabet aur position values check karo.</p>` },
        { id: "Blood Relation", title: "Blood Relations", difficulty: "Medium", content: `<p>Family tree banao aur generations ko clearly mark karo.</p>` },
        { id: "Direction", title: "Direction Sense", difficulty: "Basic", content: `<p>North, South, East, West ka diagram banao aur turns track karo.</p>` },
        { id: "Ranking", title: "Order and Ranking", difficulty: "Basic", content: `<p>Total persons = Rank from top + Rank from bottom − 1.</p>` },
        { id: "Syllogism", title: "Syllogism", difficulty: "Medium", content: `<p>Statements ko Venn diagram mein represent karo. Extra assumptions mat banao.</p>` },
        { id: "Seating", title: "Seating Arrangement", difficulty: "Advanced", content: `<p>Fixed clues pehle place karo. Phir remaining clues verify karo.</p>` },
        { id: "Non Verbal", title: "Non-Verbal Reasoning", difficulty: "Medium", content: `<p>Rotation, reflection, pattern aur figure counting practice karo.</p>` },
        { id: "Classification", title: "Classification", difficulty: "Basic", content: `<p>Options mein common property aur odd item identify karo.</p>` },
        { id: "Venn Diagram", title: "Venn Diagram", difficulty: "Medium", content: `<p>Categories aur unke overlap ko circles se represent karo.</p>` },
        { id: "Calendar", title: "Calendar", difficulty: "Advanced", content: `<p>Odd days, leap years aur day-date relationships practice karo.</p>` },
        { id: "Clock", title: "Clock", difficulty: "Advanced", content: `<p>Clock angle formula: |30H − 5.5M| degrees, smaller angle ke liye zarurat par 360 se subtract karo.</p>` }
      ]
    },

    {
      id: "History",
      name: "History",
      icon: "🏛️",
      description: "Ancient, Medieval and Modern India",
      topics: [
        { id: "Ancient", title: "Ancient India", difficulty: "Basic", content: `<h3>Topics</h3><p>Prehistory, Indus Valley Civilization, Vedic Period, Mahajanapadas, Buddhism, Jainism, Maurya, Gupta aur Harshavardhana.</p><p>Timeline aur important rulers ko chronology mein revise karo.</p>` },
        { id: "Medieval", title: "Medieval India", difficulty: "Medium", content: `<p>Delhi Sultanate, Slave, Khilji, Tughlaq, Sayyid, Lodi, Mughal Empire, Bhakti aur Sufi movements.</p>` },
        { id: "Modern", title: "Modern India", difficulty: "Medium", content: `<p>European companies, Battle of Plassey, Revolt of 1857, Congress, Swadeshi, Non-Cooperation, Civil Disobedience aur Quit India Movement.</p>` },
        { id: "National Movement", title: "National Movement", difficulty: "Medium", content: `<p>Congress sessions, presidents, important acts, movements, leaders aur dates ko timeline mein padho.</p>` },
        { id: "Art Culture", title: "Art and Culture", difficulty: "Medium", content: `<p>Architecture, paintings, classical dances, music, literature, festivals aur heritage sites.</p>` }
      ]
    },

    {
      id: "Geography",
      name: "Geography",
      icon: "🌍",
      description: "Physical, Indian and World Geography",
      topics: [
        { id: "Physical", title: "Physical Geography", difficulty: "Basic", content: `<p>Earth structure, latitude-longitude, rocks, mountains, plateaus, atmosphere, climate and oceans.</p>` },
        { id: "Indian", title: "Indian Geography", difficulty: "Medium", content: `<p>States and capitals, rivers, dams, mountains, passes, soils, agriculture, minerals, industries and monsoon.</p>` },
        { id: "World", title: "World Geography", difficulty: "Medium", content: `<p>Continents, oceans, mountains, deserts, rivers, countries, capitals and important straits.</p>` },
        { id: "Environment", title: "Environment and Ecology", difficulty: "Medium", content: `<p>Ecosystems, food chains, biodiversity, pollution, climate change and conservation.</p>` },
        { id: "Maps", title: "Map Practice", difficulty: "Medium", content: `<p>India ke states, rivers, mountain ranges, neighbouring countries aur important locations identify karo.</p>` }
      ]
    },

    {
      id: "Polity",
      name: "Polity",
      icon: "🇮🇳",
      description: "Indian Constitution and government",
      topics: [
        { id: "Constitution", title: "Constitution Basics", difficulty: "Basic", content: `<p>Preamble, Constituent Assembly, salient features, sources and important dates.</p>` },
        { id: "Fundamental Rights", title: "Fundamental Rights", difficulty: "Medium", content: `<p>Part III, Articles 12–35. Article 14: equality before law; Article 19: specified freedoms; Article 21: life and personal liberty; Article 32: constitutional remedies.</p>` },
        { id: "DPSP", title: "Directive Principles", difficulty: "Medium", content: `<p>Part IV, Articles 36–51. State policy ke guiding principles.</p>` },
        { id: "Duties", title: "Fundamental Duties", difficulty: "Basic", content: `<p>Fundamental Duties Article 51A mein hain. Duties aur relevant amendments revise karo.</p>` },
        { id: "President", title: "President and Vice-President", difficulty: "Medium", content: `<p>Election, qualifications, powers, tenure, impeachment aur constitutional role.</p>` },
        { id: "Parliament", title: "Parliament", difficulty: "Medium", content: `<p>Lok Sabha, Rajya Sabha, Speaker, bills, Money Bill, sessions aur parliamentary procedure.</p>` },
        { id: "Judiciary", title: "Supreme Court and High Courts", difficulty: "Medium", content: `<p>Jurisdiction, judges, judicial review, writs aur independence of judiciary.</p>` },
        { id: "Federalism", title: "Centre-State Relations", difficulty: "Medium", content: `<p>Union, State and Concurrent Lists; legislative, administrative and financial relations.</p>` },
        { id: "Constitutional Bodies", title: "Constitutional Bodies", difficulty: "Medium", content: `<p>Election Commission, UPSC, Finance Commission aur CAG ke functions aur constitutional provisions.</p>` },
        { id: "Emergency", title: "Emergency Provisions", difficulty: "Advanced", content: `<p>National Emergency, State Emergency aur Financial Emergency ke provisions aur effects.</p>` },
        { id: "Schedules", title: "12 Schedules", difficulty: "Medium", content: `<p>Har Schedule ka number, subject aur relevant constitutional provision revise karo.</p>` },
        { id: "Amendments", title: "Constitutional Amendments", difficulty: "Advanced", content: `<p>Important amendments, unke provisions aur historical context ko official sources se verify karo.</p>` }
      ]
    },

    {
      id: "Science",
      name: "Science",
      icon: "🔬",
      description: "Physics, Chemistry and Biology",
      topics: [
        { id: "Physics", title: "Physics", difficulty: "Basic", content: `<p>Motion, force, work, energy, heat, light, sound, electricity, magnetism and SI units.</p>` },
        { id: "Chemistry", title: "Chemistry", difficulty: "Basic", content: `<p>Atoms, molecules, elements, compounds, acids, bases, salts, metals, non-metals and reactions.</p>` },
        { id: "Biology", title: "Biology", difficulty: "Basic", content: `<p>Cell, tissues, human body, nutrition, diseases, plants, animals and ecology.</p>` },
        { id: "Human Body", title: "Human Body", difficulty: "Medium", content: `<p>Digestive, respiratory, circulatory, nervous and excretory systems.</p>` }
      ]
    },

    {
      id: "Economy",
      name: "Economy",
      icon: "📊",
      description: "Indian economy and banking",
      topics: [
        { id: "Basics", title: "Basic Economics", difficulty: "Basic", content: `<p>GDP, national income, inflation, unemployment, demand, supply and economic growth.</p>` },
        { id: "Banking", title: "Banking and RBI", difficulty: "Medium", content: `<p>RBI functions, repo rate, CRR, SLR, monetary policy and banking terms. Current rates official sources se check karo.</p>` },
        { id: "Budget", title: "Budget and Taxation", difficulty: "Medium", content: `<p>Budget, fiscal deficit, government expenditure, direct and indirect taxes.</p>` },
        { id: "Schemes", title: "Government Schemes", difficulty: "Medium", content: `<p>Scheme ka purpose, ministry, beneficiaries aur launch details official sources se verify karo.</p>` }
      ]
    },

    {
      id: "Hindi",
      name: "Hindi",
      icon: "अ",
      description: "Hindi grammar and vocabulary",
      topics: [
        { id: "Sandhi", title: "संधि", difficulty: "Basic", content: `<p>स्वर संधि, व्यंजन संधि और विसर्ग संधि।</p><p>विद्यालय = विद्या + आलय।</p>` },
        { id: "Samas", title: "समास", difficulty: "Basic", content: `<p>अव्ययीभाव, तत्पुरुष, कर्मधारय, द्विगु, द्वंद्व और बहुव्रीहि।</p>` },
        { id: "Paryayvachi", title: "पर्यायवाची शब्द", difficulty: "Basic", content: `<p>समान या मिलते-जुलते अर्थ वाले शब्दों का अभ्यास करें।</p>` },
        { id: "Vilom", title: "विलोम शब्द", difficulty: "Basic", content: `<p>विपरीत अर्थ वाले शब्दों का अभ्यास करें।</p>` },
        { id: "Muhavare", title: "मुहावरे और लोकोक्तियाँ", difficulty: "Medium", content: `<p>अर्थ के साथ उदाहरण और वाक्य-प्रयोग याद करें।</p>` },
        { id: "Grammar", title: "Hindi Grammar", difficulty: "Medium", content: `<p>संज्ञा, सर्वनाम, विशेषण, क्रिया, काल, कारक, वाच्य, वाक्य-शुद्धि और विराम-चिह्न।</p>` },
        { id: "Spelling", title: "वर्तनी शुद्धि", difficulty: "Medium", content: `<p>सही वर्तनी, अशुद्ध वाक्य और शब्द-प्रयोग का अभ्यास करें।</p>` }
      ]
    },

    {
      id: "English",
      name: "English",
      icon: "🔤",
      description: "Grammar, vocabulary and comprehension",
      topics: [
        { id: "Parts of Speech", title: "Parts of Speech", difficulty: "Basic", content: `<p>Noun, Pronoun, Verb, Adjective, Adverb, Preposition, Conjunction and Interjection.</p>` },
        { id: "Tenses", title: "Tenses", difficulty: "Basic", content: `<p>Present, Past and Future; affirmative, negative and interrogative structures.</p>` },
        { id: "Articles", title: "Articles", difficulty: "Basic", content: `<p>A, an and the ke rules aur exceptions practice karo.</p>` },
        { id: "Prepositions", title: "Prepositions", difficulty: "Medium", content: `<p>Time, place, movement aur common fixed prepositions revise karo.</p>` },
        { id: "Error Detection", title: "Error Detection", difficulty: "Medium", content: `<p>Subject-verb agreement, tense, articles, prepositions and pronouns check karo.</p>` },
        { id: "Vocabulary", title: "Vocabulary", difficulty: "Basic", content: `<p>Synonyms, antonyms, idioms, phrases, one-word substitution and spelling.</p>` },
        { id: "Comprehension", title: "Reading Comprehension", difficulty: "Medium", content: `<p>Main idea, tone, inference aur passage evidence ke basis par answers select karo.</p>` }
      ]
    },

    {
      id: "Computer",
      name: "Computer",
      icon: "💻",
      description: "Computer fundamentals and applications",
      topics: [
        { id: "Fundamentals", title: "Computer Fundamentals", difficulty: "Basic", content: `<p>CPU, memory, input-output devices, storage and operating systems.</p>` },
        { id: "Internet", title: "Internet and Networking", difficulty: "Basic", content: `<p>Internet, browser, email, IP, DNS, LAN, WAN and cybersecurity basics.</p>` },
        { id: "Office", title: "Office Applications", difficulty: "Medium", content: `<p>Word processing, spreadsheets, presentations and common shortcuts.</p>` },
        { id: "Cybersecurity", title: "Cybersecurity Basics", difficulty: "Medium", content: `<p>Strong passwords, phishing, malware, privacy and safe browsing.</p>` }
      ]
    },

    {
      id: "GK",
      name: "GK / General Awareness",
      icon: "🧠",
      description: "Static GK and current affairs",
      topics: [
        { id: "Static GK", title: "Static GK", difficulty: "Basic", content: `<p>National symbols, awards, books, authors, important days, sports and organizations.</p>` },
        { id: "Current Affairs", title: "Current Affairs", difficulty: "Medium", content: `<p>Monthly national, international, sports, economy, science and government updates. Date and source verify karo.</p>` },
        { id: "Important Days", title: "Important Days", difficulty: "Basic", content: `<p>Important days, themes and observances revise karo.</p>` },
        { id: "Books Authors", title: "Books and Authors", difficulty: "Basic", content: `<p>Famous books, authors and literary awards ka revision karo.</p>` }
      ]
    }
  ],

  // =========================================
  // 3. CONSTITUTION SPECIAL
  // =========================================

  constitution: [
    {
      id: "preamble",
      title: "Preamble / प्रस्तावना",
      tag: "Constitution",
      content: `<h3>मुख्य आदर्श</h3>
      <p>न्याय, स्वतंत्रता, समानता और बंधुता।</p>
      <p>प्रस्तावना के शब्दों और संशोधन संबंधी तथ्यों को आधिकारिक संविधान पाठ से पढ़ें।</p>`
    },
    {
      id: "articles",
      title: "Important Articles",
      tag: "Articles",
      content: `<ul>
      <li>Article 14: Equality before law</li>
      <li>Article 19: Specified freedoms</li>
      <li>Article 21: Life and personal liberty</li>
      <li>Article 32: Constitutional remedies</li>
      <li>Article 51A: Fundamental Duties</li>
      </ul>`
    },
    {
      id: "rights",
      title: "Fundamental Rights",
      tag: "Part III",
      content: `<p>Fundamental Rights Constitution ke Part III mein, Articles 12–35 ke framework mein diye gaye hain.</p><p>Article 14, 19, 21 aur 32 ko priority se revise karo.</p>`
    },
    {
      id: "dpsp",
      title: "Directive Principles",
      tag: "Part IV",
      content: `<p>Part IV, Articles 36–51: Directive Principles of State Policy.</p>`
    },
    {
      id: "duties",
      title: "Fundamental Duties",
      tag: "Article 51A",
      content: `<p>Fundamental Duties Article 51A mein hain. Duties aur amendments ko official text se revise karo.</p>`
    },
    {
      id: "schedules",
      title: "12 Schedules",
      tag: "Schedules",
      content: `<p>Sabhi 12 Schedules ka number, subject aur important provision yaad karo.</p><p>Exam ke liye har Schedule ka exact subject verify karna zaroori hai.</p>`
    },
    {
      id: "parliament",
      title: "Parliament",
      tag: "Union Legislature",
      content: `<p>Parliament mein President, Lok Sabha aur Rajya Sabha shamil hain.</p><p>Bills, Money Bill, sessions, Speaker aur parliamentary procedure revise karo.</p>`
    },
    {
      id: "president",
      title: "President of India",
      tag: "Executive",
      content: `<p>Election, qualification, tenure, powers, impeachment aur constitutional role padho.</p>`
    },
    {
      id: "judiciary",
      title: "Supreme Court",
      tag: "Judiciary",
      content: `<p>Jurisdiction, writs, judicial review aur judges se sambandhit provisions revise karo.</p>`
    },
    {
      id: "emergency",
      title: "Emergency Provisions",
      tag: "Emergency",
      content: `<p>National Emergency, State Emergency aur Financial Emergency ke constitutional provisions padho.</p>`
    },
    {
      id: "amendments",
      title: "Important Amendments",
      tag: "Amendments",
      content: `<p>Important constitutional amendments, year aur main provisions ko reliable constitutional sources se verify karo.</p>`
    }
  ],

  // =========================================
  // 4. PRACTICE QUESTIONS
  // All questions below are practice, NOT PYQs.
  // answer is a zero-based option index.
  // =========================================

  questions: [
    {
      id: "m001",
      subject: "Maths",
      topic: "Percentage",
      difficulty: "Easy",
      type: "Practice",
      question: "200 ka 25% kitna hai?",
      options: ["25", "40", "50", "75"],
      answer: 2,
      explanation: "25% = 1/4; 200 ÷ 4 = 50."
    },
    {
      id: "m002",
      subject: "Maths",
      topic: "Percentage",
      difficulty: "Easy",
      type: "Practice",
      question: "450 ka 10% kitna hai?",
      options: ["35", "40", "45", "50"],
      answer: 2,
      explanation: "450 ÷ 10 = 45."
    },
    {
      id: "m003",
      subject: "Maths",
      topic: "Number System",
      difficulty: "Easy",
      type: "Practice",
      question: "Inmein se prime number kaun-sa hai?",
      options: ["21", "27", "29", "33"],
      answer: 2,
      explanation: "29 ke sirf do positive factors hain: 1 aur 29."
    },
    {
      id: "m004",
      subject: "Maths",
      topic: "Simplification and BODMAS",
      difficulty: "Easy",
      type: "Practice",
      question: "12 ÷ 3 × 2 = ?",
      options: ["2", "6", "8", "18"],
      answer: 2,
      explanation: "Left to right: 12 ÷ 3 = 4; 4 × 2 = 8."
    },
    {
      id: "m005",
      subject: "Maths",
      topic: "Ratio and Proportion",
      difficulty: "Easy",
      type: "Practice",
      question: "12:18 ka simplest form kya hai?",
      options: ["2:3", "3:2", "4:5", "6:8"],
      answer: 0,
      explanation: "Dono terms ko 6 se divide karo."
    },
    {
      id: "m006",
      subject: "Maths",
      topic: "Average",
      difficulty: "Easy",
      type: "Practice",
      question: "10, 20 aur 30 ka average kya hai?",
      options: ["15", "20", "25", "30"],
      answer: 1,
      explanation: "(10 + 20 + 30) ÷ 3 = 20."
    },
    {
      id: "m007",
      subject: "Maths",
      topic: "Profit, Loss and Discount",
      difficulty: "Easy",
      type: "Practice",
      question: "CP ₹200 aur SP ₹250 hai. Profit percentage kya hai?",
      options: ["20%", "25%", "30%", "50%"],
      answer: 1,
      explanation: "Profit = 50; profit percentage = 50/200 × 100 = 25%."
    },
    {
      id: "m008",
      subject: "Maths",
      topic: "Simple and Compound Interest",
      difficulty: "Easy",
      type: "Practice",
      question: "₹1000 par 5% yearly rate se 2 saal ka simple interest?",
      options: ["₹50", "₹100", "₹150", "₹200"],
      answer: 1,
      explanation: "SI = 1000 × 5 × 2 ÷ 100 = ₹100."
    },
    {
      id: "r001",
      subject: "Reasoning",
      topic: "Number and Alphabet Series",
      difficulty: "Easy",
      type: "Practice",
      question: "2, 4, 6, 8, ?",
      options: ["9", "10", "11", "12"],
      answer: 1,
      explanation: "Har baar 2 add hota hai."
    },
    {
      id: "r002",
      subject: "Reasoning",
      topic: "Number and Alphabet Series",
      difficulty: "Easy",
      type: "Practice",
      question: "A, C, E, G, ?",
      options: ["H", "I", "J", "K"],
      answer: 1,
      explanation: "Ek letter skip ho raha hai; next I hai."
    },
    {
      id: "r003",
      subject: "Reasoning",
      topic: "Direction Sense",
      difficulty: "Easy",
      type: "Practice",
      question: "North ki taraf dekhte hue right turn karne par kis direction mein honge?",
      options: ["West", "East", "South", "North"],
      answer: 1,
      explanation: "North se right turn karne par East hota hai."
    },
    {
      id: "r004",
      subject: "Reasoning",
      topic: "Coding-Decoding",
      difficulty: "Easy",
      type: "Practice",
      question: "CAT ko har letter ek position aage karke code kiya jaye, toh code kya hoga?",
      options: ["DBU", "DBT", "CBU", "EBU"],
      answer: 0,
      explanation: "C→D, A→B, T→U; answer DBU."
    },
    {
      id: "h001",
      subject: "History",
      topic: "Ancient India",
      difficulty: "Easy",
      type: "Practice",
      question: "Harappa kis civilization se sambandhit hai?",
      options: ["Indus Valley", "Roman", "Maya", "Inca"],
      answer: 0,
      explanation: "Harappa Indus Valley Civilization ka ek major site tha."
    },
    {
      id: "h002",
      subject: "History",
      topic: "Ancient India",
      difficulty: "Easy",
      type: "Practice",
      question: "Ashoka kis dynasty ka ruler tha?",
      options: ["Gupta", "Maurya", "Chola", "Kushan"],
      answer: 1,
      explanation: "Ashoka Maurya dynasty ka ruler tha."
    },
    {
      id: "g001",
      subject: "Geography",
      topic: "World Geography",
      difficulty: "Easy",
      type: "Practice",
      question: "Duniya ka sabse bada ocean kaun-sa hai?",
      options: ["Atlantic", "Indian", "Arctic", "Pacific"],
      answer: 3,
      explanation: "Pacific Ocean sabse bada ocean hai."
    },
    {
      id: "p001",
      subject: "Polity",
      topic: "Fundamental Rights",
      difficulty: "Easy",
      type: "Practice",
      question: "Fundamental Rights Constitution ke kis Part mein hain?",
      options: ["Part I", "Part II", "Part III", "Part IV"],
      answer: 2,
      explanation: "Fundamental Rights Part III mein hain."
    },
    {
      id: "p002",
      subject: "Polity",
      topic: "Fundamental Rights",
      difficulty: "Easy",
      type: "Practice",
      question: "Equality before law kis Article se sambandhit hai?",
      options: ["Article 14", "Article 19", "Article 21", "Article 32"],
      answer: 0,
      explanation: "Article 14 equality before law aur equal protection se sambandhit hai."
    },
    {
      id: "s001",
      subject: "Science",
      topic: "Biology",
      difficulty: "Easy",
      type: "Practice",
      question: "Human body mein blood pump kaun karta hai?",
      options: ["Lungs", "Heart", "Kidney", "Stomach"],
      answer: 1,
      explanation: "Heart blood ko circulate karta hai."
    },
    {
      id: "s002",
      subject: "Science",
      topic: "Physics",
      difficulty: "Easy",
      type: "Practice",
      question: "Force ki SI unit kya hai?",
      options: ["Joule", "Watt", "Newton", "Pascal"],
      answer: 2,
      explanation: "Force ki SI unit Newton hai."
    },
    {
      id: "e001",
      subject: "English",
      topic: "Tenses",
      difficulty: "Easy",
      type: "Practice",
      question: "Choose the correct sentence.",
      options: [
        "She go to school.",
        "She goes to school.",
        "She going school.",
        "She gone to school."
      ],
      answer: 1,
      explanation: "Simple present tense mein third-person singular ke saath goes aata hai."
    },
    {
      id: "hi001",
      subject: "Hindi",
      topic: "संधि",
      difficulty: "Easy",
      type: "Practice",
      question: "विद्यालय का सामान्य संधि-विच्छेद क्या है?",
      options: [
        "विद्या + आलय",
        "विद + यालय",
        "वि + द्यालय",
        "विद्या + लय"
      ],
      answer: 0,
      explanation: "विद्यालय = विद्या + आलय."
    },
    {
      id: "c001",
      subject: "Computer",
      topic: "Computer Fundamentals",
      difficulty: "Easy",
      type: "Practice",
      question: "Computer ka main processing component kaun-sa hai?",
      options: ["Monitor", "CPU", "Keyboard", "Speaker"],
      answer: 1,
      explanation: "CPU instructions execute karta hai aur data process karta hai."
    },
    {
      id: "eco001",
      subject: "Economy",
      topic: "Banking and RBI",
      difficulty: "Easy",
      type: "Practice",
      question: "India ka central bank kaun-sa hai?",
      options: ["SBI", "RBI", "NABARD", "SEBI"],
      answer: 1,
      explanation: "Reserve Bank of India Bharat ka central bank hai."
    },
    {
      id: "gk001",
      subject: "GK / General Awareness",
      topic: "Static GK",
      difficulty: "Easy",
      type: "Practice",
      question: "Bharat ka national animal kaun-sa hai?",
      options: ["Lion", "Bengal Tiger", "Elephant", "Leopard"],
      answer: 1,
      explanation: "Bengal Tiger Bharat ka national animal hai."
    }
  ],

  // =========================================
  // 5. MOCK TEST DEFINITIONS
  // =========================================

  mockTests: [
    {
      id: "mixed-10",
      title: "Mixed Practice Test",
      description: "Mixed subjects ke 10 questions",
      subject: "All",
      questionCount: 10,
      durationMinutes: 10,
      negativeMarking: 0.25
    },
    {
      id: "maths-test",
      title: "Maths Foundation Test",
      description: "Maths practice questions",
      subject: "Maths",
      questionCount: 10,
      durationMinutes: 15,
      negativeMarking: 0.25
    },
    {
      id: "polity-test",
      title: "Polity Foundation Test",
      description: "Constitution and polity practice",
      subject: "Polity",
      questionCount: 10,
      durationMinutes: 10,
      negativeMarking: 0.25
    },
    {
      id: "reasoning-test",
      title: "Reasoning Foundation Test",
      description: "Reasoning practice questions",
      subject: "Reasoning",
      questionCount: 10,
      durationMinutes: 10,
      negativeMarking: 0.25
    }
  ],

  // =========================================
  // 6. PYQ ARCHIVE
  // =========================================

  pyqYears: [2020, 2021, 2022, 2023, 2024, 2025],

  pyqNotice:
    "Questions in this starter database are practice questions, not verified PYQs. A question must be checked against an authentic paper before assigning an exam, year, shift or PYQ label.",

  // Add verified questions here after checking the original paper.
  verifiedPYQs: []

};
