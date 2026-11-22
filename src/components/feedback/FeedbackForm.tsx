import { useId, useRef, useState } from "react";
import type { FormEvent } from "react";
import { buildings } from "../../data/buildings";
import CampusPinPicker from "./CampusPinPicker";
import type { FeedbackPin } from "./CampusPinPicker";

const categories = [
  ["missing_place", "Missing place or room"],
  ["incorrect_location", "Incorrect map location"],
  ["incorrect_info", "Incorrect building information"],
  ["routing_error", "Walking directions"],
  ["accessibility", "Accessibility issue"],
  ["bug", "App bug"],
  ["feature_request", "Feature request"],
  ["feedback", "General feedback"],
] as const;
const mapCategories = new Set<string>(categories.slice(0, 5).map(([value]) => value));
const places = [...buildings].sort((a, b) => a.name.localeCompare(b.name));
const field = "w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-base text-slate-900 focus-visible:outline-2 focus-visible:outline-[#22B8CF] disabled:opacity-70 sm:text-sm dark:border-outline-variant dark:bg-surface-container-high dark:text-on-surface";
const label = "block text-sm font-semibold text-slate-700 dark:text-on-surface";

export default function FeedbackForm({ onDone }: { onDone?: () => void }) {
  const id = useId();
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [buildingId, setBuildingId] = useState("");
  const [pin, setPin] = useState<FeedbackPin | null>(null);
  const [showPin, setShowPin] = useState(false);
  const [sending, setSending] = useState(false);
  const [received, setReceived] = useState(false);
  const [error, setError] = useState("");
  const inFlight = useRef(false);
  const lastRequest = useRef<{ signature: string; id: string } | null>(null);
  const mapCategory = mapCategories.has(category);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inFlight.current || received) return;
    const draft = {
      category,
      message: message.trim(),
      ...(email.trim() ? { email: email.trim() } : {}),
      ...(mapCategory && buildingId ? { buildingId } : {}),
      ...(mapCategory && pin ? { pin } : {}),
    };
    if (!category || !draft.message) {
      setError("Choose a category and describe what happened.");
      return;
    }

    inFlight.current = true;
    setSending(true);
    setError("");
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);
    try {
      const signature = JSON.stringify(draft);
      if (lastRequest.current?.signature !== signature) {
        lastRequest.current = { signature, id: crypto.randomUUID() };
      }
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...draft, requestId: lastRequest.current.id }),
        signal: controller.signal,
      });
      if (response.status === 429) {
        setError("Too many reports from this connection. Your draft is still here. Wait a little before trying again.");
        return;
      }
      const result: unknown = await response.json().catch(() => null);
      if (response.status === 503 && result && typeof result === "object" &&
          "error" in result && result.error === "feedback_disabled") {
        setError("Feedback is turned off in this preview. Nothing was sent, and your draft is still here.");
        return;
      }
      if (!response.ok || !result || typeof result !== "object" || !("ok" in result) || result.ok !== true) {
        throw new Error("Report was not accepted");
      }
      lastRequest.current = null;
      setReceived(true);
      setMessage("");
      setEmail("");
      setCategory("");
      setBuildingId("");
      setPin(null);
      setShowPin(false);
    } catch {
      setError("We couldn’t confirm your feedback was sent. Your draft is still here. Try again in a moment.");
    } finally {
      window.clearTimeout(timeout);
      inFlight.current = false;
      setSending(false);
    }
  }

  if (received) {
    return (
      <div className="space-y-4 py-8 text-center">
        <p role="status" tabIndex={-1} ref={node => { node?.focus(); }} className="text-lg font-bold text-slate-900 dark:text-on-surface">Report received</p>
        <p className="text-sm text-slate-600 dark:text-on-surface-variant">Thanks. The Campus Compass team can now review your report privately.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <button type="button" className="rounded text-sm font-semibold text-slate-700 underline focus-visible:outline-2 dark:text-on-surface"
            onClick={() => setReceived(false)}>Send another report</button>
          {onDone && <button type="button" className="rounded text-sm font-semibold text-slate-700 underline focus-visible:outline-2 dark:text-on-surface"
            onClick={onDone}>Done</button>}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4" aria-busy={sending}>
      <fieldset disabled={sending} className="min-w-0 space-y-4">
        <div className="space-y-1.5">
          <label className={label} htmlFor={id + "-category"}>Category</label>
          <select className={field} id={id + "-category"} required value={category}
            onChange={e => {
              const next = e.target.value;
              setCategory(next);
              if (!mapCategories.has(next)) {
                setBuildingId("");
                setPin(null);
                setShowPin(false);
              }
            }}>
            <option value="" disabled>Choose a category</option>
            {categories.map(([value, name]) => <option key={value} value={value}>{name}</option>)}
          </select>
        </div>
        <div className="space-y-1.5">
          <label className={label} htmlFor={id + "-message"}>Description</label>
          <textarea className={field} id={id + "-message"} required maxLength={2000} rows={4} value={message}
            placeholder="What happened, and what should be different?" onChange={e => setMessage(e.target.value)} />
        </div>
        {mapCategory && (
          <div className="space-y-2">
            <label className={label} htmlFor={id + "-building"}>Building or landmark <span className="font-normal">(optional)</span></label>
            <select className={field} id={id + "-building"} value={buildingId} onChange={e => setBuildingId(e.target.value)}>
              <option value="">Not selected</option>
              {places.map(place => <option key={place.id} value={place.id}>{place.name}</option>)}
            </select>
            <button type="button" aria-expanded={showPin} aria-controls={id + "-pin"} onClick={() => setShowPin(!showPin)}
              className="rounded text-sm font-semibold text-slate-700 underline focus-visible:outline-2 dark:text-on-surface">
              {showPin ? "Hide pin picker" : pin ? "Show attached pin" : "Drop a pin (optional)"}
            </button>
            <div id={id + "-pin"} hidden={!showPin}>
              {showPin && <CampusPinPicker pin={pin} onChange={setPin} buildingId={buildingId} />}
            </div>
          </div>
        )}
        <div className="space-y-1.5">
          <label className={label} htmlFor={id + "-email"}>Email for follow-up <span className="font-normal">(optional)</span></label>
          <input className={field} id={id + "-email"} type="email" autoComplete="email" maxLength={254} value={email}
            aria-describedby={id + "-privacy"} onChange={e => setEmail(e.target.value)} />
          <p className="text-xs text-slate-600 dark:text-on-surface-variant" id={id + "-privacy"}>
            Your report and email go to the Campus Compass team, not to public GitHub.
          </p>
        </div>
        {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/60 dark:text-red-200">{error}</p>}
        <button type="submit" className="w-full rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white transition enabled:hover:bg-slate-700 disabled:cursor-wait disabled:opacity-70 dark:bg-primary dark:text-on-primary dark:enabled:hover:bg-primary/80">
          {sending ? "Sending…" : "Send report"}
        </button>
      </fieldset>
    </form>
  );
}
