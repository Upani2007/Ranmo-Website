"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { MenuAccent } from "@/data/menu-decor";

/**
 * Decorative dish/ingredient photo that bleeds off the edge of a menu
 * category block, with a subtle scroll-linked vertical drift. Hidden below
 * `sm` — with `display: none` there, the browser never fetches the image on
 * mobile, so it costs nothing on the viewport Lighthouse scores mobile.
 */
export function MenuPhotoAccent({ src, width, height, className, driftRange = 16, eager = false }: MenuAccent) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], [-driftRange, driftRange]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute -z-10 hidden opacity-90 sm:block ${className}`}
    >
      <motion.div style={{ y: prefersReducedMotion ? 0 : drift }}>
        <Image
          src={src}
          alt=""
          width={width}
          height={height}
          loading={eager ? "eager" : "lazy"}
          sizes="(min-width: 1024px) 240px, 208px"
          className="h-auto w-full drop-shadow-[0_16px_28px_rgba(0,0,0,0.45)]"
        />
      </motion.div>
    </div>
  );
}
