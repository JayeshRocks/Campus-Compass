import Header from "./components/layout/Header";

export default function App() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold">🧭 Campus Compass</h1>

          <p className="mt-4 text-slate-400 text-xl">
            Built by students, for students.
          </p>

          <button className="mt-10 rounded-xl bg-blue-600 px-6 py-3 text-lg font-semibold transition hover:bg-blue-500">
            Coming Soon
          </button>
        </div>
      </main>
    </>
  );
}
