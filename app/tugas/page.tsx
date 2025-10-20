"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useTugas } from "../context/TugasContext";

type FormTugas = {
  judul: string;
  deadline: string;
  prioritas: "Tinggi" | "Sedang" | "Rendah";
};

export default function TugasPage() {
  const { tugasList, setTugasList } = useTugas();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<FormTugas>({ judul: "", deadline: "", prioritas: "Tinggi" });
  const [editId, setEditId] = useState<number | null>(null);

  function handleAddOrEdit(e: React.FormEvent) {
    e.preventDefault();
    if (editId !== null) {
      setTugasList((prev) =>
        prev.map((t) =>
          t.id === editId ? { ...t, ...form } : t
        )
      );
    } else {
      setTugasList((prev) => [
        ...prev,
        {
          id: Date.now(),
          judul: form.judul,
          deadline: form.deadline,
          prioritas: form.prioritas,
          status: "Belum selesai",
        }
      ]);
    }
    setForm({ judul: "", deadline: "", prioritas: "Tinggi" });
    setShowForm(false);
    setEditId(null);
  }

  function handleEdit(tugas: any) {
    setForm({ judul: tugas.judul, deadline: tugas.deadline || "", prioritas: tugas.prioritas || "Tinggi" });
    setShowForm(true);
    setEditId(tugas.id);
  }

  function handleDelete(id: number) {
    setTugasList((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Mengelola Tugas</h1>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
        onClick={() => { setShowForm(true); setEditId(null); }}
      >
        + Tambah Tugas
      </button>
      {showForm && (
        <form className="mb-6 bg-white p-4 rounded shadow" onSubmit={handleAddOrEdit}>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Judul Tugas</label>
              <input className="border px-2 py-2 w-full rounded" value={form.judul} onChange={e => setForm(f => ({ ...f, judul: e.target.value }))} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Deadline</label>
              <input type="date" className="border px-2 py-2 w-full rounded" value={form.deadline} onChange={e => setForm(f => ({ ...f, deadline: e.target.value }))} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Prioritas</label>
              <select className="border px-2 py-2 w-full rounded" value={form.prioritas} onChange={e => setForm(f => ({ ...f, prioritas: e.target.value as any }))}>
                <option value="Tinggi">Tinggi</option>
                <option value="Sedang">Sedang</option>
                <option value="Rendah">Rendah</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">{editId !== null ? 'Simpan' : 'Tambah'}</button>
            <button type="button" className="bg-gray-200 px-4 py-2 rounded" onClick={() => { setShowForm(false); setEditId(null); }}>Batal</button>
          </div>
        </form>
      )}

      <div className="bg-white rounded shadow">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Judul Tugas</th>
              <th className="p-3 text-left">Deadline</th>
              <th className="p-3 text-left">Prioritas</th>
              <th className="p-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {tugasList.map(tugas => (
              <tr key={tugas.id} className="border-t">
                <td className="p-3">{tugas.judul}</td>
                <td className="p-3">{tugas.deadline || '-'}</td>
                <td className="p-3">{tugas.prioritas || '-'}</td>
                <td className="p-3 text-center">
                  <button className="text-sm bg-yellow-300 px-2 py-1 rounded mr-2" onClick={() => handleEdit(tugas)}>Edit</button>
                  <button className="text-sm bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(tugas.id)}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}