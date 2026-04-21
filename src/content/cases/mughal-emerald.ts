import type { Case } from '@/lib/types';

export const mughalEmeraldCase: Case = {
  id: 'mughal-emerald',
  villainId: 'habanera-dallas',
  title: 'The Missing Mughal Emerald',
  stolenItem: 'the Shah Jahan Emerald — a 246-carat stone inscribed with Persian poetry',
  stolenFrom: 'Washington D.C.',
  briefing:
    'The Shah Jahan Emerald has vanished from the Smithsonian\'s Hall of Geology, Gems, and Minerals. ' +
    'Security cameras caught a glimpse of a red blazer and cowboy boots before the footage was cut. ' +
    'This gem has been traded across empires for 400 years. Habanera Dallas knows exactly what it\'s worth — ' +
    'and exactly who would pay anything to have it back. Track her down before it disappears forever.',

  locations: [
    {
      city: 'Washington D.C.',
      country: 'United States',
      landmarkQuery: 'Smithsonian National Museum of Natural History Washington DC',
      historicalEvent: {
        title: 'The Smithsonian and the Hope Diamond',
        body:
          'The Smithsonian\'s National Museum of Natural History houses one of the world\'s great gem collections, ' +
          'including the 45.52-carat Hope Diamond — the most visited museum object on Earth. ' +
          'The Hope Diamond arrived in 1958 when jeweler Harry Winston simply mailed it in a plain brown package ' +
          '(he did insure it for $1 million). Before that, it passed through the French crown jewels, ' +
          'an Indian raja, and a long chain of aristocratic owners. The museum\'s gem hall was designed ' +
          'so every American could encounter the same treasures once reserved for royalty.',
        funFact:
          'Harry Winston mailed the Hope Diamond via registered first-class mail. The postage cost $2.44. The insurance cost $142.85.',
      },
      clues: [
        'A cab driver dropped a woman in a red blazer at Dulles International. She paid in Colombian pesos and asked which airline flew direct to the Caribbean coast of South America.',
        'A gift shop receipt found near the exhibit showed a purchase of "Gems of the New World" — a book about Colombian emerald mining. The receipt was stamped 11:47 PM, minutes before the alarm triggered.',
        'The security guard reported she spoke with a slight Texas drawl and asked which South American city had "the best colonial fortress on the coast." He told her about Cartagena.',
      ],
    },
    {
      city: 'Cartagena',
      country: 'Colombia',
      landmarkQuery: 'Castillo San Felipe de Barajas Cartagena Colombia',
      historicalEvent: {
        title: 'Colombia and the World\'s Emeralds',
        body:
          'Colombia produces between 70 and 90 percent of the world\'s gem-quality emeralds, ' +
          'and has done so for over 500 years. Before the Spanish arrived, the Muzo people of ' +
          'present-day Boyacá mined these stones and traded them throughout the Americas. ' +
          'When Spanish conquistadors arrived in the 1500s, they learned of the mines through ' +
          'the Muzo and eventually seized control. Colombian emeralds then flooded the courts of ' +
          'Europe, Persia, and the Mughal Empire — changing the jewelry of the entire world. ' +
          'The Muzo mine, still active today, produces the most prized "Muzo green" stones ' +
          'that glow with a warm, slightly yellowish hue.',
        funFact:
          'The Aztec and Inca civilizations valued emeralds so highly that they refused to reveal the locations of their mines to Spanish conquistadors — even under torture. Many mines weren\'t found for decades.',
      },
      clues: [
        'A harbor master logged a private charter flight heading east toward South Asia. The passenger listed her name as "A. Dallas" and her destination as "the city they call the Pink City."',
        'A gem merchant in the old city said a woman asked him specifically about where Mughal emperors sourced their stones — and whether Jaipur was still the gem-cutting capital of India.',
        'A hotel receipt left at checkout showed she had searched for "Johari Bazaar Jaipur emerald cutters" on the lobby computer.',
      ],
    },
    {
      city: 'Jaipur',
      country: 'India',
      landmarkQuery: 'Hawa Mahal Jaipur India',
      historicalEvent: {
        title: 'The Mughal Empire and the World of Gems',
        body:
          'The Mughal emperors, who ruled most of the Indian subcontinent from 1526 to 1857, ' +
          'were obsessed with precious stones. Emperor Shah Jahan — who built the Taj Mahal as a ' +
          'tomb for his beloved wife — had emeralds engraved with verses from the Quran and wore them ' +
          'as talismans. Mughal craftsmen invented the art of "kundan" setting, using pure gold foil ' +
          'to grip gemstones without visible prongs, a technique still used in Jaipur today. ' +
          'Jaipur, founded in 1727, became the center of India\'s gem trade. Over 800,000 people ' +
          'in the city still work in gems and jewelry. The Johari Bazaar (literally "jewelers\' market") ' +
          'has been selling stones on the same street for nearly 300 years.',
        funFact:
          'Shah Jahan\'s Peacock Throne, built in 1635, contained so many gems — rubies, emeralds, diamonds, pearls — that it took seven years to complete and cost twice as much as the Taj Mahal.',
      },
      clues: [
        'A gem cutter in the Johari Bazaar recognized her instantly — she had tried to sell him an emerald and asked specifically about "what the Ottoman sultans paid for stones like this."',
        'Airport records show a one-way ticket purchased under "H. Dallas" to a city described in a note she left behind as "where Europe meets Asia — the city on the Bosphorus."',
        'She left behind a torn postcard of an ornate dagger with three massive emeralds embedded in its handle. On the back, she wrote: "Coming home."',
      ],
    },
    {
      city: 'Istanbul',
      country: 'Turkey',
      landmarkQuery: 'Topkapi Palace Istanbul Turkey',
      historicalEvent: {
        title: 'The Topkapi Dagger and Ottoman Treasures',
        body:
          'The Topkapi Palace in Istanbul served as the administrative heart of the Ottoman Empire ' +
          'for nearly 400 years, from 1465 to 1856. Its treasury holds one of the most extraordinary ' +
          'collections of emeralds in the world. The famous Topkapi Dagger — made in 1747 as a gift ' +
          'for the Persian Shah Nadir — features three enormous emeralds on its handle, each the size ' +
          'of a large grape. The dagger never made it to Persia: the Shah was assassinated before ' +
          'the Ottoman envoy arrived, and the gift was brought back to Istanbul. Today, the dagger ' +
          'is one of the most visited objects in the Topkapi treasury — and the subject of the 1964 ' +
          'Hollywood heist film "Topkapi," which may have given Habanera Dallas some ideas.',
        funFact:
          'The Topkapi treasury also holds what it claims is the arm bone of John the Baptist, the staff of Moses, and the sword of David — making it one of the most unusual museum collections anywhere.',
      },
      clues: [],
    },
  ],
};

// The correct sequence of cities to catch the villain
// (used by game engine to determine correct next guess)
export const mughalEmeraldCitySequence = [
  'Cartagena',
  'Jaipur',
  'Istanbul',
];

export const mughalEmeraldCityChoices: Record<number, string[]> = {
  // After Washington D.C. → going to Cartagena
  0: ['Cartagena', 'Bogotá', 'Lima', 'Buenos Aires', 'Panama City'],
  // After Cartagena → going to Jaipur
  1: ['Jaipur', 'Mumbai', 'New Delhi', 'Colombo', 'Bangkok'],
  // After Jaipur → going to Istanbul
  2: ['Istanbul', 'Cairo', 'Rome', 'Athens', 'Tehran'],
};
