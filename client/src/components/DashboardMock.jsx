const cellColors = [
  "bg-violet-400/70",
  "bg-fuchsia-300/70",
  "bg-indigo-300/70",
  "bg-rose-300/70",
  "bg-violet-300/50",
  "bg-sky-300/70",
  "bg-[#6D4AFF]/80",
  "bg-fuchsia-400/50",
  "bg-indigo-400/60",
  "bg-violet-400/50",
  "bg-sky-400/60",
  "bg-fuchsia-300/60",
];

function EditorMock() {
  return (
    <div className="w-[24rem] rounded-2xl border border-violet-100 bg-white/95 p-4 shadow-[0_30px_70px_-20px_rgba(109,74,255,0.35)] backdrop-blur-md xl:w-[28rem]">

      <div className="flex gap-3">
        {/* Dark video thumbnail */}
        <div className="relative h-32 w-1/2 overflow-hidden rounded-xl bg-gradient-to-br from-[#1a1533] via-[#171227] to-[#0F172A]">
          <div className="absolute inset-3 rounded-lg border border-white/10"></div>
          <span className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#6D4AFF]/90">
            <span className="ml-0.5 h-0 w-0 border-y-[6px] border-l-[9px] border-y-transparent border-l-white"></span>
          </span>
        </div>

        {/* Side panel skeleton rows */}
        <div className="flex-1 space-y-2 rounded-xl bg-[#F5F3FF]/80 p-3">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="h-4 w-6 rounded-md bg-violet-300/70"></span>
              <div className="h-1.5 flex-1 rounded-full bg-slate-300/60"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline bar */}
      <div className="mt-3">
        <div className="relative h-4 rounded-full bg-[#F5F3FF] ring-1 ring-violet-100">
          <div className="h-full w-2/5 rounded-full bg-gradient-to-r from-[#6D4AFF]/70 to-[#7C5CFF]/70"></div>
          <span className="absolute left-[40%] top-1/2 h-5 w-1.5 -translate-y-1/2 rounded-full bg-[#6D4AFF]"></span>
        </div>
        <div className="mt-2 flex gap-1.5">
          <span className="h-3 w-1/3 rounded-md bg-violet-300/70"></span>
          <span className="h-3 w-1/4 rounded-md bg-fuchsia-300/70"></span>
          <span className="h-3 w-1/5 rounded-md bg-sky-300/70"></span>
          <span className="h-3 flex-1 rounded-md bg-slate-200/80"></span>
        </div>
      </div>

      {/* Bottom skeleton rows */}
      <div className="mt-3 space-y-2">
        <div className="h-1.5 w-3/4 rounded-full bg-slate-200/80"></div>
        <div className="h-1.5 w-1/2 rounded-full bg-slate-200/60"></div>
      </div>

    </div>
  );
}

function CalendarMock() {
  return (
    <div className="w-[24rem] rounded-2xl border border-violet-100 bg-white/95 p-4 shadow-[0_30px_70px_-20px_rgba(109,74,255,0.35)] backdrop-blur-md xl:w-[28rem]">

      {/* Window header */}
      <div className="mb-3 flex items-center gap-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-300"></span>
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300"></span>
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-300"></span>
        </div>
        <div className="h-1.5 w-24 rounded-full bg-slate-200/80"></div>
      </div>

      <div className="flex gap-3">
        {/* Grid of tiny colored thumbnails */}
        <div className="grid flex-1 grid-cols-4 gap-2">
          {cellColors.map((color, i) => (
            <div key={i} className="space-y-1">
              <div className={`h-8 rounded-lg ${color}`}></div>
              <div className="h-1 w-3/4 rounded-full bg-slate-200/70"></div>
            </div>
          ))}
        </div>

        {/* Side panel */}
        <div className="w-1/4 space-y-2 rounded-xl bg-[#F5F3FF]/80 p-3">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="space-y-1">
              <span className="block h-1.5 w-full rounded-full bg-violet-300/60"></span>
              <span className="block h-1 w-2/3 rounded-full bg-slate-300/50"></span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

function DashboardMock({ variant, className = "" }) {
  return (
    <div className={`absolute z-0 hidden xl:block ${className}`}>
      <div className="float-gentle transition-transform duration-300 hover:scale-[1.02]" style={{ animationDelay: "1s", animationDuration: "8s" }}>
        {variant === "editor" ? <EditorMock /> : <CalendarMock />}
      </div>
    </div>
  );
}

export default DashboardMock;
