import Image from "next/image";
import Link from "next/link";
import { SubscribeButton } from "./subscribe-button";

type HeroSectionProps = {
  initialSubscribed?: boolean;
};

export function HeroSection({ initialSubscribed = false }: HeroSectionProps) {
  return (
    <section className="relative isolate overflow-hidden rounded-3xl border border-black/10 bg-gradient-to-br from-rose-50 via-amber-50 to-sky-100 px-6 py-10 shadow-[0_14px_30px_-22px_rgba(0,0,0,0.45)] sm:px-10 lg:px-12 lg:py-14">
      <div className="absolute -left-16 top-0 h-56 w-56 rounded-full bg-rose-300/30 blur-3xl" />
      <div className="absolute -bottom-24 right-10 h-64 w-64 rounded-full bg-sky-300/30 blur-3xl" />

      <div className="relative grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <div className="space-y-5">
          <p className="pill-badge">Featured coverage</p>
          <h1 className="max-w-2xl text-4xl font-black leading-tight tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
            Build Faster, Ship Smarter, Stay Ahead.
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-zinc-700 sm:text-lg">
            Vercel Daily curates the most important releases, deep dives, and
            practical engineering insights so modern web teams can move with
            confidence.
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-2xl border border-black/10 bg-white/80 shadow-2xl backdrop-blur">
            <div className="bg-zinc-900 px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-200">
              Featured Story
            </div>
            <div className="relative aspect-[4/3]">
              <Image
                src="https://i8qy5y6gxkdgdcv9.public.blob.vercel-storage.com/news/helly-hansen-migrated-to-vercel-and-drove-80-black-friday-growth.png"
                alt="Helly Hansen migrated to Vercel and drove 80% Black Friday growth"
                fill
                priority
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/75">
                  Featured Case Study
                </p>
                <h2 className="mt-2 text-xl font-extrabold leading-tight sm:text-2xl">
                  Helly Hansen Migrated to Vercel and Drove 80% Black Friday
                  Growth
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mt-8 flex flex-wrap items-center gap-3">
        <Link
          href="/search"
          className="pill-control pill-control-secondary inline-flex items-center"
        >
          Browse articles
        </Link>
        <SubscribeButton initialSubscribed={initialSubscribed} />
      </div>
    </section>
  );
}
