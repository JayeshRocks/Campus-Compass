export default function Home() {
  return (
    <div className="h-full overflow-y-auto w-full flex items-center justify-center page-blobs">
      <div className="text-center animate-fade-in p-8 glass-card rounded-3xl">
        <h1 className="font-display-lg text-4xl text-slate-900 dark:text-white mb-4">Welcome to Campus Compass</h1>
        <p className="text-slate-600 dark:text-on-surface-variant font-body-lg">
          This is a placeholder for the home page. Use the navigation to explore.
        </p>
      </div>
    </div>
  );
}
