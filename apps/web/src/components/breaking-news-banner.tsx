import Link from "next/link";
import { getBreakingNewsItem } from "@/lib/server/vercel-daily-api";

export async function BreakingNewsBanner() {
  const item = await getBreakingNewsItem();

  if (!item) {
    return null;
  }

  return (
    <section className="relative mt-6 overflow-hidden rounded-2xl border border-black/10 bg-gradient-to-r from-rose-50 via-amber-50 to-sky-100 px-4 py-3 text-sm shadow-[0_14px_30px_-22px_rgba(0,0,0,0.45)] sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute -left-10 top-0 h-20 w-20 rounded-full bg-rose-300/25 blur-2xl" />
      <div className="pointer-events-none absolute -right-8 -top-5 h-24 w-24 rounded-full bg-sky-300/25 blur-2xl" />

      <p className="relative flex items-center gap-3 overflow-hidden whitespace-nowrap text-zinc-800">
        <span className="pill-badge">Breaking</span>
        <Link
          href={`/articles/${item.articleId}`}
          className="truncate font-semibold text-zinc-900 hover:underline"
        >
          {item.headline}
        </Link>
      </p>
    </section>
  );
}
