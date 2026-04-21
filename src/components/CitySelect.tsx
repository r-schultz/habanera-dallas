'use client';

import { useState } from 'react';
import { useGame } from '@/lib/gameEngine';
import { mughalEmeraldCase, mughalEmeraldCityChoices } from '@/content/cases/mughal-emerald';

const casesById: Record<string, typeof mughalEmeraldCase> = {
  [mughalEmeraldCase.id]: mughalEmeraldCase,
};

const cityChoicesByCase: Record<string, Record<number, string[]>> = {
  [mughalEmeraldCase.id]: mughalEmeraldCityChoices,
};

// Shuffle array (Fisher-Yates)
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function CitySelect() {
  const { state, dispatch } = useGame();
  const activeCase = state.activeCaseId ? casesById[state.activeCaseId] : null;
  const caseChoices = state.activeCaseId ? cityChoicesByCase[state.activeCaseId] : null;

  const [selected, setSelected] = useState<string | null>(null);
  const [shuffledChoices] = useState<string[]>(() => {
    const choices = caseChoices?.[state.currentLocationIndex] ?? [];
    return shuffle(choices);
  });

  if (!activeCase || !caseChoices) return null;

  const correctCity =
    activeCase.locations[state.currentLocationIndex + 1]?.city ?? '';

  const currentLocation = activeCase.locations[state.currentLocationIndex];

  function handleGuess(city: string) {
    setSelected(city);
    // Small delay so the user sees their selection before state changes
    setTimeout(() => {
      dispatch({ type: 'GUESS_CITY', city, correctCity });
      setSelected(null);
    }, 400);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-xl w-full slide-up">
        {/* Lives */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="font-mono text-xs text-[var(--color-game-muted)] uppercase tracking-widest mb-1">
              You are in {currentLocation.city}
            </p>
            <h2 className="text-2xl font-black">Where did she go next?</h2>
          </div>
          <div className="flex gap-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <span key={i} style={{ opacity: i < state.lives ? 1 : 0.2 }} className="text-xl">
                ❤️
              </span>
            ))}
          </div>
        </div>

        {state.wrongGuessesAtCurrentLocation > 0 && (
          <div
            className="rounded border p-3 mb-4 font-mono text-sm"
            style={{
              borderColor: 'var(--color-game-red)',
              backgroundColor: 'rgba(196,30,58,0.08)',
              color: 'var(--color-game-red)',
            }}
          >
            Wrong location. Re-read the clues and try again. {state.lives} lives remaining.
          </div>
        )}

        <p className="text-[var(--color-game-muted)] text-sm mb-6 leading-relaxed">
          Study the clues carefully. Choose the city where Habanera Dallas fled next.
        </p>

        <div className="grid grid-cols-1 gap-3">
          {shuffledChoices.map((city) => (
            <button
              key={city}
              disabled={selected !== null}
              onClick={() => handleGuess(city)}
              className={[
                'w-full text-left px-5 py-4 rounded border font-semibold transition-all duration-200',
                selected === city
                  ? 'border-[var(--color-game-gold)] bg-[rgba(212,175,55,0.12)] scale-95'
                  : 'border-[var(--color-game-border)] hover:border-[var(--color-game-red)] hover:bg-[var(--color-game-card)] cursor-pointer',
              ].join(' ')}
              style={{ backgroundColor: selected === city ? undefined : 'var(--color-game-card)' }}
            >
              <span className="font-mono text-xs text-[var(--color-game-muted)] block mb-0.5">
                City
              </span>
              {city}
            </button>
          ))}
        </div>

        <p className="mt-6 text-center font-mono text-xs text-[var(--color-game-muted)]">
          Wrong guesses cost a life. You have {state.lives} remaining.
        </p>
      </div>
    </div>
  );
}
