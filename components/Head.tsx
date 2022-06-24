import React from "react";
import NextHead from "next/head";

const Head: React.FC<{
  title: string;
  description: string;
}> = ({ title, description }) => {
  return (
    <NextHead>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/static/favicon.png" />
    </NextHead>
  );
};

export default Head;
