import React from "react";

export default function TugasDetail({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">Detail Tugas</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-lg">ID Tugas: {params.id}</p>
        <p className="mt-2 text-gray-600">(Detail tugas bisa ditampilkan di sini)</p>
      </div>
    </main>
  );
}
