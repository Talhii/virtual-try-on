import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'VTO Studio - AI Virtual Try-On | Transform Fashion with AI',
  description: 'Experience the future of fashion with our AI-powered virtual try-on technology. Upload a photo, choose any garment, and see yourself wearing it instantly. Reduce returns by 70% and boost conversions.',
  keywords: 'virtual try-on, AI fashion, clothing visualization, e-commerce, fashion tech, AI styling',
  authors: [{ name: 'VTO Studio' }],
  openGraph: {
    title: 'VTO Studio - AI Virtual Try-On',
    description: 'Transform any photo with AI-powered virtual try-on technology.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VTO Studio - AI Virtual Try-On',
    description: 'Transform any photo with AI-powered virtual try-on technology.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='dark'>
      <body className={`${outfit.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
