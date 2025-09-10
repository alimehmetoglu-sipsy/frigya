import { Inter, Montserrat } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export const metadata = {
  title: 'Balkanların Zirveleri - Arnavutluk, Kosova ve Karadağ\'da Unutulmaz Trekking Deneyimi',
  description: '192 kilometrelik eşsiz patika rotasıyla Balkanların Zirveleri, Arnavutluk, Kosova ve Karadağ\'ın el değmemiş dağlarında unutulmaz bir macera sunuyor.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="font-sans">
        {children}
      </body>
    </html>
  );
}