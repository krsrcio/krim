import { Check, Clipboard, Minus, Plus, ShoppingBasket } from 'lucide-react';
import { FormEvent, useState } from 'react';

const starterItems = ['Rice', 'Fresh milk', 'Eggs'];

export function BaskitDemo() {
  const [items, setItems] = useState(starterItems);
  const [newItem, setNewItem] = useState('');
  const [pickupCode, setPickupCode] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  function addItem(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const item = newItem.trim();

    if (!item) return;

    setItems((currentItems) => [...currentItems, item]);
    setNewItem('');
    setPickupCode(null);
  }

  function removeItem(index: number) {
    setItems((currentItems) => currentItems.filter((_, itemIndex) => itemIndex !== index));
    setPickupCode(null);
  }

  function generateCode() {
    if (items.length > 0) {
      setPickupCode(`BSK-${String(items.length * 73 + 214).slice(-3)}`);
      setIsCopied(false);
    }
  }

  async function copyPickupCode() {
    if (!pickupCode) return;

    try {
      await navigator.clipboard.writeText(pickupCode);
      setIsCopied(true);
    } catch {
      setIsCopied(false);
    }
  }

  return (
    <div className="grid gap-5 md:grid-cols-[1.08fr_0.92fr]">
      <section className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-600 text-white">
            <ShoppingBasket size={21} aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-semibold text-emerald-950">Today’s grocery list</p>
            <p className="text-xs text-emerald-700">{items.length} item{items.length === 1 ? '' : 's'} ready for pickup</p>
          </div>
        </div>

        <ul className="space-y-2" aria-label="Grocery list">
          {items.map((item, index) => (
            <li key={`${item}-${index}`} className="flex items-center justify-between gap-3 rounded-xl bg-white px-3 py-2.5 shadow-sm">
              <span className="flex min-w-0 items-center gap-2 text-sm text-neutral-800">
                <Check size={16} className="shrink-0 text-emerald-600" aria-hidden="true" />
                <span className="truncate">{item}</span>
              </span>
              <button
                type="button"
                onClick={() => removeItem(index)}
                aria-label={`Remove ${item}`}
                className="rounded-lg p-1 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
              >
                <Minus size={16} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>

        <form onSubmit={addItem} className="mt-4 flex gap-2">
          <label className="sr-only" htmlFor="grocery-item">Add a grocery item</label>
          <input
            id="grocery-item"
            value={newItem}
            onChange={(event) => setNewItem(event.target.value)}
            placeholder="Add an item"
            className="min-w-0 flex-1 rounded-xl border border-emerald-200 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-emerald-600 focus:outline-none"
          />
          <button type="submit" className="inline-flex items-center gap-1 rounded-xl bg-emerald-700 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700">
            <Plus size={16} aria-hidden="true" />
            Add
          </button>
        </form>
      </section>

      <section className="flex flex-col rounded-2xl bg-neutral-950 p-5 text-white">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-300">Branch pickup</p>
        <h4 className="mt-2 text-xl font-semibold">Tagabili, Quezon City</h4>
        <p className="mt-2 text-sm leading-relaxed text-neutral-300">Share one code with the shopper when your basket is ready.</p>

        <div className="mt-auto pt-6">
          {pickupCode ? (
            <div className="rounded-2xl border border-emerald-400/30 bg-white/10 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-emerald-200">Your pickup code</p>
              <div className="mt-2 flex items-center justify-between gap-3">
                <strong className="font-mono text-2xl tracking-[0.16em]">{pickupCode}</strong>
                <button
                  type="button"
                  onClick={() => void copyPickupCode()}
                  className="rounded-lg p-2 text-emerald-100 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
                  aria-label="Copy pickup code"
                >
                  {isCopied ? <Check size={18} aria-hidden="true" /> : <Clipboard size={18} aria-hidden="true" />}
                </button>
              </div>
              <p className="mt-2 text-xs text-emerald-100">{isCopied ? 'Code copied for your shopper.' : 'Valid for your selected branch today.'}</p>
            </div>
          ) : (
            <button
              type="button"
              onClick={generateCode}
              disabled={items.length === 0}
              className="w-full rounded-xl bg-emerald-400 px-4 py-3 text-sm font-bold text-emerald-950 transition-colors hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
            >
              Generate pickup code
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
