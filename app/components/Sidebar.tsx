"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ListChecks, BarChart3 } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  // Hide sidebar on login/register pages (adjust paths as needed)
  if (!pathname) return null;
  const hideOn = ['/', '/register', '/login'];
  if (hideOn.includes(pathname)) return null;

  return (
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
  );
}
