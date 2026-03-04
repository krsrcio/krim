import { useEffect, useState } from 'react';

const VISIT_COUNT_KEY = 'krim:visit-count';
const OWNER_MODE_KEY = 'krim:owner-mode';
const OWNER_QUERY_KEY = 'owner';
const OWNER_QUERY_VALUE = 'krist';

export function VisitCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [isOwnerMode, setIsOwnerMode] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ownerQueryValue = params.get(OWNER_QUERY_KEY);

    if (ownerQueryValue === OWNER_QUERY_VALUE) {
      localStorage.setItem(OWNER_MODE_KEY, '1');
      params.delete(OWNER_QUERY_KEY);
      const nextQuery = params.toString();
      const nextUrl = `${window.location.pathname}${nextQuery ? `?${nextQuery}` : ''}${window.location.hash}`;
      window.history.replaceState({}, '', nextUrl);
    }

    if (ownerQueryValue === 'off') {
      localStorage.removeItem(OWNER_MODE_KEY);
      params.delete(OWNER_QUERY_KEY);
      const nextQuery = params.toString();
      const nextUrl = `${window.location.pathname}${nextQuery ? `?${nextQuery}` : ''}${window.location.hash}`;
      window.history.replaceState({}, '', nextUrl);
    }

    const ownerModeEnabled = localStorage.getItem(OWNER_MODE_KEY) === '1';
    setIsOwnerMode(ownerModeEnabled);

    const savedCount = Number(localStorage.getItem(VISIT_COUNT_KEY) ?? '0');
    const nextCount = Number.isFinite(savedCount) ? savedCount + 1 : 1;
    localStorage.setItem(VISIT_COUNT_KEY, String(nextCount));
    setCount(nextCount);
  }, []);

  if (!isOwnerMode || count === null) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 rounded-lg border border-black/10 bg-white/75 px-3 py-2 text-xs uppercase tracking-[0.12em] text-neutral-700 shadow-[0_10px_30px_rgba(0,0,0,0.16)] backdrop-blur-sm">
      Visits: <span className="font-semibold text-black">{count}</span>
    </div>
  );
}

