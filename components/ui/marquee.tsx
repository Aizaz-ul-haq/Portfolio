"use client";

import { ReactNode, Children } from "react";

type Props = {
  children: ReactNode;
  /** Seconds for one full loop. Lower = faster. */
  speed?: number;
  /** Reverse direction. */
  reverse?: boolean;
  /** Wrapper className. */
  className?: string;
  /** Per-item className applied to each child wrapper. */
  itemClassName?: string;
  /** Show an accent dot between items. */
  separator?: boolean;
  /** Number of times to repeat the children inside each track for visual density. */
  repeat?: number;
  /** Layout direction. Defaults to "x" (horizontal). */
  direction?: "x" | "y";
};

/**
 * Infinite horizontal marquee.
 * Clones the track twice and animates the whole thing -100% so it
 * loops seamlessly. Pauses on hover. Honors prefers-reduced-motion
 * by stopping animation.
 */
export function Marquee({
  children,
  speed = 40,
  reverse = false,
  className = "",
  itemClassName = "",
  separator = true,
  repeat = 1,
  direction = "x",
}: Props) {
  const items = Children.toArray(children);
  const isY = direction === "y";

  const renderItems = (k: string) =>
    Array.from({ length: repeat }).flatMap((_, r) =>
      items.map((child, i) => (
        <div
          key={`${k}-${r}-${i}`}
          className={itemClassName}
          style={{
            display: isY ? "flex" : "inline-flex",
            flexDirection: isY ? "column" : "row",
            alignItems: "center",
            gap: isY ? "2.5rem" : undefined,
          }}
        >
          {child}
          {separator && (
            <span
              className="marquee-dot"
              style={isY ? { marginTop: "2.5rem" } : { marginLeft: "4rem" }}
            />
          )}
        </div>
      ))
    );

  if (isY) {
    return (
      <div
        className={`marquee-y ${reverse ? "marquee-y-reverse" : ""} ${className}`}
        style={{ ["--marquee-duration" as string]: `${speed}s` }}
      >
        <div className="marquee-y-track">{renderItems("a")}</div>
        <div className="marquee-y-track" aria-hidden="true">
          {renderItems("b")}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`marquee ${reverse ? "marquee-reverse" : ""} ${className}`}
      style={{ ["--marquee-duration" as string]: `${speed}s` }}
    >
      <div className="marquee-track">{renderItems("a")}</div>
      <div className="marquee-track" aria-hidden="true">
        {renderItems("b")}
      </div>
    </div>
  );
}
