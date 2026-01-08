import { Plus_Jakarta_Sans } from 'next/font/google'; // Pollo.ai style font
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  variable: '--font-jakarta',
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
    <html lang="en" className={jakarta.variable}>
      <body className="font-sans bg-[#050505] text-white antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}