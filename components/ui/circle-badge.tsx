"use client";

type Props = {
  /** Text to wrap around the circle. Repeated/dotted internally. */
  text: string;
  /** Diameter in px. Defaults to 168. */
  size?: number;
  /** Seconds for one full rotation. */
  speed?: number;
  /** Reverse rotation. */
  reverse?: boolean;
  /** Optional center symbol. Defaults to "↗". */
  symbol?: string;
  /** Optional href: turns the whole badge into a link. */
  href?: string;
  /** Optional click handler. */
  onClick?: () => void;
  className?: string;
};

/**
 * Spinning circular badge / sticker.
 * Text rotates around a circular SVG path; the rest of the badge is static
 * (so the symbol & inner disc don't spin with the words).
 */
export function CircleBadge({
  text,
  size = 168,
  speed = 18,
  reverse = false,
  symbol = "↗",
  href,
  onClick,
  className = "",
}: Props) {
  const r = size / 2;
  const pathR = r - 14; // text orbit radius
  const id = `circ-${Math.random().toString(36).slice(2, 9)}`;
  // Repeat text with bullet so it fills the loop densely
  const looped = `${text}  ·  ${text}  ·  `.toUpperCase();

  const Inner = (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Spinning text */}
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="absolute inset-0"
        style={{
          animation: `spin-circle ${speed}s linear infinite${reverse ? " reverse" : ""}`,
        }}
        aria-hidden="true"
      >
        <defs>
          <path
            id={id}
            d={`M ${r}, ${r} m -${pathR}, 0 a ${pathR},${pathR} 0 1,1 ${pathR * 2},0 a ${pathR},${pathR} 0 1,1 -${pathR * 2},0`}
          />
        </defs>
        <text
          fill="currentColor"
          style={{
            fontFamily: "var(--font-mono), ui-monospace, monospace",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          <textPath href={`#${id}`}>{looped}</textPath>
        </text>
      </svg>

      {/* Center disc */}
      <div
        className="rounded-full flex items-center justify-center font-display font-extrabold"
        style={{
          width: size * 0.42,
          height: size * 0.42,
          background: "var(--color-ink)",
          color: "var(--color-paper)",
          fontSize: size * 0.22,
          lineHeight: 1,
        }}
        aria-hidden="true"
      >
        {symbol}
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} aria-label={text} onClick={onClick} className="inline-block">
        {Inner}
      </a>
    );
  }
  return Inner;
}
