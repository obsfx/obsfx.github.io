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
  
  // Momentum scrolling state
  const velocityRef = useRef(0);
  const lastTimeRef = useRef(0);
  const lastXRef = useRef(0);
  const animationIdRef = useRef<number | null>(null);

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

  // Momentum scrolling function
  const applyMomentum = () => {
    if (!rowRef.current || Math.abs(velocityRef.current) < 0.1) {
      animationIdRef.current = null;
      return;
    }

    const currentScrollLeft = rowRef.current.scrollLeft;
    const newScrollLeft = currentScrollLeft - velocityRef.current;
    
    // Clamp to boundaries
    const maxScroll = rowRef.current.scrollWidth - rowRef.current.clientWidth;
    const clampedScrollLeft = Math.max(0, Math.min(maxScroll, newScrollLeft));
    
    rowRef.current.scrollLeft = clampedScrollLeft;
    
    // Apply friction/deceleration
    velocityRef.current *= 0.92;
    
    // Continue animation if velocity is still significant
    if (Math.abs(velocityRef.current) >= 0.1 && clampedScrollLeft === newScrollLeft) {
      animationIdRef.current = requestAnimationFrame(applyMomentum);
    } else {
      animationIdRef.current = null;
    }
  };

  // Update velocity during drag
  const updateVelocity = (currentX: number) => {
    const now = Date.now();
    if (lastTimeRef.current > 0) {
      const deltaTime = now - lastTimeRef.current;
      const deltaX = currentX - lastXRef.current;
      if (deltaTime > 0) {
        velocityRef.current = deltaX / deltaTime * 12; // Scale for 60fps
      }
    }
    lastTimeRef.current = now;
    lastXRef.current = currentX;
  };

  // Mouse drag
  const onMouseDown = (e: React.MouseEvent) => {
    // Only if not on a link
    if ((e.target as HTMLElement).closest("a")) return;
    
    // Cancel any ongoing momentum
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
      animationIdRef.current = null;
    }
    
    setIsDragging(true);
    setStartX(e.pageX - (rowRef.current?.offsetLeft || 0));
    setScrollLeft(rowRef.current?.scrollLeft || 0);
    
    // Reset velocity tracking
    velocityRef.current = 0;
    lastTimeRef.current = Date.now();
    lastXRef.current = e.pageX - (rowRef.current?.offsetLeft || 0);
  };
  
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (rowRef.current?.offsetLeft || 0);
    const walk = x - startX;
    if (rowRef.current) rowRef.current.scrollLeft = scrollLeft - walk;
    
    // Update velocity for momentum
    updateVelocity(x);
  };
  
  const onMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      // Start momentum scrolling
      applyMomentum();
    }
  };

  // Touch drag
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchScrollLeft, setTouchScrollLeft] = useState(0);
  
  const onTouchStart = (e: React.TouchEvent) => {
    // Cancel any ongoing momentum
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
      animationIdRef.current = null;
    }
    
    setTouchStartX(e.touches[0].pageX);
    setTouchScrollLeft(rowRef.current?.scrollLeft || 0);
    
    // Reset velocity tracking
    velocityRef.current = 0;
    lastTimeRef.current = Date.now();
    lastXRef.current = e.touches[0].pageX;
  };
  
  const onTouchMove = (e: React.TouchEvent) => {
    const x = e.touches[0].pageX;
    const walk = x - touchStartX;
    if (rowRef.current) rowRef.current.scrollLeft = touchScrollLeft - walk;
    
    // Update velocity for momentum
    updateVelocity(x);
  };

  const onTouchEnd = () => {
    // Start momentum scrolling
    applyMomentum();
  };

  const scrollToRight = () => {
    if (!rowRef.current) return;
    
    // Cancel any ongoing momentum
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
      animationIdRef.current = null;
    }
    
    const startScrollLeft = rowRef.current.scrollLeft;
    const targetScrollLeft = rowRef.current.scrollWidth - rowRef.current.clientWidth;
    const distance = targetScrollLeft - startScrollLeft;
    const duration = 800; // ms
    const startTime = Date.now();
    
    const smoothScroll = () => {
      if (!rowRef.current) return;
      
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      rowRef.current.scrollLeft = startScrollLeft + (distance * easeOut);
      
      if (progress < 1) {
        animationIdRef.current = requestAnimationFrame(smoothScroll);
      } else {
        animationIdRef.current = null;
      }
    };
    
    smoothScroll();
  };

  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []);

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
      onTouchEnd={onTouchEnd}
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