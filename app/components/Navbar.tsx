"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ListChecks, BarChart3, Calendar } from 'lucide-react';
import { useTugas } from '../context/TugasContext';

export default function Navbar() {
  const pathname = usePathname() || '/';
  const { tugasList } = useTugas();

  const counts = {
    selesai: tugasList.filter(t => t.status === 'Selesai').length,
    dikerjakan: tugasList.filter(t => t.status === 'Sedang dikerjakan').length,
    terlambat: tugasList.filter(t => t.status === 'Terlambat').length,
  };

  function isActive(path: string) {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  }

  return (
    <header className="bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-md">
              <LayoutDashboard className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-lg font-semibold text-blue-700">WorkRadar</div>
              <div className="text-sm text-gray-500">Task Management Dashboard</div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500 block" />{counts.selesai} Selesai</span>
              <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-500 block" />{counts.dikerjakan} Dikerjakan</span>
              <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500 block" />{counts.terlambat} Terlambat</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs row: transparent background, centered pill container */}
      <div className="bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-center h-14">
            <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm">
              <Link href="/dashboard" className={`px-6 py-2 rounded-md text-sm flex items-center gap-2 ${isActive('/dashboard') ? 'bg-white shadow-sm text-gray-800' : 'text-gray-600 hover:bg-white/50'}`}>
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>

              <Link href="/tugas" className={`mx-2 px-6 py-2 rounded-md text-sm flex items-center gap-2 ${isActive('/tugas') ? 'bg-white shadow-sm text-gray-800' : 'text-gray-600 hover:bg-white/50'}`}>
                <ListChecks className="w-4 h-4" />
                Kelola Tugas
              </Link>

              <Link href="/analitik" className={`mx-2 px-6 py-2 rounded-md text-sm flex items-center gap-2 ${isActive('/analitik') ? 'bg-white shadow-sm text-gray-800' : 'text-gray-600 hover:bg-white/50'}`}>
                <BarChart3 className="w-4 h-4" />
                Analitik
              </Link>

              <Link href="/penjadwalan" className={`ml-2 px-6 py-2 rounded-md text-sm flex items-center gap-2 ${isActive('/penjadwalan') ? 'bg-white shadow-sm text-gray-800' : 'text-gray-600 hover:bg-white/50'}`}>
                <Calendar className="w-4 h-4" />
                Penjadwalan
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
