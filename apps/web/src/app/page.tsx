import type { Metadata } from "next";
import { Suspense } from "react";
import { getIsSubscribedFromCookies } from "@/lib/server/vercel-daily-api";
import { ArticlesSkeleton } from "../components/articles-skeleton";
import { ArticlesSection } from "../components/articles-section";
import { BreakingNewsBanner } from "../components/breaking-news-banner";
import { HeroSection } from "../components/hero-section";

export const metadata: Metadata = {
  title: "Vercel Daily | Home",
  description: "News and insights for modern web developers.",
  openGraph: {
    title: "Vercel Daily | Home",
    description: "Featured stories, breaking coverage, and developer insights.",
    url: "/",
  },
};

function BreakingNewsBannerSkeleton() {
  return (
    <section
      aria-hidden="true"
      className="mt-6 h-[52px] animate-pulse rounded-2xl border border-black/10 bg-zinc-200/70 shadow-[0_14px_30px_-22px_rgba(0,0,0,0.45)] sm:h-[56px]"
    />
  );
}

export default async function Page() {
  const isSubscribed = await getIsSubscribedFromCookies();

  return (
    <main className="flex-1 py-8">
      <HeroSection initialSubscribed={isSubscribed} />
      <Suspense fallback={<BreakingNewsBannerSkeleton />}>
        <BreakingNewsBanner />
      </Suspense>
      <section className="mt-8">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div className="space-y-2">
            <p className="text-2xl font-black tracking-tight text-zinc-900 sm:text-3xl">
              Featured stories
            </p>
            <h2 className="max-w-xl text-base leading-relaxed text-zinc-700 sm:text-lg">
              Top Picks for Today
            </h2>
          </div>
        </div>
        <Suspense fallback={<ArticlesSkeleton />}>
          <ArticlesSection />
        </Suspense>
      </section>
    </main>
  );
}
