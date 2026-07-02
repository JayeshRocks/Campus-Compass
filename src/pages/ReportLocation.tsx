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
    <div className="min-h-[calc(100vh-64px)] w-full bg-[#020617] text-on-surface p-6 md:p-12 overflow-y-auto">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-primary font-label-md text-label-md bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
            Coordinates Sync
          </span>
          <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface mt-4 tracking-tight">
            Report Incorrect Location
          </h2>
          <p className="font-body-md text-sm text-on-surface-variant mt-2">
            Is a building labeled incorrectly or are coordinates out of alignment? Submit a change request.
          </p>
        </div>

        <div className="bg-surface-container-lowest/80 backdrop-blur-md border border-outline-variant/30 rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in">
              <span className="material-symbols-outlined text-green-500 text-6xl mb-4 animate-bounce">
                check_circle
              </span>
              <h3 className="font-bold text-lg text-on-surface">Feedback Received!</h3>
              <p className="text-sm text-on-surface-variant mt-2 max-w-sm">
                Thank you for standardizing our campus coordinates grid. We will cross-examine and update the marker properties accordingly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full px-4 py-2.5 bg-surface-container-high/50 border border-outline-variant/30 rounded-xl text-on-surface placeholder-on-surface-variant text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="w-full px-4 py-2.5 bg-surface-container-high/50 border border-outline-variant/30 rounded-xl text-on-surface placeholder-on-surface-variant text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">
                  Building / Location Name
                </label>
                <input
                  type="text"
                  required
                  value={buildingName}
                  onChange={(e) => setBuildingName(e.target.value)}
                  placeholder="e.g. Academic Block 1 or Basket Ball Court 1"
                  className="w-full px-4 py-2.5 bg-surface-container-high/50 border border-outline-variant/30 rounded-xl text-on-surface placeholder-on-surface-variant text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">
                  What is incorrect?
                </label>
                <textarea
                  required
                  rows={3}
                  value={incorrectInfo}
                  onChange={(e) => setIncorrectInfo(e.target.value)}
                  placeholder="Describe what details or coordinates are incorrect..."
                  className="w-full px-4 py-2.5 bg-surface-container-high/50 border border-outline-variant/30 rounded-xl text-on-surface placeholder-on-surface-variant text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">
                  Suggested Coordinates / Details (Optional)
                </label>
                <input
                  type="text"
                  value={suggestedUpdate}
                  onChange={(e) => setSuggestedUpdate(e.target.value)}
                  placeholder="e.g. Lng: 77.6112, Lat: 13.1205 or Floor 2 instead of 4"
                  className="w-full px-4 py-2.5 bg-surface-container-high/50 border border-outline-variant/30 rounded-xl text-on-surface placeholder-on-surface-variant text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-2.5 bg-primary text-on-primary font-semibold text-sm rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.2)] hover:bg-primary/95 transition-all cursor-pointer text-center"
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
