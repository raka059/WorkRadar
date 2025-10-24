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

  // compute percent complete
  const percent = total > 0 ? Math.round((selesai / total) * 100) : 0;

  // prepare pie data (status distribution)
  const statusCounts = [
    tugasList.filter(t => t.status === 'Belum selesai').length,
    sedang,
    selesai,
    terlambat,
  ];

  // weekly trend: compute simple 4-week buckets by completedAt date
  const weeks = [0, 0, 0, 0];
  const now = new Date();
  tugasList.forEach(t => {
    if (!t.completedAt) return;
    const d = new Date(t.completedAt);
    const diffDays = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
    const weekIndex = Math.floor(diffDays / 7);
    if (weekIndex >= 0 && weekIndex < 4) weeks[3 - weekIndex] += 1; // recent week at right
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-2">Analitik Tugas</h1>
      <p className="text-gray-500 mb-6">Pantau produktivitas dan progres tugas Anda</p>

      {/* stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg p-6 shadow border">
          <p className="text-sm text-gray-500">Total Tugas</p>
          <h3 className="text-2xl font-bold mt-2">{total}</h3>
          <p className="text-xs text-gray-400 mt-2">Semua tugas yang ada</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow border">
          <p className="text-sm text-gray-500">Tugas Selesai</p>
          <h3 className="text-2xl font-bold text-green-600 mt-2">{selesai}</h3>
          <p className="text-xs text-gray-400 mt-2">{total ? ((selesai/total)*100).toFixed(1) : 0}% dari total</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow border">
          <p className="text-sm text-gray-500">Sedang Dikerjakan</p>
          <h3 className="text-2xl font-bold text-orange-600 mt-2">{sedang}</h3>
          <p className="text-xs text-gray-400 mt-2">Tugas dalam progres</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow border">
          <p className="text-sm text-gray-500">Tugas Terlambat</p>
          <h3 className="text-2xl font-bold text-red-600 mt-2">{terlambat}</h3>
          <p className="text-xs text-gray-400 mt-2">Perlu perhatian segera</p>
        </div>
      </div>

      {/* progress card */}
      <div className="bg-white rounded-lg p-6 shadow border mb-6">
        <h3 className="text-lg font-semibold">Progres Keseluruhan</h3>
        <p className="text-sm text-gray-500">Tingkat penyelesaian tugas secara keseluruhan</p>

        <div className="mt-6">
          <div className="w-full bg-gray-100 h-4 rounded-full overflow-hidden">
            <div className="h-4 bg-blue-500" style={{ width: `${percent}%` }} />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>0%</span>
            <span>{percent.toFixed(1)}%</span>
            <span>100%</span>
          </div>
        </div>
      </div>

      {/* distribution charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* pie */}
        <div className="bg-white rounded-lg p-6 shadow border">
          <h3 className="text-lg font-semibold mb-2">Distribusi Status Tugas</h3>
          <p className="text-sm text-gray-500 mb-4">Pembagian tugas berdasarkan status</p>
          <div className="flex items-center justify-center">
            <svg width="220" height="160" viewBox="0 0 220 160">
              {/** draw pie based on statusCounts **/}
              {
                (() => {
                  const totalS = statusCounts.reduce((a,b)=>a+b,0) || 1;
                  let angleStart = -Math.PI/2;
                  const cx = 110, cy = 80, r=60;
                  const colors = ['#6b7280','#3b82f6','#10b981','#ef4444'];
                  return statusCounts.map((c, idx) => {
                    const angle = (c/totalS) * Math.PI * 2;
                    const x1 = cx + r * Math.cos(angleStart);
                    const y1 = cy + r * Math.sin(angleStart);
                    angleStart += angle;
                    const x2 = cx + r * Math.cos(angleStart);
                    const y2 = cy + r * Math.sin(angleStart);
                    const large = angle > Math.PI ? 1 : 0;
                    const d = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`;
                    return <path key={idx} d={d} fill={colors[idx]} stroke="#fff" />;
                  })
                })()
              }
            </svg>
          </div>
        </div>

        {/* priorities bar */}
        <div className="bg-white rounded-lg p-6 shadow border">
          <h3 className="text-lg font-semibold mb-2">Distribusi Prioritas</h3>
          <p className="text-sm text-gray-500 mb-4">Pembagian tugas berdasarkan tingkat prioritas</p>
          <div className="grid grid-cols-3 gap-4 items-end h-40">
            <div className="flex flex-col items-center">
              <div className="w-16 bg-blue-500 rounded-t" style={{ height: `${(priTinggi || 0) * 24}px` }}></div>
              <div className="mt-2 text-sm">Tinggi</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 bg-blue-500 rounded-t" style={{ height: `${(priSedang || 0) * 24}px` }}></div>
              <div className="mt-2 text-sm">Sedang</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 bg-blue-500 rounded-t" style={{ height: `${(priRendah || 0) * 24}px` }}></div>
              <div className="mt-2 text-sm">Rendah</div>
            </div>
          </div>
        </div>
      </div>

      {/* weekly trend */}
      <div className="bg-white rounded-lg p-6 shadow border mb-6">
        <h3 className="text-lg font-semibold mb-2">Tren Penyelesaian Mingguan</h3>
        <p className="text-sm text-gray-500 mb-4">Progres penyelesaian tugas dalam 4 minggu terakhir</p>
        <div className="w-full h-56 flex items-end gap-6">
          {weeks.map((v,i)=> (
            <div key={i} className="flex-1 flex flex-col items-center">
              <div className="w-full bg-gray-200 rounded-t" style={{ height: `${v * 18 + 8}px` }}></div>
              <div className="mt-3 text-sm text-gray-600">Minggu {i+1}</div>
            </div>
          ))}
        </div>
      </div>

      {/* insight quick */}
      <div className="bg-white rounded-lg p-6 shadow border">
        <h3 className="text-xl font-semibold">Insight Cepat</h3>
        <p className="text-gray-500">Ringkasan dan rekomendasi berdasarkan data tugas</p>

        <div className="mt-6 bg-blue-50 p-4 rounded">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-full">
              <svg width="20" height="20" viewBox="0 0 24 24"><path fill="#1e40af" d="M12 2L12 12 20 14"/></svg>
            </div>
            <div>
              <div className="font-medium text-blue-700">Banyak tugas sedang dikerjakan</div>
              <div className="text-sm text-blue-700/80">Fokus menyelesaikan tugas yang sudah dimulai sebelum mengambil tugas baru</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
