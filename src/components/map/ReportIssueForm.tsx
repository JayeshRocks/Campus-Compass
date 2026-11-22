import { useEffect, useId, useRef } from "react";
import FeedbackForm from "../feedback/FeedbackForm";

export default function ReportIssueForm({ onClose }: { onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const title = useId();

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (!el.open) el.showModal();

    // Android may resize only the visual viewport when the soft keyboard opens.
    // Size the mobile dialog to that visible area so its contents remain scrollable.
    const viewport = window.visualViewport;
    const syncViewport = () => {
      if (!viewport) return;
      el.style.setProperty("--feedback-visible-height", `${viewport.height}px`);
      el.style.setProperty("--feedback-visible-top", `${viewport.offsetTop}px`);
    };
    syncViewport();
    viewport?.addEventListener("resize", syncViewport);
    viewport?.addEventListener("scroll", syncViewport);
    return () => {
      viewport?.removeEventListener("resize", syncViewport);
      viewport?.removeEventListener("scroll", syncViewport);
      if (el.open) el.close();
    };
  }, []);

  return (
    <dialog ref={dialog} aria-labelledby={title}
      onCancel={e => { e.preventDefault(); onClose(); }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      className="fixed inset-x-0 top-[var(--feedback-visible-top,0px)] m-0 h-[var(--feedback-visible-height,100dvh)] max-h-none w-full max-w-none overflow-hidden border-0 bg-transparent p-0 backdrop:bg-slate-900/60 md:inset-0 md:m-auto md:h-auto md:max-h-[calc(100dvh_-_2rem)] md:w-[calc(100%_-_2rem)] md:max-w-4xl md:overflow-y-auto md:rounded-3xl">
      <div className="flex h-full min-h-0 flex-col bg-white text-slate-900 dark:bg-surface-container-lowest dark:text-on-surface md:relative md:h-auto md:flex-row md:rounded-3xl">
        <div className="relative shrink-0 border-b border-slate-200 bg-white py-3 pl-4 pr-16 pt-[max(0.75rem,env(safe-area-inset-top))] dark:border-outline-variant/20 dark:bg-surface-container-lowest md:flex md:w-2/5 md:flex-col md:justify-center md:rounded-l-3xl md:border-b-0 md:bg-slate-50 md:p-8 md:dark:bg-surface-container-high">
          <h2 id={title} className="font-headline-lg text-xl font-bold md:text-2xl">Help Us Improve</h2>
          <p className="mt-3 hidden text-sm leading-relaxed text-slate-600 dark:text-on-surface-variant md:block">
            Found a missing shortcut or a map error? Send it privately to the Campus Compass team.
          </p>
          <a href="https://github.com/JayeshRocks/Campus-Compass" target="_blank" rel="noopener noreferrer"
            className="mt-4 hidden w-fit rounded-lg text-sm font-semibold text-slate-700 underline focus-visible:outline-2 dark:text-on-surface md:block">
            GitHub repository
          </a>
        </div>
        <button type="button" onClick={onClose} aria-label="Close feedback dialog"
          className="absolute right-2 top-[max(0.25rem,env(safe-area-inset-top))] z-10 flex size-11 items-center justify-center rounded-full bg-white text-slate-700 focus-visible:outline-2 enabled:hover:bg-slate-100 dark:bg-surface-container-high dark:text-on-surface dark:enabled:hover:bg-surface-container-highest md:right-4 md:top-4">
          <span className="material-symbols-outlined text-[22px]" aria-hidden="true">close</span>
        </button>
        <div className="min-h-0 min-w-0 flex-1 overflow-y-auto overscroll-contain px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:w-3/5 md:overflow-visible md:border-l md:border-slate-200 md:p-8 md:pt-16 md:dark:border-outline-variant/20">
          <FeedbackForm onDone={onClose} />
        </div>
      </div>
    </dialog>
  );
}
