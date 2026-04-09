import "server-only";

const API_BASE_URL =
    process.env.VERCEL_DAILY_NEWS_API_BASE_URL;
const BYPASS_TOKEN = process.env.VERCEL_DAILY_NEWS_BYPASS_TOKEN;


type ApiEnvelope<TData> = {
    success?: boolean;
    data?: TData;
};

export type BreakingNewsItem = {
    id: string;
    headline: string;
    summary: string;
    articleId: string;
    category: string;
    publishedAt: string;
    urgent: boolean;
};

export type ContentBlock =
    | { type: "paragraph"; text: string }
    | { type: "heading"; level: 2 | 3; text: string }
    | { type: "blockquote"; text: string }
    | { type: "unordered-list"; items: string[] }
    | { type: "ordered-list"; items: string[] }
    | { type: "image"; src: string; alt: string; caption?: string };

export type Article = {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: ContentBlock[];
    image: string;
    category: string;
    publishedAt: string;
    featured: boolean;
    author: {
        name: string;
        avatar: string;
    };
    tags: string[];
};

export type ArticleCategory = {
    slug: string;
    name: string;
    articleCount: number;
};

type ArticlesQueryParams = {
    page?: number;
    category?: string;
    search?: string;
    featured?: boolean;
    limit?: number;
};

async function apiGet<TData>(
    path: string,
    next?: NextFetchRequestConfig,
): Promise<ApiEnvelope<TData> | null> {

    if (!BYPASS_TOKEN) {
        return null;
    }

    try {
        const response = await fetch(`${API_BASE_URL}${path}`, {
            headers: {
                "x-vercel-protection-bypass": BYPASS_TOKEN,
            },
            next,
        });


        if (!response.ok) {
            return null;
        }

        return (await response.json()) as ApiEnvelope<TData>;
    } catch {
        return null;
    }
}

export async function getBreakingNewsItem() {
    const payload = await apiGet<BreakingNewsItem>(
        "/breaking-news",
        { revalidate: 60 },
    );

    return payload?.data ?? null;
}

export async function getArticles(params: ArticlesQueryParams = {}) {
    const searchParams = new URLSearchParams(
        Object.entries(params)
            .filter(([, value]) => value !== undefined)
            .map(([key, value]) => [key, String(value)]),
    );

    const query = searchParams.toString();
    const payload = await apiGet<Article[]>(
        `/articles${query ? `?${query}` : ""}`,
        { revalidate: 120 },
    );

    const articles = payload?.data ?? [];

    return [...articles].sort(
        (a, b) =>
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime(),
    );
}

export async function getArticleBySlug(slug: string) {
    const payload = await apiGet<Article>(
        `/articles/${slug}`,
        { revalidate: 300 },
    );

    return payload?.data ?? null;
}

export async function getTrendingArticles() {
    const payload = await apiGet<Article[]>(
        "/articles/trending",
        { revalidate: 120 },
    );

    return payload?.data ?? [];
}

export async function getCategories(): Promise<ArticleCategory[]> {
    const payload = await apiGet<ArticleCategory[]>(
        "/categories",
        { revalidate: 300 },
    );

    return payload?.data ?? [];
}