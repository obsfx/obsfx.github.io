"use client";

import { useRef, useState, useEffect } from "react";
import { LuArrowRight } from "react-icons/lu";
import { githubRepos } from "../../data/github_repos";
import { GithubRepoCard } from "./GithubRepoCard";
import clsx from "clsx";

export default function DraggableRepoRow() {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [showArrow, setShowArrow] = useState(false);

  // Show arrow if scrollable
  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    const check = () => {
      setShowArrow(el.scrollWidth - el.scrollLeft > el.clientWidth + 8);
    };
    check();
    el.addEventListener("scroll", check);
    window.addEventListener("resize", check);
    return () => {
      el.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  // Mouse drag
  const onMouseDown = (e: React.MouseEvent) => {
    // Only if not on a link
    if ((e.target as HTMLElement).closest("a")) return;
    setIsDragging(true);
    setStartX(e.pageX - (rowRef.current?.offsetLeft || 0));
    setScrollLeft(rowRef.current?.scrollLeft || 0);
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (rowRef.current?.offsetLeft || 0);
    const walk = x - startX;
    if (rowRef.current) rowRef.current.scrollLeft = scrollLeft - walk;
  };
  const onMouseUp = () => setIsDragging(false);

  // Touch drag
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchScrollLeft, setTouchScrollLeft] = useState(0);
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].pageX);
    setTouchScrollLeft(rowRef.current?.scrollLeft || 0);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    const x = e.touches[0].pageX;
    const walk = x - touchStartX;
    if (rowRef.current) rowRef.current.scrollLeft = touchScrollLeft - walk;
  };

  const scrollToRight = () => {
    if (rowRef.current) rowRef.current.scrollLeft = rowRef.current.scrollWidth;
  };

  return (
    <div
      ref={rowRef}
      className={clsx(
        "lg:pl-[calc(50%-17rem)] md:px-24 px-4 pl-4 pr-4 flex gap-4 overflow-x-auto pb-2 hide-scrollbar pt-4 select-none",
        isDragging ? "cursor-grabbing" : "cursor-grab"
      )}
      style={{ WebkitOverflowScrolling: "touch" }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseUp}
      onMouseUp={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onMouseUp}
      tabIndex={-1}
    >
      {githubRepos.map((repo) => (
        <GithubRepoCard key={repo.name} {...repo} />
      ))}
      {showArrow && (
        <div className={clsx("absolute right-2 top-1/2 -translate-y-1/2 z-10 cursor-pointer")} onClick={scrollToRight} >
          <div className={clsx("draggable-arrow")}>
            <LuArrowRight />
          </div>
        </div>
      )}
    </div>
  );
} 