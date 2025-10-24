
'use client';
import { useRouter } from 'next/navigation';
import { useTugas } from '../context/TugasContext';
import Link from 'next/link';
import { CheckSquare, Target, Clock, AlertCircle, CloudSun, LayoutDashboard, ListChecks, BarChart3, Calendar } from 'lucide-react';

export default function Dashboard() {
  const router = useRouter();
  const { tugasList } = useTugas();

  const total = tugasList.length;
  const selesai = tugasList.filter(t => t.status === 'Selesai').length;
  const sedang = tugasList.filter(t => t.status === 'Sedang dikerjakan').length;
  const terlambat = tugasList.filter(t => t.status === 'Terlambat').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top area: tabs and small status */}
      <div className="flex items-center justify-between py-6">
        <div className="flex items-center gap-6">

        </div>

        
      </div>

      {/* Title & subtitle */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">Ringkasan aktivitas dan progres tugas Anda</p>
      </div>

      {/* Statistik cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 shadow border">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Total Tugas</p>
              <h2 className="text-2xl font-bold text-gray-900">{total}</h2>
              <p className="text-xs text-blue-500 mt-2">Semua tugas yang ada</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <CheckSquare className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-6 shadow border">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-green-700">Selesai</p>
              <h2 className="text-2xl font-bold text-green-700">{selesai}</h2>
              <p className="text-xs text-green-600 mt-2">0.0% dari total</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Target className="w-6 h-6 text-green-700" />
            </div>
          </div>
        </div>

        <div className="bg-orange-50 rounded-lg p-6 shadow border">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-orange-700">Dikerjakan</p>
              <h2 className="text-2xl font-bold text-orange-700">{sedang}</h2>
              <p className="text-xs text-orange-600 mt-2">Sedang dalam progres</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <Clock className="w-6 h-6 text-orange-700" />
            </div>
          </div>
        </div>

        <div className="bg-red-50 rounded-lg p-6 shadow border">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-red-700">Terlambat</p>
              <h2 className="text-2xl font-bold text-red-700">{terlambat}</h2>
              <p className="text-xs text-red-600 mt-2">Perlu perhatian segera</p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <AlertCircle className="w-6 h-6 text-red-700" />
            </div>
          </div>
        </div>
      </div>

      {/* Action cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-lg p-6 shadow border">
          <h3 className="font-semibold text-lg">Kelola Tugas</h3>
          <p className="text-sm text-gray-500 mt-2">Tambah, edit, dan kelola semua tugas Anda</p>
          <div className="mt-4">
            <Link href="/tugas" className="inline-block bg-slate-900 text-white px-4 py-2 rounded-md">Buka Kelola Tugas</Link>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow border">
          <h3 className="font-semibold text-lg">Lihat Analitik</h3>
          <p className="text-sm text-gray-500 mt-2">Pantau produktivitas dan progres tugas</p>
          <div className="mt-4">
            <Link href="/analitik" className="inline-block border border-slate-200 px-4 py-2 rounded-md">Buka Analitik</Link>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow border">
          <h3 className="font-semibold text-lg">Saran Penjadwalan</h3>
          <p className="text-sm text-gray-500 mt-2">Dapatkan rekomendasi urutan pengerjaan tugas</p>
          <div className="mt-4">
            <Link href="/penjadwalan" className="inline-block border border-slate-200 px-4 py-2 rounded-md">Lihat Saran</Link>
          </div>
        </div>
      </div>

      {/* Welcome banner */}
      <div className="rounded-lg p-8 mb-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg">
        <h2 className="text-2xl font-bold">Selamat datang di WorkRadar!</h2>
        <p className="mt-2">Platform manajemen tugas yang membantu Anda tetap produktif dan terorganisir</p>
        <ul className="mt-4 space-y-2 list-disc list-inside">
          <li>✨ Kelola tugas dengan mudah dan efisien</li>
          <li>📊 Pantau progres dengan analitik real-time</li>
          <li>🧭 Dapatkan saran penjadwalan cerdas</li>
        </ul>
      </div>

    </div>
  );
}
