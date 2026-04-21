'use client';

import { useGame } from '@/lib/gameEngine';
import { mughalEmeraldCase } from '@/content/cases/mughal-emerald';
import { getVillain } from '@/content/characters';

const casesById: Record<string, typeof mughalEmeraldCase> = {
  [mughalEmeraldCase.id]: mughalEmeraldCase,
};

export default function CaseBriefing() {
  const { state, dispatch } = useGame();
  const activeCase = state.activeCaseId ? casesById[state.activeCaseId] : null;
  const villain = activeCase ? getVillain(activeCase.villainId) : null;

  if (!activeCase || !villain) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-2xl w-full slide-up">
        {/* Header */}
        <div className="border border-[var(--color-game-red)] rounded-t-lg px-6 py-3 flex items-center gap-3"
          style={{ backgroundColor: 'rgba(196,30,58,0.08)' }}>
          <div className="w-2 h-2 rounded-full bg-[var(--color-game-red)] animate-pulse" />
          <span className="font-mono text-xs text-[var(--color-game-red)] uppercase tracking-widest">
            Classified Briefing — Eyes Only
          </span>
        </div>

        <div
          className="border-x border-b border-[var(--color-game-border)] rounded-b-lg p-8"
          style={{ backgroundColor: 'var(--color-game-card)' }}
        >
          {/* Case ID */}
          <p className="font-mono text-xs text-[var(--color-game-muted)] uppercase tracking-widest mb-6">
            Case #{activeCase.id} · Assigned to: You
          </p>

          <h2
            className="text-3xl font-black mb-1"
            style={{ color: 'var(--color-game-gold)' }}
          >
            {activeCase.title}
          </h2>
          <p className="text-[var(--color-game-muted)] text-sm mb-6">
            Stolen:{' '}
            <span className="text-[var(--color-game-text)] font-semibold">
              {activeCase.stolenItem}
            </span>
          </p>

          {/* Divider */}
          <div className="border-t border-[var(--color-game-border)] mb-6" />

          {/* Villain dossier */}
          <div className="flex items-start gap-4 mb-6 p-4 rounded border border-[var(--color-game-border)]"
            style={{ backgroundColor: 'rgba(13,13,26,0.5)' }}>
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-black border-2 flex-shrink-0"
              style={{
                backgroundColor: 'var(--color-game-red-dark)',
                borderColor: 'var(--color-game-red)',
              }}
            >
              {villain.name[0]}
            </div>
            <div>
              <p className="font-mono text-xs text-[var(--color-game-muted)] uppercase tracking-wider mb-0.5">
                Suspect
              </p>
              <p className="font-black text-lg">{villain.name}</p>
              <p className="font-mono text-xs" style={{ color: 'var(--color-game-gold)' }}>
                {villain.alias}
              </p>
            </div>
          </div>

          {/* Briefing text */}
          <p className="text-[var(--color-game-text)] leading-relaxed mb-8">
            {activeCase.briefing}
          </p>

          {/* Intel */}
          <div
            className="rounded border border-[var(--color-game-border)] p-4 mb-8 font-mono text-sm"
            style={{ backgroundColor: 'rgba(13,13,26,0.5)' }}
          >
            <p className="text-[var(--color-game-muted)] text-xs uppercase tracking-widest mb-2">
              Last Known Location
            </p>
            <p className="text-[var(--color-game-text)]">
              {activeCase.stolenFrom} · {activeCase.locations[0].city},{' '}
              {activeCase.locations[0].country}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <p className="font-mono text-xs text-[var(--color-game-muted)]">
              ❤️ {state.lives} lives · Track the trail before she disappears
            </p>
            <button
              className="btn-primary"
              onClick={() => dispatch({ type: 'DISMISS_HISTORY' })}
            >
              Begin Investigation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
