import type { Metadata } from "next";
import Link from "next/link";
import { getIsSubscribedFromCookies } from "@/lib/server/vercel-daily-api";
import { NavPillLink } from "../components/nav-pill-link";
import { SubscribeButton } from "../components/subscribe-button";
import { SubscribeIcon } from "../components/subscribe-icon";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3002",
  ),
  title: {
    template: "%s",
    default: "Vercel Daily",
  },
  description:
    "Vercel Daily is a modern news publication built with Next.js 16.",
  openGraph: {
    title: "Vercel Daily",
    description:
      "Follow breaking stories, featured reports, and trending coverage on Vercel Daily.",
    url: "/",
    siteName: "Vercel Daily",
    locale: "en_US",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const year = new Date().getFullYear();
  const isSubscribed = await getIsSubscribedFromCookies();

  return (
    <html lang="en">
      <body className="min-h-screen bg-zinc-50 text-slate-900">
        <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 sm:px-6 lg:px-8">
          <header className="sticky top-4 z-50 overflow-hidden rounded-2xl border border-black/10 bg-gradient-to-r from-rose-50 via-amber-50 to-sky-100 px-4 py-3 shadow-[0_14px_30px_-22px_rgba(0,0,0,0.45)] sm:px-6">
            <div className="pointer-events-none absolute -left-8 top-0 h-20 w-20 rounded-full bg-rose-300/20 blur-2xl" />
            <div className="pointer-events-none absolute -right-8 -top-4 h-24 w-24 rounded-full bg-sky-300/20 blur-2xl" />

            <div className="relative flex items-center justify-between gap-4">
              <div className="flex items-center gap-8">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-sm font-extrabold tracking-tight text-zinc-900"
                >
                  <span
                    aria-hidden="true"
                    className="inline-block h-0 w-0 border-x-[6px] border-b-[10px] border-x-transparent border-b-current"
                  />
                  <span>Vercel Daily</span>
                </Link>
                <nav className="flex items-center gap-2">
                  <NavPillLink href="/">Home</NavPillLink>
                  <NavPillLink href="/search">Search</NavPillLink>
                </nav>
              </div>
              <SubscribeButton initialSubscribed={isSubscribed} />
            </div>
          </header>
          {children}
          <footer className="relative mb-4 mt-8 overflow-hidden rounded-2xl border border-black/10 bg-gradient-to-r from-sky-100 via-amber-50 to-rose-50 px-4 py-3 text-zinc-700 shadow-[0_14px_30px_-22px_rgba(0,0,0,0.45)] sm:px-6">
            <div className="pointer-events-none absolute -left-8 -bottom-4 h-24 w-24 rounded-full bg-sky-300/20 blur-2xl" />
            <div className="pointer-events-none absolute -right-10 top-0 h-24 w-24 rounded-full bg-rose-300/20 blur-2xl" />

            <div className="relative">
              <p className="max-w-xl text-sm leading-relaxed text-zinc-700 sm:text-base">
                (c) {year} Vercel Daily by Bogdan. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
