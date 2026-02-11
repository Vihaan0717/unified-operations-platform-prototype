"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const steps = [
  { id: 1, title: "Workspace Creation", description: "Set up the core details for your CareOps workspace." },
  { id: 2, title: "Connect Channels", description: "Enable communication channels your team will use with patients." },
  { id: 3, title: "Availability", description: "Configure when your care team is available to respond." },
];

export default function Onboarding() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);

  const [workspace, setWorkspace] = useState({
    businessName: "",
    address: "",
    email: "",
  });

  const [channels, setChannels] = useState({
    email: true,
    sms: false,
  });

  const [availability, setAvailability] = useState<Record<string, boolean>>({
    "09:00": true,
    "11:00": false,
    "13:00": false,
    "15:00": false,
    "17:00": false,
  });

  const isLastStep = currentStep === steps.length;

  const handleNext = () => {
    if (!isLastStep) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleFinish = () => {
    router.push("/dashboard");
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Business Name
              </label>
              <input
                type="text"
                value={workspace.businessName}
                onChange={(e) =>
                  setWorkspace((prev) => ({ ...prev, businessName: e.target.value }))
                }
                placeholder="e.g. Northside Care Group"
                className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 shadow-sm focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Address
              </label>
              <input
                type="text"
                value={workspace.address}
                onChange={(e) =>
                  setWorkspace((prev) => ({ ...prev, address: e.target.value }))
                }
                placeholder="Clinic or headquarters address"
                className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 shadow-sm focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Contact Email
              </label>
              <input
                type="email"
                value={workspace.email}
                onChange={(e) =>
                  setWorkspace((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="ops@caregroup.com"
                className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 shadow-sm focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-100"
              />
              <p className="mt-2 text-xs text-slate-500">
                We’ll use this for critical notifications and escalations.
              </p>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-sky-700">
                Channels
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Choose which communication channels are active for this workspace. You
                can configure providers later.
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
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-sky-700">
                Time Slots
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Select the core hours when your care coordination team is actively
                monitoring channels.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {Object.entries(availability).map(([time, active]) => (
                <button
                  key={time}
                  type="button"
                  onClick={() =>
                    setAvailability((prev) => ({
                      ...prev,
                      [time]: !prev[time],
                    }))
                  }
                  className={`flex items-center justify-center rounded-lg border px-3 py-2 text-sm font-medium transition ${
                    active
                      ? "border-sky-500 bg-sky-50 text-sky-900 shadow-sm"
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10 font-sans">
      <div className="w-full max-w-4xl rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
        <div className="flex flex-col gap-6 border-b border-slate-100 px-8 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">
              CareOps
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
              Onboarding wizard
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Configure the essentials so your care operations team can start working
              with confidence.
            </p>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-sky-50 text-xs font-semibold text-sky-700">
              {currentStep}
            </span>
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
              Step {currentStep} of {steps.length}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-8 px-8 pb-8 pt-6 sm:flex-row">
          <aside className="w-full sm:w-64">
            <ol className="space-y-3">
              {steps.map((step) => {
                const isActive = step.id === currentStep;
                const isCompleted = step.id < currentStep;
                return (
                  <li key={step.id}>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(step.id)}
                      className={`flex w-full items-start gap-3 rounded-xl border px-3.5 py-3 text-left transition ${
                        isActive
                          ? "border-sky-500 bg-sky-50"
                          : isCompleted
                          ? "border-emerald-500/70 bg-emerald-50/60"
                          : "border-slate-100 bg-slate-50/40 hover:border-slate-200"
                      }`}
                    >
                      <div
                        className={`mt-0.5 flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                          isCompleted
                            ? "bg-emerald-500 text-white"
                            : isActive
                            ? "bg-sky-500 text-white"
                            : "bg-slate-200 text-slate-700"
                        }`}
                      >
                        {isCompleted ? "✓" : step.id}
                      </div>
                      <div>
                        <p
                          className={`text-sm font-medium ${
                            isActive
                              ? "text-slate-900"
                              : isCompleted
                              ? "text-emerald-900"
                              : "text-slate-700"
                          }`}
                        >
                          {step.title}
                        </p>
                        <p className="mt-0.5 text-xs text-slate-500">
                          {step.description}
                        </p>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ol>
          </aside>

          <section className="flex-1">
            <div className="rounded-2xl border border-slate-100 bg-slate-50/40 p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                    {steps[currentStep - 1].title}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {steps[currentStep - 1].description}
                  </p>
                </div>
              </div>

              {renderStepContent()}

              <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Back
                </button>

                <div className="flex items-center gap-3">
                  {!isLastStep && (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="inline-flex items-center gap-1 rounded-full bg-sky-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm shadow-sky-300 transition hover:bg-sky-700"
                    >
                      Next
                    </button>
                  )}
                  {isLastStep && (
                    <button
                      type="button"
                      onClick={handleFinish}
                      className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm shadow-emerald-300 transition hover:bg-emerald-700"
                    >
                      Finish & go to dashboard
                    </button>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
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

function ChannelToggle({ label, description, enabled, onChange }: ChannelToggleProps) {
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
