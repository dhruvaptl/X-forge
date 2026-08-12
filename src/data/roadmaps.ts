import type { Roadmap, CareerId, Resource } from '../types'

const r = (id: string, type: Resource['type'], title: string, source: string, description: string): Resource => ({
  id, type, title, source, description,
})

export const roadmaps: Record<CareerId, Roadmap> = {
  sommelier: {
    careerId: 'sommelier',
    milestones: [
      {
        id: 'som-m1',
        title: 'Palate',
        description: 'Train your senses to identify flavors, aromas, and faults in wine.',
        status: 'active',
        tasks: [
          {
            id: 'som-m1-t1',
            title: 'Start a wine tasting journal',
            why: 'Building palate memory requires deliberate, repeated tasting with notes. A journal turns random drinking into training.',
            time: '30 min',
            description: 'Buy a small notebook. Taste 3 different wines this week. For each, note: appearance, aroma, palate, finish, and your overall impression. Be specific — "red fruit" not "tastes good."',
            resources: [
              r('som-r1', 'Article', 'How to Taste Wine Like a Pro', 'Wine Folly', 'A structured guide to the 5-step wine tasting method.'),
              r('som-r2', 'Video', 'Wine Tasting 101 — Basic Technique', 'YouTube', 'A sommelier demonstrates the look-swirl-sniff-sip process.'),
            ],
            status: 'active',
          },
          {
            id: 'som-m1-t2',
            title: 'Research 5 major wine regions',
            why: 'Understanding terroir — how geography shapes wine — is the foundation of all wine knowledge.',
            time: '1 hour',
            description: 'Research Bordeaux, Burgundy, Napa Valley, Tuscany, and Rioja. For each, note: main grapes, climate, and one famous wine style.',
            resources: [
              r('som-r3', 'Article', 'Wine Regions of the World', 'Wine Folly', 'Overview of the major wine-producing regions and their characteristics.'),
            ],
            status: 'locked',
          },
          {
            id: 'som-m1-t3',
            title: 'Practice identifying 5 common wine aromas',
            why: 'Palate calibration is a sommelier core skill. You train it with repetition.',
            time: '45 min',
            description: 'Use everyday items (citrus, berry, vanilla, oak, pepper) to practice identifying scents. Close your eyes, sniff, and name them.',
            resources: [
              r('som-r4', 'Practice', 'Aroma Identification Kit Exercises', 'Le Nez du Vin', 'A professional aroma kit exercise guide — use everyday items as substitutes.'),
            ],
            status: 'locked',
          },
        ],
      },
      {
        id: 'som-m2',
        title: 'Wine Knowledge',
        description: 'Study grape varieties, production methods, and the science behind wine.',
        status: 'locked',
        tasks: [
          {
            id: 'som-m2-t1',
            title: 'Learn the 6 Noble Grapes',
            why: 'These grapes form the backbone of classic wine education and most wine lists.',
            time: '1 hour',
            description: 'Study Cabernet Sauvignon, Merlot, Pinot Noir, Chardonnay, Sauvignon Blanc, and Riesling. Note each grape\'s typical flavor profile and regions.',
            resources: [
              r('som-r5', 'Article', 'The Noble Grapes Explained', 'Wine Enthusiast', 'A guide to the core grape varieties every sommelier must know.'),
              r('som-r6', 'Book', 'Wine Folly: The Master Guide', 'Madeline Puckette', 'A visual, beginner-friendly guide to wine types, grapes, and regions.'),
            ],
            status: 'locked',
          },
          {
            id: 'som-m2-t2',
            title: 'Understand the winemaking process',
            why: 'Knowing how wine is made helps you explain differences between styles to guests.',
            time: '1 hour',
            description: 'Research the steps: harvest, crush, ferment, press, age, bottle. Compare red vs white vs sparkling production.',
            resources: [
              r('som-r7', 'Video', 'How Wine is Made — Start to Finish', 'YouTube', 'A documentary-style walkthrough of the winemaking process.'),
            ],
            status: 'locked',
          },
        ],
      },
      {
        id: 'som-m3',
        title: 'Certification',
        description: 'Begin formal study toward the Court of Master Sommeliers Intro exam.',
        status: 'locked',
        tasks: [
          {
            id: 'som-m3-t1',
            title: 'Download the CMS Intro syllabus',
            why: 'The Intro exam is the first official step. Knowing the syllabus focuses your study.',
            time: '30 min',
            description: 'Visit the Court of Master Sommeliers website. Download the Intro exam candidate guide and reading list. Map out a study schedule.',
            resources: [
              r('som-r8', 'Documentation', 'CMS Intro Exam Guide', 'Court of Master Sommeliers', 'Official exam syllabus and recommended reading list.'),
              r('som-r9', 'Course', 'Court of Master Sommeliers Intro Course', 'CMS', 'The official 2-day course preceding the Intro exam.'),
            ],
            status: 'locked',
          },
        ],
      },
      {
        id: 'som-m4',
        title: 'Service',
        description: 'Learn professional wine service, pairing, and guest interaction.',
        status: 'locked',
        tasks: [
          {
            id: 'som-m4-t1',
            title: 'Practice opening and serving wine properly',
            why: 'Service technique is a tested sommelier skill and a daily part of the job.',
            time: '45 min',
            description: 'Practice opening a bottle with a waiter\'s corkscrew, decanting, and serving. Film yourself and check your technique against professional videos.',
            resources: [
              r('som-r10', 'Video', 'Professional Wine Service Technique', 'YouTube', 'A sommelier demonstrates proper opening, decanting, and serving.'),
            ],
            status: 'locked',
          },
        ],
      },
      {
        id: 'som-m5',
        title: 'Experience',
        description: 'Work in a restaurant or wine shop to apply your knowledge in real settings.',
        status: 'locked',
        tasks: [
          {
            id: 'som-m5-t1',
            title: 'Apply for a wine shop or restaurant service role',
            why: 'Real experience on the floor is irreplaceable. Most sommeliers start in service.',
            time: '2 hours',
            description: 'Identify 5 local restaurants with serious wine programs or wine shops. Prepare a short pitch about your wine study so far. Apply or walk in.',
            resources: [
              r('som-r11', 'Article', 'How to Break Into the Wine Industry', 'SevenFifty Daily', 'Career advice on entering wine service roles.'),
            ],
            status: 'locked',
          },
        ],
      },
      {
        id: 'som-m6',
        title: 'Career',
        description: 'Pursue advanced certification and a dedicated sommelier role.',
        status: 'locked',
        tasks: [
          {
            id: 'som-m6-t1',
            title: 'Plan your path to CMS Certified',
            why: 'The Certified Sommelier exam is the professional standard and opens real career doors.',
            time: '1 hour',
            description: 'Review the Certified exam requirements (tasting, theory, service). Assess your timeline. Schedule your next study milestones.',
            resources: [
              r('som-r12', 'Documentation', 'CMS Certified Exam Requirements', 'Court of Master Sommeliers', 'Official requirements for the Certified Sommelier exam.'),
            ],
            status: 'locked',
          },
        ],
      },
    ],
  },

  oceanographer: {
    careerId: 'oceanographer',
    milestones: [
      {
        id: 'oce-m1',
        title: 'Science Foundations',
        description: 'Build core knowledge in biology, chemistry, physics, and mathematics.',
        status: 'active',
        tasks: [
          {
            id: 'oce-m1-t1',
            title: 'Take a free introductory oceanography course',
            why: 'A structured overview frames the field and shows you what sub-disciplines exist.',
            time: '2 hours',
            description: 'Enroll in a free online course (MIT OpenCourseWare or Coursera). Complete the first module and take notes on the four oceanography branches: biological, chemical, physical, geological.',
            resources: [
              r('oce-r1', 'Course', 'Introduction to Oceanography', 'MIT OpenCourseWare', 'Free university-level intro course covering all four oceanography disciplines.'),
              r('oce-r2', 'Video', 'What is Oceanography?', 'YouTube', 'A 10-minute overview of the field and its sub-disciplines.'),
            ],
            status: 'active',
          },
          {
            id: 'oce-m1-t2',
            title: 'Strengthen your chemistry and biology basics',
            why: 'Oceanography is applied chemistry, biology, and physics. Weak foundations make everything harder later.',
            time: '1 hour',
            description: 'Review core chemistry (atoms, bonds, reactions) and biology (cells, ecosystems) using Khan Academy. Take the placement quizzes to find your gaps.',
            resources: [
              r('oce-r3', 'Course', 'Chemistry & Biology Foundations', 'Khan Academy', 'Free courses covering high school and early college science fundamentals.'),
            ],
            status: 'locked',
          },
        ],
      },
      {
        id: 'oce-m2',
        title: 'Ocean Science',
        description: 'Study ocean circulation, marine biology, and the ocean-atmosphere system.',
        status: 'locked',
        tasks: [
          {
            id: 'oce-m2-t1',
            title: 'Study ocean currents and the global conveyor belt',
            why: 'Ocean circulation drives climate and marine ecosystems. It is core physical oceanography.',
            time: '1 hour',
            description: 'Research thermohaline circulation, the Gulf Stream, and upwelling. Draw a simple diagram of the global conveyor belt.',
            resources: [
              r('oce-r4', 'Article', 'Ocean Conveyor Belt', 'NOAA', 'NOAA explainer on global ocean circulation and its climate impact.'),
              r('oce-r5', 'Video', 'How Ocean Currents Work', 'YouTube', 'Visual explanation of thermohaline circulation and major currents.'),
            ],
            status: 'locked',
          },
        ],
      },
      {
        id: 'oce-m3',
        title: 'Fieldwork',
        description: 'Get hands-on experience through internships, research cruises, or coastal projects.',
        status: 'locked',
        tasks: [
          {
            id: 'oce-m3-t1',
            title: 'Watch an introduction to oceanographic fieldwork',
            why: 'Seeing real fieldwork helps you decide if the lifestyle fits before committing years of study.',
            time: '45 min',
            description: 'Watch a documentary or research vessel tour. Note the daily routine, equipment used, and how data is collected at sea.',
            resources: [
              r('oce-r6', 'Video', 'Life on a Research Vessel', 'Schmidt Ocean Institute', 'A behind-the-scenes look at oceanographic fieldwork at sea.'),
            ],
            status: 'locked',
          },
        ],
      },
      {
        id: 'oce-m4',
        title: 'Research',
        description: 'Begin conducting and analyzing research under guidance.',
        status: 'locked',
        tasks: [
          {
            id: 'oce-m4-t1',
            title: 'Read 3 recent oceanography research papers',
            why: 'Reading current research teaches you what questions the field is asking and how papers are structured.',
            time: '1 hour',
            description: 'Find 3 recent papers on a topic that interests you (coral reefs, deep sea, ocean acidification). Read the abstract, introduction, and conclusion. Note the research question and methods.',
            resources: [
              r('oce-r7', 'Article', 'Oceanography Journal Archive', 'Nature Oceanography', 'Free-to-read research articles across ocean science topics.'),
            ],
            status: 'locked',
          },
        ],
      },
      {
        id: 'oce-m5',
        title: 'Specialization',
        description: 'Choose a sub-field — biological, chemical, physical, or geological oceanography.',
        status: 'locked',
        tasks: [
          {
            id: 'oce-m5-t1',
            title: 'Compare the four oceanography sub-fields',
            why: 'Choosing a specialization determines your graduate program and career trajectory.',
            time: '1 hour',
            description: 'Write a comparison of biological, chemical, physical, and geological oceanography. For each, note: what they study, typical methods, and one career path. Rank them by your interest.',
            resources: [
              r('oce-r8', 'Article', 'Branches of Oceanography', 'NOAA', 'Official breakdown of the four sub-disciplines.'),
            ],
            status: 'locked',
          },
        ],
      },
      {
        id: 'oce-m6',
        title: 'Experience',
        description: 'Pursue a graduate degree and professional research role.',
        status: 'locked',
        tasks: [
          {
            id: 'oce-m6-t1',
            title: 'Research 3 graduate oceanography programs',
            why: 'A master\'s or PhD is standard in this field. Knowing your target programs shapes your undergraduate choices.',
            time: '1 hour',
            description: 'Find 3 graduate programs (Scripps, Woods Hole, Southampton). Note their prerequisites, faculty research areas, and application deadlines.',
            resources: [
              r('oce-r9', 'Article', 'Top Oceanography Graduate Programs', 'GradSchools', 'A directory of oceanography and marine science graduate programs worldwide.'),
            ],
            status: 'locked',
          },
        ],
      },
    ],
  },

  'food-researcher': {
    careerId: 'food-researcher',
    milestones: [
      {
        id: 'foo-m1',
        title: 'Science Foundations',
        description: 'Build core chemistry, biology, and nutrition knowledge.',
        status: 'active',
        tasks: [
          {
            id: 'foo-m1-t1',
            title: 'Take a free food science intro course',
            why: 'A structured intro frames the field and shows you the career paths within it.',
            time: '2 hours',
            description: 'Enroll in a free food science course. Complete the first module. Note the main areas: food chemistry, microbiology, processing, and product development.',
            resources: [
              r('foo-r1', 'Course', 'Introduction to Food Science', 'edX', 'A free introductory course covering the scope of food science.'),
              r('foo-r2', 'Video', 'What is Food Science?', 'YouTube', 'A 10-minute overview of the field and career paths.'),
            ],
            status: 'active',
          },
          {
            id: 'foo-m1-t2',
            title: 'Review organic chemistry fundamentals',
            why: 'Food chemistry is applied organic chemistry. You need this foundation.',
            time: '1 hour',
            description: 'Review functional groups, reactions, and molecular structures using Khan Academy. Focus on concepts relevant to food — fats, proteins, carbohydrates.',
            resources: [
              r('foo-r3', 'Course', 'Organic Chemistry', 'Khan Academy', 'Free course covering the organic chemistry fundamentals needed for food science.'),
            ],
            status: 'locked',
          },
        ],
      },
      {
        id: 'foo-m2',
        title: 'Food Science',
        description: 'Study food chemistry, microbiology, and nutrition in depth.',
        status: 'locked',
        tasks: [
          {
            id: 'foo-m2-t1',
            title: 'Study the Maillard reaction and caramelization',
            why: 'These are the two most important flavor-producing reactions in food. Understanding them is foundational.',
            time: '45 min',
            description: 'Research both reactions. Note: what triggers them, what flavors they produce, and 3 foods where each occurs. Cook something and observe.',
            resources: [
              r('foo-r4', 'Article', 'The Maillard Reaction Explained', 'Serious Eats', 'A deep dive into browning reactions and flavor development.'),
              r('foo-r5', 'Video', 'Maillard Reaction vs Caramelization', 'YouTube', 'A food scientist explains the difference between the two reactions.'),
            ],
            status: 'locked',
          },
        ],
      },
      {
        id: 'foo-m3',
        title: 'Lab Skills',
        description: 'Learn laboratory techniques used in food analysis and testing.',
        status: 'locked',
        tasks: [
          {
            id: 'foo-m3-t1',
            title: 'Learn about food safety systems (HACCP)',
            why: 'HACCP is the global standard for food safety. Every food lab and factory uses it.',
            time: '1 hour',
            description: 'Research the 7 principles of HACCP. Find one food product and trace what hazards would be controlled at each step of its production.',
            resources: [
              r('foo-r6', 'Documentation', 'HACCP Principles', 'FDA', 'Official FDA guide to Hazard Analysis and Critical Control Points.'),
            ],
            status: 'locked',
          },
        ],
      },
      {
        id: 'foo-m4',
        title: 'Research Projects',
        description: 'Work on a real food science project or experiment.',
        status: 'locked',
        tasks: [
          {
            id: 'foo-m4-t1',
            title: 'Compare three food preservation methods',
            why: 'Preservation is core food science. Comparing methods teaches you the tradeoffs in food processing.',
            time: '2 hours',
            description: 'Compare canning, freezing, and freeze-drying. For each, research: how it works, what foods it suits, shelf life, and nutritional impact. Write a short report.',
            resources: [
              r('foo-r7', 'Article', 'Food Preservation Methods', 'Penn State Extension', 'A comparison of major food preservation techniques and their science.'),
            ],
            status: 'locked',
          },
        ],
      },
      {
        id: 'foo-m5',
        title: 'Industry Experience',
        description: 'Work in a food company R&D lab, startup, or testing facility.',
        status: 'locked',
        tasks: [
          {
            id: 'foo-m5-t1',
            title: 'Research 5 food companies with R&D labs in your area',
            why: 'Knowing your local industry landscape helps you target internships and jobs.',
            time: '1 hour',
            description: 'Find 5 food companies, startups, or testing labs near you. Note: what they make, whether they have R&D, and if they offer internships.',
            resources: [
              r('foo-r8', 'Article', 'Food Industry Career Paths', 'IFT', 'The Institute of Food Technologists guide to careers in the food industry.'),
            ],
            status: 'locked',
          },
        ],
      },
      {
        id: 'foo-m6',
        title: 'Career',
        description: 'Pursue a specialized food science role in R&D, safety, or nutrition.',
        status: 'locked',
        tasks: [
          {
            id: 'foo-m6-t1',
            title: 'Research food science certifications (PCQI, CFS)',
            why: 'Professional certifications strengthen your resume and are often required for senior roles.',
            time: '45 min',
            description: 'Research the Certified Food Scientist (CFS) and Preventive Controls Qualified Individual (PCQI) certifications. Note requirements and whether they fit your path.',
            resources: [
              r('foo-r9', 'Documentation', 'Certified Food Scientist (CFS)', 'IFT', 'Official certification requirements and application details.'),
            ],
            status: 'locked',
          },
        ],
      },
    ],
  },

  sailor: {
    careerId: 'sailor',
    milestones: [
      {
        id: 'sai-m1',
        title: 'Maritime Foundations',
        description: 'Understand the maritime industry, ship types, and the role of a deck officer.',
        status: 'active',
        tasks: [
          {
            id: 'sai-m1-t1',
            title: 'Watch an introduction to maritime careers',
            why: 'Understanding the industry structure and ship types helps you choose the right sector.',
            time: '45 min',
            description: 'Watch a documentary or career overview. Note the main ship types (cargo, tanker, cruise, offshore) and what life on board is actually like.',
            resources: [
              r('sai-r1', 'Video', 'Life as a Deck Officer', 'YouTube', 'A deck officer explains the career path and daily life at sea.'),
              r('sai-r2', 'Article', 'Maritime Careers Overview', 'Maritime Institute', 'A guide to the merchant navy and deck officer career structure.'),
            ],
            status: 'active',
          },
          {
            id: 'sai-m1-t2',
            title: 'Research maritime academies and cadet programs',
            why: 'The academy or cadet program is your entry point. Knowing your options early shapes your path.',
            time: '1 hour',
            description: 'Research 3 maritime academies or cadetship programs. Note: entry requirements, duration, cost, and what certification you graduate with.',
            resources: [
              r('sai-r3', 'Article', 'How to Become a Deck Officer', 'Maritime Insight', 'A step-by-step guide to entering the merchant navy as a deck officer.'),
            ],
            status: 'locked',
          },
        ],
      },
      {
        id: 'sai-m2',
        title: 'Safety',
        description: 'Complete mandatory STCW safety training.',
        status: 'locked',
        tasks: [
          {
            id: 'sai-m2-t1',
            title: 'Study the STCW convention basics',
            why: 'STCW is the international safety standard. Every seafarer must be certified under it.',
            time: '1 hour',
            description: 'Research the STCW (Standards of Training, Certification and Watchkeeping) convention. Note the 4 basic safety training modules required for all seafarers.',
            resources: [
              r('sai-r4', 'Documentation', 'STCW Convention Guide', 'IMO', 'The International Maritime Organization guide to STCW requirements.'),
            ],
            status: 'locked',
          },
        ],
      },
      {
        id: 'sai-m3',
        title: 'Navigation',
        description: 'Learn maritime navigation — charts, compass, radar, and electronic systems.',
        status: 'locked',
        tasks: [
          {
            id: 'sai-m3-t1',
            title: 'Learn basic maritime navigation terms and chart reading',
            why: 'Navigation is the core deck officer skill. Starting with chart basics builds your foundation.',
            time: '1 hour',
            description: 'Study latitude, longitude, bearings, and chart symbols. Find a nautical chart online and identify 5 key features.',
            resources: [
              r('sai-r5', 'Article', 'Introduction to Nautical Charts', 'NOAA', 'A guide to reading and understanding nautical charts.'),
              r('sai-r6', 'Video', 'Basic Maritime Navigation', 'YouTube', 'A tutorial on chart work, bearings, and position fixing.'),
            ],
            status: 'locked',
          },
        ],
      },
      {
        id: 'sai-m4',
        title: 'Sea Time',
        description: 'Accumulate required months at sea as a deck cadet.',
        status: 'locked',
        tasks: [
          {
            id: 'sai-m4-t1',
            title: 'Create a sea time tracking plan',
            why: 'Certification requires documented sea time. Tracking it from day one prevents delays.',
            time: '30 min',
            description: 'Research the sea time requirements for Officer of the Watch certification. Set up a logbook or spreadsheet to track your months at sea once you start.',
            resources: [
              r('sai-r7', 'Documentation', 'OOW Sea Time Requirements', 'MCA', 'UK Maritime and Coastguard Agency requirements for OOW certification.'),
            ],
            status: 'locked',
          },
        ],
      },
      {
        id: 'sai-m5',
        title: 'Certification',
        description: 'Pass the Officer of the Watch (OOW) competency exams.',
        status: 'locked',
        tasks: [
          {
            id: 'sai-m5-t1',
            title: 'Review the OOW exam syllabus',
            why: 'The OOW exam is your first professional qualification. Knowing the syllabus early helps you study during sea time.',
            time: '1 hour',
            description: 'Download the OOW competency exam syllabus. Note the main subjects (navigation, stability, law, safety) and plan a rough study timeline.',
            resources: [
              r('sai-r8', 'Documentation', 'OOW Syllabus', 'MCA', 'The full syllabus for the Officer of the Watch competency exam.'),
            ],
            status: 'locked',
          },
        ],
      },
      {
        id: 'sai-m6',
        title: 'Career',
        description: 'Progress through officer ranks toward Chief Officer and Captain.',
        status: 'locked',
        tasks: [
          {
            id: 'sai-m6-t1',
            title: 'Map your rank progression timeline',
            why: 'Understanding the full progression keeps you focused and helps you plan certifications.',
            time: '45 min',
            description: 'Research the path from OOW to Chief Mate to Master (Captain). Note: sea time and exams required for each step, and estimated years.',
            resources: [
              r('sai-r9', 'Article', 'Deck Officer Career Progression', 'Maritime Insight', 'A guide to advancing through the deck officer ranks.'),
            ],
            status: 'locked',
          },
        ],
      },
    ],
  },

  pageant: {
    careerId: 'pageant',
    milestones: [
      {
        id: 'pag-m1',
        title: 'Presentation',
        description: 'Develop your stage presence, walking, and posing technique.',
        status: 'active',
        tasks: [
          {
            id: 'pag-m1-t1',
            title: 'Practice a 60-second stage introduction',
            why: 'Your introduction is the first thing judges see. It sets your entire impression.',
            time: '45 min',
            description: 'Write a 60-second introduction: name, where you are from, and one memorable thing about you. Practice in front of a mirror 10 times. Film the last take.',
            resources: [
              r('pag-r1', 'Video', 'Pageant Introduction Technique', 'YouTube', 'A pageant coach demonstrates how to deliver a strong stage introduction.'),
            ],
            status: 'active',
          },
          {
            id: 'pag-m1-t2',
            title: 'Practice your stage walk for 20 minutes',
            why: 'Walking in heels on stage with confidence is a learned skill. Repetition is the only way.',
            time: '20 min',
            description: 'Wear the shoes you would compete in. Practice walking, turning, and stopping with poise. Focus on posture, pace, and composure.',
            resources: [
              r('pag-r2', 'Video', 'Pageant Walking Tutorial', 'YouTube', 'A professional walk coach breaks down stage walking technique step by step.'),
            ],
            status: 'locked',
          },
        ],
      },
      {
        id: 'pag-m2',
        title: 'Grooming',
        description: 'Develop your personal styling, fitness, and presentation routine.',
        status: 'locked',
        tasks: [
          {
            id: 'pag-m2-t1',
            title: 'Define your personal style and competition look',
            why: 'A cohesive, authentic look helps you stand out and feel confident on stage.',
            time: '1 hour',
            description: 'Create a mood board of styling references. Define your hair, makeup, and wardrobe direction for competition. Research what works for your pageant system.',
            resources: [
              r('pag-r3', 'Article', 'Pageant Styling Guide', 'Pageant Planet', 'Tips on choosing competition wardrobe, hair, and makeup.'),
            ],
            status: 'locked',
          },
        ],
      },
      {
        id: 'pag-m3',
        title: 'Stage Skills',
        description: 'Master stage performance, talent presentation, and composure under pressure.',
        status: 'locked',
        tasks: [
          {
            id: 'pag-m3-t1',
            title: 'Practice maintaining composure under stage pressure',
            why: 'Judges watch how you handle mistakes and pressure. Composure separates finalists.',
            time: '30 min',
            description: 'Do your walk and introduction while a friend distracts you or plays loud music. Practice recovering smoothly from interruptions.',
            resources: [
              r('pag-r4', 'Video', 'Stage Composure Techniques', 'YouTube', 'A coach explains how to stay composed on stage under pressure.'),
            ],
            status: 'locked',
          },
        ],
      },
      {
        id: 'pag-m4',
        title: 'Interview',
        description: 'Prepare for the interview round — often the most heavily scored segment.',
        status: 'locked',
        tasks: [
          {
            id: 'pag-m4-t1',
            title: 'Practice 10 common pageant interview questions',
            why: 'The interview round often carries the most weight. Prepared-but-natural answers win.',
            time: '1 hour',
            description: 'Find 10 common pageant questions. Practice answering each in under 60 seconds. Record yourself. Focus on clarity, authenticity, and structure.',
            resources: [
              r('pag-r5', 'Article', 'Common Pageant Interview Questions', 'Pageant Planet', 'A list of frequently asked pageant interview questions with answer strategies.'),
            ],
            status: 'locked',
          },
        ],
      },
      {
        id: 'pag-m5',
        title: 'Competition',
        description: 'Compete in your first local or regional pageant.',
        status: 'locked',
        tasks: [
          {
            id: 'pag-m5-t1',
            title: 'Research and register for a local pageant',
            why: 'Competing is the only way to gain real experience. Start local and build your resume.',
            time: '2 hours',
            description: 'Find 3 local or regional pageants that fit your goals. Note: entry requirements, fees, dates, and judging criteria. Register for the one that fits best.',
            resources: [
              r('pag-r6', 'Article', 'How to Choose Your First Pageant', 'Pageant Planet', 'A guide to selecting a pageant system that matches your goals and experience.'),
            ],
            status: 'locked',
          },
        ],
      },
      {
        id: 'pag-m6',
        title: 'Representation',
        description: 'Use your platform for advocacy, speaking, and career opportunities.',
        status: 'locked',
        tasks: [
          {
            id: 'pag-m6-t1',
            title: 'Define your advocacy platform',
            why: 'A clear platform turns a title into impact and opens speaking and media opportunities.',
            time: '1 hour',
            description: 'Identify a cause you genuinely care about. Write a 1-page platform statement: the issue, why it matters to you, and what you want to do about it.',
            resources: [
              r('pag-r7', 'Article', 'Building a Pageant Platform', 'Pageant Planet', 'How to choose and develop a meaningful advocacy platform.'),
            ],
            status: 'locked',
          },
        ],
      },
    ],
  },

  cartographer: {
    careerId: 'cartographer',
    milestones: [
      {
        id: 'car-m1',
        title: 'Geography',
        description: 'Build foundational knowledge in geography, coordinate systems, and spatial thinking.',
        status: 'active',
        tasks: [
          {
            id: 'car-m1-t1',
            title: 'Learn the basics of geographic coordinate systems',
            why: 'Coordinates are the language of cartography. Everything builds on this.',
            time: '45 min',
            description: 'Study latitude, longitude, and the concept of map projections. Understand why a flat map distorts a round Earth. Take notes on 3 common projections.',
            resources: [
              r('car-r1', 'Article', 'Map Projections Explained', 'Geo awesomeness', 'A visual guide to why map projections distort and which are most common.'),
              r('car-r2', 'Video', 'Coordinate Systems & Map Projections', 'YouTube', 'A clear tutorial on latitude, longitude, and projection types.'),
            ],
            status: 'active',
          },
          {
            id: 'car-m1-t2',
            title: 'Explore different types of maps and their purposes',
            why: 'Understanding map types helps you decide what to create and for whom.',
            time: '30 min',
            description: 'Research topographic, thematic, political, physical, and navigational maps. For each, note its purpose and one example use case.',
            resources: [
              r('car-r3', 'Article', 'Types of Maps', 'National Geographic', 'A guide to the major map types and their uses.'),
            ],
            status: 'locked',
          },
        ],
      },
      {
        id: 'car-m2',
        title: 'GIS',
        description: 'Learn Geographic Information Systems — the core tool of modern cartography.',
        status: 'locked',
        tasks: [
          {
            id: 'car-m2-t1',
            title: 'Install QGIS and complete a beginner tutorial',
            why: 'QGIS is the leading free GIS software. Hands-on use is the fastest way to learn.',
            time: '2 hours',
            description: 'Download and install QGIS. Complete a beginner tutorial that covers: adding data layers, styling, and exporting a basic map.',
            resources: [
              r('car-r4', 'Course', 'QGIS Tutorials for Beginners', 'QGIS Documentation', 'Official step-by-step tutorials covering the basics of QGIS.'),
              r('car-r5', 'Video', 'QGIS Beginner Crash Course', 'YouTube', 'A 30-minute hands-on intro to QGIS basics.'),
            ],
            status: 'locked',
          },
        ],
      },
      {
        id: 'car-m3',
        title: 'Mapping',
        description: 'Create your first maps from real data.',
        status: 'locked',
        tasks: [
          {
            id: 'car-m3-t1',
            title: 'Create your first GIS map',
            why: 'Making a complete map — from data to finished export — is the moment theory becomes skill.',
            time: '2 hours',
            description: 'Use QGIS with open data (Natural Earth or your city\'s open data portal). Create a map with: a base layer, a thematic layer, a legend, a title, and a north arrow. Export it as a PDF.',
            resources: [
              r('car-r6', 'Practice', 'Natural Earth Data', 'Natural Earth', 'Free, public-domain geographic datasets for practice mapping projects.'),
              r('car-r7', 'Article', 'Making Your First Map in QGIS', 'QGIS Tutorials', 'A walkthrough of creating and styling a complete map.'),
            ],
            status: 'locked',
          },
        ],
      },
      {
        id: 'car-m4',
        title: 'Field Data',
        description: 'Learn how geographic data is collected in the field.',
        status: 'locked',
        tasks: [
          {
            id: 'car-m4-t1',
            title: 'Learn about GPS data collection methods',
            why: 'Understanding how field data is collected helps you work with it accurately.',
            time: '1 hour',
            description: 'Research GPS, surveying, and remote sensing. Note how each method collects spatial data and what types of maps they support.',
            resources: [
              r('car-r8', 'Article', 'Introduction to GPS and GIS Data Collection', 'USGS', 'A guide to how geographic data is gathered in the field.'),
            ],
            status: 'locked',
          },
        ],
      },
      {
        id: 'car-m5',
        title: 'Portfolio',
        description: 'Build a portfolio of mapping projects to showcase your skills.',
        status: 'locked',
        tasks: [
          {
            id: 'car-m5-t1',
            title: 'Create 3 different maps for your portfolio',
            why: 'A portfolio is how you get hired. Three diverse maps demonstrate range and skill.',
            time: '4 hours',
            description: 'Create 3 maps: one topographic, one thematic (e.g., population density), and one custom (your choice). Export each as a high-quality PDF. Write a short description of each.',
            resources: [
              r('car-r9', 'Article', 'How to Build a Cartography Portfolio', 'NACIS', 'Tips from cartography professionals on creating a strong portfolio.'),
            ],
            status: 'locked',
          },
        ],
      },
      {
        id: 'car-m6',
        title: 'Career',
        description: 'Apply for cartography roles or freelance projects.',
        status: 'locked',
        tasks: [
          {
            id: 'car-m6-t1',
            title: 'Research 5 cartography or GIS job postings',
            why: 'Seeing real job requirements shows you what to emphasize in your portfolio and what skills to strengthen.',
            time: '1 hour',
            description: 'Find 5 job postings for cartographer, GIS analyst, or mapping specialist roles. Note: required software, experience, and portfolio expectations.',
            resources: [
              r('car-r10', 'Article', 'Cartography & GIS Career Guide', 'URISA', 'A professional guide to careers in GIS and cartography.'),
            ],
            status: 'locked',
          },
        ],
      },
    ],
  },
}
