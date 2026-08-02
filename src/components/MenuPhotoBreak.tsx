"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export function MenuPhotoBreak({ src, alt }: { src: string; alt: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yRaw = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const scaleRaw = useTransform(scrollYProgress, [0, 1], [1.06, 1]);
  const opacityRaw = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.6, 1, 1, 0.6]);

  // The wrapper's vertical inset (-10%) gives the translateY parallax room
  // to move without uncovering the top/bottom edge of the visible frame.
  // Only vertical slack is needed since the parallax is a translateY, so the
  // horizontal edges stay flush with the container — keeping the image's
  // rendered width equal to the `sizes="100vw"` hint given to next/image.
  const y = prefersReducedMotion ? "0%" : yRaw;
  const scale = prefersReducedMotion ? 1 : scaleRaw;
  const opacity = prefersReducedMotion ? 1 : opacityRaw;

  return (
    <div
      ref={containerRef}
      className="relative left-1/2 right-1/2 -mx-[50vw] my-12 h-[46vh] min-h-[260px] w-screen overflow-hidden sm:my-16 sm:h-[60vh] sm:max-h-[520px]"
    >
      <motion.div style={{ y, opacity }} className="absolute inset-x-0 -top-[10%] -bottom-[10%]">
        <motion.div style={{ scale }} className="absolute inset-0">
          <Image src={src} alt={alt} fill sizes="100vw" loading="lazy" className="object-cover" />
        </motion.div>
      </motion.div>
    </div>
  );
}
