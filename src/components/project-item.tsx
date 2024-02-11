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
  const [starCount, setStarCount] = useState(0);
  const [forkCount, setForkCount] = useState(0);

  useEffect(() => {
    fetch(`https://api.github.com/repos/obsfx/${title}`)
      .then((response) => response.json())
      .then((data) => {
        setStarCount(data.stargazers_count);
        setForkCount(data.forks_count);
      });
  }, [title]);

  return (
    <Link
      target='_blank'
      href={url}
      className='flex flex-col gap-2 rounded-md p-3 hover:bg-gray-50'
    >
      <h2 className='flex items-center justify-between text-sm font-medium'>
        {title}
        <ArrowUpRight size={14} className='text-gray-300' />
      </h2>

      <div className='flex items-center gap-4 text-xs text-gray-500'>
        <div className='flex items-center gap-0.5'>
          <Star size={14} />
          {starCount}
        </div>
        <div className='flex items-center gap-0.5'>
          <GitFork size={14} />
          {forkCount}
        </div>
      </div>

      <p className='text-xs text-gray-500'>{description}</p>
    </Link>
  );
}
