import { useEffect, useId, useRef, useState } from "react";
import FeedbackLocationPicker from "../feedback/FeedbackLocationPicker";
import type { FeedbackLocation } from "../feedback/FeedbackLocationPicker";
import { useFeedbackSubmission } from "../../lib/useFeedbackSubmission";

const locationCategories = new Set(["missing_place", "incorrect_location", "incorrect_info", "routing_error", "accessibility"]);

export default function ReportIssueForm({ onClose }: { onClose: () => void }) {
  const { status, errorMessage, submit } = useFeedbackSubmission();
  const formId = useId();
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState<FeedbackLocation>({});
  const showLocation = locationCategories.has(category);
  const closeTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (await submit({
      email: String(formData.get("email") ?? ""),
      category,
      ...(showLocation ? location : {}),
      message: String(formData.get("message") ?? ""),
    })) {
      closeTimer.current = window.setTimeout(onClose, 2000);
    }
  };

  return (
    <div onClick={onClose} className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-sm">
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-4xl max-h-full overflow-x-hidden overflow-y-auto liquid-glass [scrollbar-width:none] [&::-webkit-scrollbar]:hidden rounded-3xl relative animate-fade-in flex flex-col md:flex-row">

        {/* Decorative Background for light/dark */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#22B8CF]/10 blur-[100px] rounded-full -mr-48 -mt-48 pointer-events-none" />

        {/* Global Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 md:top-6 md:right-6 p-2 text-slate-700 hover:text-slate-900 dark:text-on-surface-variant dark:hover:text-white bg-slate-200/40 dark:bg-surface-container-high/30 rounded-full hover:bg-slate-200/80 dark:hover:bg-surface-container-high/70 transition-all z-50 shadow-sm backdrop-blur-sm">
          <span className="material-symbols-outlined text-[22px]">close</span>
        </button>

        <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center relative z-10 bg-slate-50/50 dark:bg-transparent">
          <h2 className="font-headline-lg text-3xl font-bold text-slate-900 dark:text-on-surface mb-4">Help Us Improve</h2>
          <p className="text-body-md text-slate-600 dark:text-on-surface-variant mb-8 leading-relaxed">
            Found a missing shortcut? Noticed a floor plan error? Campus Compass is a community-driven project that thrives on your input. Together, we can build the most accurate map of MIT Bengaluru.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="https://github.com/JayeshRocks/Campus-Compass" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-3 bg-white text-slate-900 border border-slate-200 dark:border-transparent rounded-xl font-label-md font-bold hover:bg-slate-50 transition-all group shadow-sm">
              <span className="material-symbols-outlined text-[18px]">terminal</span>
              GitHub Repository
            </a>
          </div>
        </div>

        <div className="p-8 md:p-12 md:w-1/2 bg-transparent dark:bg-transparent relative z-10 border-t md:border-t-0 md:border-l border-slate-200 dark:border-outline-variant/20">
          <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            <div className="space-y-1.5">
              <label htmlFor={formId + "-email"} className="text-label-sm font-label-sm text-slate-600 dark:text-on-surface-variant px-1 block">Email (Optional)</label>
              <input id={formId + "-email"} name="email" autoComplete="email" maxLength={254} className="w-full bg-slate-50 border border-slate-200 dark:bg-surface-container-high dark:border-outline-variant/50 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#22B8CF] focus:border-transparent transition-all font-body-md text-slate-900 dark:text-on-surface placeholder:text-slate-400 dark:placeholder:text-outline/50 outline-none" placeholder="you@example.com" type="email" />
            </div>

            <div className="space-y-1.5">
              <label htmlFor={formId + "-category"} className="text-label-sm font-label-sm text-slate-600 dark:text-on-surface-variant px-1 block">Category</label>
              <select id={formId + "-category"} name="category" required value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-slate-50 border border-slate-200 dark:bg-surface-container-high dark:border-outline-variant/50 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#22B8CF] focus:border-transparent transition-all font-body-md text-slate-900 dark:text-on-surface outline-none appearance-none">
                <option value="" disabled>Choose a category</option>
                <option value="missing_place">Missing Place / Room</option>
                <option value="incorrect_location">Incorrect Location</option>
                <option value="incorrect_info">Incorrect Building Info / Timings</option>
                <option value="routing_error">Navigation / Routing Issue</option>
                <option value="accessibility">Accessibility Issue / Missing Ramps</option>
                <option value="bug">App Bug / Glitch</option>
                <option value="feature_request">Feature Request</option>
                <option value="feedback">General Feedback</option>
              </select>
            </div>

            {showLocation && (
              <FeedbackLocationPicker location={location} onChange={setLocation}
                labelClassName="text-label-sm font-label-sm text-slate-600 dark:text-on-surface-variant px-1 block"
                fieldClassName="w-full bg-slate-50 border border-slate-200 dark:bg-surface-container-high dark:border-outline-variant/50 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#22B8CF] focus:border-transparent transition-all font-body-md text-slate-900 dark:text-on-surface outline-none" />
            )}

            <div className="space-y-1.5">
              <label htmlFor={formId + "-message"} className="text-label-sm font-label-sm text-slate-600 dark:text-on-surface-variant px-1 block">Your Message</label>
              <textarea id={formId + "-message"} name="message" required maxLength={2000} className="w-full bg-slate-50 border border-slate-200 dark:bg-surface-container-high dark:border-outline-variant/50 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#22B8CF] focus:border-transparent transition-all font-body-md text-slate-900 dark:text-on-surface placeholder:text-slate-400 dark:placeholder:text-outline/50 resize-none outline-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" placeholder="Tell us what's on your mind..." rows={4}></textarea>
            </div>

            <div className="space-y-2">
              <button
                type="submit"
                disabled={status === "submitting" || status === "success"}
                aria-live="polite"
                aria-describedby={errorMessage ? formId + "-error" : undefined}
                className={`w-full py-3.5 rounded-xl font-label-md font-bold transition-all flex items-center justify-center gap-2 ${
                  status === "success"
                    ? "bg-green-600 text-white"
                    : "bg-slate-900 text-white hover:bg-slate-800 dark:bg-primary dark:text-on-primary dark:hover:brightness-110 shadow-md shadow-[#22B8CF]/10"
                }`}
              >
                {(status === "idle" || status === "error") && (
                  <>
                    Submit Feedback
                    <span className="material-symbols-outlined text-[20px]">send</span>
                  </>
                )}
                {status === "submitting" && (
                  <>
                    <span className="material-symbols-outlined text-[20px] animate-spin">refresh</span>
                    Sending...
                  </>
                )}
                {status === "success" && (
                  <>
                    <span className="material-symbols-outlined text-[20px]">check_circle</span>
                    Sent Successfully
                  </>
                )}
              </button>
              {errorMessage && <p id={formId + "-error"} role="alert" className="px-1 text-xs leading-relaxed text-red-700 dark:text-red-300">{errorMessage}</p>}
            </div>
            <p className="text-[11px] font-label-sm text-slate-500 dark:text-outline text-center mt-4">By submitting, you agree to our privacy policy and terms of service.</p>
          </form>
        </div>
      </div>
    </div>
  );
}
