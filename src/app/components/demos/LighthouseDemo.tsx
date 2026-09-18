import { ArrowLeft, ArrowRight, Compass, Eye, Footprints, MapPinned } from 'lucide-react';
import { useState } from 'react';

const islandLocations = [
  {
    name: 'Driftwood Shore',
    marker: '⚓',
    position: 'left-[13%] top-[62%]',
    description: 'Salt-worn boats and a trail leading inland greet every new arrival.',
    discovery: 'Found: the keeper’s torn map',
  },
  {
    name: 'Whispering Grove',
    marker: '♣',
    position: 'left-[36%] top-[28%]',
    description: 'Wind carries old voices between the pines. Something is hidden beneath the roots.',
    discovery: 'Found: a weathered signal charm',
  },
  {
    name: 'Lighthouse Rise',
    marker: '♜',
    position: 'left-[64%] top-[20%]',
    description: 'The island’s beacon watches the horizon from the highest ridge.',
    discovery: 'Found: a lens-room journal entry',
  },
  {
    name: 'Tideglass Cliffs',
    marker: '◇',
    position: 'left-[70%] top-[64%]',
    description: 'A narrow path follows the cliffs, where sea glass glows at sundown.',
    discovery: 'Found: a faded constellation sketch',
  },
];

export function LighthouseDemo() {
  const [locationIndex, setLocationIndex] = useState(0);
  const [visited, setVisited] = useState<number[]>([0]);
  const location = islandLocations[locationIndex];

  function walk(direction: 1 | -1) {
    const nextIndex = (locationIndex + direction + islandLocations.length) % islandLocations.length;
    setLocationIndex(nextIndex);
    setVisited((current) => current.includes(nextIndex) ? current : [...current, nextIndex]);
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-[#2c5075] bg-[#09162b] text-[#e8efff] shadow-2xl">
      <header className="flex items-start justify-between gap-4 border-b border-sky-200/15 bg-[#102745] px-5 py-4 sm:px-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-sky-200">3D island explorer</p>
          <h4 className="mt-1 text-xl font-semibold">Beacon Isle</h4>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-sky-100/10 px-3 py-1.5 text-xs font-medium text-sky-100"><Eye size={15} aria-hidden="true" /> {visited.length}/{islandLocations.length} landmarks found</div>
      </header>

      <div className="grid gap-5 p-5 sm:p-6 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <section className="relative mx-auto aspect-[1.3/1] w-full max-w-md overflow-hidden rounded-2xl border border-sky-100/20 bg-[radial-gradient(ellipse_at_center,#70b86b_0%,#487f59_35%,#1f526d_36%,#102d4b_72%)] shadow-inner" aria-label="Beacon Isle exploration map">
          <div className="absolute inset-[17%_13%] rotate-[-8deg] rounded-[48%] border border-lime-100/20 bg-[#5da363]/55 shadow-[inset_0_0_45px_rgba(16,69,55,0.8)]" aria-hidden="true" />
          <div className="absolute left-[20%] top-[45%] h-[1px] w-[57%] rotate-[-26deg] bg-amber-100/50" aria-hidden="true" />
          <div className="absolute left-[43%] top-[35%] h-[1px] w-[31%] rotate-[54deg] bg-amber-100/50" aria-hidden="true" />
          {islandLocations.map((islandLocation, index) => {
            const active = index === locationIndex;
            const wasVisited = visited.includes(index);
            return (
              <div key={islandLocation.name} className={`absolute ${islandLocation.position} z-10 -translate-x-1/2 -translate-y-1/2 text-center`}>
                <div className={`mx-auto flex size-9 items-center justify-center rounded-full border text-lg shadow-lg transition-all ${active ? 'scale-125 border-[#fff2af] bg-[#f8e7a0] text-[#173551] ring-4 ring-[#f8e7a0]/25' : wasVisited ? 'border-sky-100/60 bg-[#254d64] text-sky-100' : 'border-white/25 bg-[#16344d] text-sky-100/60'}`}>{islandLocation.marker}</div>
                <span className="mt-1 block whitespace-nowrap text-[10px] font-medium text-white drop-shadow-md">{islandLocation.name}</span>
              </div>
            );
          })}
          <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-lg bg-[#071827]/75 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-sky-100"><MapPinned size={12} aria-hidden="true" /> Island map</div>
        </section>

        <section>
          <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-[#f8e7a0]"><Compass size={16} aria-hidden="true" /> Current location</p>
          <h4 className="mt-2 text-2xl font-semibold tracking-tight text-white">{location.name}</h4>
          <p className="mt-3 text-sm leading-relaxed text-sky-100">{location.description}</p>
          <div className="mt-4 rounded-xl border border-sky-100/15 bg-white/5 p-3"><p className="text-xs uppercase tracking-[0.16em] text-sky-200">Exploration log</p><p className="mt-1 text-sm text-white">{location.discovery}</p></div>

          <div className="mt-5 flex gap-3">
            <button type="button" onClick={() => walk(-1)} className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-sky-100/25 px-3 py-2.5 text-sm font-semibold text-sky-50 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f8e7a0]"><ArrowLeft size={17} aria-hidden="true" /> Walk back</button>
            <button type="button" onClick={() => walk(1)} className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#f8e7a0] px-3 py-2.5 text-sm font-bold text-[#132745] transition-colors hover:bg-[#fff0b4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f8e7a0]"><Footprints size={17} aria-hidden="true" /> Explore onward <ArrowRight size={17} aria-hidden="true" /></button>
          </div>
        </section>
      </div>
    </div>
  );
}
