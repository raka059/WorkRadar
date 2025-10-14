'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Password tidak cocok!');
      return;
    }

    console.log('Register:', formData);
    alert('Registrasi berhasil!');
    router.push('/'); // kembali ke halaman login
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950"></div>

      {/* Form Card */}
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
            <h1 className="text-3xl font-bold text-white mb-2">Buat Akun Baru</h1>
            <p className="text-blue-100">Isi data Anda untuk mendaftar</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">
                Nama Lengkap
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-blue-300/30 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-white placeholder-blue-300/50"
                placeholder="Masukkan nama lengkap"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-blue-300/30 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-white placeholder-blue-300/50"
                placeholder="Masukkan email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-4 pr-12 py-3 bg-white/10 border border-blue-300/30 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-white placeholder-blue-300/50"
                  placeholder="Masukkan password"
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

            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">
                Konfirmasi Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-blue-300/30 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-white placeholder-blue-300/50"
                placeholder="Ulangi password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-800 transform hover:scale-105 transition"
            >
              Daftar
            </button>

            <p className="text-center text-blue-200 text-sm mt-4">
              Sudah punya akun?{' '}
              <Link
                href="/"
                className="text-blue-400 hover:text-blue-100 underline font-medium"
              >
                Login di sini
              </Link>
            </p>
          </form>

          {/* Copyright */}
          <div className="text-center text-xs text-blue-300 bg-blue-950/30 py-3 border-t border-blue-300/10">
            © {new Date().getFullYear()} WorkRadar. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}
