import './globals.css';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import { Providers } from '@/components/Providers';
import ScrollToTop from '@/components/ToTop';


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

export const metadata = {
  // KEEPING YOUR ORIGINAL SEO KEYWORDS
  title: 'Free Anime AI Image Generator - Best Anime Art Creator 2026',
  description: 'Generate high-quality anime characters, waifu, chibi & scenes for free. No sign-up, no watermark. Faster than PixAI.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`}>
      <body className="font-sans antialiased selection:bg-indigo-500/30">
        <Providers>{children}
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}