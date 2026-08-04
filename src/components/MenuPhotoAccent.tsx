"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { CORNER_OFFSET, type BleedAccent, type CornerAccent } from "@/data/menu-decor";

/** Shared scroll-linked vertical drift, disabled under prefers-reduced-motion. */
function useDrift(ref: React.RefObject<HTMLElement | null>, range: number) {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], [-range, range]);
  return prefersReducedMotion ? 0 : drift;
}

/**
 * Small decorative photo floating in the page margin beside a category
 * heading. `CORNER_OFFSET` pushes it fully outside the text column, so it
 * can't overlap a heading, item name, or price — the viewport edge crops
 * whatever spills past it.
 *
 * Hidden below `xl`, where the max-w-5xl column leaves no margin to sit in.
 * With `display: none` the browser never fetches these on phones or tablets,
 * so they cost nothing on the mobile Lighthouse run.
 */
export function MenuCornerAccent({
  src,
  width,
  height,
  side,
  topClass,
  widthClass,
  driftRange = 16,
}: CornerAccent) {
  const ref = useRef<HTMLDivElement>(null);
  const y = useDrift(ref, driftRange);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute -z-10 hidden opacity-90 xl:block ${topClass} ${CORNER_OFFSET[side]} ${widthClass}`}
    >
      <motion.div style={{ y }}>
        <Image
          src={src}
          alt=""
          width={width}
          height={height}
          loading="lazy"
          sizes="208px"
          className="h-auto w-full drop-shadow-[0_16px_28px_rgba(0,0,0,0.45)]"
        />
      </motion.div>
    </div>
  );
}

/**
 * Large photo running the full width of the menu column at the very bottom
 * of a category, clipped by the section edge so the dish spills off the
 * page. The wrapper is shorter than the image's rendered height — that
 * mismatch is what produces the cut-off edge.
 *
 * Unlike the corner accents this is in normal flow and shows at every
 * breakpoint, so phones still get real food photography.
 */
export function MenuBleedAccent({ src, width, height, heightClass, driftRange = 12 }: BleedAccent) {
  const ref = useRef<HTMLDivElement>(null);
  const y = useDrift(ref, driftRange);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none relative mt-8 overflow-hidden ${heightClass}`}
    >
      {/*
        Seated slightly above the window so the drift can never pull the
        image down far enough to expose a gap along the top edge.
      */}
      <motion.div style={{ y }} className="absolute inset-x-0 -top-4">
        <Image
          src={src}
          alt=""
          width={width}
          height={height}
          loading="lazy"
          sizes="(min-width: 1024px) 960px, 100vw"
          className="h-auto w-full drop-shadow-[0_20px_36px_rgba(0,0,0,0.5)]"
        />
      </motion.div>
    </div>
  );
}
