import FeedbackForm from "../components/feedback/FeedbackForm";

export default function ReportIssue() {
  return (
    <div className="h-full w-full page-blobs text-slate-900 dark:text-on-surface p-6 md:p-12 overflow-y-auto">
      <div className="max-w-2xl mx-auto pb-8 animate-fade-in">
        <div className="text-center mb-8">
          <span className="text-[#22B8CF] dark:text-primary font-label-md text-label-md bg-[#EAFBFC] dark:bg-primary/10 px-3 py-1 rounded-full border border-[#B7E9ED] dark:border-primary/20">
            Support Desk
          </span>
          <h2 className="font-headline-lg text-headline-lg font-bold text-slate-900 dark:text-on-surface mt-4 tracking-tight">
            Report an Issue
          </h2>
          <p className="font-body-md text-sm text-slate-600 dark:text-on-surface-variant mt-2">
            Found a bug or encountered a map glitch? Let us know so we can fix it.
          </p>
        </div>

        <div className="bg-white dark:bg-surface-container-lowest/80 backdrop-blur-md border border-slate-200 dark:border-outline-variant/30 rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden">
          <FeedbackForm />
        </div>
      </div>
    </div>
  );
}
