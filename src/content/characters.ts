import type { Villain } from '@/lib/types';

export const villains: Villain[] = [
  {
    id: 'habanera-dallas',
    name: 'Habanera Dallas',
    alias: 'The Gemstone Desperado',
    description:
      'A former gemologist from Fort Worth who turned her encyclopedic knowledge of precious stones into a career of international theft. Always spotted in a crimson blazer and hand-tooled cowboy boots.',
    traits: ['Loves emeralds', 'Speaks six languages', 'Never checks baggage', 'Orders hot sauce with everything'],
    hasCase: true,
  },
  {
    id: 'aria-vienna',
    name: 'Aria Vienna',
    alias: 'The Phantom of the Archive',
    description:
      'A disgraced musicologist who now steals rare musical manuscripts and instruments from the world\'s great concert halls. Travels exclusively by train. Hums constantly.',
    traits: ['Perfect pitch', 'Forges signatures flawlessly', 'Allergic to airports', 'Owns 40 scarves'],
    hasCase: false,
  },
  {
    id: 'sonata-naples',
    name: 'Sonata Naples',
    alias: 'The Mediterranean Ghost',
    description:
      'A one-time archaeology professor who now plunders ancient artifacts from sites she once helped protect. Her seafoam green trench coat is the last thing museum curators see before something goes missing.',
    traits: ['Reads Latin fluently', 'Terrified of sharks', 'Never uses GPS', 'Excellent cook'],
    hasCase: false,
  },
];

export function getVillain(id: string): Villain | undefined {
  return villains.find((v) => v.id === id);
}
