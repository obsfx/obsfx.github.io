import React from "react";
import NextHead from "next/head";
import Script from "next/script";

const Head: React.FC<{
  title: string;
  description: string;
}> = ({ title, description }) => {
  return (
    <NextHead>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/static/favicon.png" />
      {/* Global site tag (gtag.js) - Google Analytics*/}

      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-10B5E0EP0C"
        strategy="afterInteractive"
      />

      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-10B5E0EP0C');
      `}
      </Script>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
    </NextHead>
  );
};

export default Head;
