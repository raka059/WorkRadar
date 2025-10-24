"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

export type Tugas = {
  id: number;
  judul: string;
  status: "Belum selesai" | "Selesai" | "Sedang dikerjakan" | "Terlambat";
  deadline?: string;
  completedAt?: string; // ISO timestamp ketika tugas ditandai selesai
  prioritas?: "Tinggi" | "Sedang" | "Rendah";
};

const defaultTugas: Tugas[] = [
  { id: 1, judul: "Membuat laporan mingguan", status: "Belum selesai", deadline: "2025-10-20", prioritas: "Tinggi" },
  // completedAt dihilangkan agar modul ini deterministik (tidak memanggil new Date() saat dimuat)
  { id: 2, judul: "Review project client", status: "Selesai", deadline: "2025-10-21", prioritas: "Sedang" },
  { id: 3, judul: "Meeting tim", status: "Belum selesai", deadline: "2025-10-22", prioritas: "Rendah" },
];

const TugasContext = createContext<{
  tugasList: Tugas[];
  setTugasList: React.Dispatch<React.SetStateAction<Tugas[]>>;
  addTugas: (t: Omit<Tugas, 'id' | 'completedAt'>) => void;
  updateTugas: (id: number, patch: Partial<Tugas>) => void;
  deleteTugas: (id: number) => void;
} | undefined>(undefined);

export function useTugas() {
  const context = useContext(TugasContext);
  if (!context) throw new Error("useTugas harus di dalam TugasProvider");
  return context;
}

export function TugasProvider({ children }: { children: ReactNode }) {
  const [tugasList, setTugasList] = useState<Tugas[]>(() => {
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem('tugas') : null;
      if (raw) return JSON.parse(raw) as Tugas[];
    } catch (e) {
      // ignore
    }
    return defaultTugas;
  });

  // persist
  React.useEffect(() => {
    try {
      localStorage.setItem('tugas', JSON.stringify(tugasList));
    } catch (e) {
      // ignore
    }
  }, [tugasList]);

  function addTugas(t: Omit<Tugas, 'id' | 'completedAt'>) {
    const next: Tugas = { ...t, id: Date.now(), completedAt: undefined };
    setTugasList((prev) => [...prev, next]);
  }

  function updateTugas(id: number, patch: Partial<Tugas>) {
    setTugasList((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  }

  function deleteTugas(id: number) {
    setTugasList((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <TugasContext.Provider value={{ tugasList, setTugasList, addTugas, updateTugas, deleteTugas }}>
      {children}
    </TugasContext.Provider>
  );
}
