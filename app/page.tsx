import { PROFILE, EDUCATION, EXPERIENCE, PROJECTS, STACK } from "@/lib/data";
import { ClientLiveTime } from "@/components/ui/live-time";
import { Reveal } from "@/components/ui/reveal";
import { DistortText } from "@/components/ui/distort-text";
import { Marquee } from "@/components/ui/marquee";
import { Counter } from "@/components/ui/counter";

export default function Home() {
  return (
    <>
      {/* HERO ====================================================== */}
      <section
        id="hero"
        className="relative w-full min-h-[100svh] flex flex-col px-6 md:px-8 pt-32 pb-10 overflow-hidden"
      >
        {/* Decorative diagonal bands — sweep in from the right edge.
            Sits behind the name, leaves the lower hero clean. */}
        <div
          className="hidden md:block absolute pointer-events-none select-none top-0 bottom-24"
          style={{
            right: "4.5rem",
            width: "min(46vw, 720px)",
            zIndex: 0,
          }}
          aria-hidden="true"
        >
          <Reveal delay={0.25}>
            <JerseyStripes />
          </Reveal>
        </div>

        {/* Vertical edge ticker */}
        <div
          className="hidden md:block absolute right-0 top-0 bottom-0 w-[4.5rem] pointer-events-none"
          aria-hidden="true"
        >
          <div className="hairline-l h-full pl-4 pr-3 py-24">
            <Marquee direction="y" speed={50} separator>
              <span className="font-mono text-xs uppercase tracking-widest font-bold whitespace-nowrap [writing-mode:vertical-rl]">
                Aizaz Ulhaq
              </span>
              <span className="font-mono text-xs uppercase tracking-widest whitespace-nowrap [writing-mode:vertical-rl]">
                Senior Software Engineer
              </span>
              <span className="font-mono text-xs uppercase tracking-widest font-bold whitespace-nowrap [writing-mode:vertical-rl]">
                Cloud-native systems
              </span>
              <span className="font-mono text-xs uppercase tracking-widest whitespace-nowrap [writing-mode:vertical-rl]">
                Angular · NestJS · AWS
              </span>
              <span className="font-mono text-xs uppercase tracking-widest font-bold whitespace-nowrap [writing-mode:vertical-rl]">
                Est. 2020 · Islamabad
              </span>
              <span className="font-mono text-xs uppercase tracking-widest whitespace-nowrap [writing-mode:vertical-rl]">
                Open to work
              </span>
              <span className="font-mono text-xs uppercase tracking-widest font-bold whitespace-nowrap [writing-mode:vertical-rl]">
                Tens of thousands of users daily
              </span>
            </Marquee>
          </div>
        </div>
        <Reveal delay={0.1}>
          <span className="label flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="live-dot" />
            <span>
              <Counter to={PROFILE.yearsExperience} pad={2} />
              + Years
            </span>
            <span className="inline-block w-8 h-px bg-black" />
            {PROFILE.location}
            <span className="inline-block w-8 h-px bg-black" />
            Available for hire
          </span>
        </Reveal>

        <div className="flex-1 flex flex-col justify-center">
          <Reveal delay={0.2}>
            <h1 className="display-1 uppercase select-none">
              <DistortText
                as="span"
                className="block"
                splitDistance={12}
                liftPx={20}
                radius={200}
                intensity={1.0}
              >
                Aizaz
              </DistortText>
              <DistortText
                as="span"
                className="block"
                splitDistance={12}
                liftPx={20}
                radius={200}
                intensity={1.0}
              >
                Ulhaq
              </DistortText>
            </h1>
          </Reveal>
        </div>

        <div className="grid grid-cols-12 items-end gap-6">
          <Reveal delay={0.4} className="col-span-12 md:col-span-5">
            <p className="display-4 max-w-[40ch]">
              Senior software engineer architecting cloud-native platforms with
              Angular, NestJS, and AWS. Currently leading engineering at MUST
              services.
            </p>
          </Reveal>

          <Reveal
            delay={0.55}
            className="col-span-6 md:col-span-3 md:col-start-8"
          >
            <a href="#work" className="pill pill-solid">
              Selected work →
            </a>
          </Reveal>

          <Reveal
            delay={0.65}
            className="col-span-6 md:col-span-2 md:col-start-11 flex md:justify-end items-center"
          >
            <span className="label">
              <span className="inline-block animate-bounce">↓</span>
              <span className="ml-1">Scroll</span>
            </span>
          </Reveal>
        </div>
      </section>

      {/* TOP MARQUEE STRIP ========================================= */}
      <section className="relative w-full hairline py-5 border-b-[1.5px] border-black">
        <Marquee speed={45}>
          <span className="label-strong">Available for select projects</span>
          <span className="label">Est. 2020 · Islamabad → Worldwide</span>
          <span className="label-strong">Cloud-native architecture</span>
          <span className="label">Angular · NestJS · AWS</span>
          <span className="label-strong">Open to collaborations</span>
          <span className="label">Currently leading engineering @ MUST</span>
          <span className="label-strong">Type-safe everything</span>
          <span className="label">Tens of thousands of users daily</span>
        </Marquee>
      </section>

      {/* MANIFESTO ================================================= */}
      <section
        id="manifesto"
        className="relative w-full min-h-[100svh] flex flex-col px-6 md:px-8 py-32"
      >
        <div className="flex items-baseline gap-4 mb-16">
          <Reveal>
            <span className="label-strong">[01] Manifesto</span>
          </Reveal>
        </div>

        <div className="flex-1 flex items-center max-w-[1400px]">
          <Reveal y={40} duration={1.2}>
            <p
              className="display-2 uppercase select-none"
              style={{ fontSize: "clamp(1.65rem, 5vw, 6.5rem)" }}
            >
              <DistortText
                as="span"
                splitDistance={7}
                liftPx={12}
                radius={150}
                intensity={0.8}
              >
                I architect cloud-native systems used by tens of thousands of
                people daily — from Angular frontends to AWS-backed NestJS
                services.
              </DistortText>
            </p>
          </Reveal>
        </div>
      </section>

      {/* EXPERIENCE ================================================ */}
      <section
        id="experience"
        className="relative w-full min-h-[100svh] flex flex-col px-6 md:px-8 py-32"
      >
        <div className="grid grid-cols-12 gap-6 mb-16">
          <Reveal className="col-span-12 md:col-span-3">
            <span className="label-strong">[02] Experience</span>
          </Reveal>
          <Reveal className="col-span-12 md:col-span-9">
            <h2 className="display-3 uppercase max-w-[18ch]">
              <Counter to={5} suffix="+" /> years.
              <br />
              <Counter to={2} /> Organizations served.
              <br />
              <span className="opacity-50">
                Production systems serving tens of thousands.
              </span>
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-12 gap-6 mt-auto">
          {EXPERIENCE.map((exp, i) => (
            <Reveal
              key={exp.company}
              className="col-span-12 md:col-span-6"
              delay={i * 0.08}
            >
              <article className="hairline pt-6">
                <div className="flex items-baseline justify-between mb-4">
                  <span className="label">
                    {String(EXPERIENCE.length - i).padStart(2, "0")} /{" "}
                    {String(EXPERIENCE.length).padStart(2, "0")}
                  </span>
                  <span className="label tabular-nums">
                    {exp.start} → {exp.end}
                    {exp.current && (
                      <span className="live-dot ml-2 inline-block align-middle" />
                    )}
                  </span>
                </div>
                <h3 className="display-3 uppercase mb-3">{exp.company}</h3>
                <div className="font-mono text-xs uppercase tracking-widest mb-6 font-semibold">
                  {exp.role}
                </div>
                <ul className="space-y-2.5 max-w-[55ch]">
                  {exp.highlights.slice(0, 3).map((h, j) => (
                    <li
                      key={j}
                      className="flex gap-3 font-mono text-xs leading-relaxed"
                    >
                      <span className="font-bold">0{j + 1}</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SELECTED WORK =========================================== */}
      <section id="work" className="relative w-full px-6 md:px-8 py-32">
        <div className="grid grid-cols-12 gap-6 mb-16">
          <Reveal className="col-span-12 md:col-span-3">
            <span className="label-strong">[03] Selected work</span>
          </Reveal>
          <Reveal className="col-span-12 md:col-span-9">
            <h2 className="display-3 uppercase max-w-[20ch]">
              <Counter to={10} suffix="+" /> projects shipped to production.{" "}
              <span className="opacity-50">
                Scroll for the long version.
              </span>
            </h2>
          </Reveal>
        </div>

        <div className="space-y-0">
          {PROJECTS.map((p, i) => (
            <ProjectRow
              key={p.id}
              project={p}
              index={i}
              total={PROJECTS.length}
            />
          ))}
        </div>
      </section>

      {/* CAPABILITIES =========================================== */}
      <section id="stack" className="relative w-full px-6 md:px-8 py-32">
        <div className="grid grid-cols-12 gap-6 mb-16">
          <Reveal className="col-span-12 md:col-span-3">
            <span className="label-strong">[04] Capabilities</span>
          </Reveal>
          <Reveal className="col-span-12 md:col-span-9">
            <h2 className="display-3 uppercase max-w-[16ch]">
              The toolkit currently in production.
            </h2>
          </Reveal>
        </div>

        <div className="space-y-10">
          {STACK.map((group, i) => (
            <Reveal key={group.label} delay={i * 0.06}>
              <div className="hairline pt-5 pb-2">
                <div className="flex items-baseline justify-between mb-4 px-6 md:px-0">
                  <span className="label-strong">{group.label}</span>
                  <span className="label">
                    <Counter to={group.items.length} pad={2} />
                  </span>
                </div>
                <Marquee speed={28 + i * 4} reverse={i % 2 === 1} separator>
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="font-mono uppercase tracking-widest text-2xl md:text-4xl select-none font-bold"
                    >
                      {item}
                    </span>
                  ))}
                </Marquee>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CONTACT =========================================== */}
      <section
        id="contact"
        className="relative w-full min-h-[100svh] flex flex-col px-6 md:px-8 py-32"
      >
        <div className="grid grid-cols-12 gap-6 mb-12">
          <Reveal className="col-span-12 md:col-span-3">
            <span className="label-strong">[05] Contact</span>
          </Reveal>
          <Reveal className="col-span-12 md:col-span-9">
            <h2 className="display-3 uppercase max-w-[18ch]">
              Have something <span className="italic">worth shipping?</span>
            </h2>
          </Reveal>
        </div>

        <div className="flex-1 flex items-center w-full">
          <Reveal className="w-full">
            <a
              href={`mailto:${PROFILE.email}?subject=Let%27s%20work%20together`}
              className="block group w-full"
            >
              <span
                className="block uppercase select-none w-full font-display"
                style={{
                  fontSize: "clamp(1.7rem, 7.8vw, 8rem)",
                  lineHeight: 0.92,
                  letterSpacing: "-0.055em",
                  fontWeight: 800,
                  wordBreak: "keep-all",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "clip",
                }}
              >
                <DistortText
                  as="span"
                  splitDistance={8}
                  liftPx={14}
                  radius={170}
                  intensity={0.9}
                >
                  {PROFILE.email}
                </DistortText>
              </span>
            </a>
          </Reveal>
        </div>

        <div className="grid grid-cols-12 gap-6 mt-12 hairline pt-8">
          <Reveal className="col-span-12 md:col-span-4">
            <span className="label block mb-2">LinkedIn</span>
            <a
              href={PROFILE.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm uppercase tracking-widest font-bold underline-offset-4 hover:underline"
            >
              {PROFILE.linkedin.label} ↗
            </a>
          </Reveal>
          <Reveal className="col-span-6 md:col-span-4" delay={0.06}>
            <span className="label block mb-2">Phone</span>
            <a
              href={`tel:${PROFILE.phone.replace(/\s+/g, "")}`}
              className="font-mono text-sm uppercase tracking-widest font-bold underline-offset-4 hover:underline"
            >
              {PROFILE.phone}
            </a>
          </Reveal>
          <Reveal className="col-span-6 md:col-span-4" delay={0.12}>
            <ClientLiveTime label="Local time" location={PROFILE.location} />
          </Reveal>
        </div>

        <div className="mt-12 hairline pt-8 grid grid-cols-12 gap-6">
          <Reveal className="col-span-12 md:col-span-3">
            <span className="label-strong">Education</span>
          </Reveal>
          <Reveal className="col-span-12 md:col-span-9">
            <p className="font-mono text-sm uppercase tracking-widest font-semibold">
              {EDUCATION.school}
              <br />
              <span className="opacity-60 font-normal">
                {EDUCATION.degree} · {EDUCATION.years} · {EDUCATION.location}
              </span>
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 label">
          <span>
            © {new Date().getFullYear()} {PROFILE.name}
          </span>
          <span>v1.0 · Edition 01</span>
          <span className="hidden md:block">Next.js · R3F · GLSL</span>
          <span className="text-right">Built with care</span>
        </div>
      </section>

      {/* FOOTER TICKER ========================================= */}
      <footer className="relative w-full hairline py-4 border-t-[1.5px] border-black">
        <Marquee speed={60} separator={false}>
          <span className="label-strong">◆ {PROFILE.name}</span>
          <span className="label">{PROFILE.role}</span>
          <span className="label">{PROFILE.location}</span>
          <span className="label-strong">{PROFILE.email}</span>
          <span className="label">v1.0 · Edition 01</span>
          <span className="label-strong">
            Next.js · React Three Fiber · GLSL
          </span>
          <span className="label">© {new Date().getFullYear()}</span>
          <span className="label-strong">◆ {PROFILE.name}</span>
          <span className="label">{PROFILE.role}</span>
          <span className="label">{PROFILE.location}</span>
        </Marquee>
      </footer>
    </>
  );
}

/* ============================================================
 * Decorative diagonal bands
 * Wide black geometric bands sweeping in from the right edge,
 * Vignelli/poster-style. NOT trying to fake painterly brushwork —
 * confident, geometric, on-brand for the BVB color story.
 * The procedurally-distorted ink filter pushes the edges so they
 * read as torn/painterly rather than perfectly clean.
 * ============================================================ */
function JerseyStripes() {
  return (
    <svg
      viewBox="0 0 600 800"
      preserveAspectRatio="xMaxYMid meet"
      className="w-full h-full"
      style={{ display: "block" }}
    >
      <defs>
        {/* Procedurally rough up the edges so geometry doesn't read clinical */}
        <filter id="rough" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" seed="7" />
          <feDisplacementMap in="SourceGraphic" scale="14" />
        </filter>
      </defs>

      {/* Three bold diagonal bands of varying width, all anchored at the
          right edge, fanning into the hero. The filter softens the cuts. */}
      <g fill="#0a0a0a" filter="url(#rough)">
        <polygon points="600,140 600,220 200,520 100,420 360,180 240,90" />
        <polygon points="600,290 600,370 220,650 160,580 380,400" opacity="0.92" />
        <polygon points="600,430 600,490 280,740 240,700 410,540" opacity="0.78" />
      </g>
    </svg>
  );
}

function ProjectRow({
  project,
  index,
  total,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
  total: number;
}) {
  return (
    <Reveal y={50}>
      <a
        href={`#work`}
        className="group block hairline py-12 transition-colors duration-500"
      >
        <div className="grid grid-cols-12 gap-6 items-baseline">
          <span className="col-span-2 label tabular-nums">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </span>

          <h3
            className="col-span-12 md:col-span-5 display-2 uppercase transition-transform duration-700 group-hover:translate-x-3 select-none min-w-0 break-words"
            style={{ fontSize: "clamp(2rem, 6vw, 7rem)" }}
          >
            <DistortText
              as="span"
              splitDistance={10}
              liftPx={16}
              radius={180}
              intensity={1.0}
            >
              {project.name}
            </DistortText>
          </h3>

          <div className="col-span-12 md:col-span-3 flex flex-wrap gap-1.5 min-w-0">
            {project.stack.slice(0, 4).map((s) => (
              <span
                key={s}
                className="font-mono text-[0.625rem] uppercase tracking-widest px-2 py-1 rounded-full font-semibold border-[1.5px] border-black whitespace-nowrap"
              >
                {s}
              </span>
            ))}
          </div>

          <div className="col-span-12 md:col-span-2 md:text-right min-w-0">
            <div className="label mb-1">{project.year}</div>
            <div className="font-mono text-sm uppercase tracking-widest font-bold">
              {project.metric.value}
            </div>
          </div>
        </div>

        <p className="mt-6 max-w-[80ch] font-mono text-xs leading-relaxed font-medium opacity-80">
          {project.blurb}
        </p>
      </a>
    </Reveal>
  );
}
