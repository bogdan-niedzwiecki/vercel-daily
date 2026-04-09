import type { Article } from "@/lib/server/vercel-daily-api";
import { formatPublishedDate } from "@/lib/format-published-date";
import Image from "next/image";
import Link from "next/link";

type ArticleCardProps = {
  article: Article;
  variant: "featured" | "trending";
};

export function ArticleCard({ article, variant }: ArticleCardProps) {
  const publishedDate = formatPublishedDate(article.publishedAt);
  const isTrending = variant === "trending";

  return (
    <Link
      href={`/articles/${article.id}`}
      className="block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
    >
      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/10 bg-white/80 shadow-[0_14px_30px_-22px_rgba(0,0,0,0.45)] transition-transform duration-200 hover:-translate-y-0.5">
        {!isTrending ? (
          <Image
            src={article.image}
            alt={article.title}
            width={718}
            height={176}
            className="h-44 w-full object-cover"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
        ) : null}
        <div className="flex flex-1 flex-col space-y-3 p-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-zinc-600">
            {article.category}
          </p>
          <h3 className="mt-2 text-lg font-extrabold leading-tight tracking-tight text-zinc-900 transition-colors group-hover:text-zinc-700">
            {article.title}
          </h3>
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-zinc-700">
            {article.excerpt}
          </p>
          <p className="mt-auto pt-2 text-xs font-medium text-zinc-600">
            {article.author.name}
            {" • "}
            {publishedDate}
          </p>
        </div>
      </article>
    </Link>
  );
}
