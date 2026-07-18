interface FeedbackButtonProps {
  onClick: () => void;
  hasBottomNav?: boolean;
}

export default function FeedbackButton({ onClick, hasBottomNav = false }: FeedbackButtonProps) {
  return (
    <div className={`fixed z-[80] transition-all duration-300 ${hasBottomNav ? 'bottom-[143px] left-[24px]' : 'bottom-[52px] left-[24px] md:left-auto md:right-[96px]'}`}>
      <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-full shadow-lg ghost-border shadow-[0_0_20px_rgba(239,68,68,0.2)]">
        <button
          onClick={onClick}
          className="h-12 px-5 rounded-full flex items-center justify-center gap-2.5 text-slate-800 dark:text-white hover:bg-slate-100/50 dark:hover:bg-surface-container-high/50 transition-colors cursor-pointer active:scale-95 font-label-md font-bold group"
          title="Report an Issue"
        >
          <span className="text-[16px] group-hover:scale-110 transition-transform">💬</span>
          Send Feedback
        </button>
      </div>
    </div>
  );
}
