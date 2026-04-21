'use client';

import { villains } from '@/content/characters';
import { useGame } from '@/lib/gameEngine';
import { mughalEmeraldCase } from '@/content/cases/mughal-emerald';

const casesByVillain: Record<string, string> = {
  'habanera-dallas': mughalEmeraldCase.id,
};

export default function CharacterSelect() {
  const { dispatch } = useGame();

  function handleSelect(villainId: string, hasCase: boolean) {
    if (!hasCase) return;
    const caseId = casesByVillain[villainId];
    if (!caseId) return;
    dispatch({ type: 'SELECT_VILLAIN', villainId });
    dispatch({ type: 'START_CASE', caseId });
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-4xl w-full slide-up">
        <p className="text-[var(--color-game-muted)] font-mono text-xs tracking-[0.3em] uppercase mb-2 text-center">
          Case Assignment
        </p>
        <h2 className="text-3xl font-black text-center mb-2">Choose Your Target</h2>
        <p className="text-[var(--color-game-muted)] text-center mb-10 text-sm">
          Select which villain to pursue. New cases are added regularly.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {villains.map((villain) => (
            <button
              key={villain.id}
              onClick={() => handleSelect(villain.id, villain.hasCase)}
              disabled={!villain.hasCase}
              className={[
                'relative text-left rounded-lg border p-6 transition-all duration-200 group',
                villain.hasCase
                  ? 'border-[var(--color-game-border)] hover:border-[var(--color-game-red)] hover:bg-[var(--color-game-card)] cursor-pointer'
                  : 'border-[var(--color-game-border)] opacity-40 cursor-not-allowed',
              ].join(' ')}
              style={{ backgroundColor: 'var(--color-game-card)' }}
            >
              {!villain.hasCase && (
                <span className="absolute top-3 right-3 font-mono text-xs text-[var(--color-game-muted)] border border-[var(--color-game-border)] px-2 py-0.5 rounded">
                  COMING SOON
                </span>
              )}

              {/* Avatar placeholder with initial */}
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-black mb-4 border-2"
                style={{
                  backgroundColor: villain.hasCase ? 'var(--color-game-red-dark)' : 'var(--color-game-border)',
                  borderColor: villain.hasCase ? 'var(--color-game-red)' : 'var(--color-game-border)',
                  color: 'var(--color-game-text)',
                }}
              >
                {villain.name[0]}
              </div>

              <h3 className="font-black text-lg leading-tight mb-1">{villain.name}</h3>
              <p
                className="font-mono text-xs mb-3"
                style={{ color: 'var(--color-game-gold)' }}
              >
                {villain.alias}
              </p>
              <p className="text-sm text-[var(--color-game-muted)] leading-relaxed mb-4">
                {villain.description}
              </p>

              <div className="flex flex-wrap gap-1">
                {villain.traits.map((trait) => (
                  <span
                    key={trait}
                    className="font-mono text-xs px-2 py-0.5 rounded border"
                    style={{
                      borderColor: 'var(--color-game-border)',
                      color: 'var(--color-game-muted)',
                    }}
                  >
                    {trait}
                  </span>
                ))}
              </div>

              {villain.hasCase && (
                <div
                  className="mt-4 font-mono text-xs uppercase tracking-widest group-hover:text-[var(--color-game-red)] transition-colors"
                  style={{ color: 'var(--color-game-muted)' }}
                >
                  Accept Case →
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
