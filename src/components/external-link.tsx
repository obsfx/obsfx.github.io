import { ArrowUpRight } from 'lucide-react';

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
    <a
      href={href}
      target='_blank'
      rel='noreferrer'
      className={cn('inline-flex items-baseline underline hover:bg-gray-100', className)}
      {...rest}
    >
      {children}
      <ArrowUpRight size={iconSize} />
    </a>
  );
}
