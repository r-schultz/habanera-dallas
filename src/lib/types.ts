export type GamePhase =
  | 'TITLE'
  | 'CHARACTER_SELECT'
  | 'CASE_BRIEFING'
  | 'HISTORY_CUTSCENE'
  | 'LOCATION'
  | 'CITY_SELECT'
  | 'CAUGHT'
  | 'ESCAPED';

export interface HistoricalEvent {
  title: string;
  body: string;
  funFact: string;
}

export interface CaseLocation {
  city: string;
  country: string;
  landmarkQuery: string; // sent to Google Places API
  historicalEvent: HistoricalEvent;
  clues: string[];
  // Cities shown as choices. correctNext must be the next location's city.
  cityChoices?: string[]; // optional; managed per-case in content files
}

export interface Case {
  id: string;
  villainId: string;
  title: string;
  stolenItem: string;
  stolenFrom: string; // city where theft occurred (first location)
  briefing: string;
  locations: CaseLocation[];
}

export interface Villain {
  id: string;
  name: string; // e.g. "Habanera Dallas"
  alias: string; // e.g. "The Gemstone Desperado"
  description: string;
  traits: string[];
  hasCase: boolean;
}

export interface GameState {
  phase: GamePhase;
  selectedVillainId: string | null;
  activeCaseId: string | null;
  currentLocationIndex: number;
  lives: number;
  wrongGuessesAtCurrentLocation: number;
}

export type GameAction =
  | { type: 'SELECT_VILLAIN'; villainId: string }
  | { type: 'START_CASE'; caseId: string }
  | { type: 'DISMISS_HISTORY' }
  | { type: 'OPEN_CITY_SELECT' }
  | { type: 'GUESS_CITY'; city: string; correctCity: string }
  | { type: 'MAKE_ARREST' }
  | { type: 'RESTART' };
