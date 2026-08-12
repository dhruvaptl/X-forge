import type { CareerId } from '../types'

export const gossipItems: { careerId: CareerId; text: string; hook: string }[] = [
  { careerId: 'sommelier', text: 'Apparently, people get paid to taste wine.', hook: 'A whole career built on your palate.' },
  { careerId: 'oceanographer', text: 'Apparently, your office can literally be the ocean.', hook: 'Science, but the floor is a research vessel.' },
  { careerId: 'food-researcher', text: 'Apparently, food science is a whole career.', hook: 'Someone tested every snack you love.' },
  { careerId: 'sailor', text: 'Apparently, people navigate giant ships for a living.', hook: 'Your office moves. Literally.' },
  { careerId: 'pageant', text: 'Apparently, people get paid to walk on stage and win crowns.', hook: 'The crown is one part of the job.' },
  { careerId: 'cartographer', text: 'Apparently, someone gets paid to map the world.', hook: 'Every map started with a person.' },
]

export const dailyDiscoveries: Record<CareerId, string[]> = {
  sommelier: [
    'The Court of Master Sommeliers has fewer than 300 Master Sommeliers worldwide — fewer than astronauts.',
    'A professional sommelier can identify a wine blind: grape, region, and vintage, from one sip.',
    'The word "sommelier" originally referred to the person in charge of transporting supplies for royalty.',
  ],
  oceanographer: [
    'We have better maps of Mars than of our own ocean floor. Oceanographers are fixing that.',
    'The deep ocean has species we have never seen — some discovered on every research cruise.',
    'Oceanographers study the Gulf Stream so closely because if it slowed down, European winters would intensify.',
  ],
  'food-researcher': [
    'The crispiness of a potato chip was engineered in a lab. So was its exact salt level.',
    'Food researchers study how long ice cream can sit in your freezer without forming ice crystals.',
    'The "mouthfeel" of a food is a studied science — not an accident.',
  ],
  sailor: [
    'A deck officer on a cargo ship can be responsible for cargo worth more than a skyscraper.',
    'The largest container ships carry over 24,000 containers. One ship. One crew.',
    'Ships still use physical compasses alongside GPS — because GPS can fail, a compass cannot.',
  ],
  pageant: [
    'Miss America is the largest provider of scholarships for women in the United States.',
    'Pageant interview rounds are often worth more points than the stage walk.',
    'Many news anchors and public figures got their start in pageants — the training transfers.',
  ],
  cartographer: [
    'Google Maps relies on a team of cartographers who update maps constantly.',
    'The first known map was carved into a bone over 25,000 years ago.',
    'Modern cartographers blend field surveying, satellite data, and design — it is half science, half art.',
  ],
}

export const personalityMessages = {
  hype: [
    "Okayyy, look who's actually doing it. 🔥",
    'Another one down. Keep going.',
    "You are actually building this. That's not nothing.",
  ],
  roasting: [
    "That task has been waiting longer than your '5-minute break.' 💀",
    "The roadmap is not going to walk itself.",
    "Your streak is giving... participation trophy. But we root for you.",
  ],
  console: [
    "Missed today? Tomorrow still exists.",
    "Off days are part of the path. Come back tomorrow.",
    "No guilt. Just come back when you are ready.",
  ],
  dialogue: {
    ready: "Ready for today's move?",
    answers: ['Unfortunately.', "Let's go.", 'Born ready.', 'Do I have to?', 'Always.'],
    response: "That's the spirit.",
  },
  crush: "Okay, career crush. We need to talk. 👀",
}

export const moodLabels: Record<string, { label: string; emoji: string }> = {
  'locked-in': { label: 'Locked in', emoji: '🔥' },
  okay: { label: 'Okay', emoji: '🙂' },
  overwhelmed: { label: 'Overwhelmed', emoji: '😵' },
  curious: { label: 'Curious', emoji: '👀' },
  procrastinating: { label: 'Procrastinating', emoji: '💀' },
}
