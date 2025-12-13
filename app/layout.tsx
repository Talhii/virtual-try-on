import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import { AuthProvider, TranslationProvider } from '@/providers';
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

import { createServerClient } from '@/services/supabase/server';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createServerClient();
  let initialSession = null;

  if (supabase) {
    try {
      const { data } = await supabase.auth.getSession();
      initialSession = data.session;
    } catch (error) {
      console.error('Error fetching session:', error);
    }
  }

  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${outfit.variable} font-sans antialiased`}>
        <TranslationProvider>
          <AuthProvider initialSession={initialSession}>
            {children}
          </AuthProvider>
        </TranslationProvider>
      </body>
    </html>
  );
}
