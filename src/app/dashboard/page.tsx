 "use client";

import { useState } from "react";

const inventoryItems = [
  { id: 1, name: "Nitrile Gloves", category: "PPE", quantity: 6 },
  { id: 2, name: "Surgical Masks", category: "PPE", quantity: 18 },
  { id: 3, name: "Disposable Syringes", category: "Supplies", quantity: 8 },
  { id: 4, name: "Alcohol Swabs", category: "Supplies", quantity: 24 },
];

export default function DashboardPage() {
  const lowStockItems = inventoryItems.filter((item) => item.quantity < 10);
  const hasLowStock = lowStockItems.length > 0;
  const [orderSuccess, setOrderSuccess] = useState(false);

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
                    onClick={() => setOrderSuccess(true)}
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
                <tr>
                  <td className="px-4 py-2.5 text-sm font-medium text-slate-900">
                    Jordan Smith
                  </td>
                  <td className="px-4 py-2.5 text-xs text-slate-600">
                    General consultation
                  </td>
                  <td className="px-4 py-2.5 text-xs text-slate-500">
                    Today · 10:30 AM
                  </td>
                  <td className="px-4 py-2.5">
                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-medium text-emerald-800">
                      Confirmed
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    <button
                      type="button"
                      className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
                    >
                      Send Form
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 text-sm font-medium text-slate-900">
                    Maria Rodriguez
                  </td>
                  <td className="px-4 py-2.5 text-xs text-slate-600">
                    Follow-up visit
                  </td>
                  <td className="px-4 py-2.5 text-xs text-slate-500">
                    Today · 02:00 PM
                  </td>
                  <td className="px-4 py-2.5">
                    <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-medium text-amber-800">
                      Pending
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    <button
                      type="button"
                      className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
                    >
                      Send Form
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 text-sm font-medium text-slate-900">
                    Daniel Lee
                  </td>
                  <td className="px-4 py-2.5 text-xs text-slate-600">
                    Lab test
                  </td>
                  <td className="px-4 py-2.5 text-xs text-slate-500">
                    Tomorrow · 09:15 AM
                  </td>
                  <td className="px-4 py-2.5">
                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-medium text-emerald-800">
                      Confirmed
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    <button
                      type="button"
                      className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
                    >
                      Send Form
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 text-sm font-medium text-slate-900">
                    Priya Patel
                  </td>
                  <td className="px-4 py-2.5 text-xs text-slate-600">
                    Diabetes management review
                  </td>
                  <td className="px-4 py-2.5 text-xs text-slate-500">
                    Tomorrow · 01:45 PM
                  </td>
                  <td className="px-4 py-2.5">
                    <span className="inline-flex items-center rounded-full bg-rose-50 px-2.5 py-0.5 text-[11px] font-medium text-rose-800">
                      Cancelled
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    <button
                      type="button"
                      className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
                    >
                      Send Form
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Inventory section */}
        <section className="mt-10 rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-sm">
          <div className="rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-sm">
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
          </div>

          {/* Recent appointments */}
          <div className="rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-sm">
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
                      Name
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
                      Service
                    </th>
                    <th className="px-4 py-2 text-right text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white/70">
                  <tr>
                    <td className="px-4 py-2.5 text-sm font-medium text-slate-900">
                      Jordan Smith
                    </td>
                    <td className="px-4 py-2.5 text-xs text-slate-600">
                      Follow-up consultation
                    </td>
                    <td className="px-4 py-2.5 text-right">
                      <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-medium text-emerald-800">
                        Confirmed
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 text-sm font-medium text-slate-900">
                      Maria Rodriguez
                    </td>
                    <td className="px-4 py-2.5 text-xs text-slate-600">
                      New patient intake
                    </td>
                    <td className="px-4 py-2.5 text-right">
                      <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-medium text-amber-800">
                        Pending
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 text-sm font-medium text-slate-900">
                      Daniel Lee
                    </td>
                    <td className="px-4 py-2.5 text-xs text-slate-600">
                      Telehealth check-in
                    </td>
                    <td className="px-4 py-2.5 text-right">
                      <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-medium text-emerald-800">
                        Confirmed
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 text-sm font-medium text-slate-900">
                      Priya Patel
                    </td>
                    <td className="px-4 py-2.5 text-xs text-slate-600">
                      Diabetes management review
                    </td>
                    <td className="px-4 py-2.5 text-right">
                      <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-medium text-amber-800">
                        Pending
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

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


