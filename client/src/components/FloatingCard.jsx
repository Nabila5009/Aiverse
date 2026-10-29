function FloatingCard({ icon: Icon, thumbClass = "bg-gradient-to-br from-[#6D4AFF] to-[#8B5CFF]", className = "", delay = "0s", duration = "6.5s" }) {
  return (
    <div className={`absolute z-0 hidden lg:block ${className}`}>
      <div
        className="float-gentle group w-32 rounded-lg border border-violet-100/80 bg-white/90 p-2.5 shadow-[0_14px_35px_-14px_rgba(109,74,255,0.25)] backdrop-blur-sm transition-transform duration-300 hover:scale-[1.02]"
        style={{ animationDelay: delay, animationDuration: duration }}
      >
        <div className="flex items-start gap-2">
          <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-white/90 ${thumbClass}`}>
            {Icon && <Icon className="h-3.5 w-3.5" />}
          </span>
          <div className="flex-1 space-y-1.5 pt-1">
            <div className="h-1.5 w-full rounded-full bg-slate-200/80"></div>
            <div className="h-1.5 w-2/3 rounded-full bg-slate-200/60"></div>
          </div>
        </div>
        <div className="mt-2 space-y-1.5">
          <div className="h-1.5 w-3/4 rounded-full bg-slate-200/70"></div>
          <div className="h-1.5 w-1/2 rounded-full bg-slate-200/50"></div>
        </div>
      </div>
    </div>
  );
}

export default FloatingCard;
