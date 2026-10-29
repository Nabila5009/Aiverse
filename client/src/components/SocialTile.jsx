function SocialTile({ icon: Icon, tilt = "", delay = "0s" }) {
  return (
    <div className="float-gentle" style={{ animationDelay: delay, animationDuration: "7s" }}>
      <span
        className={`flex h-11 w-12 items-center justify-center rounded-xl border border-violet-100 bg-white text-slate-500 shadow-[0_12px_28px_-12px_rgba(109,74,255,0.3)] transition-transform duration-300 hover:scale-[1.02] hover:text-[#6D4AFF] hover:shadow-[0_16px_32px_-12px_rgba(109,74,255,0.4)] ${tilt}`}
      >
        <Icon className="h-5 w-5" />
      </span>
    </div>
  );
}

export default SocialTile;
