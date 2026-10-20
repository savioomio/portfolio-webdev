"use client";

import * as React from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export type FocusRailItem = {
  id: string | number;
  title: string;
  description?: string;
  imageSrc: string;
  href?: string;
  meta?: string;
  tech?: string;
  mobileImageSrc?: string;
};

interface FocusRailProps {
  items: FocusRailItem[];
  initialIndex?: number;
  loop?: boolean;
  autoPlay?: boolean;
  interval?: number;
  className?: string;
}

/**
 * Helper to wrap indices (e.g., -1 becomes length-1)
 */
function wrap(min: number, max: number, v: number) {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

/**
 * Physics Configuration
 * Base spring for spatial movement (x/z)
 */
const BASE_SPRING = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
  mass: 1,
};

export function FocusRail({
  items,
  initialIndex = 0,
  loop = true,
  autoPlay = false,
  interval = 4000,
  className,
}: FocusRailProps) {
  const [active, setActive] = React.useState(initialIndex);
  const [isHovering, setIsHovering] = React.useState(false);

  const count = items.length;
  const activeIndex = wrap(0, count, active);
  const activeItem = items[activeIndex];

  // --- NAVIGATION HANDLERS ---
  const handlePrev = React.useCallback(() => {
    if (!loop && active === 0) return;
    setActive((p) => p - 1);
  }, [loop, active]);

  const handleNext = React.useCallback(() => {
    if (!loop && active === count - 1) return;
    setActive((p) => p + 1);
  }, [loop, active, count]);

  // Autoplay logic
  React.useEffect(() => {
    if (!autoPlay || isHovering) return;
    const timer = setInterval(() => handleNext(), interval);
    return () => clearInterval(timer);
  }, [autoPlay, isHovering, handleNext, interval]);

  // Keyboard navigation
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "ArrowRight") handleNext();
  };

  // --- SWIPE / DRAG LOGIC ---
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const onDragEnd = (_e: MouseEvent | TouchEvent | PointerEvent, { offset, velocity }: PanInfo) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      handleNext();
    } else if (swipe > swipeConfidenceThreshold) {
      handlePrev();
    }
  };

  const visibleIndices = [-2, -1, 0, 1, 2];

  return (
    <div
      className={cn(
        "group relative flex w-full flex-col overflow-hidden bg-transparent text-white outline-none select-none overflow-x-hidden",
        className
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      {/* Background Ambience removido para um visual mais limpo */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-black/40" />

      <div className="relative z-10 flex flex-1 flex-col justify-center">
        <motion.div
          className="relative flex h-[220px] md:h-[350px] lg:h-[380px] w-full items-center justify-center perspective-[1200px] cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={onDragEnd}
        >
          {visibleIndices.map((offset) => {
            const absIndex = active + offset;
            const index = wrap(0, count, absIndex);
            const item = items[index];

            if (!loop && (absIndex < 0 || absIndex >= count)) return null;

            const isCenter = offset === 0;
            const dist = Math.abs(offset);

            // Dynamic transforms
            const xOffset = offset * 320;
            const zOffset = -dist * 180;
            const scale = isCenter ? 1 : 0.85;
            const rotateY = offset * -20;

            const opacity = isCenter ? 1 : Math.max(0.1, 1 - dist * 0.5);
            const blur = isCenter ? 0 : dist * 6;
            const brightness = isCenter ? 1 : 0.5;

            return (
              <motion.div
                key={absIndex}
                className={cn(
                  "absolute w-[260px] lg:w-[480px] aspect-video rounded-2xl border border-glass bg-glass-secondary shadow-2xl transition-shadow duration-300 backdrop-blur-md",
                  isCenter ? "z-20 shadow-accent-glow/20 border-accent/30" : "z-10"
                )}
                initial={false}
                animate={{
                  x: xOffset,
                  z: zOffset,
                  scale: scale,
                  rotateY: rotateY,
                  opacity: opacity,
                  filter: `blur(${blur}px) brightness(${brightness})`,
                }}
                transition={BASE_SPRING}
                style={{
                  transformStyle: "preserve-3d",
                }}
                onClick={() => {
                  if (offset !== 0) setActive((p) => p + offset);
                }}
              >
                <picture className="block h-full w-full rounded-2xl pointer-events-none">
                  {item.mobileImageSrc && (
                    <source media="(max-width: 768px)" srcSet={item.mobileImageSrc} />
                  )}
                  <img
                    src={item.imageSrc}
                    alt={item.title}
                    className="h-full w-full rounded-2xl object-cover pointer-events-none"
                  />
                </picture>

                {/* Lighting layers - Glass effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
                <div className="absolute inset-0 rounded-2xl bg-black/20 pointer-events-none mix-blend-multiply" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Info & Controls - Design System Integration with Padding */}
        <div className="mx-auto mt-12 flex w-full container-base flex-col items-center justify-between gap-6 lg:flex-row pointer-events-auto ">
          <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.3 }}
                className="space-y-2"
              >
                <h2 className="text-3xl font-heading font-bold tracking-tight lg:text-4xl text-text-primary">
                  {activeItem.title}
                </h2>
                {activeItem.meta && (
                  <h3 className="text-xs font-body font-medium uppercase tracking-wider text-text-primary">
                    {activeItem.meta}
                  </h3>
                )}
                {activeItem.description && (
                  <p className="max-w-md text-text-secondary font-body text-sm leading-relaxed">
                    {activeItem.description}
                  </p>
                )}
                {activeItem.tech && (
                  <h4 className="text-xs font-body text-accent pt-2">
                    {activeItem.tech}
                  </h4>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 rounded-full bg-glass-primary p-1 ring-1 ring-glass-border backdrop-blur-md">
              <button
                onClick={handlePrev}
                className="rounded-full p-3 text-text-secondary transition hover:bg-white/10 hover:text-accent active:scale-95"
                aria-label="Previous"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="min-w-[40px] text-center text-xs font-body text-text-primary">
                {activeIndex + 1} / {count}
              </span>
              <button
                onClick={handleNext}
                className="rounded-full p-3 text-text-secondary transition hover:bg-white/10 hover:text-accent active:scale-95"
                aria-label="Next"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {activeItem.href && (
              <a
                href={activeItem.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2 text-sm leading-relaxed"
              >
                View Project
                <ExternalLink className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
