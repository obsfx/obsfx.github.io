import '@/app/globals.css';

import type { Metadata } from 'next';
//import { Inter } from 'next/font/google';
import Script from 'next/script';

import { Navigation } from '@/components/navigation';
import { cn } from '@/lib/utils';

//const inter = Inter({ subsets: ['latin'] });

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
      <Script
        id='tagmanager-ga4'
        dangerouslySetInnerHTML={{
          __html: `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KJ8JVDFN');
          `,
        }}
      />
      <Script async src='https://www.googletagmanager.com/gtag/js?id=G-10B5E0EP0C' />
      <Script
        id='analytics'
        dangerouslySetInnerHTML={{
          __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-10B5E0EP0C');
          `,
        }}
      />

      <body className={cn('overflow-y-scroll')}>
        <main className='px-4 py-8 sm:px-8 sm:pb-24 sm:pt-12'>
          <div className='mx-auto max-w-xl'>
            <Navigation />
            <div className='mt-16'>{children}</div>
          </div>
        </main>
        <noscript>
          <iframe
            src='https://www.googletagmanager.com/ns.html?id=GTM-KJ8JVDFN'
            height='0'
            width='0'
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
      </body>
    </html>
  );
}
