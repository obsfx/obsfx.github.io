import { LuArrowUpRight } from "react-icons/lu";
import DraggableRepoRow from "./components/DraggableRepoRow";
import clsx from "clsx";

export default function Home() {
  return (
    <div className={clsx("flex flex-col")}>
      <div className={clsx("flex flex-col max-w-3xl lg:mx-auto p-4 pt-8 md:px-24 lg:px-32")}>
        <div className={clsx("flex justify-between items-center gap-2")}>
          <h1 className={clsx("text-xl font-serif mt-2")}>Ömercan Balandı</h1>
          <a href="https://omercan.io/resume/Omercan-Balandi-Resume.pdf" target="_blank" rel="noreferrer" className="resume-link">
            Resume
            <LuArrowUpRight className={clsx("inline-block")} />
          </a>
        </div>
        <p className={clsx("text-sm mt-8")}>
          A passionate full-stack developer based in İzmir, Turkey.
        </p>

        <p className={clsx("text-sm mt-2")}>
          Working on web applications, mostly using React, Next.js, TypeScript,
          Nest.js, and Go. Creating{" "}
          <a
            href="https://github.com/obsfx/zero-ld46"
            target="_blank"
            rel="noreferrer"
          >
            games
            <LuArrowUpRight className={clsx("inline-block")} />
          </a>{" "}
          and{" "}
          <a href="https://codepen.io/obsfx" target="_blank" rel="noreferrer">
            CodePen
            <LuArrowUpRight className={clsx("inline-block")} />
          </a>{" "}
          demos in my spare time. Crafting{" "}
          <a
            href="https://github.com/obsfx/libgen-downloader"
            target="_blank"
            rel="noreferrer"
          >
            command-line tools
            <LuArrowUpRight className={clsx("inline-block")} />
          </a>
          ,{" "}
          <a
            href="https://github.com/obsfx/lurkdown"
            target="_blank"
            rel="noreferrer"
          >
            small compilers
            <LuArrowUpRight className={clsx("inline-block")} />
          </a>{" "}
          and{" "}
          <a href="https://omercan.io/m3k" target="_blank" rel="noreferrer">
            toy programming languages
            <LuArrowUpRight className={clsx("inline-block")} />
          </a>{" "}
          just for fun.
        </p>

        <p className={clsx("text-sm mt-2")}>
          <span className={clsx("line-through opacity-50")}>
            Loved using{" "}
            <a href="https://neovim.io" target="_blank" rel="noreferrer">
              Neovim
              <LuArrowUpRight className={clsx("inline-block")} />
            </a>
            . Here are my{" "}
            <a
              href="https://github.com/obsfx/dotfiles"
              target="_blank"
              rel="noreferrer"
            >
              dotfiles
              <LuArrowUpRight className={clsx("inline-block")} />
            </a>
            .
          </span>{" "}
          <span>
            Switched to{" "}
            <a href="https://www.cursor.com" target="_blank" rel="noreferrer">
              Cursor
              <LuArrowUpRight className={clsx("inline-block")} />
            </a>{" "}
            to experiment with AI agents. Using it with{" "}
            <a
              href="https://marketplace.visualstudio.com/items?itemName=vscodevim.vim"
              target="_blank"
            >
              Vim
              <LuArrowUpRight className={clsx("inline-block")} />
            </a>{" "}
            mode. Sometimes using{" "}
            <a href="https://www.jetbrains.com/idea/" target="_blank">
              IntelliJ IDEA
              <LuArrowUpRight className={clsx("inline-block")} />
            </a>{" "}
            for debugging sessions.
          </span>
        </p>
      </div>

      <div className={clsx("w-full pt-8")}>
        <p className={clsx("text-sm max-w-3xl lg:mx-auto px-4 md:px-24 lg:px-32")}>
          Some experiments and side projects I've created over the years to
          observe, learn, and have fun.
        </p>
        <div className={clsx("relative")}>
          <DraggableRepoRow />
        </div>
      </div>

      <div className={clsx("flex flex-col gap-0.5 contacts max-w-3xl w-full lg:mx-auto flex-1 items-start px-4 md:px-24 lg:px-32 pt-12")}>
        {[
          {
            label: "mail",
            value: "hello@omercan.io",
            href: "mailto:hello@omercan.io",
          },
          {
            label: "linkedin",
            value: "linkedin.com/in/omercanbalandi",
            href: "https://www.linkedin.com/in/omercanbalandi/",
          },
          {
            label: "github",
            value: "github.com/obsfx",
            href: "https://github.com/obsfx",
          },
          {
            label: "npm",
            value: "npmjs.com/~obsfx",
            href: "https://www.npmjs.com/~obsfx",
          },
          {
            label: "codepen",
            value: "codepen.io/obsfx",
            href: "https://codepen.io/obsfx",
          },
          {
            label: "itch.io",
            value: "obsfx.itch.io",
            href: "https://obsfx.itch.io/",
          },
        ].map(({ label, value, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            className={clsx("contact-row")}
          >
            <span className={clsx("contact-value")}>
              {value}
              <LuArrowUpRight className={clsx("inline-block")} />
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
