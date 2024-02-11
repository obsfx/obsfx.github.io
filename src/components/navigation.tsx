'use client';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ThreeCubeCanvas } from '@/components/three-cube-canvas';
import { cn } from '@/lib/utils';

const LinkItems = [
  { href: '/', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/resume/Omercan-Balandi-Resume.pdf', label: 'Resume', external: true },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className='flex items-center justify-between'>
      <ThreeCubeCanvas />

      <div className='flex items-center text-xs'>
        {LinkItems.map(({ href, label, external }) => {
          return external ? (
            <a
              key={href}
              href={href}
              className={cn('inline-flex items-baseline rounded-md px-2 py-1 text-gray-400 ', {
                'bg-gray-100 text-gray-900': pathname === href,
                'hover:text-gray-900': pathname !== href,
              })}
              target='_blank'
              rel='noopener noreferrer'
            >
              {label}
              <ArrowUpRight size={12} />
            </a>
          ) : (
            <Link
              key={href}
              href={href}
              className={cn('inline-flex items-baseline rounded-md px-2 py-1 text-gray-400 ', {
                'bg-gray-100 text-gray-900': pathname === href,
                'hover:text-gray-900': pathname !== href,
              })}
            >
              {label}
              {external && <ArrowUpRight size={12} />}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
