'use client';

import { useGame } from '@/lib/gameEngine';
import { mughalEmeraldCase } from '@/content/cases/mughal-emerald';
import { getVillain } from '@/content/characters';
import Link from 'next/link';

const casesById: Record<string, typeof mughalEmeraldCase> = {
  [mughalEmeraldCase.id]: mughalEmeraldCase,
};

export default function EndScreen() {
  const { state, dispatch } = useGame();
  const caught = state.phase === 'CAUGHT';
  const activeCase = state.activeCaseId ? casesById[state.activeCaseId] : null;
  const villain = activeCase ? getVillain(activeCase.villainId) : null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full text-center slide-up">
        {caught ? (
          <>
            <div className="text-6xl mb-4">🚔</div>
            <p className="font-mono text-xs text-[var(--color-game-red)] uppercase tracking-[0.3em] mb-3">
              Case Closed
            </p>
            <h2
              className="text-4xl font-black mb-2"
              style={{ color: 'var(--color-game-gold)' }}
            >
              You caught her.
            </h2>
            {villain && (
              <p className="text-[var(--color-game-muted)] mb-6">
                <span className="font-black text-[var(--color-game-text)]">{villain.name}</span>{' '}
                has been apprehended in{' '}
                <span className="font-black text-[var(--color-game-text)]">
                  {activeCase?.locations[state.currentLocationIndex]?.city ?? 'custody'}
                </span>
                .{' '}
                {activeCase?.stolenItem && (
                  <>
                    The {activeCase.stolenItem} has been recovered and returned.
                  </>
                )}
              </p>
            )}

            <div
              className="rounded-lg border border-[var(--color-game-gold)] p-6 mb-8 text-left"
              style={{ backgroundColor: 'var(--color-game-card)' }}
            >
              <p
                className="font-mono text-xs uppercase tracking-widest mb-3"
                style={{ color: 'var(--color-game-gold)' }}
              >
                Case Summary
              </p>
              {activeCase?.locations.map((loc, i) => (
                <div key={loc.city} className="flex items-center gap-3 py-2">
                  <span className="text-[var(--color-game-green)] font-bold text-sm">✓</span>
                  <span className="text-sm">
                    <span className="font-bold">{loc.city}</span>
                    <span className="text-[var(--color-game-muted)]">, {loc.country}</span>
                  </span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="text-6xl mb-4">✈️</div>
            <p className="font-mono text-xs text-[var(--color-game-muted)] uppercase tracking-[0.3em] mb-3">
              Case Open
            </p>
            <h2 className="text-4xl font-black text-[var(--color-game-red)] mb-2">
              She escaped.
            </h2>
            {villain && (
              <p className="text-[var(--color-game-muted)] mb-8">
                <span className="font-black text-[var(--color-game-text)]">{villain.name}</span>{' '}
                slipped through your fingers. The{' '}
                {activeCase?.stolenItem ?? 'stolen item'} is still missing.
                Better luck next time, Agent.
              </p>
            )}
          </>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            className="btn-primary"
            onClick={() => dispatch({ type: 'RESTART' })}
          >
            {caught ? 'New Case' : 'Try Again'}
          </button>
          <Link href="/">
            <button
              className="px-8 py-3 rounded border font-bold uppercase tracking-wider text-sm transition-colors hover:bg-[var(--color-game-card)]"
              style={{
                borderColor: 'var(--color-game-border)',
                color: 'var(--color-game-muted)',
              }}
            >
              Main Menu
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
