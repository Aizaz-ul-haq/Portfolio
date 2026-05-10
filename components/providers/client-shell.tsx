"use client";

import dynamic from "next/dynamic";

const CanvasProvider = dynamic(
  () => import("./canvas-provider").then((m) => m.CanvasProvider),
  { ssr: false }
);

const Preloader = dynamic(
  () => import("@/components/ui/preloader").then((m) => m.Preloader),
  { ssr: false }
);

const Cursor = dynamic(
  () => import("@/components/ui/cursor").then((m) => m.Cursor),
  { ssr: false }
);

export function ClientShellBefore() {
  return <CanvasProvider />;
}

export function ClientShellAfter() {
  return (
    <>
      <Cursor />
      <Preloader />
    </>
  );
}
