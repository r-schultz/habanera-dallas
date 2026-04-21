'use client';

import { useEffect, useState } from 'react';
import { useGame } from '@/lib/gameEngine';
import { mughalEmeraldCase } from '@/content/cases/mughal-emerald';

const casesById: Record<string, typeof mughalEmeraldCase> = {
  [mughalEmeraldCase.id]: mughalEmeraldCase,
};

function LivesBar({ lives, max = 3 }: { lives: number; max?: number }) {
  return (
    <div className="flex gap-1.5 items-center">
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} className="text-lg" style={{ opacity: i < lives ? 1 : 0.2 }}>
          ❤️
        </span>
      ))}
    </div>
  );
}

export default function LocationScene() {
  const { state, dispatch } = useGame();
  const activeCase = state.activeCaseId ? casesById[state.activeCaseId] : null;

  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [photoLoading, setPhotoLoading] = useState(true);
  const [visibleClues, setVisibleClues] = useState(0);

  const location = activeCase?.locations[state.currentLocationIndex];

  useEffect(() => {
    if (!location) return;
    setPhotoUrl(null);
    setPhotoLoading(true);
    setVisibleClues(0);

    fetch(`/api/maps/photo?query=${encodeURIComponent(location.landmarkQuery)}`)
      .then((r) => r.json())
      .then((data) => {
        setPhotoUrl(data.photoUrl ?? null);
        setPhotoLoading(false);
      })
      .catch(() => setPhotoLoading(false));
  }, [location?.city]);

  // Reveal clues one by one with delay
  useEffect(() => {
    if (!location) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    location.clues.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleClues(i + 1), 600 + i * 700));
    });
    return () => timers.forEach(clearTimeout);
  }, [location?.city]);

  if (!activeCase || !location) return null;

  const isFinalLocation = state.currentLocationIndex === activeCase.locations.length - 1;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-6 py-3 border-b border-[var(--color-game-border)] flex-shrink-0"
        style={{ backgroundColor: 'var(--color-game-card)' }}
      >
        <div>
          <span className="font-mono text-xs text-[var(--color-game-muted)] uppercase tracking-widest">
            Location {state.currentLocationIndex + 1} / {activeCase.locations.length}
          </span>
          <p className="font-black text-lg leading-tight">
            {location.city},{' '}
            <span className="text-[var(--color-game-muted)] font-normal">{location.country}</span>
          </p>
        </div>
        <LivesBar lives={state.lives} />
      </div>

      <div className="flex flex-col md:flex-row flex-1 overflow-auto">
        {/* Photo panel */}
        <div className="md:w-1/2 relative bg-[var(--color-game-card)]" style={{ minHeight: 280 }}>
          {photoLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
                  style={{ borderColor: 'var(--color-game-red)' }}
                />
                <span className="font-mono text-xs text-[var(--color-game-muted)]">
                  Retrieving field photo…
                </span>
              </div>
            </div>
          ) : photoUrl ? (
            <div className="photo-frame h-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photoUrl}
                alt={`${location.city} — ${location.landmarkQuery}`}
                className="w-full h-full object-cover fade-in"
                style={{ minHeight: 280 }}
              />
              <div className="absolute bottom-4 left-4 right-4 z-10">
                <p className="font-mono text-xs text-white/60 uppercase tracking-wider">
                  {location.landmarkQuery}
                </p>
              </div>
            </div>
          ) : (
            // Fallback when no API key
            <div
              className="absolute inset-0 flex flex-col items-center justify-center text-center p-8"
              style={{
                background: 'linear-gradient(135deg, var(--color-game-red-dark) 0%, var(--color-game-bg) 100%)',
              }}
            >
              <div className="text-6xl mb-4">🗺️</div>
              <p className="font-black text-xl mb-1">{location.city}</p>
              <p className="text-[var(--color-game-muted)] text-sm">{location.country}</p>
              <p className="text-[var(--color-game-muted)] font-mono text-xs mt-4">
                Add GOOGLE_MAPS_API_KEY to .env.local for real photos
              </p>
            </div>
          )}
        </div>

        {/* Clues panel */}
        <div className="md:w-1/2 flex flex-col p-6 md:p-8">
          <div className="mb-6">
            <p
              className="font-mono text-xs uppercase tracking-widest mb-4"
              style={{ color: 'var(--color-game-red)' }}
            >
              ● Field Intelligence
            </p>

            {location.clues.length === 0 && isFinalLocation ? (
              <div
                className="rounded border p-4"
                style={{
                  borderColor: 'var(--color-game-red)',
                  backgroundColor: 'rgba(196,30,58,0.08)',
                }}
              >
                <p className="font-black text-lg text-[var(--color-game-red)] mb-2">
                  Suspect Located
                </p>
                <p className="text-[var(--color-game-muted)] text-sm">
                  All evidence points here. Habanera Dallas is in {location.city}.
                  You have enough to make the arrest.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {location.clues.map((clue, i) => (
                  <div
                    key={i}
                    className={[
                      'rounded border p-4 clue-appear',
                      i >= visibleClues ? 'opacity-0' : '',
                    ].join(' ')}
                    style={{
                      borderColor: 'var(--color-game-border)',
                      backgroundColor: 'var(--color-game-card)',
                      animationDelay: `${i * 0.1}s`,
                    }}
                  >
                    <p className="font-mono text-xs text-[var(--color-game-muted)] mb-1">
                      Clue #{i + 1}
                    </p>
                    <p className="text-sm leading-relaxed text-[var(--color-game-text)]">
                      {clue}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-auto">
            {visibleClues >= location.clues.length || isFinalLocation ? (
              <button
                className="btn-primary w-full"
                onClick={() =>
                  isFinalLocation
                    ? dispatch({ type: 'MAKE_ARREST' })
                    : dispatch({ type: 'OPEN_CITY_SELECT' })
                }
              >
                {isFinalLocation ? 'Make the Arrest →' : 'Track Next Location →'}
              </button>
            ) : (
              <div className="text-center font-mono text-xs text-[var(--color-game-muted)] animate-pulse">
                Gathering intelligence…
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
