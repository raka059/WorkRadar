import './globals.css';

export const metadata = {
  title: 'WorkRadar',
  description: 'Sistem Dashboard Tamu Berkunjung',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
