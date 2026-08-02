"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export function MenuDishImage({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yRaw = useTransform(scrollYProgress, [0, 0.5, 1], ["22px", "0px", "-22px"]);
  const opacityRaw = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const y = prefersReducedMotion ? "0px" : yRaw;
  const opacity = prefersReducedMotion ? 1 : opacityRaw;

  return (
    <div ref={containerRef} className="mx-auto w-36 sm:w-44 md:mx-0 md:w-full">
      <motion.div style={{ y, opacity }}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="(min-width: 768px) 240px, 33vw"
          loading="lazy"
          className="h-auto w-full drop-shadow-[0_14px_24px_rgba(0,0,0,0.5)]"
        />
      </motion.div>
    </div>
  );
}
