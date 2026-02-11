"use client";

import { useState } from "react";

export default function OnboardingPage() {
  const [workspace, setWorkspace] = useState({
    businessName: "",
    address: "",
    email: "",
  });
  const [showNextMessage, setShowNextMessage] = useState(false);

  const handleNext = () => {
    setShowNextMessage(true);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10 font-sans">
      <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
        <header className="border-b border-slate-100 px-6 py-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">
            CareOps Onboarding
          </p>
          <h1 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">
            Step 1: Workspace Creation
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Tell us a bit about your organization so we can tailor CareOps to your
            team.
          </p>
        </header>

        <main className="px-6 py-5">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleNext();
            }}
            className="space-y-5"
          >
            <div>
              <label className="block text-xs font-medium text-slate-700">
                Business Name
              </label>
              <input
                type="text"
                value={workspace.businessName}
                onChange={(e) =>
                  setWorkspace((prev) => ({
                    ...prev,
                    businessName: e.target.value,
                  }))
                }
                required
                placeholder="e.g. Northside Care Group"
                className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-100"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700">
                Address
              </label>
              <input
                type="text"
                value={workspace.address}
                onChange={(e) =>
                  setWorkspace((prev) => ({
                    ...prev,
                    address: e.target.value,
                  }))
                }
                required
                placeholder="Clinic or headquarters address"
                className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-100"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700">
                Contact Email
              </label>
              <input
                type="email"
                value={workspace.email}
                onChange={(e) =>
                  setWorkspace((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                required
                placeholder="ops@caregroup.com"
                className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-100"
              />
              <p className="mt-2 text-[11px] text-slate-500">
                We&apos;ll use this for important workspace notifications.
              </p>
            </div>

            <button
              type="submit"
              className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-sky-300 transition hover:bg-sky-700"
            >
              Next
            </button>
          </form>

          {showNextMessage && (
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-sky-100 bg-sky-50 px-3 py-2 text-xs text-sky-800">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
              <span className="font-medium">Moving to Step 2</span>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

