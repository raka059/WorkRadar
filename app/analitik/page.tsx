"use client";
import React from 'react';
import { useTugas } from '../context/TugasContext';

function SimpleBar({ data, labels }: { data: number[]; labels: string[] }) {
  const max = Math.max(...data, 1);
  return (
    <div className="w-full bg-white p-4 rounded shadow">
      {data.map((v, i) => (
        <div key={i} className="flex items-center gap-4 mb-2">
          <div className="w-32 text-sm text-gray-600">{labels[i]}</div>
          <div className="flex-1 bg-gray-100 h-6 rounded overflow-hidden">
            <div className="h-6 bg-blue-500 rounded" style={{ width: `${(v / max) * 100}%` }}></div>
          </div>
          <div className="w-12 text-right">{v}</div>
        </div>
      ))}
    </div>
  );
}

export default function AnalitikPage() {
  const { tugasList } = useTugas();
  const [from, setFrom] = React.useState<string>('');
  const [to, setTo] = React.useState<string>('');
  const [timeOfDay, setTimeOfDay] = React.useState<'all' | 'pagi' | 'siang' | 'sore' | 'malam'>('all');

  // helper: parse and filter completed tasks
  const completed = tugasList.filter(t => t.status === 'Selesai' && t.completedAt);

  function inRange(iso?: string) {
    if (!iso) return false;
    const d = new Date(iso);
    if (from) {
      const f = new Date(from);
      if (d < f) return false;
    }
    if (to) {
      const tdate = new Date(to);
      // include whole day
      tdate.setHours(23,59,59,999);
      if (d > tdate) return false;
    }
    return true;
  }

  function inTimeOfDay(iso?: string) {
    if (!iso) return false;
    if (timeOfDay === 'all') return true;
    const h = new Date(iso).getHours();
    if (timeOfDay === 'pagi') return h >= 5 && h < 11;
    if (timeOfDay === 'siang') return h >= 11 && h < 15;
    if (timeOfDay === 'sore') return h >= 15 && h < 19;
    return h >= 19 || h < 5; // malam
  }

  const filtered = completed.filter(t => inRange(t.completedAt) && inTimeOfDay(t.completedAt));

  const total = tugasList.length;
  const selesai = tugasList.filter(t => t.status === 'Selesai').length;
  const sedang = tugasList.filter(t => t.status === 'Sedang dikerjakan').length;
  const terlambat = tugasList.filter(t => t.status === 'Terlambat').length;

  const priTinggi = tugasList.filter(t => t.prioritas === 'Tinggi').length;
  const priSedang = tugasList.filter(t => t.prioritas === 'Sedang').length;
  const priRendah = tugasList.filter(t => t.prioritas === 'Rendah').length;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Analitik</h1>

      <div className="bg-white p-4 rounded shadow mb-6">
        <div className="flex gap-4 items-end">
          <div>
            <label className="text-sm text-gray-600">Dari</label>
            <input type="date" value={from} onChange={e => setFrom(e.target.value)} className="block border px-2 py-1 rounded" />
          </div>
          <div>
            <label className="text-sm text-gray-600">Sampai</label>
            <input type="date" value={to} onChange={e => setTo(e.target.value)} className="block border px-2 py-1 rounded" />
          </div>
          <div>
            <label className="text-sm text-gray-600">Waktu</label>
            <select value={timeOfDay} onChange={e => setTimeOfDay(e.target.value as any)} className="block border px-2 py-1 rounded">
              <option value="all">Semua</option>
              <option value="pagi">Pagi (05-11)</option>
              <option value="siang">Siang (11-15)</option>
              <option value="sore">Sore (15-19)</option>
              <option value="malam">Malam (19-05)</option>
            </select>
          </div>
          <div className="ml-auto text-sm text-gray-600">Hasil filter (tugas selesai): {filtered.length}</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-gray-500">Total Tugas</p>
          <p className="text-2xl font-bold">{total}</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-gray-500">Selesai</p>
          <p className="text-2xl font-bold text-green-500">{selesai}</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-gray-500">Sedang Dikerjakan</p>
          <p className="text-2xl font-bold text-blue-500">{sedang}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <SimpleBar data={[priTinggi, priSedang, priRendah]} labels={["Tinggi", "Sedang", "Rendah"]} />
        <SimpleBar data={[selesai, sedang, terlambat]} labels={["Selesai", "Sedang", "Terlambat"]} />
      </div>

      <div className="mt-6 bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Daftar Tugas (Selesai dan sesuai filter)</h2>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Judul</th>
              <th className="p-2 text-left">Selesai Pada</th>
              <th className="p-2 text-left">Prioritas</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(t => (
              <tr key={t.id} className="border-t">
                <td className="p-2">{t.judul}</td>
                <td className="p-2">{new Date(t.completedAt || '').toLocaleString()}</td>
                <td className="p-2">{t.prioritas || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
