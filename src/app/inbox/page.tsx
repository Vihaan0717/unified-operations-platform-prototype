"use client";

import { useState } from "react";

type Lead = {
  id: number;
  name: string;
  summary: string;
  status: "new" | "open" | "resolved";
  time: string;
};

const leads: Lead[] = [
  {
    id: 1,
    name: "John Smith",
    summary: "Requested information about new patient onboarding",
    status: "new",
    time: "9:12 AM",
  },
  {
    id: 2,
    name: "Sarah Connor",
    summary: "Interested in remote monitoring program",
    status: "open",
    time: "8:47 AM",
  },
  {
    id: 3,
    name: "Daniel Lee",
    summary: "Question about insurance eligibility",
    status: "open",
    time: "Yesterday",
  },
  {
    id: 4,
    name: "Priya Patel",
    summary: "Looking to move family care to your clinic",
    status: "resolved",
    time: "Mon",
  },
];

type Message = {
  id: number;
  from: "lead" | "ops" | "system";
  text: string;
};

export default function InboxPage() {
  const [selectedId, setSelectedId] = useState<number>(1);
  const [aiAutoReply, setAiAutoReply] = useState<boolean>(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      from: "lead",
      text: "Hi, I’d like to follow up on my recent visit and clarify a few details about my care plan.",
    },
    {
      id: 2,
      from: "ops",
      text: "Thanks for reaching out. I’m reviewing your chart now and can help clarify next steps and any home-care instructions.",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const selectedLead = leads.find((l) => l.id === selectedId) ?? leads[0];

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      <main className="mx-auto flex w-full max-w-6xl flex-1 gap-6 px-4 py-8 lg:px-8">
        {/* Left: Leads list */}
        <section className="flex w-full max-w-xs flex-col rounded-2xl border border-slate-200 bg-white/90 shadow-sm">
          <div className="border-b border-slate-100 px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
              Leads
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Qualify and engage high-intent patients.
            </p>
          </div>
          <div className="flex-1 overflow-y-auto">
            <ul className="divide-y divide-slate-100">
              {leads.map((lead) => {
                const active = lead.id === selectedId;
                return (
                  <li key={lead.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedId(lead.id)}
                      className={`flex w-full flex-col items-start gap-1 px-4 py-3 text-left transition ${
                        active
                          ? "bg-sky-50/80"
                          : "hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex w-full items-center justify-between">
                        <p className="text-sm font-medium text-slate-900">
                          {lead.name}
                        </p>
                        <span className="text-xs text-slate-400">
                          {lead.time}
                        </span>
                      </div>
                      <p className="line-clamp-2 text-xs text-slate-500">
                        {lead.summary}
                      </p>
                      <StatusPill status={lead.status} />
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
                {selectedLead.name}
              </p>
              <p className="mt-0.5 text-xs text-slate-500">
                Lead conversation • Secure messaging
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
            {messages.map((message) => {
              if (message.from === "lead") {
                return (
                  <div key={message.id} className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-700">
                      {selectedLead.name.charAt(0)}
                    </div>
                    <div className="max-w-md rounded-2xl rounded-tl-sm bg-white px-3.5 py-2.5 text-sm text-slate-800 shadow-sm">
                      {message.text}
                    </div>
                  </div>
                );
              }

              if (message.from === "system") {
                return (
                  <div key={message.id} className="flex justify-center">
                    <div className="max-w-md rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-700 shadow-sm">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                          System automation
                        </p>
                        <span className="inline-flex items-center rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-800">
                          Form Status: Pending
                        </span>
                      </div>
                      <p className="mt-2 text-sm">
                        📋 System: Intake Form Sent. A request has been sent to the
                        patient to complete their medical history.
                      </p>
                    </div>
                  </div>
                );
              }

              return (
                <div key={message.id} className="flex justify-end">
                  <div className="flex items-start gap-3">
                    <div className="max-w-md rounded-2xl rounded-tr-sm bg-sky-600 px-3.5 py-2.5 text-sm text-white shadow-sm">
                      {message.text}
                    </div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-700 text-xs font-semibold text-white">
                      CO
                    </div>
                  </div>
                </div>
              );
            })}

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
            <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:gap-3">
              <textarea
                rows={2}
                placeholder="Type a reply to this lead..."
                className="min-h-[56px] flex-1 resize-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100"
                value={inputValue}
                onFocus={() => setAiAutoReply(false)}
                onChange={(e) => {
                  const next = e.target.value;
                  // As soon as the user starts typing, automatically disable AI
                  if (
                    aiAutoReply &&
                    next.length > inputValue.length &&
                    inputValue.length === 0
                  ) {
                    setAiAutoReply(false);
                  }
                  setInputValue(next);
                }}
              />
              <div className="flex items-center gap-2 sm:flex-col sm:items-stretch sm:gap-2 md:flex-row">
                <button
                  type="button"
                  onClick={() => {
                    const trimmed = inputValue.trim();
                    if (!trimmed) return;
                    setMessages((prev) => [
                      ...prev,
                      {
                        id: prev.length + 1,
                        from: "ops",
                        text: trimmed,
                      },
                    ]);
                    setInputValue("");
                  }}
                  className="inline-flex flex-1 items-center justify-center rounded-full bg-sky-600 px-4 py-2 text-xs font-semibold text-white shadow-sm shadow-sky-300 transition hover:bg-sky-700"
                >
                  Send
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setMessages((prev) => [
                      ...prev,
                      {
                        id: prev.length + 1,
                        from: "system",
                        text:
                          "📋 System: Intake Form Sent. A request has been sent to the patient to complete their medical history.",
                      },
                    ])
                  }
                  className="inline-flex flex-1 items-center justify-center rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-xs font-semibold text-violet-800 shadow-sm transition hover:bg-violet-100"
                >
                  Send Intake Form
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

type StatusPillProps = {
  status: Lead["status"];
};

function StatusPill({ status }: StatusPillProps) {
  const labelMap: Record<Lead["status"], string> = {
    new: "New",
    open: "In progress",
    resolved: "Resolved",
  };

  const styleMap: Record<Lead["status"], string> = {
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

