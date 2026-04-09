"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

type CategoryOption = {
  slug: string;
  name: string;
  articleCount: number;
};

type Props = {
  currentCategory?: string;
  currentSearch?: string;
  categories: CategoryOption[];
};

const MIN_SEARCH_LENGTH = 3;
const SEARCH_DEBOUNCE_MS = 400;

export function FilterControls({
  currentCategory,
  currentSearch,
  categories,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(currentSearch ?? "");

  useEffect(() => {
    setSearchValue(currentSearch ?? "");
  }, [currentSearch]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      if (name !== "page") {
        params.delete("page");
      }
      return params.toString();
    },
    [searchParams],
  );

  useEffect(() => {
    const trimmedSearchValue = searchValue.trim();
    const trimmedCurrentSearch = (currentSearch ?? "").trim();
    if (trimmedSearchValue === trimmedCurrentSearch) {
      return;
    }

    const isSearchCleared = trimmedSearchValue.length === 0;
    const meetsMinLength = trimmedSearchValue.length >= MIN_SEARCH_LENGTH;
    const isShorteningExistingSearch =
      trimmedCurrentSearch.length > 0 &&
      trimmedSearchValue.length < trimmedCurrentSearch.length;
    const shouldAutoSearch =
      isSearchCleared || meetsMinLength || isShorteningExistingSearch;

    if (!shouldAutoSearch) {
      return;
    }

    const timeoutId = setTimeout(() => {
      router.replace(
        `${pathname}?${createQueryString("search", trimmedSearchValue)}`,
      );
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchValue, currentSearch, router, pathname, createQueryString]);

  const handleCategoryChange = (category: string) => {
    router.replace(`${pathname}?${createQueryString("category", category)}`);
  };

  const clearFilters = () => {
    router.replace(pathname);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.replace(
      `${pathname}?${createQueryString("search", searchValue.trim())}`,
    );
  };

  return (
    <form
      onSubmit={handleSearchSubmit}
      className="mb-6 flex flex-wrap items-end gap-3 rounded-2xl border border-black/10 bg-white/80 p-4"
    >
      <div className="flex flex-col gap-1">
        <label
          htmlFor="category"
          className="text-sm font-semibold text-zinc-700"
        >
          Category
        </label>
        <select
          id="category"
          name="category"
          value={currentCategory || ""}
          onChange={(event) => handleCategoryChange(event.target.value)}
          className="min-w-52 rounded-xl border border-black/10 bg-white px-3 py-2 text-sm text-zinc-800 outline-none transition focus:border-zinc-400"
        >
          <option value="">All categories</option>
          {categories.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.name} ({item.articleCount})
            </option>
          ))}
        </select>
      </div>

      <div className="flex min-w-60 flex-1 flex-col gap-1">
        <label htmlFor="search" className="text-sm font-semibold text-zinc-700">
          Search
        </label>
        <input
          id="search"
          name="search"
          type="text"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          placeholder="Search articles..."
          className="rounded-xl border border-black/10 bg-white px-3 py-2 text-sm text-zinc-800 outline-none transition focus:border-zinc-400"
        />
      </div>

      <button
        type="submit"
        className="cursor-pointer rounded-xl border border-zinc-900 bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-black"
      >
        Search
      </button>

      {(currentCategory || currentSearch) && (
        <button
          type="button"
          onClick={clearFilters}
          className="cursor-pointer rounded-xl border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-700 transition hover:border-red-300 hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-200"
        >
          Clear filters
        </button>
      )}
    </form>
  );
}
