'use client';

import { ArrowUpRight, GitFork, Star } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface ProjectItemProps {
  title: string;
  description: string;
}

export function ProjectItem({ title, description }: ProjectItemProps) {
  const url = `https://github.com/obsfx/${title}`;

  return (
    <Link target='_blank' href={url} className='-m-2 flex flex-col gap-1 p-2 hover:bg-gray-100'>
      <h2 className='flex items-baseline text-sm'>
        {title}
        <ArrowUpRight size={12} className='text-gray-800' />
      </h2>

      <p className='text-xs'>{description}</p>
    </Link>
  );
}
