"use client";

import { useState } from "react";

type Inquiry = {
  id: number;
  name: string;
  summary: string;
  status: "new" | "open" | "resolved";
  time: string;
};

const inquiries: Inquiry[] = [
  {
    id: 1,
    name: "James Chen",
    summary: "Question about post-op wound care instructions",
    status: "new",
    time: "9:12 AM",
  },
  {
    id: 2,
    name: "Maria Rodriguez",
    summary: "Rescheduling follow-up appointment",
    status: "open",
    time: "8:47 AM",
  },
  {
    id: 3,
    name: "Daniel Lee",
    summary: "Insurance coverage for MRI",
    status: "open",
    time: "Yesterday",
  },
  {
    id: 4,
    name: "Patel Family",
    summary: "Care plan clarification for diabetes management",
    status: "resolved",
    time: "Mon",
  },
];

export default function InboxPage() {
  const [selectedId, setSelectedId] = useState<number>(1);
  const [aiAutoReply, setAiAutoReply] = useState<boolean>(true);
  const selectedInquiry = inquiries.find((i) => i.id === selectedId) ?? inquiries[0];

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      <main className="mx-auto flex w-full max-w-6xl flex-1 gap-6 px-4 py-8 lg:px-8">
        {/* Left: Patient inquiries list */}
        <section className="flex w-full max-w-xs flex-col rounded-2xl border border-slate-200 bg-white/90 shadow-sm">
          <div className="border-b border-slate-100 px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
              Patient Inquiries
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Triage, respond, and escalate conversations.
            </p>
          </div>
          <div className="flex-1 overflow-y-auto">
            <ul className="divide-y divide-slate-100">
              {inquiries.map((inquiry) => {
                const active = inquiry.id === selectedId;
                return (
                  <li key={inquiry.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedId(inquiry.id)}
                      className={`flex w-full flex-col items-start gap-1 px-4 py-3 text-left transition ${
                        active
                          ? "bg-sky-50/80"
                          : "hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex w-full items-center justify-between">
                        <p className="text-sm font-medium text-slate-900">
                          {inquiry.name}
                        </p>
                        <span className="text-xs text-slate-400">
                          {inquiry.time}
                        </span>
                      </div>
                      <p className="line-clamp-2 text-xs text-slate-500">
                        {inquiry.summary}
                      </p>
                      <StatusPill status={inquiry.status} />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* Right: Conversation thread */}
        <section className="flex min-h-[520px] flex-1 flex-col rounded-2xl border border-slate-200 bg-white/95 shadow-sm">
          {/* Header with AI toggle */}
          <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-5 py-4">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                {selectedInquiry.name}
              </p>
              <p className="mt-0.5 text-xs text-slate-500">
                Patient inquiry thread • Secure messaging
              </p>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-xs font-medium text-slate-500">
                AI Auto-Reply
              </p>
              <Toggle
                enabled={aiAutoReply}
                onChange={(v) => setAiAutoReply(v)}
              />
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-4 overflow-y-auto bg-slate-50/60 px-5 py-4">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-700">
                {selectedInquiry.name.charAt(0)}
              </div>
              <div className="max-w-md rounded-2xl rounded-tl-sm bg-white px-3.5 py-2.5 text-sm text-slate-800 shadow-sm">
                Hi, I&apos;d like to follow up on my recent visit and clarify a few
                details about my care plan.
              </div>
            </div>

            <div className="flex justify-end">
              <div className="flex items-start gap-3">
                <div className="max-w-md rounded-2xl rounded-tr-sm bg-sky-600 px-3.5 py-2.5 text-sm text-white shadow-sm">
                  Thanks for reaching out. I&apos;m reviewing your chart now and can
                  help clarify next steps and any home-care instructions.
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-700 text-xs font-semibold text-white">
                  CO
                </div>
              </div>
            </div>

            {aiAutoReply && (
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sky-500" />
                AI is drafting a suggested reply based on the care plan.
              </div>
            )}
          </div>

          {/* Composer */}
          <div className="border-t border-slate-100 bg-white px-5 py-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-2 text-xs text-slate-500">
              Typing into the composer will automatically{" "}
              <span className="font-semibold text-slate-800">turn off</span> AI
              Auto-Reply so your message is sent manually.
            </div>
            <div className="mt-3 flex items-end gap-3">
              <textarea
                rows={2}
                placeholder="Type a reply to the patient..."
                className="min-h-[56px] flex-1 resize-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100"
                onFocus={() => setAiAutoReply(false)}
              />
              <button
                type="button"
                className="inline-flex items-center rounded-full bg-sky-600 px-4 py-2 text-xs font-semibold text-white shadow-sm shadow-sky-300 transition hover:bg-sky-700"
              >
                Send
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

type StatusPillProps = {
  status: Inquiry["status"];
};

function StatusPill({ status }: StatusPillProps) {
  const labelMap: Record<Inquiry["status"], string> = {
    new: "New",
    open: "In progress",
    resolved: "Resolved",
  };

  const styleMap: Record<Inquiry["status"], string> = {
    new: "bg-sky-50 text-sky-800 border-sky-100",
    open: "bg-amber-50 text-amber-800 border-amber-100",
    resolved: "bg-emerald-50 text-emerald-800 border-emerald-100",
  };

  return (
    <span
      className={`mt-1 inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${styleMap[status]}`}
    >
      {labelMap[status]}
    </span>
  );
}

type ToggleProps = {
  enabled: boolean;
  onChange: (value: boolean) => void;
};

function Toggle({ enabled, onChange }: ToggleProps) {
  return (
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
  );
}

