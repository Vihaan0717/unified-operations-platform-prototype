import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10 font-sans">
      <main className="w-full max-w-4xl rounded-2xl border border-slate-200 bg-white px-8 py-10 shadow-xl shadow-slate-200/70">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
              CareOps
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Coordinate care with clarity and confidence.
            </h1>
            <p className="mt-3 text-sm text-slate-600">
              CareOps is your operational command center for patient communication,
              bookings, and clinical inventory. Guide your team through safe,
              connected workflows in a single, modern workspace.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/onboarding"
                className="inline-flex items-center justify-center rounded-full bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-sky-300 transition hover:bg-sky-700"
              >
                Get Started
              </Link>
              <span className="text-xs text-slate-500">
                No credit card required • Set up in minutes
              </span>
            </div>
          </div>

          <div className="mt-6 w-full max-w-sm md:mt-0">
            <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 shadow-sm">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-sky-700">
                Preview
              </p>
              <p className="mt-1 text-xs text-slate-500">
                A glimpse of what you&apos;ll configure in onboarding.
              </p>
              <div className="mt-4 space-y-3 text-xs">
                <div className="flex items-center justify-between rounded-xl bg-white px-3 py-2 shadow-sm">
                  <span className="text-slate-600">Workspace</span>
                  <span className="rounded-full bg-sky-50 px-2 py-0.5 text-[11px] font-medium text-sky-800">
                    CareOps Clinic
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-white px-3 py-2 shadow-sm">
                  <span className="text-slate-600">Channels</span>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-800">
                    Email · SMS
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-white px-3 py-2 shadow-sm">
                  <span className="text-slate-600">Status</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-800">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Ready to launch
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
