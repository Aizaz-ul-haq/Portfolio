import type { Metadata, Viewport } from "next";
import { geist, jetbrains } from "./fonts";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import { ScrollStatePublisher } from "@/components/providers/scroll-state-publisher";
import { AnchorScroll } from "@/components/providers/anchor-scroll";
import { Nav } from "@/components/ui/nav";
import {
  ClientShellBefore,
  ClientShellAfter,
} from "@/components/providers/client-shell";

export const metadata: Metadata = {
  metadataBase: new URL("https://aizazulhaq.dev"),
  title: {
    default: "Aizaz Ulhaq — Senior Software Engineer",
    template: "%s · Aizaz Ulhaq",
  },
  description:
    "Aizaz Ulhaq — Senior Full-Stack Software Engineer architecting cloud-native systems with Angular, NestJS, and AWS. 5+ years building scalable web applications.",
  keywords: [
    "Aizaz Ulhaq",
    "Senior Software Engineer",
    "Full-Stack Developer",
    "Angular",
    "NestJS",
    "AWS",
    "Pakistan",
    "Islamabad",
    "Portfolio",
  ],
  authors: [{ name: "Aizaz Ulhaq" }],
  creator: "Aizaz Ulhaq",
  openGraph: {
    type: "website",
    title: "Aizaz Ulhaq — Senior Software Engineer",
    description:
      "Architecting cloud-native systems with Angular, NestJS, and AWS. 5+ years building scalable web applications.",
    siteName: "Aizaz Ulhaq",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aizaz Ulhaq — Senior Software Engineer",
    description:
      "Architecting cloud-native systems with Angular, NestJS, and AWS.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#FDE100",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased" style={{ background: "#FDE100" }}>
        <ClientShellBefore />
        <SmoothScrollProvider>
          <ScrollStatePublisher />
          <AnchorScroll />
          <Nav />
          <main id="main" className="relative" style={{ zIndex: 1 }}>
            {children}
          </main>
        </SmoothScrollProvider>
        <ClientShellAfter />
      </body>
    </html>
  );
}
