'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Register() {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Password dan konfirmasi password tidak sama!');
      return;
    }

    console.log('Data registrasi:', formData);
    alert('Pendaftaran berhasil!');
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      {/* Background Radar */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative w-96 h-96">
            {/* Radar sweep */}
            <div
              className="absolute inset-0 animate-spin rounded-full"
              style={{
                animationDuration: '4s',
                background:
                  'conic-gradient(from 0deg, transparent, rgba(96,165,250,0.3), transparent)',
              }}
            ></div>

            {/* Circles */}
            {[0, 8, 16, 24].map((v) => (
              <div
                key={v}
                className={`absolute inset-${v} rounded-full border-2 border-blue-400/20`}
              ></div>
            ))}

            {/* Center dot */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"></div>

            {/* Cross lines */}
            <div className="absolute top-0 left-1/2 w-px h-full bg-blue-400/20 transform -translate-x-1/2"></div>
            <div className="absolute top-1/2 left-0 w-full h-px bg-blue-400/20 transform -translate-y-1/2"></div>
          </div>
        </div>

        {/* Scan line */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-blue-400/40 to-transparent animate-scan"></div>
        </div>
      </div>

      {/* Register Form */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-blue-300/20 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Daftar Akun</h1>
            <p className="text-blue-100">Silakan isi data Anda</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Nama */}
            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">Nama Lengkap</label>
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                className="w-full pl-4 pr-4 py-3 bg-white/10 border border-blue-300/30 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-white placeholder-blue-300/50"
                placeholder="Masukkan nama lengkap"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-4 pr-4 py-3 bg-white/10 border border-blue-300/30 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-white placeholder-blue-300/50"
                placeholder="Masukkan email"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-4 pr-12 py-3 bg-white/10 border border-blue-300/30 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-white placeholder-blue-300/50"
                  placeholder="Masukkan password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-blue-100 transition"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {/* Konfirmasi Password */}
            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">
                Konfirmasi Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full pl-4 pr-4 py-3 bg-white/10 border border-blue-300/30 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-white placeholder-blue-300/50"
                placeholder="Ulangi password"
                required
              />
            </div>

            {/* Tombol Submit */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-800 transform hover:scale-105 transition"
            >
              Daftar
            </button>

            {/* Link ke Login */}
            <p className="text-center text-blue-200 text-sm mt-4">
              Sudah punya akun?{' '}
              <Link
                href="/"
                className="text-blue-400 hover:text-blue-100 underline font-medium"
              >
                Masuk di sini
              </Link>
            </p>
          </form>

          {/* Copyright */}
          <div className="text-center text-xs text-blue-300 bg-blue-950/30 py-3 border-t border-blue-300/10">
            © {new Date().getFullYear()} WorkRadar. All rights reserved.
          </div>
        </div>
      </div>

      {/* Animasi Radar */}
      <style jsx global>{`
        @keyframes scan {
          0% {
            top: 0;
          }
          100% {
            top: 100%;
          }
        }
        .animate-scan {
          animation: scan 3s linear infinite;
        }
      `}</style>
    </div>
  );
}
