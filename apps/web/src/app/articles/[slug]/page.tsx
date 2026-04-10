import { ArticleContent } from "@/components/article-content";
import { SubscribeButton } from "@/components/subscribe-button";
import { TrendingArticlesSection } from "@/components/trending-articles-section";
import { formatPublishedDate } from "@/lib/format-published-date";
import {
  getArticleBySlug,
  getIsSubscribedFromCookies,
} from "@/lib/server/vercel-daily-api";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Vercel Daily | Article Not Found",
    };
  }

  return {
    title: `Vercel Daily | ${article.title}`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.image],
      url: `/articles/${article.id}`,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const [article, isSubscribed] = await Promise.all([
    getArticleBySlug(slug),
    getIsSubscribedFromCookies(),
  ]);

  if (!article) {
    notFound();
  }

  return (
    <main className="flex-1 py-8">
      <article className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-black/10 bg-white/80 shadow-[0_14px_30px_-22px_rgba(0,0,0,0.45)]">
        <Image
          src={article.image}
          alt={article.title}
          width={767}
          height={288}
          className="h-72 w-full object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 767px"
        />

        <div className="space-y-6 p-6 sm:p-8">
          <p className="pill-badge w-fit">{article.category}</p>

          <h1 className="text-3xl font-black leading-tight tracking-tight text-zinc-900 sm:text-4xl">
            {article.title}
          </h1>

          <p className="text-sm font-medium text-zinc-600">
            {article.author.name}
            {" • "}
            {formatPublishedDate(article.publishedAt)}
          </p>
          {isSubscribed ? (
            <ArticleContent blocks={article.content} />
          ) : (
            <div className="space-y-4 rounded-2xl border border-black/10 bg-zinc-50/70 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-zinc-600">
                Subscriber-only content
              </p>
              <p className="text-base leading-relaxed text-zinc-700">
                {article.excerpt}
              </p>
            </div>
          )}
          <div className="flex items-center justify-between gap-4 rounded-2xl border border-black/10 bg-zinc-50/70 p-4">
            <p className="text-sm font-medium text-zinc-700">
              {isSubscribed
                ? "Enjoying the story? Get new posts in your inbox."
                : "Subscribe to unlock full article content and daily updates."}
            </p>
            <SubscribeButton initialSubscribed={isSubscribed} />
          </div>
        </div>
      </article>
      <TrendingArticlesSection />
    </main>
  );
}
