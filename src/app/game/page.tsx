'use client';

import { useReducer } from 'react';
import { GameContext, gameReducer, initialState } from '@/lib/gameEngine';
import CharacterSelect from '@/components/CharacterSelect';
import CaseBriefing from '@/components/CaseBriefing';
import HistoryCutscene from '@/components/HistoryCutscene';
import LocationScene from '@/components/LocationScene';
import CitySelect from '@/components/CitySelect';
import EndScreen from '@/components/EndScreen';

function GameOrchestrator() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // /game always starts at character select
  const phase = state.phase === 'TITLE' ? 'CHARACTER_SELECT' : state.phase;

  return (
    <GameContext.Provider value={{ state: { ...state, phase }, dispatch }}>
      {phase === 'CHARACTER_SELECT' && <CharacterSelect />}
      {phase === 'CASE_BRIEFING' && <CaseBriefing />}
      {phase === 'HISTORY_CUTSCENE' && <HistoryCutscene />}
      {phase === 'LOCATION' && <LocationScene />}
      {phase === 'CITY_SELECT' && <CitySelect />}
      {(phase === 'CAUGHT' || phase === 'ESCAPED') && <EndScreen />}
    </GameContext.Provider>
  );
}

export default function GamePage() {
  return <GameOrchestrator />;
}
