"use client";

import { useState } from "react";

export default function BookPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    service: "",
    date: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
                Appointment Booking
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Request an appointment in just a few steps. We&apos;ll confirm by
                email.
              </p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-medium text-slate-700">
                  Full Name
                </label>
                <input
                  name="fullName"
                  type="text"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Jordan Smith"
                  className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-100"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-slate-700">
                    Email Address
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700">
                    Phone Number
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    placeholder="(555) 123-4567"
                    className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-100"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-slate-700">
                    Service Type
                  </label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    required
                    className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-100"
                  >
                    <option value="">Select a service</option>
                    <option value="general">General Consultation</option>
                    <option value="followup">Follow-up</option>
                    <option value="lab">Lab Test</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700">
                    Appointment Date
                  </label>
                  <div className="mt-1.5 flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 shadow-sm focus-within:border-sky-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-sky-100">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-sky-100 text-xs font-semibold text-sky-700">
                      🗓
                    </span>
                    <input
                      name="date"
                      type="date"
                      value={form.date}
                      onChange={handleChange}
                      required
                      className="w-full border-none bg-transparent text-sm text-slate-900 outline-none [color-scheme:light]"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-sky-300 transition hover:bg-sky-700"
              >
                Confirm Booking
              </button>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 shadow-inner">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-2xl">
                <span>✅</span>
              </div>
            </div>
            <h2 className="text-lg font-semibold tracking-tight text-slate-900">
              Booking Confirmed!
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              A confirmation link has been sent to your email. Please check your inbox
              to finalize your appointment details.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

