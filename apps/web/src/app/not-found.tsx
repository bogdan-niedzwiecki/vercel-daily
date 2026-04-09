import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center py-8">
      <section className="relative isolate w-full overflow-hidden rounded-3xl border border-sky-300/60 bg-gradient-to-br from-sky-100 via-cyan-50 to-blue-200 px-6 py-10 shadow-[0_14px_30px_-22px_rgba(3,105,161,0.45)] sm:px-10 lg:px-12 lg:py-14">
        <div className="absolute -left-16 top-0 h-56 w-56 rounded-full bg-sky-500/25 blur-3xl" />
        <div className="absolute -bottom-24 right-10 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="relative grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          <div className="space-y-5">
            <p className="inline-flex rounded-full border border-sky-300 bg-gradient-to-r from-sky-200 to-blue-200 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-sky-900">
              Error 404
            </p>
            <h1 className="max-w-2xl text-4xl font-black leading-tight tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
              This story no longer exists.
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-slate-700 sm:text-lg">
              The link may be outdated, the article might have moved, or the
              page was removed. Jump back to the latest coverage and keep
              reading.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/"
                className="pill-control inline-flex items-center border-sky-700 bg-sky-700 text-white hover:border-sky-800 hover:bg-sky-800"
              >
                Back to home
              </Link>
              <Link
                href="/search"
                className="pill-control inline-flex items-center"
              >
                Open search
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-sky-300/60 bg-white/85 shadow-2xl backdrop-blur">
              <div className="bg-sky-900 px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-sky-100">
                Navigation Tips
              </div>
              <div className="space-y-4 p-5 sm:p-6">
                <div className="rounded-2xl border border-sky-200 bg-sky-50 p-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-sky-700">
                    Shortcut
                  </p>
                  <p className="mt-1 text-sm font-semibold text-sky-950">
                    Return to the homepage to see featured stories and breaking
                    news.
                  </p>
                </div>
                <div className="rounded-2xl border border-sky-200 bg-sky-50 p-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-sky-700">
                    Tip
                  </p>
                  <p className="mt-1 text-sm font-semibold text-sky-950">
                    Use search to find the latest article by topic, tag, or
                    headline.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
