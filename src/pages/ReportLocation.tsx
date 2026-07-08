import { useState } from "react";

export default function ReportLocation() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [buildingName, setBuildingName] = useState("");
  const [incorrectInfo, setIncorrectInfo] = useState("");
  const [suggestedUpdate, setSuggestedUpdate] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !buildingName || !incorrectInfo) return;
    setSubmitted(true);
    // Reset form after delay
    setTimeout(() => {
      setName("");
      setEmail("");
      setBuildingName("");
      setIncorrectInfo("");
      setSuggestedUpdate("");
      setSubmitted(false);
    }, 4000);
  };

  return (
    <div className="h-full w-full bg-[#f8fafc] dark:bg-[#020617] text-slate-900 dark:text-on-surface p-6 md:p-12 overflow-y-auto">
      <div className="max-w-xl mx-auto animate-fade-in">
        <div className="text-center mb-8">
          <span className="text-blue-600 dark:text-primary font-label-md text-label-md bg-blue-50 dark:bg-primary/10 px-3 py-1 rounded-full border border-blue-200 dark:border-primary/20">
            Coordinates Sync
          </span>
          <h2 className="font-headline-lg text-headline-lg font-bold text-slate-900 dark:text-on-surface mt-4 tracking-tight">
            Report Incorrect Location
          </h2>
          <p className="font-body-md text-sm text-slate-600 dark:text-on-surface-variant mt-2">
            Is a building labeled incorrectly or are coordinates out of alignment? Submit a change request.
          </p>
        </div>

        <div className="bg-white dark:bg-surface-container-lowest/80 backdrop-blur-md border border-slate-200 dark:border-outline-variant/30 rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in">
              <span className="material-symbols-outlined text-green-500 text-6xl mb-4 animate-bounce">
                check_circle
              </span>
              <h3 className="font-bold text-lg text-slate-900 dark:text-on-surface">Feedback Received!</h3>
              <p className="text-sm text-slate-600 dark:text-on-surface-variant mt-2 max-w-sm">
                Thank you for standardizing our campus coordinates grid. We will cross-examine and update the marker properties accordingly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-on-surface-variant uppercase tracking-wider mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-surface-container-high/50 border border-slate-200 dark:border-outline-variant/30 rounded-xl text-slate-900 dark:text-on-surface placeholder-slate-400 dark:placeholder-on-surface-variant text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-on-surface-variant uppercase tracking-wider mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-surface-container-high/50 border border-slate-200 dark:border-outline-variant/30 rounded-xl text-slate-900 dark:text-on-surface placeholder-slate-400 dark:placeholder-on-surface-variant text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all shadow-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-on-surface-variant uppercase tracking-wider mb-2">
                  Building / Location Name
                </label>
                <input
                  type="text"
                  required
                  value={buildingName}
                  onChange={(e) => setBuildingName(e.target.value)}
                  placeholder="e.g. Academic Block 1 or Basket Ball Court 1"
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-surface-container-high/50 border border-slate-200 dark:border-outline-variant/30 rounded-xl text-slate-900 dark:text-on-surface placeholder-slate-400 dark:placeholder-on-surface-variant text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-on-surface-variant uppercase tracking-wider mb-2">
                  What is incorrect?
                </label>
                <textarea
                  required
                  rows={3}
                  value={incorrectInfo}
                  onChange={(e) => setIncorrectInfo(e.target.value)}
                  placeholder="Describe what details or coordinates are incorrect..."
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-surface-container-high/50 border border-slate-200 dark:border-outline-variant/30 rounded-xl text-slate-900 dark:text-on-surface placeholder-slate-400 dark:placeholder-on-surface-variant text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all shadow-sm resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-on-surface-variant uppercase tracking-wider mb-2">
                  Suggested Coordinates / Details (Optional)
                </label>
                <input
                  type="text"
                  value={suggestedUpdate}
                  onChange={(e) => setSuggestedUpdate(e.target.value)}
                  placeholder="e.g. Lng: 77.5912, Lat: 13.1205 or Floor 2 instead of 4"
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-surface-container-high/50 border border-slate-200 dark:border-outline-variant/30 rounded-xl text-slate-900 dark:text-on-surface placeholder-slate-400 dark:placeholder-on-surface-variant text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all shadow-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-2.5 bg-blue-600 text-white font-semibold text-sm rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.2)] hover:bg-blue-700 transition-all cursor-pointer text-center"
              >
                Submit Correction Request
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
