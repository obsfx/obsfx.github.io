import { LuArrowUpRight } from "react-icons/lu";
import { FaGithub } from "react-icons/fa";
import clsx from "clsx";

interface GithubRepoCardProps {
  name: string;
  description: string;
  html_url: string;
  media?: string;
  media_bg?: string;
}

export function GithubRepoCard({
  name,
  description,
  html_url,
  media,
  media_bg,
}: GithubRepoCardProps) {
  return (
    <div
      className={clsx(
        "card rounded-3xl relative"
      )}
    >
      <div className={clsx("relative z-1 rounded-3xl w-64 h-96 flex flex-col gap-2 overflow-hidden")}>
        <div className={clsx("flex items-center gap-2 pt-6 px-6")}>
          <a href={html_url} target="_blank" rel="noopener noreferrer">
            {name}
            <LuArrowUpRight className={clsx("inline-block text-sm")} />
          </a>
        </div>
        <p className={clsx("text-sm min-h-24 px-6")}>
          {description || (
            <span className={clsx("opacity-50")}>No description</span>
          )}
        </p>

      {media && (
        <video
          src={media}
          autoPlay
          loop
          muted
          className={clsx(
            "left-0 w-full h-full object-left-top scale-[2] translate-y-1/2 translate-x-1/2"
          )}
        />
      )}
      </div>
    </div>
  );
}
