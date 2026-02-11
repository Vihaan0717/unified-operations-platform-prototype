"use client";

import { useState } from "react";

type StaffMember = {
  id: number;
  name: string;
  role: string;
  email: string;
  permissions: {
    inbox: boolean;
    inventory: boolean;
    settings: boolean;
  };
};

const initialStaff: StaffMember[] = [
  {
    id: 1,
    name: "Dr. Maya Chen",
    role: "Medical Director",
    email: "maya.chen@careopsclinic.com",
    permissions: { inbox: true, inventory: true, settings: true },
  },
  {
    id: 2,
    name: "Alex Rivera, RN",
    role: "Care Coordinator",
    email: "alex.rivera@careopsclinic.com",
    permissions: { inbox: true, inventory: false, settings: false },
  },
  {
    id: 3,
    name: "Taylor Singh",
    role: "Operations",
    email: "taylor.singh@careopsclinic.com",
    permissions: { inbox: true, inventory: true, settings: false },
  },
];

export default function StaffSettingsPage() {
  const [staff, setStaff] = useState<StaffMember[]>(initialStaff);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Care Coordinator");

  const togglePermission = (
    id: number,
    key: keyof StaffMember["permissions"]
  ) => {
    setStaff((prev) =>
      prev.map((member) =>
        member.id === id
          ? {
              ...member,
              permissions: {
                ...member.permissions,
                [key]: !member.permissions[key],
              },
            }
          : member
      )
    );
  };

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;

    const newMember: StaffMember = {
      id: staff.length + 1,
      name: inviteEmail.split("@")[0] || "New Staff",
      role: inviteRole,
      email: inviteEmail.trim(),
      permissions: {
        inbox: true,
        inventory: inviteRole !== "Care Coordinator",
        settings: inviteRole === "Admin",
      },
    };

    setStaff((prev) => [...prev, newMember]);
    setInviteEmail("");
    setInviteRole("Care Coordinator");
    setIsModalOpen(false);
  };

  return (
    <div className="flex min-h-screen items-start justify-center bg-slate-50 px-4 py-10 font-sans">
      <main className="w-full max-w-5xl rounded-2xl border border-slate-200 bg-white/95 px-6 py-6 shadow-xl shadow-slate-200/70 sm:px-8 sm:py-8">
        <header className="flex flex-col gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
              Settings
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
              Team Management
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Control who can access patient communication, inventory, and
              administrative features.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center rounded-full bg-sky-600 px-4 py-2 text-xs font-semibold text-white shadow-sm shadow-sky-300 transition hover:bg-sky-700"
          >
            Invite Staff
          </button>
        </header>

        {/* Staff table */}
        <section className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">
                Staff directory
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Manage access to key CareOps modules for each team member.
              </p>
            </div>
            <span className="rounded-full bg-slate-50 px-3 py-1 text-xs text-slate-500">
              {staff.length} active staff
            </span>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-100 bg-slate-50/60">
            <table className="min-w-full divide-y divide-slate-100 text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
                    Name
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
                    Role
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
                    Email
                  </th>
                  <th className="px-4 py-2 text-center text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
                    Access Inbox
                  </th>
                  <th className="px-4 py-2 text-center text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
                    Manage Inventory
                  </th>
                  <th className="px-4 py-2 text-center text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
                    Edit Settings
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white/70">
                {staff.map((member) => (
                  <tr key={member.id}>
                    <td className="px-4 py-3 align-top text-sm font-medium text-slate-900">
                      {member.name}
                    </td>
                    <td className="px-4 py-3 align-top text-xs text-slate-600">
                      {member.role}
                    </td>
                    <td className="px-4 py-3 align-top text-xs text-slate-500">
                      {member.email}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <PermissionToggle
                        enabled={member.permissions.inbox}
                        onChange={() => togglePermission(member.id, "inbox")}
                        label="Inbox"
                      />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <PermissionToggle
                        enabled={member.permissions.inventory}
                        onChange={() => togglePermission(member.id, "inventory")}
                        label="Inventory"
                      />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <PermissionToggle
                        enabled={member.permissions.settings}
                        onChange={() => togglePermission(member.id, "settings")}
                        label="Settings"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Invite modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-20 flex items-center justify-center bg-slate-900/40 px-4">
            <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/20">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                    Invite staff
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Send a secure invitation to join your CareOps workspace.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="text-xs text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleInvite} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700">
                    Staff Email
                  </label>
                  <input
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    required
                    placeholder="name@careopsclinic.com"
                    className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700">
                    Role
                  </label>
                  <select
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-100"
                  >
                    <option>Care Coordinator</option>
                    <option>Clinician</option>
                    <option>Operations</option>
                    <option>Admin</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="mt-1 inline-flex w-full items-center justify-center rounded-full bg-sky-600 px-4 py-2 text-xs font-semibold text-white shadow-sm shadow-sky-300 transition hover:bg-sky-700"
                >
                  Send Invite
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

type PermissionToggleProps = {
  enabled: boolean;
  label: string;
  onChange: () => void;
};

function PermissionToggle({ enabled, onChange }: PermissionToggleProps) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`inline-flex items-center justify-center rounded-full border px-3 py-1 text-[11px] font-medium transition ${
        enabled
          ? "border-emerald-200 bg-emerald-50 text-emerald-800"
          : "border-slate-200 bg-white text-slate-500"
      }`}
    >
      <span
        className={`mr-1 h-1.5 w-1.5 rounded-full ${
          enabled ? "bg-emerald-500" : "bg-slate-300"
        }`}
      />
      {enabled ? "Enabled" : "Disabled"}
    </button>
  );
}

