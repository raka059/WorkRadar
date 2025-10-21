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
} | undefined>(undefined);

export function useTugas() {
  const context = useContext(TugasContext);
  if (!context) throw new Error("useTugas harus di dalam TugasProvider");
  return context;
}

export function TugasProvider({ children }: { children: ReactNode }) {
  const [tugasList, setTugasList] = useState<Tugas[]>(defaultTugas);
  return (
    <TugasContext.Provider value={{ tugasList, setTugasList }}>
      {children}
    </TugasContext.Provider>
  );
}
