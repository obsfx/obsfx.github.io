import { ExternalLink } from '@/components/external-link';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <div className='flex flex-col gap-6'>
      <title>About - Ömercan Balandı</title>

      <div>
        <h1 className='text-gray-950'>Ömercan Balandı</h1>
        <p className='text-xs text-gray-400'>
          Software Developer at{' '}
          <ExternalLink
            href='https://octohaus.io'
            className='text-blue-500 hover:underline'
            iconSize={12}
          >
            Octohaus.io
          </ExternalLink>
        </p>
      </div>

      <div className='flex flex-col gap-6 text-sm text-gray-500'>
        <p>
          A passionate <span className='font-medium text-gray-600'>software developer</span> based
          in <span className='font-medium text-gray-600'>Izmir, Turkey</span>.
        </p>

        <p>
          Working on <span className='font-medium text-gray-600'>web applications</span> mostly
          using <span className='font-medium text-gray-600'>TypeScript</span>,{' '}
          <span className='font-medium text-gray-600'>Nest.js</span>,{' '}
          <span className='font-medium text-gray-600'>React</span>,{' '}
          <span className='font-medium text-gray-600'>Next.js</span> and{' '}
          <span className='font-medium text-gray-600'>Vue</span>. Creating{' '}
          <ExternalLink href='https://github.com/obsfx/zero-ld46' iconSize={14}>
            games
          </ExternalLink>{' '}
          and{' '}
          <ExternalLink href='https://codepen.io/obsfx' iconSize={14}>
            codepen
          </ExternalLink>{' '}
          demos in spare time. Crafting{' '}
          <ExternalLink href='https://github.com/obsfx/libgen-downloader' iconSize={14}>
            command-line tools
          </ExternalLink>
          ,{' '}
          <ExternalLink href='https://github.com/obsfx/lurkdown' iconSize={14}>
            small compilers
          </ExternalLink>{' '}
          and{' '}
          <ExternalLink href='https://omercan.io/m3k' iconSize={14}>
            toy programming languages
          </ExternalLink>{' '}
          just for fun.
        </p>

        <p>
          Loves using{' '}
          <ExternalLink href='https://neovim.io/' iconSize={14}>
            Neovim
          </ExternalLink>
          . Here are the{' '}
          <ExternalLink href='https://github.com/obsfx/dotfiles' iconSize={14}>
            dotfiles
          </ExternalLink>
          .
        </p>
      </div>

      <Separator className='my-2' />

      <div className='flex flex-col gap-4'>
        <h2 className='text-sm font-medium text-gray-600'>Contact</h2>
        <p className='grid grid-cols-2 gap-x-4 text-xs md:gap-x-6'>
          <ExternalLink href='https://github.com/obsfx' iconSize={14}>
            github
          </ExternalLink>
          <ExternalLink href='https://www.npmjs.com/~obsfx' iconSize={14}>
            npm
          </ExternalLink>
          <ExternalLink href='https://codepen.io/obsfx' iconSize={14}>
            codepen
          </ExternalLink>{' '}
          <ExternalLink href='https://obsfx.itch.io/' iconSize={14}>
            itch.io
          </ExternalLink>
          <ExternalLink href='mailto:balandiomer@gmail.com' iconSize={14}>
            balandiomer@gmail.com
          </ExternalLink>
          <ExternalLink href='https://www.linkedin.com/in/omercanbalandi/' iconSize={14}>
            linkedin
          </ExternalLink>
        </p>
      </div>
    </div>
  );
}
