'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // ⬅️ Tambahan di sini

export default function Home() {
  const router = useRouter(); // ⬅️ Tambahan di sini
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Sementara: login sederhana (tanpa backend)
    if (formData.email && formData.password) {
      alert('Login berhasil!');
      router.push('/dashboard'); // ⬅️ Inilah kunci utamanya: pindah ke dashboard
    } else {
      alert('Harap isi email dan password terlebih dahulu!');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      {/* Background Radar */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950">
        {/* Radar circles */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative w-96 h-96">
            <div
              className="absolute inset-0 animate-spin rounded-full"
              style={{
                animationDuration: '4s',
                background:
                  'conic-gradient(from 0deg, transparent, rgba(96,165,250,0.3), transparent)',
              }}
            ></div>

            {[0, 8, 16, 24].map((v) => (
              <div
                key={v}
                className={`absolute inset-${v} rounded-full border-2 border-blue-400/20`}
              ></div>
            ))}

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"></div>
            <div className="absolute top-0 left-1/2 w-px h-full bg-blue-400/20 transform -translate-x-1/2"></div>
            <div className="absolute top-1/2 left-0 w-full h-px bg-blue-400/20 transform -translate-y-1/2"></div>
          </div>
        </div>
      </div>

      {/* Login Form */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-blue-300/20 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">Sistem Login</h1>
            <p className="text-blue-100">Masukkan kredensial Anda</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">
                Email / Username
              </label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-blue-300/30 rounded-lg text-white placeholder-blue-300/50"
                placeholder="Masukkan email atau username"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">
                Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-blue-300/30 rounded-lg text-white placeholder-blue-300/50"
                placeholder="Masukkan password"
              />
            </div>

            {/* Tombol */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-800 transform hover:scale-105 transition"
            >
              Login
            </button>

            {/* Register */}
            <p className="text-center text-blue-200 text-sm mt-4">
              Belum punya akun?{' '}
              <Link
                href="/register"
                className="text-blue-400 hover:text-blue-100 underline font-medium"
              >
                Daftar di sini
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
