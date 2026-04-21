'use client';

import { useGame } from '@/lib/gameEngine';
import { mughalEmeraldCase } from '@/content/cases/mughal-emerald';

const casesById: Record<string, typeof mughalEmeraldCase> = {
  [mughalEmeraldCase.id]: mughalEmeraldCase,
};

export default function HistoryCutscene() {
  const { state, dispatch } = useGame();
  const activeCase = state.activeCaseId ? casesById[state.activeCaseId] : null;

  if (!activeCase) return null;

  // currentLocationIndex was just incremented when we got here
  const locationIndex = state.currentLocationIndex;
  const location = activeCase.locations[locationIndex];

  if (!location) return null;

  const isLastLocation = locationIndex === activeCase.locations.length - 1;
  const isCatchLocation = isLastLocation;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-[var(--color-game-bg)]">
      <div className="max-w-2xl w-full slide-up">
        {/* Arrival banner */}
        <div className="text-center mb-8">
          <p className="font-mono text-xs text-[var(--color-game-muted)] uppercase tracking-[0.3em] mb-2">
            {isCatchLocation ? '🚨 Suspect Located' : 'You have arrived in'}
          </p>
          <h2
            className="text-5xl font-black"
            style={{ color: isCatchLocation ? 'var(--color-game-red)' : 'var(--color-game-gold)' }}
          >
            {location.city}
          </h2>
          <p className="text-[var(--color-game-muted)] mt-1">{location.country}</p>
        </div>

        {/* History card */}
        <div
          className="rounded-lg border border-[var(--color-game-gold)] overflow-hidden"
          style={{ backgroundColor: 'var(--color-game-card)' }}
        >
          <div
            className="px-6 py-3 flex items-center gap-2 border-b border-[var(--color-game-border)]"
            style={{ backgroundColor: 'rgba(212,175,55,0.08)' }}
          >
            <span style={{ color: 'var(--color-game-gold)' }}>📜</span>
            <span
              className="font-mono text-xs uppercase tracking-widest"
              style={{ color: 'var(--color-game-gold)' }}
            >
              Historical Intel
            </span>
          </div>

          <div className="p-6 md:p-8">
            <h3 className="text-xl font-black mb-4" style={{ color: 'var(--color-game-text)' }}>
              {location.historicalEvent.title}
            </h3>

            <p className="text-[var(--color-game-muted)] leading-relaxed mb-6">
              {location.historicalEvent.body}
            </p>

            {/* Fun fact callout */}
            <div
              className="rounded border-l-4 p-4"
              style={{
                borderColor: 'var(--color-game-gold)',
                backgroundColor: 'rgba(212,175,55,0.06)',
              }}
            >
              <p
                className="font-mono text-xs uppercase tracking-widest mb-2"
                style={{ color: 'var(--color-game-gold)' }}
              >
                Did you know?
              </p>
              <p className="text-sm text-[var(--color-game-text)] leading-relaxed">
                {location.historicalEvent.funFact}
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <button
            className="btn-primary"
            onClick={() => dispatch({ type: 'DISMISS_HISTORY' })}
          >
            {isCatchLocation ? 'Apprehend Suspect →' : 'Search for Clues →'}
          </button>
        </div>
      </div>
    </div>
  );
}
