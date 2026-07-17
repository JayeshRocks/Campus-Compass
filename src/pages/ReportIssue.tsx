import { useState } from "react";

export default function ReportIssue() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("map");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !description) return;
    setSubmitted(true);
    // Reset form after delay
    setTimeout(() => {
      setName("");
      setEmail("");
      setCategory("map");
      setDescription("");
      setSubmitted(false);
    }, 4000);
  };

  return (
    <div className="h-full w-full page-blobs text-slate-900 dark:text-on-surface p-6 md:p-12 overflow-y-auto">
      <div className="max-w-xl mx-auto animate-fade-in">
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
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in">
              <span className="material-symbols-outlined text-green-500 text-6xl mb-4 animate-bounce">
                check_circle
              </span>
              <h3 className="font-bold text-lg text-slate-900 dark:text-on-surface">Report Submitted Successfully!</h3>
              <p className="text-sm text-slate-600 dark:text-on-surface-variant mt-2 max-w-sm">
                Thank you for contributing to Campus Compass. Our developer team will review the bug report shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-on-surface-variant uppercase tracking-wider mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-surface-container-high/50 border border-slate-200 dark:border-outline-variant/30 rounded-xl text-slate-900 dark:text-on-surface placeholder-slate-400 dark:placeholder-on-surface-variant text-sm focus:outline-none focus:ring-1 focus:ring-[#22B8CF] focus:border-[#22B8CF] transition-all shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-on-surface-variant uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-surface-container-high/50 border border-slate-200 dark:border-outline-variant/30 rounded-xl text-slate-900 dark:text-on-surface placeholder-slate-400 dark:placeholder-on-surface-variant text-sm focus:outline-none focus:ring-1 focus:ring-[#22B8CF] focus:border-[#22B8CF] transition-all shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-on-surface-variant uppercase tracking-wider mb-2">
                  Issue Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-surface-container-high/50 border border-slate-200 dark:border-outline-variant/30 rounded-xl text-slate-900 dark:text-on-surface text-sm focus:outline-none focus:ring-1 focus:ring-[#22B8CF] focus:border-[#22B8CF] transition-all shadow-sm"
                >
                  <option value="map">Map rendering glitch</option>
                  <option value="ui">Layout or spacing alignment issue</option>
                  <option value="search">Search input or filter bug</option>
                  <option value="other">Other feedback</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-on-surface-variant uppercase tracking-wider mb-2">
                  Description of Issue
                </label>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the bug in detail..."
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-surface-container-high/50 border border-slate-200 dark:border-outline-variant/30 rounded-xl text-slate-900 dark:text-on-surface placeholder-slate-400 dark:placeholder-on-surface-variant text-sm focus:outline-none focus:ring-1 focus:ring-[#22B8CF] focus:border-[#22B8CF] transition-all shadow-sm resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-2.5 bg-[#22B8CF] text-white font-semibold text-sm rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.2)] hover:bg-[#1A94A6] transition-all cursor-pointer text-center"
              >
                Submit Bug Report
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
