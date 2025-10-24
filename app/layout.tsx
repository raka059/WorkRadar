import './globals.css';
import Link from 'next/link';
import { TugasProvider } from "./context/TugasContext";
import Navbar from './components/Navbar';

export const metadata = {
  title: 'WorkRadar',
  description: 'Sistem Dashboard Tamu Berkunjung',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        <TugasProvider>
          <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
            <Navbar />
            {/* Main content (pages render here) */}
            <main className="flex-1">{children}</main>
          </div>
        </TugasProvider>
      </body>
    </html>
  );
}
