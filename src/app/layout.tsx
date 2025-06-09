import type { Metadata } from "next";
import Script from 'next/script';
import { Inter, Lora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Omercan Balandi",
  description: "A passionate software developer based in Izmir, Turkey.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
      <body
        className={`${inter.variable} ${lora.variable} antialiased py-12 lg:py-24 overflow-y-scroll`}
      >
        {children}
      </body>
    </html>
  );
}
