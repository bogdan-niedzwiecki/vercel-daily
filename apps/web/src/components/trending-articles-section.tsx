import { ArticleCard } from "@/components/article-card";
import { getTrendingArticles } from "@/lib/server/vercel-daily-api";

export async function TrendingArticlesSection() {
  const articles = await getTrendingArticles();

  if (!articles.length) {
    return null;
  }

  return (
    <section className="mt-8">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div className="space-y-2">
          <p className="text-2xl font-black tracking-tight text-zinc-900 sm:text-3xl">
            Trending articles
          </p>
          <h2 className="max-w-xl text-base leading-relaxed text-zinc-700 sm:text-lg">
            What the community is reading right now
          </h2>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} variant="trending" />
        ))}
      </div>
    </section>
  );
}
