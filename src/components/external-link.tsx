import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/utils';

interface ExternalLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  iconSize?: number;
}

export function ExternalLink({
  href,
  children,
  iconSize = 16,
  className,
  ...rest
}: ExternalLinkProps) {
  return (
    <Link
      href={href}
      target='_blank'
      rel='noreferrer'
      className={cn('inline-flex items-baseline text-blue-500 hover:underline', className)}
      {...rest}
    >
      {children}
      <ArrowUpRight size={iconSize} />
    </Link>
  );
}
