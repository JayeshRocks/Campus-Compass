import FeedbackForm from "../components/feedback/FeedbackForm";

export default function ReportIssue() {
  return (
    <div className="page-blobs h-full w-full overflow-y-auto overscroll-contain scroll-pb-28 scroll-pt-20 [background-attachment:scroll]! px-4 pt-20 text-slate-900 dark:text-on-surface sm:px-6 md:px-12 md:pt-24">
      <div className="mx-auto max-w-2xl pb-[calc(6.5rem_+_env(safe-area-inset-bottom))]">
        <div className="mb-5 text-center md:mb-8">
          <span className="rounded-full border border-[#B7E9ED] bg-[#EAFBFC] px-3 py-1 font-label-md text-label-md text-[#087B8E] dark:border-primary/20 dark:bg-primary/10 dark:text-primary">
            Support Desk
          </span>
          <h2 className="mt-3 font-headline-lg text-2xl font-bold tracking-tight md:mt-4 md:text-headline-lg">
            Report an Issue
          </h2>
          <p className="mt-2 font-body-md text-sm text-slate-600 dark:text-on-surface-variant">
            Found a bug or encountered a map glitch? Let us know so we can fix it.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-lg dark:border-outline-variant/30 dark:bg-surface-container-lowest md:p-8">
          <FeedbackForm />
        </div>
      </div>
    </div>
  );
}
