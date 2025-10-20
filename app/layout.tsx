import './globals.css';
import Link from 'next/link';
import { TugasProvider } from "./context/TugasContext";
import { LayoutDashboard, ListChecks, BarChart3 } from 'lucide-react';

export const metadata = {
  title: 'WorkRadar',
  description: 'Sistem Dashboard Tamu Berkunjung',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        <TugasProvider>
          <div className="flex min-h-screen bg-gray-50 text-gray-900">
            {/* Sidebar */}
            <aside className="w-64 bg-[#0B1221] text-white flex flex-col p-4">
              {/* Logo */}
              <div className="flex items-center gap-2 mb-8">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <LayoutDashboard className="w-6 h-6 text-white" />
                </div>
                <h1 className="font-bold text-lg">WorkRadar</h1>
                <span className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full">v1.0</span>
              </div>

              {/* Menu */}
              <nav className="flex flex-col gap-2">
                <Link href="/dashboard" className="flex items-center gap-3 bg-gray-800 px-3 py-2 rounded-lg font-semibold">
                  <LayoutDashboard className="w-5 h-5" /> Dashboard
                </Link>
                <Link href="/tugas" className="flex items-center gap-3 hover:bg-gray-800 px-3 py-2 rounded-lg transition">
                  <ListChecks className="w-5 h-5" /> Tugas
                </Link>
                <Link href="/analitik" className="flex items-center gap-3 hover:bg-gray-800 px-3 py-2 rounded-lg transition">
                  <BarChart3 className="w-5 h-5" /> Analitik
                </Link>
              </nav>
            </aside>

            {/* Main content (pages render here) */}
            <main className="flex-1 p-8">{children}</main>
          </div>
        </TugasProvider>
      </body>
    </html>
  );
}
