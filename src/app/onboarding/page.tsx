"use client";

import { useState } from "react";

export default function OnboardingPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [workspace, setWorkspace] = useState({
    businessName: "",
    address: "",
    email: "",
  });
  const [channels, setChannels] = useState({
    email: true,
    sms: false,
  });

  const handleNextFromStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    // workspace details are already in local state; just advance the flow
    setStep(2);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10 font-sans">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
        <header className="border-b border-slate-100 px-6 py-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">
            CareOps Onboarding
          </p>
          <div className="mt-2 flex items-center justify-between gap-3">
            <div>
              <h1 className="text-xl font-semibold tracking-tight text-slate-900">
                {step === 1 ? "Step 1: Workspace Creation" : "Step 2: Connect Channels"}
              </h1>
              <p className="mt-1 text-xs text-slate-500">
                {step === 1
                  ? "Tell us a bit about your organization so we can tailor CareOps to your team."
                  : "Choose which communication channels you want to enable for this workspace."}
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 text-[11px] font-medium text-slate-600">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-sky-600 text-xs font-semibold text-white">
                {step}
              </span>
              <span>of 2</span>
            </div>
          </div>
        </header>

        <main className="px-6 py-5">
          {step === 1 && (
            <form onSubmit={handleNextFromStep1} className="space-y-5">
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
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-sky-700">
                  Workspace summary
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  You&apos;re configuring channels for{" "}
                  <span className="font-semibold text-slate-900">
                    {workspace.businessName || "your workspace"}
                  </span>
                  .
                </p>
              </div>

              <div className="space-y-4">
                <ChannelToggle
                  label="Email"
                  description="Send care plans, summaries, and reminders via email."
                  enabled={channels.email}
                  onChange={(value) =>
                    setChannels((prev) => ({ ...prev, email: value }))
                  }
                />
                <ChannelToggle
                  label="SMS"
                  description="Reach patients with time-sensitive alerts and reminders."
                  enabled={channels.sms}
                  onChange={(value) =>
                    setChannels((prev) => ({ ...prev, sms: value }))
                  }
                />
              </div>

              <p className="text-[11px] text-slate-500">
                These settings can be refined later in workspace settings. For now,
                we&apos;re just capturing your preferred starting configuration.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

type ChannelToggleProps = {
  label: string;
  description: string;
  enabled: boolean;
  onChange: (value: boolean) => void;
};

function ChannelToggle({
  label,
  description,
  enabled,
  onChange,
}: ChannelToggleProps) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-sm">
      <div>
        <p className="text-sm font-medium text-slate-900">{label}</p>
        <p className="mt-1 text-xs text-slate-500">{description}</p>
      </div>
      <button
        type="button"
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
          enabled ? "bg-sky-600" : "bg-slate-200"
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition ${
            enabled ? "translate-x-5" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}


