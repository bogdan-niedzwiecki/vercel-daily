import "server-only";

import { cookies } from "next/headers";
import { cache } from "react";

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

export type SubscriptionStatus = "active" | "inactive";

export type Subscription = {
    token: string;
    status: SubscriptionStatus;
    subscribedAt?: string | null;
    createdAt: string;
    updatedAt: string;
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
    init?: RequestInit,
): Promise<ApiEnvelope<TData> | null> {

    if (!BYPASS_TOKEN) {
        return null;
    }

    try {
        const response = await fetch(`${API_BASE_URL}${path}`, {
            ...init,
            headers: {
                "x-vercel-protection-bypass": BYPASS_TOKEN,
                ...(init?.headers ?? {}),
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

export async function createSubscription() {
    const payload = await apiGet<Subscription>(
        "/subscription/create",
        undefined,
        {
            method: "POST",
            cache: "no-store",
        },
    );

    return payload?.data ?? null;
}

export async function getSubscriptionStatus(token: string) {
    const payload = await apiGet<Subscription>(
        "/subscription",
        undefined,
        {
            cache: "no-store",
            headers: {
                "x-subscription-token": token,
            },
        },
    );

    return payload?.data ?? null;
}

export async function activateSubscription(token: string) {
    const payload = await apiGet<Subscription>(
        "/subscription",
        undefined,
        {
            method: "POST",
            cache: "no-store",
            headers: {
                "x-subscription-token": token,
            },
        },
    );

    return payload?.data ?? null;
}

export async function deactivateSubscription(token: string) {
    const payload = await apiGet<Subscription>(
        "/subscription",
        undefined,
        {
            method: "DELETE",
            cache: "no-store",
            headers: {
                "x-subscription-token": token,
            },
        },
    );

    return payload?.data ?? null;
}

export const getIsSubscribedFromCookies = cache(async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("vercel-daily-subscription-token")?.value;

    if (!token) {
        return false;
    }

    const subscription = await getSubscriptionStatus(token);

    return subscription?.status === "active";
});