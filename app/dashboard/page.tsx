'use client';
import { useRouter } from 'next/navigation';
import { CheckSquare, Target, Clock, AlertCircle, LayoutDashboard, ListChecks, BarChart3, CloudSun } from 'lucide-react';

export default function Dashboard() {
  const router = useRouter();

  return (
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
          <button className="flex items-center gap-3 bg-gray-800 px-3 py-2 rounded-lg font-semibold">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </button>
          <button className="flex items-center gap-3 hover:bg-gray-800 px-3 py-2 rounded-lg transition">
            <ListChecks className="w-5 h-5" /> Tugas
          </button>
          <button className="flex items-center gap-3 hover:bg-gray-800 px-3 py-2 rounded-lg transition">
            <BarChart3 className="w-5 h-5" /> Analitik
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">Dashboard</h2>
          <div className="flex items-center gap-2 text-gray-600">
            <CloudSun className="w-5 h-5" />
            <span>28°C Cerah</span>
          </div>
        </div>

        {/* Statistik Cards */}
        <div className="grid grid-cols-2 gap-6">
          {/* Total Tugas */}
          <div className="bg-white p-6 rounded-xl shadow border border-gray-100 flex justify-between items-center">
            <div>
              <p className="text-gray-500">Total Tugas</p>
              <h3 className="text-3xl font-bold text-gray-900">0</h3>
            </div>
            <CheckSquare className="w-10 h-10 text-blue-500" />
          </div>

          {/* Selesai */}
          <div className="bg-white p-6 rounded-xl shadow border border-gray-100 flex justify-between items-center">
            <div>
              <p className="text-gray-500">Selesai</p>
              <h3 className="text-3xl font-bold text-green-500">0</h3>
            </div>
            <Target className="w-10 h-10 text-green-500" />
          </div>

          {/* Sedang Dikerjakan */}
          <div className="bg-white p-6 rounded-xl shadow border border-gray-100 flex justify-between items-center">
            <div>
              <p className="text-gray-500">Sedang Dikerjakan</p>
              <h3 className="text-3xl font-bold text-blue-500">0</h3>
            </div>
            <Clock className="w-10 h-10 text-blue-400" />
          </div>

          {/* Terlambat */}
          <div className="bg-white p-6 rounded-xl shadow border border-gray-100 flex justify-between items-center">
            <div>
              <p className="text-gray-500">Terlambat</p>
              <h3 className="text-3xl font-bold text-red-500">0</h3>
            </div>
            <AlertCircle className="w-10 h-10 text-red-400" />
          </div>
        </div>

        {/* Tombol Logout */}
        <div className="mt-10">
          <button
            onClick={() => router.push('/')}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            Logout
          </button>
        </div>
      </main>
    </div>
  );
}
