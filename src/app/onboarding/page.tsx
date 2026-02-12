"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function OnboardingPage() {
  const router = useRouter();
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
  const [bookingTypeDefined, setBookingTypeDefined] = useState(false);
  const [workspaceActivated, setWorkspaceActivated] = useState(false);

  // NEW: Validation to ensure at least one channel is active (Requirement 11)
  const isChannelConnected = channels.email || channels.sms;

  const handleNextFromStep1 = (e: React.FormEvent) => {
    e.preventDefault();
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
                {step === 1
                  ? "Step 1: Workspace Creation"
                  : workspaceActivated
                  ? "Workspace Activated"
                  : "Step 2: Connect & Activate"}
              </h1>
              <p className="mt-1 text-xs text-slate-500">
                {step === 1
                  ? "Tell us a bit about your organization so we can tailor CareOps to your team."
                  : workspaceActivated
                  ? "Your CareOps workspace is live. You can now direct your team to the dashboard."
                  : "Connect channels and confirm your checklist before activating your workspace."}
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 text-[11px] font-medium text-slate-600">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-sky-600 text-xs font-semibold text-white">
                {workspaceActivated ? "✓" : step}
              </span>
              <span>{workspaceActivated ? "Complete" : "of 2"}</span>
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
              </div>

              <button
                type="submit"
                className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-sky-300 transition hover:bg-sky-700"
              >
                Next
              </button>
            </form>
          )}

          {step === 2 && !workspaceActivated && (
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

              {/* Activation checklist (Updated to satisfy Step 11 logic) */}
              <div className="mt-2 rounded-xl border border-slate-100 bg-white px-4 py-3 text-xs text-slate-700 shadow-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Activation Checklist
                </p>
                <ul className="mt-2 space-y-1.5">
                  <li className="flex items-center gap-2">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-semibold text-white">✓</span>
                    <span>Workspace Created</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className={`flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-semibold text-white ${isChannelConnected ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                      {isChannelConnected ? "✓" : "!"}
                    </span>
                    <span>Communication Channels Connected (Required)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setBookingTypeDefined((prev) => !prev)}
                      className={`flex h-4 w-4 items-center justify-center rounded border text-[10px] font-semibold ${
                        bookingTypeDefined
                          ? "border-sky-500 bg-sky-500 text-white"
                          : "border-slate-300 bg-white text-slate-400"
                      }`}
                    >
                      {bookingTypeDefined ? "✓" : ""}
                    </button>
                    <span>Booking Type Defined (Required)</span>
                  </li>
                </ul>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setWorkspaceActivated(true)}
                  disabled={!bookingTypeDefined || !isChannelConnected}
                  className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-2 text-xs font-semibold text-white shadow-sm shadow-emerald-300 transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-400/60 disabled:shadow-none"
                >
                  Activate Workspace
                </button>
              </div>
            </div>
          )}

          {step === 2 && workspaceActivated && (
            <div className="flex flex-col items-center justify-center gap-4 py-8 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 shadow-inner">
                <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white">
                  <span className="absolute inline-flex h-12 w-12 animate-ping rounded-full bg-emerald-300 opacity-60" />
                  <span className="relative text-2xl">⚡</span>
                </div>
              </div>
              <h2 className="text-lg font-semibold tracking-tight text-slate-900">
                Workspace Activated!
              </h2>
              <p className="max-w-md text-sm text-slate-600">
                Your CareOps workspace is live. Inbox routing, bookings, and
                inventory monitoring are ready for your team to use.
              </p>
              <button
                type="button"
                onClick={() => router.push("/dashboard")}
                className="mt-2 inline-flex items-center justify-center rounded-full bg-sky-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm shadow-sky-300 transition hover:bg-sky-700"
              >
                Go to Dashboard
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// Sub-component remains unchanged
function ChannelToggle({
  label,
  description,
  enabled,
  onChange,
}: {
  label: string;
  description: string;
  enabled: boolean;
  onChange: (value: boolean) => void;
}) {
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