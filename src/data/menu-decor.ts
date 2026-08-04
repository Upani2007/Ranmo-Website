// Category-matched photo accents for /menu. Every dish photo and ingredient
// cutout here was hand-matched by content (not filename) to a specific
// category slug. Categories without a genuinely good photo match are
// intentionally left out rather than forced.

export type MenuAccent = {
  src: string;
  width: number;
  height: number;
  /** Tailwind position + size utility classes (bleed offset, width tiers). */
  className: string;
  /** Scroll-linked drift range in px (applied both directions). */
  driftRange?: number;
  /**
   * Only for the accent in the first category of the default-active tab —
   * it's already in the initial viewport, so lazy-loading it gets flagged by
   * Next as a delayed LCP element. Everything else stays lazy.
   */
  eager?: boolean;
};

type Side = "left" | "right";
type Peek = 15 | 20;

// Tailwind scans source files as raw text for literal class names, so every
// class below must appear verbatim somewhere (not be assembled at runtime
// from an interpolated variable) or the JIT compiler won't generate the CSS.
const POSITION: Record<Side, string> = { left: "left-0", right: "right-0" };

const TRANSLATE: Record<Side, Record<Peek, string>> = {
  left: { 20: "-translate-x-[80%]", 15: "-translate-x-[85%]" },
  right: { 20: "translate-x-[80%]", 15: "translate-x-[85%]" },
};

/**
 * Positions an accent flush against the category block's edge and then
 * shifts it by a percentage of its OWN width via `translate` — unlike a
 * fixed pixel offset, this guarantees the image clears the text column at
 * every breakpoint (a fixed offset that works for a 96px sprig would let a
 * 240px hero photo spill deep over the heading text). `peek` is how much of
 * the image is allowed to lap back over the column edge.
 */
function accentClass(side: Side, top: string, widthTiers: string, peek: Peek = 20) {
  return `${top} ${POSITION[side]} ${TRANSLATE[side][peek]} ${widthTiers}`;
}

// One larger "hero" dish photo bleeding off the edge near the category heading.
export const DISH_ACCENTS: Record<string, MenuAccent> = {
  "side-dishes-omlette": {
    src: "/images/menu/omelette-tomato-feta.png",
    width: 377,
    height: 661,
    className: accentClass("right", "-top-6", "w-24 sm:w-32 lg:w-40"),
    driftRange: 20,
  },
  "side-dishes-chicken": {
    src: "/images/menu/chicken-crispy-strips.png",
    width: 569,
    height: 438,
    className: accentClass("left", "-top-2", "w-32 sm:w-44 lg:w-52"),
  },
  "rice-curry": {
    src: "/images/menu/rice-curry-chicken.png",
    width: 550,
    height: 454,
    className: accentClass("right", "top-2", "w-28 sm:w-36 lg:w-44"),
  },
  "from-the-soup-kettle": {
    src: "/images/menu/soup-cream.png",
    width: 604,
    height: 413,
    className: accentClass("left", "-top-4", "w-32 sm:w-44 lg:w-52"),
  },
  "green-salads": {
    src: "/images/menu/salad-chicken-ham.png",
    width: 589,
    height: 424,
    className: accentClass("right", "-top-2", "w-32 sm:w-44 lg:w-52"),
  },
  appetizer: {
    src: "/images/menu/appetizer-spicy-wings.png",
    width: 453,
    height: 550,
    className: accentClass("left", "top-4", "w-24 sm:w-32 lg:w-40"),
  },
  "side-dishes-mutton": {
    src: "/images/menu/mutton-curry.png",
    width: 451,
    height: 554,
    className: accentClass("right", "-top-6", "w-24 sm:w-32 lg:w-40"),
  },
  "side-dishes-beef": {
    src: "/images/menu/beef-chili-sesame.png",
    width: 481,
    height: 518,
    className: accentClass("left", "top-0", "w-28 sm:w-36 lg:w-44"),
  },
  "side-dishes-pork": {
    src: "/images/menu/pork-belly-chili.png",
    width: 501,
    height: 498,
    className: accentClass("right", "-top-2", "w-28 sm:w-36 lg:w-44"),
  },
  "side-dishes-fish-thalapath": {
    src: "/images/menu/fish-fillet-fried.png",
    width: 411,
    height: 608,
    className: accentClass("left", "-top-4", "w-24 sm:w-32 lg:w-40"),
  },
  "side-dishes-prawns": {
    src: "/images/menu/prawns-chili-garlic.png",
    width: 438,
    height: 570,
    className: accentClass("right", "top-2", "w-24 sm:w-32 lg:w-40"),
  },
  "side-dishes-calamari": {
    src: "/images/menu/calamari-fried.png",
    width: 452,
    height: 552,
    className: accentClass("left", "-top-2", "w-24 sm:w-32 lg:w-40"),
  },
  noodles: {
    src: "/images/menu/noodles-vegetable.png",
    width: 411,
    height: 607,
    className: accentClass("right", "-top-6", "w-24 sm:w-32 lg:w-40"),
  },
  "italian-flavours": {
    src: "/images/menu/pasta-penne.png",
    width: 556,
    height: 449,
    className: accentClass("left", "top-0", "w-28 sm:w-36 lg:w-44"),
    driftRange: 20,
  },
  kottu: {
    src: "/images/menu/kottu-chicken.png",
    width: 628,
    height: 397,
    className: accentClass("right", "-top-4", "w-36 sm:w-48 lg:w-56"),
    driftRange: 20,
  },
  "asian-flavour": {
    src: "/images/menu/fried-rice-seafood.png",
    width: 707,
    height: 353,
    className: accentClass("left", "-top-2", "w-40 sm:w-52 lg:w-60"),
    driftRange: 20,
    eager: true,
  },
  "icecream-imorich": {
    src: "/images/menu/icecream-imorich.png",
    width: 678,
    height: 368,
    className: accentClass("right", "top-2", "w-36 sm:w-48 lg:w-56"),
  },
  desserts: {
    src: "/images/menu/dessert-tart-icecream.png",
    width: 688,
    height: 362,
    className: accentClass("left", "-top-4", "w-36 sm:w-48 lg:w-56"),
  },
  "indian-spicy-flavoures": {
    src: "/images/menu/paneer-curry-naan.png",
    width: 725,
    height: 344,
    className: accentClass("right", "-top-2", "w-40 sm:w-52 lg:w-60"),
    driftRange: 20,
  },
};

// Small decorative ingredient cutouts (chilies, coriander, basil, tomato) for
// texture near categories that don't have a matching dish photo.
export const SPRIG_ACCENTS: Record<string, MenuAccent> = {
  "side-dishes-vegetables": {
    src: "/images/menu/decor-tomato-basil.png",
    width: 503,
    height: 496,
    className: accentClass("right", "-top-3", "w-14 sm:w-20 lg:w-24", 15),
  },
  "main-dishes": {
    src: "/images/menu/decor-chili-coriander-1.png",
    width: 495,
    height: 504,
    className: accentClass("left", "-top-3", "w-14 sm:w-20 lg:w-24", 15),
  },
  pizza: {
    src: "/images/menu/decor-coriander-basil.png",
    width: 519,
    height: 481,
    className: accentClass("right", "-top-3", "w-14 sm:w-20 lg:w-24", 15),
  },
  "side-dishes-sausages": {
    src: "/images/menu/decor-chili-coriander-2.png",
    width: 403,
    height: 620,
    className: accentClass("left", "-top-3", "w-12 sm:w-16 lg:w-20", 15),
  },
  snacks: {
    src: "/images/menu/decor-basil-coriander-chili.png",
    width: 288,
    height: 866,
    className: accentClass("right", "-top-3", "w-10 sm:w-14 lg:w-16", 15),
  },
};
