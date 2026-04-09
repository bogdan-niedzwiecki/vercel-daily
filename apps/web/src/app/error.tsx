"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex flex-1 items-center py-8">
      <section className="relative isolate w-full overflow-hidden rounded-3xl border border-rose-300/60 bg-gradient-to-br from-rose-100 via-red-50 to-rose-200 px-6 py-10 shadow-[0_14px_30px_-22px_rgba(127,29,29,0.45)] sm:px-10 lg:px-12 lg:py-14">
        <div className="absolute -left-16 top-0 h-56 w-56 rounded-full bg-rose-500/25 blur-3xl" />
        <div className="absolute -bottom-24 right-10 h-64 w-64 rounded-full bg-red-500/20 blur-3xl" />

        <div className="relative grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          <div className="space-y-5">
            <p className="inline-flex rounded-full border border-rose-300 bg-gradient-to-r from-rose-200 to-red-200 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-rose-900">
              Runtime Error
            </p>
            <h1 className="max-w-2xl text-4xl font-black leading-tight tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
              Something went wrong while loading this page.
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-zinc-800 sm:text-lg">
              We hit an unexpected issue. You can retry this view or continue
              browsing the latest stories.
            </p>

            <div className="rounded-2xl border border-rose-300/80 bg-rose-50/85 p-4 text-left shadow-sm backdrop-blur">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-rose-700">
                Error details
              </p>
              <p className="mt-2 text-sm font-semibold text-rose-950">
                {error.message || "An unexpected error occurred"}
              </p>
              {error.digest && (
                <p className="mt-2 font-mono text-[11px] text-rose-700">
                  Error ID: {error.digest}
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={reset}
                className="pill-control inline-flex cursor-pointer items-center border-rose-700 bg-rose-700 text-white hover:border-rose-800 hover:bg-rose-800"
              >
                Try again
              </button>
              <Link href="/" className="pill-control inline-flex items-center">
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
            <div className="overflow-hidden rounded-2xl border border-rose-300/60 bg-white/85 shadow-2xl backdrop-blur">
              <div className="bg-rose-900 px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-rose-100">
                Recovery
              </div>
              <div className="space-y-4 p-5 sm:p-6">
                <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-rose-700">
                    Step 1
                  </p>
                  <p className="mt-1 text-sm font-semibold text-rose-950">
                    Click Try again to re-run this route and fetch fresh data.
                  </p>
                </div>
                <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-rose-700">
                    Step 2
                  </p>
                  <p className="mt-1 text-sm font-semibold text-rose-950">
                    If the issue persists, jump to Home or Search and keep
                    exploring.
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
