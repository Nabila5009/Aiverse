import FloatingCard from "./FloatingCard";
import DashboardMock from "./DashboardMock";
import SocialTile from "./SocialTile";

import {
  Sparkles,
  Play,
  ArrowRight,
  Image,
  Star,
  MessageSquare,
  Code2Icon,
} from "lucide-react";

import {
  SiYoutube,
  SiTiktok,
  SiInstagram,
  SiX,
} from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa6";

/* ---------- Corner mini cards (icons + skeleton lines only) ---------- */

const cornerCards = [
  { icon: Image, thumbClass: "bg-gradient-to-br from-[#6D4AFF] to-[#8B5CFF]", className: "top-[12%] left-[3%] -rotate-3", delay: "0s" },
  { icon: Star, thumbClass: "bg-gradient-to-br from-fuchsia-400 to-pink-400", className: "top-[40%] left-[0.5%] rotate-2", delay: "1.4s" },
  { icon: MessageSquare, thumbClass: "bg-gradient-to-br from-indigo-400 to-violet-400", className: "top-[12%] right-[3%] rotate-3", delay: "0.7s" },
  { icon: Code2Icon, thumbClass: "bg-gradient-to-br from-violet-400 to-fuchsia-400", className: "top-[40%] right-[0.5%] -rotate-2", delay: "2.1s" },
];

/* ---------- Social brand icons ---------- */

const socials = [
  { label: "YouTube", Icon: SiYoutube, tilt: "-rotate-3" },
  { label: "TikTok", Icon: SiTiktok, tilt: "rotate-2" },
  { label: "Instagram", Icon: SiInstagram, tilt: "-rotate-2" },
  { label: "LinkedIn", Icon: FaLinkedinIn, tilt: "rotate-3" },
  { label: "X", Icon: SiX, tilt: "rotate-1" },
];

/* ---------- Overlapping gradient avatar placeholders ---------- */

const avatarGradients = [
  "bg-gradient-to-br from-[#6D4AFF] to-[#9F5CFF]",
  "bg-gradient-to-br from-indigo-400 to-sky-400",
  "bg-gradient-to-br from-fuchsia-400 to-rose-400",
  "bg-gradient-to-br from-emerald-400 to-teal-400",
  "bg-gradient-to-br from-amber-400 to-orange-400",
  "bg-gradient-to-br from-violet-300 to-indigo-300",
];

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#F8F8FC] pb-44 pt-10 md:pb-48 md:pt-12">

      {/* Fine dotted grid */}
      <div className="hero-dots absolute inset-0"></div>

      {/* Perspective rays from top-center */}
      <div className="absolute left-1/2 top-0 h-0 w-0">
        <div className="absolute left-1/2 top-24 h-[42rem] w-px origin-top -rotate-[28deg] bg-gradient-to-b from-violet-200/50 to-transparent"></div>
        <div className="absolute left-1/2 top-24 h-[42rem] w-px origin-top rotate-[28deg] bg-gradient-to-b from-violet-200/50 to-transparent"></div>
        <div className="absolute left-1/2 top-24 h-[36rem] w-px origin-top -rotate-[55deg] bg-gradient-to-b from-violet-200/40 to-transparent"></div>
        <div className="absolute left-1/2 top-24 h-[36rem] w-px origin-top rotate-[55deg] bg-gradient-to-b from-violet-200/40 to-transparent"></div>
      </div>

      {/* Soft purple glow behind headline */}
      <div className="absolute left-1/2 top-16 h-72 w-[34rem] -translate-x-1/2 rounded-full bg-violet-300/35 blur-[130px]"></div>
      <div className="absolute -left-20 top-1/2 h-80 w-80 rounded-full bg-violet-200/30 blur-[140px]"></div>
      <div className="absolute -right-20 top-1/2 h-80 w-80 rounded-full bg-fuchsia-200/25 blur-[140px]"></div>

      {/* Corner mini cards — top-left, mid-left, top-right, mid-right */}
      {cornerCards.map(({ icon, thumbClass, className, delay }) => (
        <FloatingCard
          key={className}
          icon={icon}
          thumbClass={thumbClass}
          className={className}
          delay={delay}
        />
      ))}

      {/* Large dashboard mockups bleeding off bottom corners */}
      <DashboardMock
        variant="editor"
        className="-left-16 bottom-[-4rem] -rotate-8 xl:-left-24 xl:bottom-[-5rem]"
      />
      <DashboardMock
        variant="calendar"
        className="-right-16 bottom-[-6rem] rotate-8 xl:-right-20 xl:bottom-[-7rem]"
      />

      {/* Centered hero content */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">

        {/* Logo tile */}
        <div
          className="float-gentle mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-100 bg-white shadow-[0_18px_40px_-14px_rgba(109,74,255,0.35)]"
          style={{ animationDuration: "5.5s" }}
        >
          <Sparkles className="h-7 w-7 text-[#6D4AFF]" />
        </div>

        {/* Headline */}
        <h1 className="mt-7 text-5xl font-extrabold leading-[1.06] tracking-tight text-[#0F172A] md:text-6xl lg:text-7xl">
          Build AI Content
          <br />
          <span className="bg-gradient-to-r from-[#6D4AFF] to-[#7C5CFF] bg-clip-text text-transparent">
            in Seconds
          </span>
        </h1>

        {/* Description */}
        <p className="mx-auto mt-6 max-w-[560px] text-base leading-7 text-[#64748B] md:text-lg md:leading-8">
          Generate articles, blogs, images, resumes and much more using the power
          of Artificial Intelligence.
        </p>

        {/* Avatar stack */}
        <div className="mt-7 flex items-center justify-center">
          <div className="flex -space-x-3">
            {avatarGradients.map((gradient, i) => (
              <span
                key={i}
                className={`h-9 w-9 rounded-full ring-2 ring-white ${gradient}`}
              ></span>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">

          <button className="group flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-[#6D4AFF] to-[#7C5CFF] px-7 py-3.5 text-base font-semibold text-white shadow-[0_10px_30px_rgba(109,74,255,0.35)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-6px_rgba(109,74,255,0.55)]">
            Get Started
            <ArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          <button className="group flex items-center gap-3 rounded-xl px-2 py-2 transition duration-300 hover:-translate-y-0.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-violet-200 bg-white text-[#6D4AFF] shadow-sm transition duration-300 group-hover:border-violet-300 group-hover:shadow-[0_8px_20px_-6px_rgba(109,74,255,0.4)]">
              <Play className="ml-0.5 h-4 w-4 fill-current" />
            </span>
            <span className="text-base font-semibold text-[#0F172A] transition-colors group-hover:text-[#6D4AFF]">
              Watch Demo
            </span>
          </button>

        </div>

        {/* Social brand tiles */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-4 md:gap-5">
          {socials.map(({ label, Icon, tilt }, i) => (
            <SocialTile key={label} icon={Icon} tilt={tilt} delay={`${i * 0.35}s`} />
          ))}
        </div>

      </div>

    </section>
  );
}

export default Hero;
