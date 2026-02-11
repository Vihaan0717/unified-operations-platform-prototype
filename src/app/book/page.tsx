"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BookPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setSuccess(true);

    // Simulate a short confirmation state, then redirect
    setTimeout(() => {
      router.push("/thank-you");
    }, 1200);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10 font-sans">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-xl shadow-slate-200/70 sm:p-8">
        <header className="mb-6 text-center sm:mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
            CareOps
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
            Book a service
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Share a few details and we&apos;ll match you with the right care
            team.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-medium text-slate-700">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              Service Type
            </label>
            <input
              type="text"
              value={service}
              onChange={(e) => setService(e.target.value)}
              required
              placeholder="e.g. Follow-up visit, telehealth consult"
              className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-100"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-sky-300 transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? "Booking..." : "Book Now"}
          </button>
        </form>

        {success && (
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs text-emerald-800">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-[10px] text-white">
              ✓
            </span>
            <span>
              Booking received! Redirecting you to the Thank You page&hellip;
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";

export default function BookPage() {
  const [date, setDate] = useState("");
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
      <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-xl shadow-slate-200/70 sm:p-8">
        {!submitted ? (
          <>
            <header className="mb-6 text-center sm:mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                CareOps
              </p>
              <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
                Book an appointment
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                A simple, secure form to request your visit. We&apos;ll confirm
                details by email.
              </p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Calendar picker */}
              <div>
                <label className="block text-xs font-medium text-slate-700">
                  Appointment Date
                </label>
                <div className="mt-1.5 flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 shadow-sm focus-within:border-sky-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-sky-100">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-sky-100 text-xs font-semibold text-sky-700">
                    🗓
                  </span>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="w-full border-none bg-transparent text-sm text-slate-900 outline-none [color-scheme:light]"
                  />
                </div>
              </div>

              <div className="space-y-4">
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
                    Symptoms / Reason for Visit
                  </label>
                  <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    required
                    placeholder="Briefly describe your symptoms or reason for this visit."
                    rows={3}
                    className="mt-1.5 w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-100"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-sky-300 transition hover:bg-sky-700"
              >
                Confirm booking
              </button>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 shadow-inner">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white">
                <span className="animate-[ping_0.9s_ease-out_1] absolute inline-flex h-12 w-12 rounded-full bg-emerald-300 opacity-60" />
                <span className="relative text-2xl">✓</span>
              </div>
            </div>
            <h2 className="text-lg font-semibold tracking-tight text-slate-900">
              Booking confirmed
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              We&apos;ve received your request for{" "}
              <span className="font-medium text-slate-900">
                {date || "your selected date"}
              </span>
              . A confirmation will be sent to{" "}
              <span className="font-medium text-slate-900">
                {email || "your email"}
              </span>{" "}
              after our team reviews the details.
            </p>
            <p className="mt-3 rounded-full bg-slate-50 px-4 py-1.5 text-xs text-slate-500">
              If anything changes, you can reply directly to your confirmation email.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

