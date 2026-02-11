"use client";

const inventoryItems = [
  { id: 1, name: "Nitrile Gloves (S)", category: "PPE", quantity: 6 },
  { id: 2, name: "Nitrile Gloves (M)", category: "PPE", quantity: 8 },
  { id: 3, name: "Nitrile Gloves (L)", category: "PPE", quantity: 4 },
  { id: 4, name: "Surgical Masks", category: "PPE", quantity: 24 },
  { id: 5, name: "Alcohol Swabs", category: "Supplies", quantity: 30 },
];

const recentActivity = [
  {
    id: 1,
    patient: "Jordan Smith",
    type: "New booking",
    time: "09:12 AM",
    clinician: "Dr. Patel",
  },
  {
    id: 2,
    patient: "Emily Davis",
    type: "Follow-up scheduled",
    time: "08:54 AM",
    clinician: "NP Rivera",
  },
  {
    id: 3,
    patient: "Daniel Lee",
    type: "Telehealth booking",
    time: "Yesterday",
    clinician: "Dr. Chen",
  },
  {
    id: 4,
    patient: "Maria Rodriguez",
    type: "Rescheduled visit",
    time: "Mon",
    clinician: "Dr. Singh",
  },
];

export default function DashboardPage() {
  const hasLowGloveStock = inventoryItems.some(
    (item) => item.name.toLowerCase().includes("gloves") && item.quantity < 10
  );

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
            <p className="text-xs text-slate-500">Care operations overview</p>
          </div>
        </div>

        <nav className="space-y-1 text-sm">
          <SidebarItem label="Dashboard" active />
          <SidebarItem label="Inbox" />
          <SidebarItem label="Bookings" />
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
              Dashboard
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              High-level snapshot of bookings, leads, staff, and supply risk.
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

        {/* Stats cards */}
        <section className="mt-8 grid gap-5 md:grid-cols-3">
          <StatsCard
            label="Upcoming Bookings"
            value="8"
            badge="Next 24 hrs"
            tone="primary"
          />
          <StatsCard
            label="New Leads"
            value="12"
            badge="This week"
            tone="soft"
          />
          <StatsCard
            label="Staff Active"
            value="2"
            badge="Currently online"
            tone="success"
          />
        </section>

        {/* Inventory + Recent Activity */}
        <section className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1.8fr)]">
          {/* Inventory & alert */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-semibold text-slate-900">
                    Inventory overview
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    Glove levels across sizes for today&apos;s sessions.
                  </p>
                </div>
                <span className="rounded-full bg-slate-50 px-3 py-1 text-xs text-slate-500">
                  {inventoryItems.length} glove SKUs
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
                              className={
                                isLow ? "text-rose-700" : "text-slate-700"
                              }
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

            {/* Inventory Alerts */}
            <div className="rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-900">
                Inventory alerts
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                We monitor glove stock to avoid disruptions to procedure rooms.
              </p>

              {hasLowGloveStock ? (
                <div className="mt-4 flex items-start gap-3 rounded-2xl border border-rose-400 bg-rose-50 px-4 py-3 shadow-sm shadow-rose-100">
                  <div className="mt-0.5 h-7 w-7 shrink-0 rounded-full bg-rose-600 text-center text-xs font-semibold leading-7 text-white">
                    !
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-700">
                      Action Required: Low Stock of Gloves
                    </p>
                    <p className="mt-1 text-sm text-rose-900">
                      One or more glove SKUs are below the safe threshold of 10 units.
                      Please review and create a restock order.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                  All tracked glove SKUs are within safe stock levels.
                </div>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-slate-900">
                  Recent activity
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Patients who recently booked or updated appointments.
                </p>
              </div>
              <span className="rounded-full bg-slate-50 px-3 py-1 text-xs text-slate-500">
                Last 24 hours
              </span>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-100 bg-slate-50/60">
              <table className="min-w-full divide-y divide-slate-100 text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
                      Patient
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
                      Activity
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
                      Clinician
                    </th>
                    <th className="px-4 py-2 text-right text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white/70">
                  {recentActivity.map((row) => (
                    <tr key={row.id}>
                      <td className="px-4 py-2.5 text-sm font-medium text-slate-900">
                        {row.patient}
                      </td>
                      <td className="px-4 py-2.5 text-xs text-slate-600">
                        {row.type}
                      </td>
                      <td className="px-4 py-2.5 text-xs text-slate-600">
                        {row.clinician}
                      </td>
                      <td className="px-4 py-2.5 text-right text-xs text-slate-500">
                        {row.time}
                      </td>
                    </tr>
                  ))}
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
    primary:
      "border-sky-100 bg-sky-50/70 text-sky-900 shadow-sky-100",
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

