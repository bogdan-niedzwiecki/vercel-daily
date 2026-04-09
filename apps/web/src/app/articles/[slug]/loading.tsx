export default function Loading() {
  return (
    <main className="flex-1 py-8" aria-hidden="true">
      <section className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-black/10 bg-white/80 shadow-[0_14px_30px_-22px_rgba(0,0,0,0.45)]">
        <div className="h-72 w-full animate-pulse border-b border-black/10 bg-zinc-200/70" />

        <div className="space-y-6 p-6 sm:p-8">
          <div className="h-7 w-28 animate-pulse rounded-2xl border border-black/10 bg-zinc-200/70" />
          <div className="h-10 w-5/6 animate-pulse rounded-2xl border border-black/10 bg-zinc-200/70" />
          <div className="h-4 w-48 animate-pulse rounded-2xl border border-black/10 bg-zinc-200/70" />

          <div className="space-y-3">
            <div className="h-4 w-full animate-pulse rounded-2xl border border-black/10 bg-zinc-200/70" />
            <div className="h-4 w-full animate-pulse rounded-2xl border border-black/10 bg-zinc-200/70" />
            <div className="h-4 w-4/5 animate-pulse rounded-2xl border border-black/10 bg-zinc-200/70" />
            <div className="h-4 w-full animate-pulse rounded-2xl border border-black/10 bg-zinc-200/70" />
            <div className="h-4 w-3/4 animate-pulse rounded-2xl border border-black/10 bg-zinc-200/70" />
          </div>

          <div className="h-16 w-full animate-pulse rounded-2xl border border-black/10 bg-zinc-200/70" />
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-5 space-y-2">
          <div className="h-7 w-36 animate-pulse rounded-2xl border border-black/10 bg-zinc-200/70" />
          <div className="h-8 w-64 animate-pulse rounded-2xl border border-black/10 bg-zinc-200/70" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden p-4 rounded-2xl border border-black/10 bg-zinc-200/70 shadow-[0_14px_30px_-22px_rgba(0,0,0,0.45)]"
            >
              <div className="h-44 w-full mb-4 animate-pulse rounded-2xl border border-black/10 bg-zinc-200/70" />
              <div className="space-y-3">
                <div className="h-4 w-20 animate-pulse rounded-2xl border border-black/10 bg-zinc-200/70" />
                <div className="h-5 w-full animate-pulse rounded-2xl border border-black/10 bg-zinc-200/70" />
                <div className="h-5 w-5/6 animate-pulse rounded-2xl border border-black/10 bg-zinc-200/70" />
                <div className="h-4 w-2/3 animate-pulse rounded-2xl border border-black/10 bg-zinc-200/70" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
