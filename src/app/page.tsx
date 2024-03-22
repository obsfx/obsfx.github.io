import { projectData } from '@/app/project-data';
import { ExternalLink } from '@/components/external-link';
import { ProjectItem } from '@/components/project-item';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <div className='flex flex-col gap-2 text-sm'>
      <title>About - Ömercan Balandı</title>

      <div className='flex flex-col gap-2'>
        <p>A passionate software developer based in Izmir, Turkey.</p>

        <p>
          Working on web applications mostly using TypeScript, Nest.js, React, Next.js and Vue.
          Creating{' '}
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

      <div className='flex flex-col gap-2 text-sm'>
        <h2 className='font-serif'>Projects</h2>
        <p>The collection of projects I{"'"}ve created in my spare time over the years.</p>

        <div className='my-2 grid gap-4 md:grid-cols-2'>
          {projectData.map((project, index) => (
            <ProjectItem key={index} title={project.name} description={project.description} />
          ))}
        </div>
      </div>

      <Separator className='my-2' />

      <div className='flex flex-col gap-2'>
        <h2 className='font-serif'>Contact</h2>
        <p className='flex flex-col items-start'>
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
