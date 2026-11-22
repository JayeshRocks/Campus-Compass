import { useEffect, useId, useRef } from "react";
import FeedbackForm from "../feedback/FeedbackForm";

export default function ReportIssueForm({ onClose }: { onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const title = useId();
  useEffect(() => {
    const el = dialog.current;
    if (el && !el.open) el.showModal();
    return () => { if (el?.open) el.close(); };
  }, []);
  return (
    <dialog ref={dialog} aria-labelledby={title}
      onCancel={e => { e.preventDefault(); onClose(); }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      className="fixed inset-0 m-auto max-h-[calc(100dvh_-_2rem)] w-[calc(100%_-_2rem)] max-w-4xl overflow-y-auto rounded-3xl bg-transparent p-0 backdrop:bg-slate-900/50 backdrop:backdrop-blur-sm">
      <div className="liquid-glass relative flex flex-col rounded-3xl bg-white text-slate-900 dark:bg-surface-container-lowest dark:text-on-surface md:flex-row">
        <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-[#22B8CF]/10 blur-[70px]" />
        <button type="button" onClick={onClose} aria-label="Close feedback dialog"
          className="absolute right-4 top-4 z-10 rounded-full bg-white p-2 leading-none text-slate-700 focus-visible:outline-2 enabled:hover:bg-slate-100 dark:bg-surface-container-high dark:text-on-surface dark:enabled:hover:bg-surface-container-highest">
          <span className="material-symbols-outlined text-[22px]" aria-hidden="true">close</span>
        </button>
        <div className="relative z-[1] flex flex-col justify-center bg-slate-50/50 p-6 pr-14 dark:bg-transparent md:w-2/5 md:p-8">
          <h2 id={title} className="font-headline-lg text-2xl font-bold">Help Us Improve</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-on-surface-variant">
            Found a missing shortcut or a map error? Send it privately to the Campus Compass team.
          </p>
          <a href="https://github.com/JayeshRocks/Campus-Compass" target="_blank" rel="noopener noreferrer"
            className="mt-4 w-fit rounded-lg text-sm font-semibold text-slate-700 underline focus-visible:outline-2 dark:text-on-surface">
            GitHub repository
          </a>
        </div>
        <div className="relative z-[1] border-t border-slate-200 p-6 dark:border-outline-variant/20 md:w-3/5 md:border-l md:border-t-0 md:p-8 md:pt-16">
          <FeedbackForm onDone={onClose} />
        </div>
      </div>
    </dialog>
  );
}
