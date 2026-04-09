import { ArticleCard } from "@/components/article-card";
import { getArticles } from "@/lib/server/vercel-daily-api";

type ArticlesSectionProps = {
  category?: string;
  search?: string;
  limit?: number;
};

export async function ArticlesSection({
  category,
  limit = 6,
  search,
}: ArticlesSectionProps = {}) {
  const articles = await getArticles({ category, limit, search });

  if (!articles.length) {
    return (
      <p className="rounded-2xl border border-black/10 bg-white/80 p-4 text-sm text-zinc-700">
        No articles available right now. Please check back later.
      </p>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} variant="featured" />
      ))}
    </div>
  );
}
