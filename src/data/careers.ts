import type { Career } from '../types'

export const careers: Career[] = [
  {
    id: 'sommelier',
    number: '01',
    title: 'Sommelier',
    tagline: 'Apparently, tasting wine can actually be a career.',
    shortDescription:
      'A wine professional who curates, serves, and tells the story behind every bottle — part palate, part memory, part theatre.',
    longDescription:
      'A sommelier is a trained wine professional who works in restaurants, hotels, wineries, or as an independent consultant. They curate wine lists, advise guests on pairings, manage cellar inventory, and continuously study the geography, chemistry, and history behind every bottle. It is a career built on a refined palate, deep memory, and the ability to make a glass of wine feel like a story.',
    whatTheyDo: [
      'Curate and maintain restaurant wine lists with hundreds of selections',
      'Taste and evaluate wines for quality, flaws, and pairing potential',
      'Advise guests on pairings tailored to their meal, budget, and taste',
      'Manage cellar inventory, purchasing, and aging strategy',
      'Study wine regions, grape varieties, vintages, and production methods',
      'Train service staff on wine knowledge and service standards',
    ],
    aesthetic:
      'Dim cellar lighting, linen tablecloths, a tasting glass cradled like a small treasure. The romantic image: swirling, sniffing, murmuring about blackcurrant and leather.',
    reality:
      'Mostly it is memorization — regions, appellations, vintages, producers. You carry crates, count inventory at midnight, deal with guests who ask for "something sweet but dry," and study constantly for certifications that take years.',
    vibe: {
      love: [
        'You have a sensitive palate and genuinely enjoy tasting',
        'You love memorizing details — regions, years, names',
        'You enjoy hospitality and reading a room',
        'You want a career with a clear certification ladder',
      ],
      hate: [
        'You dislike repetition and long study sessions',
        'Standing for hours and carrying heavy crates sounds awful',
        'You are not interested in hospitality or service',
        'You want a desk job with predictable hours',
      ],
    },
    entryPath: [
      'Start tasting deliberately — keep a wine journal',
      'Work in restaurant service to learn the floor',
      'Study for the Court of Master Sommeliers Intro exam',
      'Build palate memory through guided tastings',
      'Work under an experienced sommelier or wine director',
      'Pursue advanced certifications (CMS Certified, Advanced)',
    ],
    skills: [
      'Palate calibration & blind tasting',
      'Wine region & appellation knowledge',
      'Food pairing theory',
      'Cellar management & inventory',
      'Guest communication & storytelling',
      'Service etiquette',
    ],
    microcopy: [
      'Apparently, tasting wine can actually be a career.',
      'Your office might be a cellar.',
      'Not just wine. Knowledge, memory and taste.',
    ],
    gossip: 'Apparently, people get paid to taste wine.',
    dinnerTable: {
      normal:
        "A sommelier is a wine expert who works in restaurants or wineries. They choose which wines the restaurant offers, help guests pick the right bottle for their meal, and manage the wine cellar.",
      parents:
        "You know how restaurants have someone who knows all about wine and helps you pick one? That is an actual profession. They get certified, study for years, and it pays well in fine dining. It is hospitality, but specialized.",
      dinner:
        "Imagine being the person who knows exactly which grape from which hillside in France goes best with the chicken. That is their whole job. They taste wine, memorize regions, and tell guests stories about every bottle.",
      friends:
        "Basically a wine wizard. They taste stuff, memorize where every grape grows, and tell rich people which bottle to order. Honestly sounds fun until you realize how much studying is involved.",
    },
    images: {
      hero: 'https://images.pexels.com/photos/30557566/pexels-photo-30557566.jpeg?auto=compress&cs=tinysrgb&w=1600',
      detail: 'https://images.pexels.com/photos/5490196/pexels-photo-5490196.jpeg?auto=compress&cs=tinysrgb&w=1200',
      gallery: [
        'https://images.pexels.com/photos/18247659/pexels-photo-18247659.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/14129212/pexels-photo-14129212.jpeg?auto=compress&cs=tinysrgb&w=800',
      ],
    },
    colors: {
      name: 'Burgundy',
      bg: '#1a0d10',
      bgSoft: '#2a151a',
      accent: '#a8324a',
      accentSoft: '#d4a0a8',
      accentDeep: '#6b1e2e',
      text: '#f0e6e0',
      textMuted: '#a08080',
    },
  },
  {
    id: 'oceanographer',
    number: '02',
    title: 'Oceanographer',
    tagline: 'What if your office was the ocean?',
    shortDescription:
      'A scientist who studies the ocean — its currents, chemistry, biology, and geology — to understand the largest ecosystem on Earth.',
    longDescription:
      'Oceanographers study the physical, chemical, biological, and geological aspects of the ocean. They work from research vessels, in laboratories, and at universities — collecting data on currents, marine life, seafloor geology, and climate interactions. It is a career of exploration, long hours at sea, and contributing to our understanding of the planet most humans never see.',
    whatTheyDo: [
      'Conduct field research from vessels, submersibles, and coastal stations',
      'Analyze seawater chemistry, temperature, and current patterns',
      'Study marine ecosystems and biodiversity',
      'Map the seafloor and study geological formations',
      'Publish research papers and present at scientific conferences',
      'Collaborate with climate scientists on ocean-atmosphere models',
    ],
    aesthetic:
      'Blue water stretching to every horizon, a research vessel cutting through waves, equipment being lowered into the deep. The image: exploration, discovery, adventure.',
    reality:
      'Fieldwork means weeks at sea with limited internet, seasickness, and 12-hour shifts. Back on land, it is data analysis, grant writing, and academic publishing. You need a graduate degree, and jobs are competitive.',
    vibe: {
      love: [
        'You are fascinated by the ocean and marine life',
        'You enjoy science and rigorous research',
        'Long stretches at sea sound like an adventure, not a punishment',
        'You are okay with pursuing a graduate degree',
      ],
      hate: [
        'You get seasick easily',
        'You dislike data analysis and academic writing',
        'You want a stable 9-to-5 with no travel',
        'Competitive grant-funded job markets stress you out',
      ],
    },
    entryPath: [
      'Build science foundations — biology, chemistry, physics, math',
      'Pursue a degree in oceanography, marine science, or a related field',
      'Get field experience through internships or research assistantships',
      'Join a research cruise or coastal field project',
      'Specialize in a sub-field — biological, physical, chemical, or geological',
      'Pursue a graduate degree and publish research',
    ],
    skills: [
      'Scientific research methodology',
      'Data analysis & statistical modeling',
      'Fieldwork & equipment operation',
      'Ocean science & marine biology',
      'Academic writing & publishing',
      'GIS & remote sensing',
    ],
    microcopy: [
      'What if your office was the ocean?',
      'Science, but make it tidal.',
      'Most of Earth is underwater. Someone has to study it.',
    ],
    gossip: 'Apparently, your office can literally be the ocean.',
    dinnerTable: {
      normal:
        'An oceanographer is a scientist who studies the ocean — everything from currents and water chemistry to marine life and the seafloor. They work on research ships, in labs, and at universities.',
      parents:
        "It is a real science career — like a marine biologist but broader. They study the ocean to understand climate, marine life, and the planet. It requires a master's or PhD, and they work at universities, government agencies, or research institutes. Stable science jobs.",
      dinner:
        "You know how we know almost nothing about the deep ocean? These are the people trying to fix that. They go out on research ships for weeks, drop sensors into the water, and study everything from whale migration to how the ocean affects climate.",
      friends:
        "Professional ocean nerd. They go on research boats for weeks (no wifi, lots of waves), study weird sea creatures and ocean currents, then write papers about it. Basically the closest thing to exploring another planet without leaving Earth.",
    },
    images: {
      hero: 'https://images.pexels.com/photos/30620493/pexels-photo-30620493.jpeg?auto=compress&cs=tinysrgb&w=1600',
      detail: 'https://images.pexels.com/photos/10359303/pexels-photo-10359303.jpeg?auto=compress&cs=tinysrgb&w=1200',
      gallery: [
        'https://images.pexels.com/photos/7001664/pexels-photo-7001664.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/10314265/pexels-photo-10314265.jpeg?auto=compress&cs=tinysrgb&w=800',
      ],
    },
    colors: {
      name: 'Deep Ocean',
      bg: '#041824',
      bgSoft: '#0a2a3a',
      accent: '#2db4c4',
      accentSoft: '#a0e0e8',
      accentDeep: '#1a7a8a',
      text: '#e0f0f5',
      textMuted: '#7aa0b0',
    },
  },
  {
    id: 'food-researcher',
    number: '03',
    title: 'Food Researcher',
    tagline: 'Apparently, someone has to figure out why food works.',
    shortDescription:
      'A food scientist who studies the chemistry, safety, nutrition, and innovation behind what we eat — in labs, factories, and startups.',
    longDescription:
      'Food researchers (food scientists) study the chemistry, microbiology, and engineering of food. They develop new products, improve nutritional profiles, ensure food safety, and research preservation, flavor, and texture. They work in corporate R&D labs, food startups, government agencies, and academic institutions — bridging science and the everyday experience of eating.',
    whatTheyDo: [
      'Develop and test new food products in R&D labs',
      'Analyze nutritional content and food chemistry',
      'Study food safety, preservation, and shelf life',
      'Research flavor compounds and sensory perception',
      'Improve manufacturing processes and quality control',
      'Publish findings and contribute to food regulations',
    ],
    aesthetic:
      'A clean white lab, a microscope, a row of sample jars. The image: precision, quiet discovery, the science behind everyday things.',
    reality:
      'It is meticulous lab work — running the same test dozens of times, writing reports, navigating food safety regulations. R&D deadlines are tight, and product launches can take years. But you are genuinely shaping what people eat.',
    vibe: {
      love: [
        'You are curious about the science behind food',
        'You enjoy lab work and precise methodology',
        'You like the idea of creating products people use daily',
        'You want a career that blends science and real-world impact',
      ],
      hate: [
        'Repetitive lab work bores you',
        'You dislike detailed regulations and documentation',
        'You want a creative-only career, not analytical',
        'Long product development cycles feel frustrating',
      ],
    },
    entryPath: [
      'Build foundations in chemistry, biology, and nutrition',
      'Pursue a degree in food science, nutrition, or chemistry',
      'Get lab experience through university research or internships',
      'Learn food safety regulations and testing standards',
      'Work on a product development project or food startup',
      'Specialize — product development, food safety, or nutrition research',
    ],
    skills: [
      'Food chemistry & microbiology',
      'Laboratory techniques & instrumentation',
      'Sensory evaluation',
      'Food safety & regulation (HACCP, FDA)',
      'Product development methodology',
      'Statistical analysis',
    ],
    microcopy: [
      'Apparently, someone has to figure out why food works.',
      'Where science meets your next meal.',
      'Every snack you love was tested in a lab first.',
    ],
    gossip: 'Apparently, food science is a whole career.',
    dinnerTable: {
      normal:
        'A food researcher is a scientist who studies food — its chemistry, safety, nutrition, and how to make new products. They work in labs for food companies, startups, or government agencies.',
      parents:
        "It is a real science career — like a chemist but focused on food. They study how to make food safer, healthier, and develop new products. They work for food companies, the government, or research institutes. It requires a science degree and the jobs are stable.",
      dinner:
        "You know how every snack has a specific texture and flavor? Someone tested that in a lab for months. Food researchers are the scientists behind every product — they study food chemistry, develop new products, and make sure food is safe to eat.",
      friends:
        "They are basically a food scientist. They work in labs figuring out things like why chips stay crispy, how to make healthier snacks, and if food is safe. Every food product you love probably went through their hands first.",
    },
    images: {
      hero: 'https://images.pexels.com/photos/8533045/pexels-photo-8533045.jpeg?auto=compress&cs=tinysrgb&w=1600',
      detail: 'https://images.pexels.com/photos/8851546/pexels-photo-8851546.jpeg?auto=compress&cs=tinysrgb&w=1200',
      gallery: [
        'https://images.pexels.com/photos/9768442/pexels-photo-9768442.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/9574397/pexels-photo-9574397.jpeg?auto=compress&cs=tinysrgb&w=800',
      ],
    },
    colors: {
      name: 'Fresh Lab',
      bg: '#0a1612',
      bgSoft: '#14241e',
      accent: '#5cb88a',
      accentSoft: '#c0e8d4',
      accentDeep: '#2d7a5a',
      text: '#e8f5ee',
      textMuted: '#7aa898',
    },
  },
  {
    id: 'sailor',
    number: '04',
    title: 'Sailor / Deck Officer',
    tagline: 'Your office moves.',
    shortDescription:
      'A maritime professional who navigates and operates ships — from cargo vessels to cruise liners — managing safety, cargo, and the bridge.',
    longDescription:
      'Deck officers are the navigators of a ship. They stand watch on the bridge, manage cargo operations, ensure safety compliance, and coordinate the crew. They work on cargo ships, cruise liners, tankers, and offshore vessels — spending months at sea with structured rank progression from cadet to Captain. It is a career of travel, responsibility, and life lived on the water.',
    whatTheyDo: [
      'Stand navigational watch on the ship bridge',
      'Plan and execute voyage routes using charts and electronic systems',
      'Manage cargo loading, unloading, and stability calculations',
      'Ensure safety compliance and conduct emergency drills',
      'Coordinate with port authorities and pilot vessels',
      'Supervise deck crew and maintenance operations',
    ],
    aesthetic:
      'The ship bridge at sunset, radar screens glowing, a compass and chart on the table. The image: navigation, responsibility, the horizon always ahead.',
    reality:
      'Contracts run 3 to 9 months at sea with limited internet and contact with home. The work is shift-based (4 hours on, 8 off), physical, and carries real safety responsibility. But the pay is strong, travel is built in, and the career path is structured.',
    vibe: {
      love: [
        'You want a career with built-in travel',
        'You handle isolation and structured routines well',
        'You like clear hierarchy and responsibility',
        'You want strong pay without a traditional degree',
      ],
      hate: [
        'Being away from family for months is hard',
        'You need fast internet and city life to be happy',
        'You dislike shift work and interrupted sleep',
        'You want a conventional 9-to-5 on land',
      ],
    },
    entryPath: [
      'Meet maritime medical and eyesight requirements',
      'Enroll in a maritime academy or cadet training program',
      'Complete mandatory safety and STCW certification',
      'Accumulate sea time as a deck cadet',
      'Pass Officer of the Watch (OOW) competency exams',
      'Progress through ranks: 3rd Officer → 2nd → Chief Officer → Captain',
    ],
    skills: [
      'Navigation & voyage planning',
      'Radar & electronic navigation systems',
      'Cargo operations & stability',
      'Safety management (STCW, ISM)',
      'Bridge resource management',
      'Crew leadership',
    ],
    microcopy: [
      'Your office moves.',
      "You don't just work at sea. You navigate it.",
      'The horizon is not a metaphor. It is a commute.',
    ],
    gossip: 'Apparently, your office can literally be the ocean.',
    dinnerTable: {
      normal:
        'A deck officer is a ship navigator. They work on cargo ships or cruise liners, standing watch on the bridge, planning routes, managing cargo, and ensuring safety. They progress from cadet to Captain over years.',
      parents:
        "It is a proper maritime career with a clear progression. They train at a maritime academy, go to sea for months at a time, and get certified step by step. The pay is strong, it is a government-regulated profession, and you can eventually become a Captain. It is not a desk job — they travel.",
      dinner:
        "Imagine your office is the bridge of a cargo ship crossing the Pacific. That is their life. They navigate the ship, manage cargo, do safety drills, and work in shifts. Months at sea, then months off. The pay is surprisingly good.",
      friends:
        "They literally drive giant ships across the ocean. Cargo ships, cruise ships — they are the person on the bridge navigating. Months at sea, no wifi, decent money, and they actually get to travel the world as a job. Wild.",
    },
    images: {
      hero: 'https://images.pexels.com/photos/28498830/pexels-photo-28498830.jpeg?auto=compress&cs=tinysrgb&w=1600',
      detail: 'https://images.pexels.com/photos/14643625/pexels-photo-14643625.jpeg?auto=compress&cs=tinysrgb&w=1200',
      gallery: [
        'https://images.pexels.com/photos/12116213/pexels-photo-12116213.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/7518014/pexels-photo-7518014.jpeg?auto=compress&cs=tinysrgb&w=800',
      ],
    },
    colors: {
      name: 'Maritime',
      bg: '#0a1428',
      bgSoft: '#16223a',
      accent: '#e09a3c',
      accentSoft: '#f0d4a0',
      accentDeep: '#a06820',
      text: '#e8edf5',
      textMuted: '#7a8aa0',
    },
  },
  {
    id: 'pageant',
    number: '05',
    title: 'Pageant Professional',
    tagline: 'The crown is only one part of the job.',
    shortDescription:
      'A competitor, coach, or industry professional in the world of pageants — where presentation, interview, stage presence, and advocacy meet.',
    longDescription:
      'Pageant professionals compete in or coach for beauty, scholarship, and talent pageants. Beyond the stage, the career involves interview preparation, platform advocacy, public speaking, grooming, fitness, and personal branding. Some become coaches, judges, or event organizers. It is a career of performance, discipline, and turning visibility into opportunity.',
    whatTheyDo: [
      'Compete in regional, national, or international pageants',
      'Train in stage walking, posing, and on-stage questioning',
      'Prepare for interview rounds with judges',
      'Develop and promote a personal advocacy platform',
      'Maintain fitness, grooming, and personal branding',
      'Coach other competitors or organize pageant events',
    ],
    aesthetic:
      'A spotlight cutting across a dark stage, a runway, the quiet focus backstage before the walk. The image: glamour, competition, the held breath before a name is called.',
    reality:
      'It is months of preparation for minutes on stage. Interview practice is grueling, fitness discipline is daily, and the industry is subjective and competitive. The crown opens doors — speaking engagements, modeling, coaching — but the work behind it is relentless.',
    vibe: {
      love: [
        'You thrive on performance and public speaking',
        'You are disciplined about fitness and presentation',
        'You want a platform for advocacy or visibility',
        'You handle competition and subjective judging well',
      ],
      hate: [
        'Public speaking makes you deeply uncomfortable',
        'You dislike subjective, appearance-evaluated competition',
        'You want a conventional career path with clear steps',
        'The idea of constant personal branding exhausts you',
      ],
    },
    entryPath: [
      'Attend local pageants to understand the format and culture',
      'Choose a pageant system aligned with your goals',
      'Train in stage presentation, walking, and posing',
      'Prepare for interview rounds — practice with coaches',
      'Develop a personal advocacy platform',
      'Compete locally, build a resume, and progress to larger pageants',
    ],
    skills: [
      'Stage presence & walking technique',
      'Public speaking & interview skills',
      'Personal branding & social media',
      'Fitness & presentation discipline',
      'Advocacy & platform development',
      'Networking & relationship building',
    ],
    microcopy: [
      'The crown is only one part of the job.',
      'Ready for the spotlight?',
      'Confidence is part of the curriculum.',
    ],
    gossip: 'Apparently, people get paid to walk on stage and win crowns.',
    dinnerTable: {
      normal:
        'A pageant professional competes in or coaches for pageants — competitions that include stage presentation, interviews, talent, and advocacy. Some make a career from winning, coaching, or organizing events.',
      parents:
        "It is a legitimate industry with scholarships, public speaking, and career opportunities. Winners get college scholarships, speaking engagements, and media careers. It is competitive and requires discipline, training, and interview preparation. Many use it as a platform for advocacy or public careers.",
      dinner:
        "You know those competitions with the stage walks, interviews, and the crown? It is actually a whole career path. People train for months, prepare for interviews, develop advocacy platforms, and some turn it into coaching, speaking, or media careers. The crown is just the beginning.",
      friends:
        "Basically professional stage competitors. They train for months on walking, interviews, and public speaking, then compete for crowns and scholarships. Some turn it into coaching or media careers. More work than you would think — it is not just walking in heels.",
    },
    images: {
      hero: 'https://images.pexels.com/photos/1343524/pexels-photo-1343524.jpeg?auto=compress&cs=tinysrgb&w=1600',
      detail: 'https://images.pexels.com/photos/5185592/pexels-photo-5185592.jpeg?auto=compress&cs=tinysrgb&w=1200',
      gallery: [
        'https://images.pexels.com/photos/28587831/pexels-photo-28587831.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/34950506/pexels-photo-34950506.jpeg?auto=compress&cs=tinysrgb&w=800',
      ],
    },
    colors: {
      name: 'Spotlight',
      bg: '#0e0c0a',
      bgSoft: '#1c1814',
      accent: '#d4af6a',
      accentSoft: '#f0e0c4',
      accentDeep: '#9a7a3a',
      text: '#f5f0e8',
      textMuted: '#a89880',
    },
  },
  {
    id: 'cartographer',
    number: '06',
    title: 'Cartographer',
    tagline: 'Someone has to map the world.',
    shortDescription:
      'A professional who creates maps — blending field surveying, data analysis, and design to represent the world accurately and beautifully.',
    longDescription:
      'Cartographers design and create maps using field data, satellite imagery, GIS (Geographic Information Systems), and traditional drafting. They work for government agencies, tech companies, publishing houses, and environmental organizations. It is a career that blends science, art, and technology — turning raw geographic data into maps that guide, inform, and inspire.',
    whatTheyDo: [
      'Collect and analyze geographic data from field surveys and satellites',
      'Design maps using GIS software and traditional techniques',
      'Create thematic, topographic, and navigational maps',
      'Work with surveyors, geologists, and urban planners',
      'Update existing maps with new data and boundaries',
      'Ensure cartographic accuracy and visual clarity',
    ],
    aesthetic:
      'A drafting table with aged maps, a brass compass, a GIS screen glowing beside it. The image: craft meeting technology, precision as an art form.',
    reality:
      'It is a lot of data processing — cleaning datasets, verifying coordinates, running GIS software for hours. Fieldwork exists but is less common now. The craft is real, but most modern cartography happens at a computer, not with parchment and ink.',
    vibe: {
      love: [
        'You love maps, geography, and spatial thinking',
        'You enjoy blending technical work with visual design',
        'You like the idea of both field and computer work',
        'You are detail-oriented and patient with data',
      ],
      hate: [
        'Hours of data cleaning and GIS software sounds tedious',
        'You need fast-paced, social work to stay engaged',
        'You are not interested in geography or spatial data',
        'You want a high-profile, visible career',
      ],
    },
    entryPath: [
      'Build foundations in geography and spatial thinking',
      'Learn GIS software (QGIS, ArcGIS) and coordinate systems',
      'Study cartographic design principles and map projections',
      'Create practice maps from open data sources',
      'Build a portfolio of mapping projects',
      'Apply for roles at agencies, tech companies, or as a freelancer',
    ],
    skills: [
      'GIS software (QGIS, ArcGIS)',
      'Map projection & coordinate systems',
      'Cartographic design & typography',
      'Spatial data analysis',
      'Field surveying basics',
      'Data visualization',
    ],
    microcopy: [
      'Someone has to map the world.',
      'Before you follow the map, someone had to make it.',
      'Every map you have ever used started with a cartographer.',
    ],
    gossip: 'Apparently, someone gets paid to map the world.',
    dinnerTable: {
      normal:
        'A cartographer is a professional who creates maps. They use field data, satellite imagery, and GIS software to design maps for navigation, education, or analysis. They work for governments, tech companies, and publishers.',
      parents:
        "It is a real technical career. They use specialized software called GIS to analyze geographic data and create maps. Government agencies, Google, and publishing companies all hire them. It requires a geography or GIS degree, and the jobs are stable and well-paid.",
      dinner:
        "Every map you have ever used — on your phone, in a book, on a wall — someone made that. Cartographers are the people who take geographic data and turn it into maps. These days it is mostly computer work with specialized software, but it is a real blend of science and design.",
      friends:
        "They make maps for a living. Not the old-school parchment kind (mostly) — they use GIS software to turn geographic data into the maps you see on your phone or in atlases. Government agencies and tech companies hire them. Basically professional map nerds, but paid.",
    },
    images: {
      hero: 'https://images.pexels.com/photos/4905089/pexels-photo-4905089.jpeg?auto=compress&cs=tinysrgb&w=1600',
      detail: 'https://images.pexels.com/photos/21771959/pexels-photo-21771959.jpeg?auto=compress&cs=tinysrgb&w=1200',
      gallery: [
        'https://images.pexels.com/photos/9494906/pexels-photo-9494906.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1203808/pexels-photo-1203808.jpeg?auto=compress&cs=tinysrgb&w=800',
      ],
    },
    colors: {
      name: 'Cartograph',
      bg: '#1a1712',
      bgSoft: '#2a251e',
      accent: '#c4955a',
      accentSoft: '#e4d0b0',
      accentDeep: '#8a6a3a',
      text: '#f0ebe2',
      textMuted: '#9a8a72',
    },
  },
]

export const getCareer = (id: string | null | undefined): Career | undefined =>
  careers.find((c) => c.id === id)
