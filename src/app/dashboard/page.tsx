"use client";

const inventoryItems = [
  { id: 1, name: "Surgical Masks", category: "PPE", quantity: 3 },
  { id: 2, name: "Nitrile Gloves (M)", category: "PPE", quantity: 14 },
  { id: 3, name: "IV Starter Kits", category: "Supplies", quantity: 2 },
  { id: 4, name: "Saline Bags 0.9%", category: "Fluids", quantity: 8 },
  { id: 5, name: "Alcohol Swabs", category: "Supplies", quantity: 22 },
];

export default function DashboardPage() {
  const lowStockItems = inventoryItems.filter((item) => item.quantity < 5);

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
            <p className="text-xs text-slate-500">Care coordination hub</p>
          </div>
        </div>

        <nav className="space-y-1 text-sm">
          <SidebarItem label="Dashboard" active />
          <SidebarItem label="Inbox" />
          <SidebarItem label="Inventory" />
          <SidebarItem label="Settings" />
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
              Real-time snapshot of your care operations.
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
            label="Total Appointments"
            value="12"
            badge="Today"
            tone="primary"
          />
          <StatsCard
            label="New Leads"
            value="4"
            badge="Inbound"
            tone="soft"
          />
          <StatsCard
            label="Staff Online"
            value="2"
            badge="Live"
            tone="success"
          />
        </section>

        {/* Inventory and alerts */}
        <section className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)]">
          {/* Inventory table */}
          <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm">
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
                {inventoryItems.length} tracked items
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
                    const isLow = item.quantity < 5;
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

          {/* Alert panel */}
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-900">
                Inventory alerts
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                We flag supplies at risk so your team can act before it impacts
                patient care.
              </p>

              {lowStockItems.length > 0 ? (
                <div className="mt-4 space-y-3">
                  <div className="flex items-start gap-3 rounded-2xl border border-rose-400 bg-rose-50 px-4 py-3 shadow-sm shadow-rose-100">
                    <div className="mt-0.5 h-7 w-7 shrink-0 rounded-full bg-rose-600 text-center text-xs font-semibold leading-7 text-white">
                      !
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-700">
                        Action Required: Low Stock
                      </p>
                      <p className="mt-1 text-sm text-rose-900">
                        The following items are below the safe threshold of 5 units.
                      </p>
                      <ul className="mt-2 space-y-1 text-sm text-rose-900">
                        {lowStockItems.map((item) => (
                          <li key={item.id} className="flex items-center justify-between">
                            <span>{item.name}</span>
                            <span className="font-semibold">
                              {item.quantity} units
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                  All monitored items are within safe stock levels.
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-sky-100 bg-sky-50/70 p-4 text-xs text-slate-600">
              <p className="font-medium text-sky-900">
                Pro tip for clinical teams
              </p>
              <p className="mt-1">
                Pair inventory alerts with your Inbox routing rules so low-stock
                incidents are automatically escalated to the right coordinator.
              </p>
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
          ? "bg-sky-50 text-sky-800 shadow-sm border border-sky-100"
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

