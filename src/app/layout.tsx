import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex h-screen bg-slate-50">
        <aside className="w-64 bg-slate-900 text-white p-6 flex flex-col gap-4">
          <div className="text-xl font-bold text-blue-400 mb-6">CareOps</div>
          <Link href="/dashboard" className="hover:text-blue-400">📊 Dashboard</Link>
          <Link href="/inbox" className="hover:text-blue-400">📩 Inbox</Link>
          <Link href="/settings/staff" className="hover:text-blue-400">👥 Staff Management</Link>
          <div className="mt-auto pt-4 border-t border-slate-700">
            <Link href="/book" className="text-xs text-slate-400 underline">Patient Booking Link</Link>
          </div>
        </aside>
        <main className="flex-1 overflow-auto">{children}</main>
      </body>
    </html>
  );
}