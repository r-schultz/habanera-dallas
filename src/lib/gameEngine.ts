'use client';

import { createContext, useContext, type Dispatch } from 'react';
import type { GameState, GameAction } from './types';

const STARTING_LIVES = 3;

export const initialState: GameState = {
  phase: 'TITLE',
  selectedVillainId: null,
  activeCaseId: null,
  currentLocationIndex: 0,
  lives: STARTING_LIVES,
  wrongGuessesAtCurrentLocation: 0,
};

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SELECT_VILLAIN':
      return { ...state, phase: 'CHARACTER_SELECT', selectedVillainId: action.villainId };

    case 'START_CASE':
      return {
        ...state,
        phase: 'CASE_BRIEFING',
        activeCaseId: action.caseId,
        currentLocationIndex: 0,
        lives: STARTING_LIVES,
        wrongGuessesAtCurrentLocation: 0,
      };

    case 'DISMISS_HISTORY':
      return { ...state, phase: 'LOCATION' };

    case 'OPEN_CITY_SELECT':
      return { ...state, phase: 'CITY_SELECT' };

    case 'GUESS_CITY': {
      const isCorrect = action.city === action.correctCity;
      if (isCorrect) {
        return {
          ...state,
          phase: 'HISTORY_CUTSCENE',
          currentLocationIndex: state.currentLocationIndex + 1,
          wrongGuessesAtCurrentLocation: 0,
        };
      } else {
        const newLives = state.lives - 1;
        if (newLives <= 0) {
          return { ...state, phase: 'ESCAPED', lives: 0 };
        }
        return {
          ...state,
          phase: 'CITY_SELECT',
          lives: newLives,
          wrongGuessesAtCurrentLocation: state.wrongGuessesAtCurrentLocation + 1,
        };
      }
    }

    case 'MAKE_ARREST':
      return { ...state, phase: 'CAUGHT' };

    case 'RESTART':
      return { ...initialState };

    default:
      return state;
  }
}

// Context
type GameContextValue = {
  state: GameState;
  dispatch: Dispatch<GameAction>;
};

export const GameContext = createContext<GameContextValue>({
  state: initialState,
  dispatch: () => {},
});

export function useGame() {
  return useContext(GameContext);
}
