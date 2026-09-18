import { BellRing, Check, ClipboardList, Clock3, PackageCheck, Pill, Stethoscope, UserRound } from 'lucide-react';
import { useMemo, useState } from 'react';

type Medication = {
  id: string;
  name: string;
  dose: string;
  time: string;
  taken: boolean;
};

type DashboardView = 'patient' | 'physician' | 'pharmacist';

const initialMedications: Medication[] = [
  { id: 'vitamin-d', name: 'Vitamin D', dose: '1 capsule · 1,000 IU', time: '08:00 AM', taken: true },
  { id: 'metformin', name: 'Metformin', dose: '1 tablet · 500 mg', time: '12:30 PM', taken: false },
  { id: 'magnesium', name: 'Magnesium', dose: '1 tablet · 250 mg', time: '08:00 PM', taken: false },
];

export function RxGuardDemo() {
  const [view, setView] = useState<DashboardView>('patient');

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-[#f7faff] shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-200 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#173d77]">RxGuard</p><p className="mt-0.5 text-sm text-slate-500">Choose a view</p></div>
        <div className="flex rounded-xl bg-slate-100 p-1" role="tablist" aria-label="RxGuard user views">
          <ViewButton active={view === 'patient'} onClick={() => setView('patient')} label="Patient" icon={<UserRound size={15} aria-hidden="true" />} />
          <ViewButton active={view === 'physician'} onClick={() => setView('physician')} label="Physician" icon={<Stethoscope size={15} aria-hidden="true" />} />
          <ViewButton active={view === 'pharmacist'} onClick={() => setView('pharmacist')} label="Pharmacist" icon={<PackageCheck size={15} aria-hidden="true" />} />
        </div>
      </div>
      {view === 'patient' && <PatientView />}
      {view === 'physician' && <PhysicianView />}
      {view === 'pharmacist' && <PharmacistView />}
    </div>
  );
}

type ViewButtonProps = {
  active: boolean;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
};

function ViewButton({ active, label, icon, onClick }: ViewButtonProps) {
  return <button type="button" role="tab" aria-selected={active} onClick={onClick} className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173d77] ${active ? 'bg-white text-[#173d77] shadow-sm' : 'text-slate-500 hover:text-[#173d77]'}`}>{icon}{label}</button>;
}

function PatientView() {
  const [medications, setMedications] = useState(initialMedications);
  const adherence = useMemo(() => Math.round((medications.filter((medication) => medication.taken).length / medications.length) * 100), [medications]);

  function toggleMedication(id: string) {
    setMedications((current) => current.map((medication) => medication.id === id ? { ...medication, taken: !medication.taken } : medication));
  }

  return (
    <div>
      <div className="bg-[#173d77] px-5 py-5 text-white sm:px-6">
        <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-medium uppercase tracking-[0.2em] text-sky-200">Patient view</p><h4 className="mt-1 text-xl font-semibold">Tuesday, September 1</h4></div><div className="flex size-10 items-center justify-center rounded-xl bg-white/10"><BellRing size={20} aria-hidden="true" /></div></div>
        <div className="mt-5 flex items-end gap-4"><p className="text-4xl font-bold">{adherence}%</p><p className="pb-1 text-sm text-sky-100">today&apos;s schedule complete</p></div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/20"><div className="h-full rounded-full bg-[#7de1c3] transition-all duration-300" style={{ width: `${adherence}%` }} /></div>
      </div>

      <section className="p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between"><h4 className="font-semibold text-slate-900">Today&apos;s reminders</h4><span className="text-xs text-slate-500">Tap to check off</span></div>
        <ul className="space-y-3" aria-label="Medication schedule">
          {medications.map((medication) => <li key={medication.id} className={`flex items-center gap-3 rounded-2xl border p-3 transition-colors ${medication.taken ? 'border-emerald-100 bg-emerald-50/70' : 'border-slate-200 bg-white'}`}><div className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${medication.taken ? 'bg-emerald-600 text-white' : 'bg-sky-100 text-[#173d77]'}`}><Pill size={19} aria-hidden="true" /></div><div className="min-w-0 flex-1"><p className={`text-sm font-semibold ${medication.taken ? 'text-emerald-950 line-through decoration-emerald-500/50' : 'text-slate-900'}`}>{medication.name}</p><p className="mt-0.5 text-xs text-slate-500">{medication.dose}</p><p className="mt-1 flex items-center gap-1 text-xs font-medium text-slate-600"><Clock3 size={13} aria-hidden="true" /> {medication.time}</p></div><button type="button" aria-pressed={medication.taken} onClick={() => toggleMedication(medication.id)} className={`flex size-9 shrink-0 items-center justify-center rounded-full border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173d77] ${medication.taken ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300 bg-white text-transparent hover:border-[#173d77]'}`}><Check size={17} aria-hidden="true" /><span className="sr-only">{medication.taken ? `Mark ${medication.name} as not taken` : `Mark ${medication.name} as taken`}</span></button></li>)}
        </ul>
      </section>
    </div>
  );
}

const patientRecords = [
  { id: 'maria', name: 'Maria Santos', medication: 'Metformin', adherence: '67%', note: 'Missed 2 recent doses' },
  { id: 'james', name: 'James Reyes', medication: 'Lisinopril', adherence: '92%', note: 'No follow-up needed' },
];

function PhysicianView() {
  const [reviewed, setReviewed] = useState<string[]>([]);

  function reviewPatient(id: string) {
    setReviewed((current) => current.includes(id) ? current.filter((patientId) => patientId !== id) : [...current, id]);
  }

  return (
    <div>
      <div className="bg-[#173d77] px-5 py-5 text-white sm:px-6"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-medium uppercase tracking-[0.2em] text-sky-200">Physician workspace</p><h4 className="mt-1 text-xl font-semibold">Patient adherence</h4></div><div className="rounded-xl bg-white/10 px-3 py-2 text-sm font-semibold">2 patients</div></div><p className="mt-4 text-sm text-sky-100">Review patients who may need a follow-up.</p></div>
      <section className="p-5 sm:p-6"><div className="mb-4 flex items-center justify-between"><h4 className="font-semibold text-slate-900">Patient overview</h4><ClipboardList size={18} className="text-[#173d77]" aria-hidden="true" /></div><ul className="space-y-3">{patientRecords.map((patient) => { const isReviewed = reviewed.includes(patient.id); return <li key={patient.id} className={`flex flex-wrap items-center gap-3 rounded-2xl border p-3 ${isReviewed ? 'border-emerald-200 bg-emerald-50/60' : 'border-slate-200 bg-white'}`}><div className="flex size-10 items-center justify-center rounded-full bg-sky-100 text-sm font-bold text-[#173d77]">{patient.name.split(' ').map((part) => part[0]).join('')}</div><div className="min-w-36 flex-1"><p className="text-sm font-semibold text-slate-900">{patient.name}</p><p className="mt-0.5 text-xs text-slate-500">{patient.medication} · {patient.adherence} adherence</p><p className="mt-1 text-xs text-slate-600">{patient.note}</p></div><button type="button" onClick={() => reviewPatient(patient.id)} className={`rounded-lg px-3 py-2 text-xs font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173d77] ${isReviewed ? 'bg-emerald-600 text-white' : 'border border-[#173d77] text-[#173d77]'}`}>{isReviewed ? 'Reviewed' : 'Review'}</button></li>; })}</ul></section>
    </div>
  );
}

const prescriptions = [
  { id: 'metformin', name: 'Metformin', patient: 'Maria Santos', dose: '500 mg · 30 tablets' },
  { id: 'lisinopril', name: 'Lisinopril', patient: 'James Reyes', dose: '10 mg · 30 tablets' },
];

function PharmacistView() {
  const [prepared, setPrepared] = useState<string[]>([]);

  function preparePrescription(id: string) {
    setPrepared((current) => current.includes(id) ? current.filter((prescriptionId) => prescriptionId !== id) : [...current, id]);
  }

  return (
    <div>
      <div className="bg-[#173d77] px-5 py-5 text-white sm:px-6"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-medium uppercase tracking-[0.2em] text-sky-200">Pharmacist workspace</p><h4 className="mt-1 text-xl font-semibold">Prescription queue</h4></div><PackageCheck size={25} className="text-sky-100" aria-hidden="true" /></div><p className="mt-4 text-sm text-sky-100">Prepare and keep track of prescriptions ready for collection.</p></div>
      <section className="p-5 sm:p-6"><div className="mb-4 flex items-center justify-between"><h4 className="font-semibold text-slate-900">Needs preparation</h4><span className="text-xs text-slate-500">{prescriptions.length - prepared.length} remaining</span></div><ul className="space-y-3">{prescriptions.map((prescription) => { const isPrepared = prepared.includes(prescription.id); return <li key={prescription.id} className={`flex flex-wrap items-center gap-3 rounded-2xl border p-3 ${isPrepared ? 'border-emerald-200 bg-emerald-50/60' : 'border-slate-200 bg-white'}`}><div className={`flex size-10 items-center justify-center rounded-xl ${isPrepared ? 'bg-emerald-600 text-white' : 'bg-sky-100 text-[#173d77]'}`}>{isPrepared ? <Check size={19} aria-hidden="true" /> : <Pill size={19} aria-hidden="true" />}</div><div className="min-w-36 flex-1"><p className="text-sm font-semibold text-slate-900">{prescription.name}</p><p className="mt-0.5 text-xs text-slate-500">{prescription.dose}</p><p className="mt-1 text-xs text-slate-600">For {prescription.patient}</p></div><button type="button" onClick={() => preparePrescription(prescription.id)} className={`rounded-lg px-3 py-2 text-xs font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173d77] ${isPrepared ? 'bg-emerald-600 text-white' : 'bg-[#173d77] text-white'}`}>{isPrepared ? 'Ready' : 'Prepare'}</button></li>; })}</ul></section>
    </div>
  );
}
