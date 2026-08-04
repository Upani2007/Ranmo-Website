// Category-matched photo accents for /menu. Every dish photo and ingredient
// cutout here was hand-matched by content (not filename) to a specific
// category slug. Categories without a genuinely good photo match are
// intentionally left out rather than forced.
//
// Two treatments, chosen by how the source photo is composed:
//
// * BLEED — for wide photos where the dish is visibly cut off by the frame
//   (the plate runs out of the shot). These run full-width across the very
//   bottom of their category, clipped by the section edge so the dish spills
//   off the page, mirroring how the printed menu closes a category.
//
// * CORNER — for photos where the plate is whole and self-contained, plus
//   the ingredient cutouts. These float small in the outer page margin
//   beside the category heading.
//
// Portrait photos stay in the corner treatment even when they're cropped:
// full-width bleed only reads well above roughly a 1.25 aspect ratio. A
// 0.6-aspect portrait rendered 960px wide is ~1600px tall, so the clipping
// window would reveal a sliver of the top rim rather than the dish.
//
// The bleed treatment is currently used only by Desserts. The other large
// bleeds, and both Short Eats & Pastries accents, were removed on request;
// their source images were deleted with them and are recoverable from git
// history if any are wanted back.

/** Full-width photo clipped by the bottom edge of its category section. */
export type BleedAccent = {
  src: string;
  width: number;
  height: number;
  /**
   * Height of the clipping window. Shorter than the image's rendered height,
   * which is what produces the cut-off edge. Tiers are deliberately uneven so
   * the bleeds don't all read at one scale.
   */
  heightClass: string;
  driftRange?: number;
};

/** Small photo floating in the page margin, clear of the text column. */
export type CornerAccent = {
  src: string;
  width: number;
  height: number;
  side: "left" | "right";
  /** Vertical offset relative to the category heading. */
  topClass: string;
  /** Width tier — the small end of the size hierarchy. */
  widthClass: string;
  driftRange?: number;
};

// Tailwind scans source files as raw text for literal class names, so every
// class must appear verbatim here (not be assembled at runtime from an
// interpolated variable) or the JIT compiler won't generate the CSS.

const BLEED_LG = "h-40 sm:h-56 lg:h-72";

// Corner width tiers. Corner accents only appear from `xl` up: the menu
// column is max-w-5xl (1024px), so below ~1280px viewport there is no page
// margin to sit in, and anything placed there would have to overlap the text.
const CORNER_LG = "xl:w-44 2xl:w-52";
const CORNER_SM = "xl:w-32 2xl:w-40";
const CORNER_XS = "xl:w-16 2xl:w-20";

/**
 * Shifts a corner accent fully outside the text column, plus a gap — so it
 * can never overlap a heading, item name, or price at any viewport width.
 * The viewport edge crops whatever spills past it, which is the intended
 * "peeking in from off-page" look.
 */
export const CORNER_OFFSET: Record<CornerAccent["side"], string> = {
  left: "left-0 translate-x-[calc(-100%-1.5rem)]",
  right: "right-0 translate-x-[calc(100%+1.5rem)]",
};

// Wide photos whose dish is cut off by the frame — full-width bottom bleed.
export const BLEED_ACCENTS: Record<string, BleedAccent> = {
  // Two plates, both cut off along the bottom.
  desserts: {
    src: "/images/menu/dessert-tart-icecream.png",
    width: 688,
    height: 362,
    heightClass: BLEED_LG,
  },
};

// Whole-plate photos and ingredient cutouts — small margin accents.
export const CORNER_ACCENTS: Record<string, CornerAccent> = {
  // --- Larger tier: cropped portraits, too tall to bleed full-width. ---
  "side-dishes-fish-thalapath": {
    src: "/images/menu/fish-fillet-fried.png",
    width: 411,
    height: 608,
    side: "left",
    topClass: "-top-4",
    widthClass: CORNER_LG,
  },
  noodles: {
    src: "/images/menu/noodles-vegetable.png",
    width: 411,
    height: 607,
    side: "right",
    topClass: "-top-6",
    widthClass: CORNER_LG,
    driftRange: 20,
  },
  appetizer: {
    src: "/images/menu/appetizer-spicy-wings.png",
    width: 453,
    height: 550,
    side: "left",
    topClass: "top-2",
    widthClass: CORNER_LG,
  },
  "italian-flavours": {
    src: "/images/menu/pasta-penne.png",
    width: 556,
    height: 449,
    side: "left",
    topClass: "top-0",
    widthClass: CORNER_LG,
    driftRange: 20,
  },
  "rice-curry": {
    src: "/images/menu/rice-curry-chicken.png",
    width: 550,
    height: 454,
    side: "right",
    topClass: "top-2",
    widthClass: CORNER_LG,
  },
  "side-dishes-mutton": {
    src: "/images/menu/mutton-curry.png",
    width: 451,
    height: 554,
    side: "right",
    topClass: "-top-6",
    widthClass: CORNER_LG,
  },

  // --- Smaller tier: whole, self-contained plates. ---
  "green-salads": {
    src: "/images/menu/salad-chicken-ham.png",
    width: 589,
    height: 424,
    side: "right",
    topClass: "-top-2",
    widthClass: CORNER_SM,
  },
  "side-dishes-beef": {
    src: "/images/menu/beef-chili-sesame.png",
    width: 481,
    height: 518,
    side: "left",
    topClass: "top-0",
    widthClass: CORNER_SM,
  },
  "side-dishes-pork": {
    src: "/images/menu/pork-belly-chili.png",
    width: 501,
    height: 498,
    side: "right",
    topClass: "-top-2",
    widthClass: CORNER_SM,
  },
  "side-dishes-prawns": {
    src: "/images/menu/prawns-chili-garlic.png",
    width: 438,
    height: 570,
    side: "right",
    topClass: "top-2",
    widthClass: CORNER_SM,
  },
  "side-dishes-calamari": {
    src: "/images/menu/calamari-fried.png",
    width: 452,
    height: 552,
    side: "left",
    topClass: "-top-2",
    widthClass: CORNER_SM,
  },
  "icecream-imorich": {
    src: "/images/menu/icecream-imorich.png",
    width: 678,
    height: 368,
    side: "right",
    topClass: "top-2",
    widthClass: CORNER_SM,
  },

  // --- Smallest tier: ingredient cutouts, pure texture. ---
  "main-dishes": {
    src: "/images/menu/decor-chili-coriander-1.png",
    width: 495,
    height: 504,
    side: "left",
    topClass: "-top-3",
    widthClass: CORNER_XS,
  },
  "side-dishes-vegetables": {
    src: "/images/menu/decor-tomato-basil.png",
    width: 503,
    height: 496,
    side: "right",
    topClass: "-top-3",
    widthClass: CORNER_XS,
  },
  pizza: {
    src: "/images/menu/decor-coriander-basil.png",
    width: 519,
    height: 481,
    side: "right",
    topClass: "-top-2",
    widthClass: CORNER_XS,
  },
  "side-dishes-sausages": {
    src: "/images/menu/decor-chili-coriander-2.png",
    width: 403,
    height: 620,
    side: "left",
    topClass: "-top-3",
    widthClass: CORNER_XS,
  },
};
