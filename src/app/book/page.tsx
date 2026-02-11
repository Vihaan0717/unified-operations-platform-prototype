"use client";

import { useState } from "react";

export default function BookPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real app, you would send this to your backend here.
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10 font-sans">
      <div className="w-full max-w-4xl rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-xl shadow-slate-200/70 sm:p-8">
        <header className="mb-6 flex flex-col gap-2 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
              CareOps
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
              Book a visit
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Choose a time that works for you and share a few details so our team can prepare.
            </p>
          </div>
        </header>

        <div className="grid gap-8 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1.5fr)]">
          {/* Calendar */}
          <section className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                  Calendar
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Select an available day for your appointment.
                </p>
              </div>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
                March 2026
              </span>
            </div>

            <SimpleCalendar />
          </section>

          {/* Booking form & confirmation */}
          <section className="flex flex-col gap-4">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                Your details
              </p>
              <p className="mt-1 text-xs text-slate-500">
                We&apos;ll use this information to confirm your booking.
              </p>

              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    placeholder="e.g. Jordan Smith"
                    className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                    className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700">
                    Reason for Visit
                  </label>
                  <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    required
                    placeholder="Briefly describe the reason for your visit."
                    rows={3}
                    className="mt-1.5 w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-100"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-sky-300 transition hover:bg-sky-700"
              >
                Submit booking
              </button>
            </form>

            {/* Confirmation message / animation */}
            <div className="relative h-28 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <div
                className={`absolute inset-0 flex flex-col items-start justify-center gap-2 px-2 transition-all duration-500 ${
                  submitted
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                }`}
              >
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800 shadow-sm shadow-emerald-100">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-[10px] text-white">
                    ✓
                  </span>
                  Booking Confirmed!
                </div>
                <p className="text-xs text-slate-600">
                  We&apos;ve received your request and sent a confirmation to{" "}
                  <span className="font-medium text-slate-900">
                    {email || "your email"}
                  </span>
                  . Our team will review your details and share next steps shortly.
                </p>
              </div>

              <div
                className={`absolute inset-0 flex items-center px-2 text-xs text-slate-500 transition-all duration-400 ${
                  submitted
                    ? "-translate-y-6 opacity-0"
                    : "translate-y-0 opacity-100"
                }`}
              >
                After submitting, you&apos;ll see a confirmation of your booking here.
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function SimpleCalendar() {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-medium text-slate-500">
        {daysOfWeek.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1.5 text-sm">
        {days.map((day) => {
          const isPrimary = day === 12;
          const isMuted = day < 3;
          return (
            <button
              key={day}
              type="button"
              className={`flex h-9 items-center justify-center rounded-lg border text-xs font-medium transition ${
                isPrimary
                  ? "border-sky-500 bg-sky-50 text-sky-900 shadow-sm"
                  : isMuted
                  ? "border-transparent text-slate-300"
                  : "border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:text-sky-900"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

