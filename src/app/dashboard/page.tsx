 "use client";

import { useState } from "react";

const inventoryItems = [
  { id: 1, name: "Nitrile Gloves", category: "PPE", quantity: 6 },
  { id: 2, name: "Surgical Masks", category: "PPE", quantity: 18 },
  { id: 3, name: "Disposable Syringes", category: "Supplies", quantity: 8 },
  { id: 4, name: "Alcohol Swabs", category: "Supplies", quantity: 24 },
];

type AppointmentStatus = "confirmed" | "pending" | "cancelled";

type Appointment = {
  id: number;
  patient: string;
  service: string;
  date: string;
  status: AppointmentStatus;
};

type FormStatus = "pending" | "overdue" | "resent";

type FormAlert = {
  id: number;
  patient: string;
  form: string;
  status: FormStatus;
};

export default function DashboardPage() {
  const lowStockItems = inventoryItems.filter((item) => item.quantity < 10);
  const hasLowStock = lowStockItems.length > 0;
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 1,
      patient: "Jordan Smith",
      service: "General consultation",
      date: "Today · 10:30 AM",
      status: "confirmed",
    },
    {
      id: 2,
      patient: "Maria Rodriguez",
      service: "Follow-up visit",
      date: "Today · 02:00 PM",
      status: "pending",
    },
    {
      id: 3,
      patient: "Daniel Lee",
      service: "Lab test",
      date: "Tomorrow · 09:15 AM",
      status: "confirmed",
    },
    {
      id: 4,
      patient: "Priya Patel",
      service: "Diabetes management review",
      date: "Tomorrow · 01:45 PM",
      status: "pending",
    },
  ]);
  const [formAlerts, setFormAlerts] = useState<FormAlert[]>([
    {
      id: 1,
      patient: "Maria Rodriguez",
      form: "Intake form",
      status: "overdue",
    },
    {
      id: 2,
      patient: "Daniel Lee",
      form: "Pre-op questionnaire",
      status: "pending",
    },
    {
      id: 3,
      patient: "Priya Patel",
      form: "Chronic care plan",
      status: "overdue",
    },
  ]);

  const pendingAppointments = appointments.filter(
    (appt) => appt.status === "pending"
  );
  const overdueForms = formAlerts.filter((form) => form.status === "overdue");

  const confirmAppointment = (id: number) => {
    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === id ? { ...appt, status: "confirmed" } : appt
      )
    );
  };

  const resendForm = (id: number) => {
    setFormAlerts((prev) =>
      prev.map((form) =>
        form.id === id ? { ...form, status: "resent" } : form
      )
    );
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Sidebar */}
      <aside className="flex w-64 flex-col border-r border-slate-200 bg-white/80 px-6 py-6 backdrop-blur">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-600 text-sm font-semibold text-white shadow-sm">
            CO
          </div>
          <div>
            <p className="text-sm font-semibold tracking-tight text-slate-900">
              CareOps Console
            </p>
            <p className="text-xs text-slate-500">Clinical operations overview</p>
          </div>
        </div>

        <nav className="space-y-1 text-sm">
          <SidebarItem label="Overview" active />
          <SidebarItem label="Inbox" />
          <SidebarItem label="Inventory" />
        </nav>

        <div className="mt-auto pt-8 text-xs text-slate-400">
          <p className="font-medium text-slate-500">Status</p>
          <div className="mt-2 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-xs text-slate-500">Operational</span>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 px-8 py-8">
        {/* Header */}
        <header className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              Overview
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Snapshot of patient volume, appointments, and supply risk.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="rounded-full bg-emerald-50 px-3 py-1 font-medium text-emerald-700">
              Live
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1">
              Today • 09:00–17:00
            </span>
          </div>
        </header>

        {/* Large inventory alert */}
        {hasLowStock && (
          <section className="mt-6">
            <div className="flex items-start gap-3 rounded-2xl border border-rose-400 bg-rose-50 px-4 py-3 shadow-sm shadow-rose-100">
              <div className="mt-0.5 h-8 w-8 shrink-0 rounded-full bg-rose-600 text-center text-sm font-semibold leading-8 text-white">
                !
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-700">
                  Action Required: Low Stock Detected
                </p>
                <p className="mt-1 text-sm text-rose-900">
                  One or more critical medical supplies are below the safe threshold
                  of 10 units. Review inventory to avoid disruptions to patient care.
                </p>
                <ul className="mt-2 space-y-1 text-xs text-rose-900">
                  {lowStockItems.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-between rounded-lg bg-rose-100/60 px-2 py-1"
                    >
                      <span>{item.name}</span>
                      <span className="font-semibold">{item.quantity} units</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setOrderSuccess(false);
                      setOrderModalOpen(true);
                    }}
                    className="inline-flex items-center rounded-full bg-rose-600 px-4 py-1.5 text-xs font-semibold text-white shadow-sm shadow-rose-300 transition hover:bg-rose-700"
                  >
                    Order Now
                  </button>
                  {orderSuccess && (
                    <div className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-800 shadow-sm shadow-emerald-100">
                      <span className="mr-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-[10px] text-white">
                        ✓
                      </span>
                      Restock request created successfully.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Key alerts grid */}
        <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {/* Inventory alert card */}
          <div className="rounded-2xl border border-rose-100 bg-rose-50/80 p-4 text-xs shadow-sm shadow-rose-100">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-rose-700">
              Inventory Alert
            </p>
            <p className="mt-1 text-xs text-rose-900">
              {hasLowStock
                ? `${lowStockItems.length} item(s) below safe stock threshold.`
                : "All tracked items are within safe stock levels."}
            </p>
            {hasLowStock && (
              <ul className="mt-2 space-y-1 text-xs text-rose-900">
                {lowStockItems.map((item) => (
                  <li key={item.id} className="flex items-center justify-between">
                    <span>{item.name}</span>
                    <span className="font-semibold">{item.quantity}</span>
                  </li>
                ))}
              </ul>
            )}
            <button
              type="button"
              onClick={() => {
                setOrderSuccess(false);
                setOrderModalOpen(true);
              }}
              className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-rose-600 px-3 py-1.5 text-[11px] font-semibold text-white shadow-sm shadow-rose-200 transition hover:bg-rose-700"
            >
              Order Now
            </button>
          </div>

          {/* Booking alerts card */}
          <div className="rounded-2xl border border-amber-100 bg-amber-50/80 p-4 text-xs shadow-sm shadow-amber-100">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-800">
              Booking Overview
            </p>
            <p className="mt-1 text-xs text-amber-900">
              {pendingAppointments.length > 0
                ? `${pendingAppointments.length} booking(s) awaiting confirmation.`
                : "No bookings awaiting confirmation."}
            </p>
            {pendingAppointments.length > 0 && (
              <ul className="mt-2 space-y-1 text-xs text-amber-900">
                {pendingAppointments.map((appt) => (
                  <li
                    key={appt.id}
                    className="flex items-center justify-between gap-2 rounded-lg bg-amber-100/60 px-2 py-1"
                  >
                    <span className="truncate">
                      {appt.patient} · {appt.service}
                    </span>
                    <button
                      type="button"
                      onClick={() => confirmAppointment(appt.id)}
                      className="whitespace-nowrap rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-semibold text-white shadow-sm hover:bg-emerald-700"
                    >
                      Confirm
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Leads & conversations card */}
          <div className="rounded-2xl border border-sky-100 bg-sky-50/80 p-4 text-xs shadow-sm shadow-sky-100">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-800">
              Leads &amp; Conversations
            </p>
            <p className="mt-1 text-xs text-sky-900">
              3 high-intent leads without a recent reply.
            </p>
            <ul className="mt-2 space-y-1 text-xs text-sky-900">
              <li className="flex items-center justify-between gap-2">
                <span className="truncate">John Smith · Onboarding questions</span>
                <a
                  href="/inbox"
                  className="whitespace-nowrap rounded-full bg-sky-600 px-2 py-0.5 text-[10px] font-semibold text-white shadow-sm hover:bg-sky-700"
                >
                  Reply
                </a>
              </li>
              <li className="flex items-center justify-between gap-2">
                <span className="truncate">Sarah Connor · Remote monitoring</span>
                <a
                  href="/inbox"
                  className="whitespace-nowrap rounded-full bg-sky-600 px-2 py-0.5 text-[10px] font-semibold text-white shadow-sm hover:bg-sky-700"
                >
                  Reply
                </a>
              </li>
              <li className="flex items-center justify-between gap-2">
                <span className="truncate">Daniel Lee · Insurance coverage</span>
                <a
                  href="/inbox"
                  className="whitespace-nowrap rounded-full bg-sky-600 px-2 py-0.5 text-[10px] font-semibold text-white shadow-sm hover:bg-sky-700"
                >
                  Reply
                </a>
              </li>
            </ul>
          </div>

          {/* Forms status card */}
          <div className="rounded-2xl border border-violet-100 bg-violet-50/80 p-4 text-xs shadow-sm shadow-violet-100">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-violet-800">
              Forms Status
            </p>
            <p className="mt-1 text-xs text-violet-900">
              {overdueForms.length > 0
                ? `${overdueForms.length} form(s) overdue for completion.`
                : "No overdue forms at the moment."}
            </p>
            {formAlerts.length > 0 && (
              <ul className="mt-2 space-y-1 text-xs">
                {formAlerts.map((form) => {
                  const isOverdue = form.status === "overdue";
                  const isResent = form.status === "resent";
                  const badgeClasses = isOverdue
                    ? "bg-rose-50 text-rose-800"
                    : isResent
                    ? "bg-emerald-50 text-emerald-800"
                    : "bg-slate-50 text-slate-600";
                  const badgeLabel = isOverdue
                    ? "Overdue"
                    : isResent
                    ? "Resent"
                    : "Pending";
                  return (
                    <li
                      key={form.id}
                      className="flex items-center justify-between gap-2 rounded-lg bg-white/80 px-2 py-1"
                    >
                      <div className="flex flex-col">
                        <span className="text-slate-900">{form.patient}</span>
                        <span className="text-[11px] text-slate-500">
                          {form.form}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${badgeClasses}`}
                        >
                          {badgeLabel}
                        </span>
                        {isOverdue && (
                          <button
                            type="button"
                            onClick={() => resendForm(form.id)}
                            className="whitespace-nowrap rounded-full border border-violet-200 bg-violet-50 px-2 py-0.5 text-[10px] font-semibold text-violet-800 shadow-sm hover:bg-violet-100"
                          >
                            Resend
                          </button>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </section>

        {/* Stats cards */}
        <section className="mt-8 grid gap-5 md:grid-cols-3">
          <StatsCard
            label="Total Patients"
            value="324"
            badge="Active panel"
            tone="primary"
          />
          <StatsCard
            label="Active Appointments"
            value="18"
            badge="Today"
            tone="soft"
          />
          <StatsCard
            label="New Leads"
            value="7"
            badge="This week"
            tone="success"
          />
        </section>

        {/* Recent appointments */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">
                Recent Appointments
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Latest scheduled visits across your panel.
              </p>
            </div>
            <span className="rounded-full bg-slate-50 px-3 py-1 text-xs text-slate-500">
              Today &amp; tomorrow
            </span>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-100 bg-slate-50/60">
            <table className="min-w-full divide-y divide-slate-100 text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
                    Patient Name
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
                    Service
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
                    Date
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
                    Status
                  </th>
                  <th className="px-4 py-2 text-right text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
                    Quick Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white/70">
                {appointments.map((appt) => {
                  const isPending = appt.status === "pending";
                  const isCancelled = appt.status === "cancelled";
                  const badgeClasses = isPending
                    ? "bg-amber-50 text-amber-800"
                    : isCancelled
                    ? "bg-rose-50 text-rose-800"
                    : "bg-emerald-50 text-emerald-800";
                  const badgeLabel =
                    appt.status.charAt(0).toUpperCase() + appt.status.slice(1);
                  return (
                    <tr key={appt.id}>
                      <td className="px-4 py-2.5 text-sm font-medium text-slate-900">
                        {appt.patient}
                      </td>
                      <td className="px-4 py-2.5 text-xs text-slate-600">
                        {appt.service}
                      </td>
                      <td className="px-4 py-2.5 text-xs text-slate-500">
                        {appt.date}
                      </td>
                      <td className="px-4 py-2.5">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium ${badgeClasses}`}
                        >
                          {badgeLabel}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-right">
                        <div className="inline-flex items-center gap-2">
                          {isPending && (
                            <button
                              type="button"
                              onClick={() => confirmAppointment(appt.id)}
                              className="rounded-full bg-emerald-600 px-3 py-1 text-[11px] font-semibold text-white shadow-sm hover:bg-emerald-700"
                            >
                              Confirm
                            </button>
                          )}
                          <button
                            type="button"
                            className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
                          >
                            Send Form
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Inventory section */}
        <section className="mt-10 rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">
                Inventory overview
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Key consumables monitored for continuity of care.
              </p>
            </div>
            <span className="rounded-full bg-slate-50 px-3 py-1 text-xs text-slate-500">
              {inventoryItems.length} items
            </span>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-100 bg-slate-50/60">
            <table className="min-w-full divide-y divide-slate-100 text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
                    Item
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
                    Category
                  </th>
                  <th className="px-4 py-2 text-right text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
                    Quantity
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white/70">
                {inventoryItems.map((item) => {
                  const isLow = item.quantity < 10;
                  return (
                    <tr key={item.id} className={isLow ? "bg-rose-50/60" : ""}>
                      <td className="px-4 py-2.5 text-sm font-medium text-slate-900">
                        {item.name}
                      </td>
                      <td className="px-4 py-2.5 text-xs text-slate-500">
                        {item.category}
                      </td>
                      <td className="px-4 py-2.5 text-right text-sm font-semibold">
                        <span
                          className={isLow ? "text-rose-700" : "text-slate-700"}
                        >
                          {item.quantity}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Order modal */}
        {orderModalOpen && (
          <div className="fixed inset-0 z-20 flex items-center justify-center bg-slate-900/40 px-4">
            <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/20">
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-700">
                    Order low-stock supplies
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Review items below threshold and place a restock request with your
                    supplier.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOrderModalOpen(false)}
                  className="text-xs text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              </div>

              <ul className="mb-4 space-y-1 text-xs text-slate-700">
                {lowStockItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between rounded-lg bg-rose-50/60 px-2 py-1"
                  >
                    <span>{item.name}</span>
                    <span className="font-semibold">{item.quantity} units</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-2 text-xs">
                <a
                  href="https://www.medline.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 font-medium text-slate-700 shadow-sm transition hover:bg-slate-100"
                >
                  Open Supplier Portal
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setOrderSuccess(true);
                    setOrderModalOpen(false);
                  }}
                  className="inline-flex items-center justify-center rounded-full bg-rose-600 px-4 py-2 text-xs font-semibold text-white shadow-sm shadow-rose-300 transition hover:bg-rose-700"
                >
                  Mark as Ordered
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// Order modal for inventory
// Placed outside component for clarity, but kept simple here by inlining JSX above.

type SidebarItemProps = {
  label: string;
  active?: boolean;
};

function SidebarItem({ label, active }: SidebarItemProps) {
  return (
    <button
      type="button"
      className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition ${
        active
          ? "border border-sky-100 bg-sky-50 text-sky-800 shadow-sm"
          : "text-slate-600 hover:bg-slate-50"
      }`}
    >
      <span className="font-medium">{label}</span>
      {active && (
        <span className="h-1.5 w-1.5 rounded-full bg-sky-500" aria-hidden="true" />
      )}
    </button>
  );
}

type StatsCardProps = {
  label: string;
  value: string;
  badge?: string;
  tone?: "primary" | "soft" | "success";
};

function StatsCard({ label, value, badge, tone = "primary" }: StatsCardProps) {
  const toneClasses: Record<NonNullable<StatsCardProps["tone"]>, string> = {
    primary: "border-sky-100 bg-sky-50/70 text-sky-900 shadow-sky-100",
    soft: "border-slate-100 bg-slate-50/70 text-slate-900 shadow-slate-100",
    success:
      "border-emerald-100 bg-emerald-50/70 text-emerald-900 shadow-emerald-100",
  };

  return (
    <div
      className={`flex flex-col justify-between rounded-2xl border px-4 py-4 text-sm shadow-sm ${toneClasses[tone]}`}
    >
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
          {label}
        </p>
        {badge && (
          <span className="rounded-full bg-white/80 px-2.5 py-1 text-[11px] font-medium text-slate-600 shadow-sm">
            {badge}
          </span>
        )}
      </div>
      <p className="mt-3 text-2xl font-semibold tracking-tight">{value}</p>
    </div>
  );
}


