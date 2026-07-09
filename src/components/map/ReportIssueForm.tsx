import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function ReportIssueForm({ onClose }: { onClose: () => void }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      category: formData.get("category") as string,
      message: formData.get("message") as string,
    };

    try {
      const { error } = await supabase.from("feedback").insert([data]);
      if (error) throw error;
      
      setStatus("success");
      setTimeout(() => {
        setStatus("idle");
        onClose();
      }, 2000);
    } catch (err: unknown) {
      console.error("Supabase Error:", err);
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Failed to submit feedback.");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-sm">
      <div className="w-full max-w-4xl max-h-full overflow-x-hidden overflow-y-auto liquid-glass rounded-3xl relative animate-fade-in flex flex-col md:flex-row">
        
        {/* Decorative Background for light/dark */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full -mr-48 -mt-48 pointer-events-none" />

        <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center relative z-10 bg-slate-50/50 dark:bg-transparent">
          <h2 className="font-headline-lg text-3xl font-bold text-slate-900 dark:text-on-surface mb-4">Help Us Improve</h2>
          <p className="text-body-md text-slate-600 dark:text-on-surface-variant mb-8 leading-relaxed">
            Found a missing shortcut? Noticed a floor plan error? Campus Compass is a community-driven project that thrives on your input. Together, we can build the most accurate map of MIT Bengaluru.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="https://github.com/JayeshRocks/Campus-Compass" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl font-label-md font-bold hover:bg-blue-700 transition-all group shadow-sm">
              <span className="material-symbols-outlined text-[18px]">terminal</span>
              GitHub Repository
            </a>
          </div>
        </div>

        <div className="p-8 md:p-12 md:w-1/2 bg-transparent dark:bg-transparent relative z-10 border-t md:border-t-0 md:border-l border-slate-200 dark:border-outline-variant/20">
          <button onClick={onClose} className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 dark:text-on-surface-variant dark:hover:text-on-surface rounded-full hover:bg-slate-100 dark:hover:bg-surface-container-high transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
          
          <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-label-sm font-label-sm text-slate-600 dark:text-on-surface-variant px-1 block">Full Name</label>
                <input name="name" required className="w-full bg-slate-50 border border-slate-200 dark:bg-surface-container-high dark:border-outline-variant/50 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-body-md text-slate-900 dark:text-on-surface placeholder:text-slate-400 dark:placeholder:text-outline/50 outline-none" placeholder="e.g. Aryan K." type="text" />
              </div>
              <div className="space-y-1.5">
                <label className="text-label-sm font-label-sm text-slate-600 dark:text-on-surface-variant px-1 block">Email Address</label>
                <input name="email" required className="w-full bg-slate-50 border border-slate-200 dark:bg-surface-container-high dark:border-outline-variant/50 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-body-md text-slate-900 dark:text-on-surface placeholder:text-slate-400 dark:placeholder:text-outline/50 outline-none" placeholder="aryan@example.com" type="email" />
              </div>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-label-sm font-label-sm text-slate-600 dark:text-on-surface-variant px-1 block">Category</label>
              <select name="category" className="w-full bg-slate-50 border border-slate-200 dark:bg-surface-container-high dark:border-outline-variant/50 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-body-md text-slate-900 dark:text-on-surface outline-none appearance-none">
                <option value="missing_place">Missing Place / Room</option>
                <option value="incorrect_location">Incorrect Location</option>
                <option value="bug">App Bug / Glitch</option>
                <option value="feedback">General Feedback</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-label-sm font-label-sm text-slate-600 dark:text-on-surface-variant px-1 block">Your Message</label>
              <textarea name="message" required className="w-full bg-slate-50 border border-slate-200 dark:bg-surface-container-high dark:border-outline-variant/50 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-body-md text-slate-900 dark:text-on-surface placeholder:text-slate-400 dark:placeholder:text-outline/50 resize-none outline-none" placeholder="Tell us what's on your mind..." rows={4}></textarea>
            </div>
            
            <button 
              type="submit"
              disabled={status !== "idle"}
              className={`w-full py-3.5 rounded-xl font-label-md font-bold transition-all flex items-center justify-center gap-2 ${
                status === "success" 
                  ? "bg-green-600 text-white" 
                  : "bg-slate-900 text-white hover:bg-slate-800 dark:bg-primary dark:text-on-primary dark:hover:brightness-110 shadow-md shadow-blue-500/10"
              }`}
            >
              {status === "idle" && (
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
              {status === "error" && (
                <>
                  <span className="material-symbols-outlined text-[20px]">error</span>
                  Error: {errorMessage}
                </>
              )}
            </button>
            <p className="text-[11px] font-label-sm text-slate-500 dark:text-outline text-center mt-4">By submitting, you agree to our privacy policy and terms of service.</p>
          </form>
        </div>
      </div>
    </div>
  );
}
