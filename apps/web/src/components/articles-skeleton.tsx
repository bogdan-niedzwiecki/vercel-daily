export function ArticlesSkeleton() {
  return (
    <div aria-hidden="true">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl border border-black/10 bg-zinc-200/70 p-4 shadow-[0_14px_30px_-22px_rgba(0,0,0,0.45)]"
          >
            <div className="mb-4 h-44 w-full animate-pulse rounded-2xl border border-black/10 bg-zinc-200/70" />
            <div className="space-y-3">
              <div className="h-4 w-20 animate-pulse rounded-2xl border border-black/10 bg-zinc-200/70" />
              <div className="h-5 w-full animate-pulse rounded-2xl border border-black/10 bg-zinc-200/70" />
              <div className="h-5 w-5/6 animate-pulse rounded-2xl border border-black/10 bg-zinc-200/70" />
              <div className="h-4 w-2/3 animate-pulse rounded-2xl border border-black/10 bg-zinc-200/70" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
