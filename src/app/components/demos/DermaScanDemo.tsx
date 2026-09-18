import { Camera, CheckCircle2, ScanLine, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

export function DermaScanDemo() {
  const [isAnalyzed, setIsAnalyzed] = useState(false);

  function analyze() {
    setIsAnalyzed(true);
  }

  return (
    <div className="rounded-3xl border border-[#006b70] bg-white p-5 sm:p-6">
      <div className="grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-center">
        <section className="relative mx-auto flex aspect-square w-full max-w-56 items-center justify-center overflow-hidden rounded-[2rem] bg-[#006b70] p-4 shadow-xl">
          <div className="absolute inset-4 rounded-[1.45rem] border border-white/50" />
          <div className="absolute left-4 top-4 h-6 w-6 border-l-2 border-t-2 border-white" />
          <div className="absolute bottom-4 right-4 h-6 w-6 border-b-2 border-r-2 border-white" />
          <div className="relative flex size-24 items-center justify-center rounded-full bg-white shadow-inner">
            <Camera size={33} className="text-[#006b70]" aria-hidden="true" />
          </div>
          {isAnalyzed && <ScanLine size={180} className="absolute text-white/70" aria-hidden="true" />}
          <span className="absolute bottom-7 rounded-full bg-white px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-[#006b70]">{isAnalyzed ? 'Analysis ready' : 'Sample image'}</span>
        </section>

        <section>
          <div className="flex items-center gap-2 text-sm font-semibold text-[#006b70]"><ShieldCheck size={18} aria-hidden="true" /> Secure skin journal</div>
          <h4 className="mt-2 text-2xl font-semibold tracking-tight text-[#006b70]">Check in with your skin.</h4>
          <p className="mt-2 text-sm leading-relaxed text-[#006b70]">Run this local demo analysis on the sample image.</p>

          {!isAnalyzed ? (
            <button type="button" onClick={analyze} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#006b70] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#00565a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006b70]">
              <ScanLine size={17} aria-hidden="true" /> Analyze sample photo
            </button>
          ) : (
            <div className="mt-5 rounded-2xl border border-[#006b70] bg-white p-4" role="status">
              <div className="flex items-start gap-3"><CheckCircle2 size={19} className="mt-0.5 shrink-0 text-[#006b70]" aria-hidden="true" /><div><p className="text-sm font-semibold text-[#006b70]">Scan complete</p><p className="mt-1 text-sm leading-relaxed text-[#006b70]">Your sample entry is saved with a “monitor” note for your personal skin journal.</p></div></div>
            </div>
          )}
        </section>
      </div>
      <p className="mt-5 border-t border-[#006b70] pt-3 text-xs leading-relaxed text-[#006b70]">Demo only — this is not a medical assessment or diagnosis. For a skin concern, consult a qualified clinician.</p>
    </div>
  );
}
