import '../styles/globals.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body className="bg-white">{children}</body>
    </html>
  );
}
