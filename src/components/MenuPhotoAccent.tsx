import Image from "next/image";
import { CORNER_OFFSET, type CornerAccent } from "@/data/menu-decor";

/**
 * Decorative photo floating in the page margin beside a category heading.
 * `CORNER_OFFSET` pushes it fully outside the text column, so it can't
 * overlap a heading, item name, or price — the viewport edge crops whatever
 * spills past it.
 *
 * Deliberately static: these sat still better than they drifted, so there is
 * no scroll-linked motion here and nothing to gate behind a reduced-motion
 * check. The accent is pinned to its category and scrolls with the page.
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
  stickerClass,
}: CornerAccent) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute -z-10 hidden opacity-90 xl:block ${topClass} ${CORNER_OFFSET[side]} ${widthClass}`}
    >
      <Image
        src={src}
        alt=""
        width={width}
        height={height}
        loading="lazy"
        sizes="288px"
        className={`${stickerClass} h-auto w-full`}
      />
    </div>
  );
}
