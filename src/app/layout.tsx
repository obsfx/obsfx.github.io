import '@/app/globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Navigation } from '@/components/navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  description: 'A passionate software developer based in Izmir, Turkey.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <main className='md:flex md:flex-row md:justify-center'>
          <div className='md:w-full md:min-w-[512px] md:max-w-xl'>
            <div className='flex max-w-xl flex-col justify-start gap-8 px-4 py-16 md:px-8 md:py-24'>
              <Navigation />
              <div>{children}</div>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
