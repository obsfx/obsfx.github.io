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
    <Link
      target='_blank'
      href={url}
      className='flex flex-col gap-1 rounded-md p-3 hover:bg-gray-50'
    >
      <h2 className='flex items-baseline text-sm font-medium'>
        {title}
        <ArrowUpRight size={14} className='text-gray-800' />
      </h2>

      <p className='text-xs text-gray-500'>{description}</p>
    </Link>
  );
}
