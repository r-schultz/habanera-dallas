'use client';

import Link from 'next/link';

export default function TitleScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-game-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-game-border) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Red accent top bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--color-game-red)]" />

      <div className="relative z-10 text-center max-w-2xl fade-in">
        <p className="text-[var(--color-game-muted)] font-mono text-sm tracking-[0.3em] uppercase mb-4">
          International Bureau of Investigation
        </p>

        <h1
          className="text-6xl md:text-8xl font-black tracking-tight mb-2 leading-none"
          style={{ color: 'var(--color-game-red)', textShadow: '0 0 60px rgba(196,30,58,0.3)' }}
        >
          HABANERA
        </h1>
        <h2
          className="text-4xl md:text-6xl font-black tracking-tight mb-8 leading-none"
          style={{ color: 'var(--color-game-gold)' }}
        >
          DALLAS
        </h2>

        <p className="text-[var(--color-game-muted)] text-lg mb-2 max-w-md mx-auto leading-relaxed">
          Track international thieves across history. Follow the clues. Learn the world.
        </p>
        <p className="text-[var(--color-game-muted)] font-mono text-xs mb-12 tracking-wider">
          Do you have what it takes to catch them?
        </p>

        <Link href="/game">
          <button className="btn-primary text-base px-12 py-4 text-lg">
            New Investigation
          </button>
        </Link>

        <div className="mt-16 grid grid-cols-3 gap-6 text-center">
          {[
            { icon: '🌍', label: 'Real geography' },
            { icon: '📜', label: 'True history' },
            { icon: '📸', label: 'Real-world photos' },
          ].map(({ icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <span className="text-2xl">{icon}</span>
              <span className="text-[var(--color-game-muted)] font-mono text-xs uppercase tracking-wider">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-6 text-[var(--color-game-muted)] font-mono text-xs tracking-wider">
        PRESS START — AGENT RECRUITMENT OPEN
      </div>
    </div>
  );
}
