import { ExternalLink } from '@/components/external-link';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <div className='flex flex-col gap-5'>
      <title>About - Ömercan Balandı</title>

      <div className='flex flex-col'>
        <h1 className='text-2xl font-bold text-black'>Ömercan Balandı</h1>
      </div>

      <div className='flex flex-col gap-6 text-sm text-gray-500'>
        <p>
          A passionate <span className='font-medium text-black'>software developer</span> based in{' '}
          <span className='font-medium text-black'>Izmir, Turkey</span>.
        </p>

        <p>
          Working on <span className='font-medium text-black'>web applications</span> mostly using{' '}
          <span className='font-medium text-black'>TypeScript</span>,{' '}
          <span className='font-medium text-black'>Nest.js</span>,{' '}
          <span className='font-medium text-black'>React</span>,{' '}
          <span className='font-medium text-black'>Next.js</span> and{' '}
          <span className='font-medium text-black'>Vue</span>. Creating{' '}
          <ExternalLink href='https://github.com/obsfx/zero-ld46' iconSize={10}>
            games
          </ExternalLink>{' '}
          and{' '}
          <ExternalLink href='https://codepen.io/obsfx' iconSize={10}>
            codepen
          </ExternalLink>{' '}
          demos in spare time. Crafting{' '}
          <ExternalLink href='https://github.com/obsfx/libgen-downloader' iconSize={10}>
            command-line tools
          </ExternalLink>
          ,{' '}
          <ExternalLink href='https://github.com/obsfx/lurkdown' iconSize={10}>
            small compilers
          </ExternalLink>{' '}
          and{' '}
          <ExternalLink href='https://omercan.io/m3k' iconSize={10}>
            toy programming languages
          </ExternalLink>{' '}
          just for fun.
        </p>

        <p>
          Loves using{' '}
          <ExternalLink href='https://neovim.io/' iconSize={10}>
            Neovim
          </ExternalLink>
          . Here are the{' '}
          <ExternalLink href='https://github.com/obsfx/dotfiles' iconSize={10}>
            dotfiles
          </ExternalLink>
          .
        </p>
      </div>

      <Separator className='my-2' />

      <div className='flex flex-col gap-4'>
        <h2 className='text-sm font-medium text-black'>Contact</h2>
        <p className='grid grid-cols-2 gap-x-4 text-xs md:gap-x-6'>
          <ExternalLink href='https://github.com/obsfx' iconSize={10}>
            github
          </ExternalLink>
          <ExternalLink href='https://www.npmjs.com/~obsfx' iconSize={10}>
            npm
          </ExternalLink>
          <ExternalLink href='https://codepen.io/obsfx' iconSize={10}>
            codepen
          </ExternalLink>{' '}
          <ExternalLink href='https://obsfx.itch.io/' iconSize={10}>
            itch.io
          </ExternalLink>
          <ExternalLink href='mailto:balandiomer@gmail.com' iconSize={10}>
            balandiomer@gmail.com
          </ExternalLink>
          <ExternalLink href='https://www.linkedin.com/in/omercanbalandi/' iconSize={10}>
            linkedin
          </ExternalLink>
        </p>
      </div>
    </div>
  );
}
