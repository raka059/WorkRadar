import './globals.css';
import Link from 'next/link';
import { TugasProvider } from "./context/TugasContext";
import Sidebar from './components/Sidebar';

export const metadata = {
  title: 'WorkRadar',
  description: 'Sistem Dashboard Tamu Berkunjung',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        <TugasProvider>
          <div className="flex min-h-screen bg-gray-50 text-gray-900">
            <Sidebar />
            {/* Main content (pages render here) */}
            <main className="flex-1">{children}</main>
          </div>
        </TugasProvider>
      </body>
    </html>
  );
}
