import { Bath, Candy, Gamepad2, Heart } from 'lucide-react';
import { useState } from 'react';

type CareStat = 'hunger' | 'cleanliness' | 'joy';

const statMeta: Record<CareStat, { label: string; color: string }> = {
  hunger: { label: 'Fullness', color: 'bg-orange-400' },
  cleanliness: { label: 'Cleanliness', color: 'bg-sky-400' },
  joy: { label: 'Joy', color: 'bg-fuchsia-400' },
};

export function PetPalDemo() {
  const [stats, setStats] = useState<Record<CareStat, number>>({ hunger: 48, cleanliness: 68, joy: 55 });
  const [message, setMessage] = useState('Mochi is waiting for some attention.');

  function careFor(stat: CareStat, action: string) {
    setStats((current) => ({ ...current, [stat]: Math.min(100, current[stat] + 22) }));
    setMessage(`Mochi loved the ${action.toLowerCase()}!`);
  }

  return (
    <div className="overflow-hidden rounded-3xl border-4 border-neutral-900 bg-[#fff5d9] p-4 shadow-[6px_6px_0_#171717] sm:p-6">
      <div className="flex items-center justify-between border-b-2 border-dashed border-amber-300 pb-3 font-mono text-xs uppercase tracking-wider text-amber-900">
        <span>PetPal</span>
        <span>Day 12 · 08:42</span>
      </div>

      <div className="grid gap-5 pt-5 md:grid-cols-[0.9fr_1.1fr] md:items-center">
        <section className="relative flex min-h-48 items-center justify-center overflow-hidden rounded-2xl bg-[#b7e6f2]" aria-label="Mochi the virtual pet">
          <div className="absolute inset-x-0 bottom-0 h-12 bg-[#83c866]" />
          <div className="relative text-center">
            <div className="text-7xl leading-none [image-rendering:pixelated]" aria-hidden="true">🐱</div>
            <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-white/80 px-3 py-1 font-mono text-xs text-neutral-800"><Heart size={13} className="fill-rose-500 text-rose-500" aria-hidden="true" /> Mochi</div>
          </div>
        </section>

        <section>
          <p className="mb-4 rounded-xl bg-white px-3 py-2 text-sm text-neutral-700 shadow-sm" role="status">{message}</p>
          <div className="space-y-3">
            {(Object.keys(statMeta) as CareStat[]).map((stat) => (
              <div key={stat}>
                <div className="mb-1 flex justify-between font-mono text-xs text-neutral-600"><span>{statMeta[stat].label}</span><span>{stats[stat]}%</span></div>
                <div className="h-3 overflow-hidden rounded-full border-2 border-neutral-900 bg-white">
                  <div className={`h-full ${statMeta[stat].color} transition-all duration-300`} style={{ width: `${stats[stat]}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2">
            <CareButton icon={<Candy size={18} />} label="Feed" onClick={() => careFor('hunger', 'snack')} />
            <CareButton icon={<Bath size={18} />} label="Groom" onClick={() => careFor('cleanliness', 'groom')} />
            <CareButton icon={<Gamepad2 size={18} />} label="Play" onClick={() => careFor('joy', 'game')} />
          </div>
        </section>
      </div>
    </div>
  );
}

type CareButtonProps = {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
};

function CareButton({ icon, label, onClick }: CareButtonProps) {
  return (
    <button type="button" onClick={onClick} className="flex flex-col items-center gap-1 rounded-xl border-2 border-neutral-900 bg-white px-2 py-3 font-mono text-xs font-bold text-neutral-800 shadow-[3px_3px_0_#171717] transition-transform hover:-translate-y-0.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0_#171717] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900">
      {icon}
      {label}
    </button>
  );
}
