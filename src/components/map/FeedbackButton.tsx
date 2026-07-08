interface FeedbackButtonProps {
  onClick: () => void;
}

export default function FeedbackButton({ onClick }: FeedbackButtonProps) {
  return (
    <div className="fixed bottom-[24px] left-[24px] md:left-auto md:right-[96px] z-[80]">
      <button
        onClick={onClick}
        className="h-12 px-5 glass-panel rounded-full shadow-lg ghost-border flex items-center justify-center gap-2.5 text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-surface-container-high transition-colors shadow-[0_0_20px_rgba(239,68,68,0.2)] cursor-pointer active:scale-95 font-label-md font-bold group"
        title="Report an Issue"
      >
        <span className="text-[16px] group-hover:scale-110 transition-transform">💬</span>
        Send Feedback
      </button>
    </div>
  );
}
