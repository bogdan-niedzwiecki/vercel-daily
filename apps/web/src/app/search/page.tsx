import { ArticlesSection } from "@/components/articles-section";
import { ArticlesSkeleton } from "@/components/articles-skeleton";
import type { Metadata } from "next";
import { Suspense } from "react";
import { FilterControlsSection } from "./filter-controls-section";

type SearchPageProps = {
  searchParams: Promise<{
    category?: string;
    search?: string;
  }>;
};

export const metadata: Metadata = {
  title: "Vercel Daily | Search",
  description: "Browse the latest articles curated by Vercel Daily.",
  openGraph: {
    title: "Vercel Daily | Search",
    description: "Browse the latest articles curated by Vercel Daily.",
    url: "/search",
  },
};

function FilterControlsSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="mb-6 h-[74px] animate-pulse rounded-2xl border border-black/10 bg-zinc-200/70"
    />
  );
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { category, search } = await searchParams;
  const selectedCategory = category?.trim() ? category : undefined;
  const selectedSearch = search?.trim() ? search : undefined;

  return (
    <main className="flex-1 py-8">
      <section>
        <div className="mb-6 space-y-2">
          <p className="text-2xl font-black tracking-tight text-zinc-900 sm:text-3xl">
            Search
          </p>
          <h1 className="max-w-2xl text-base leading-relaxed text-zinc-700 sm:text-lg">
            Default set of articles to help you start exploring the latest
            stories.
          </h1>
        </div>
        <Suspense fallback={<FilterControlsSkeleton />}>
          <FilterControlsSection
            currentCategory={selectedCategory}
            currentSearch={selectedSearch}
          />
        </Suspense>
        <Suspense fallback={<ArticlesSkeleton />}>
          <ArticlesSection
            category={selectedCategory}
            limit={selectedCategory || selectedSearch ? 5 : undefined}
            search={selectedSearch}
          />
        </Suspense>
      </section>
    </main>
  );
}
