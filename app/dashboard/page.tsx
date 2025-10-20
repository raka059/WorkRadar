
'use client';
import { useRouter } from 'next/navigation';
import { useTugas } from '../context/TugasContext';
import { CheckSquare, Target, Clock, AlertCircle, CloudSun } from 'lucide-react';

export default function Dashboard() {
  const router = useRouter();
  const { tugasList } = useTugas();

  const total = tugasList.length;
  const selesai = tugasList.filter(t => t.status === 'Selesai').length;
  const sedang = tugasList.filter(t => t.status === 'Sedang dikerjakan').length;
  const terlambat = tugasList.filter(t => t.status === 'Terlambat').length;

  return (
    <div>
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
            <h3 className="text-3xl font-bold text-gray-900">{total}</h3>
          </div>
          <CheckSquare className="w-10 h-10 text-blue-500" />
        </div>

        {/* Selesai */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100 flex justify-between items-center">
          <div>
            <p className="text-gray-500">Selesai</p>
            <h3 className="text-3xl font-bold text-green-500">{selesai}</h3>
          </div>
          <Target className="w-10 h-10 text-green-500" />
        </div>

        {/* Sedang Dikerjakan */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100 flex justify-between items-center">
          <div>
            <p className="text-gray-500">Sedang Dikerjakan</p>
            <h3 className="text-3xl font-bold text-blue-500">{sedang}</h3>
          </div>
          <Clock className="w-10 h-10 text-blue-400" />
        </div>

        {/* Terlambat */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100 flex justify-between items-center">
          <div>
            <p className="text-gray-500">Terlambat</p>
            <h3 className="text-3xl font-bold text-red-500">{terlambat}</h3>
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
    </div>
  );
}
