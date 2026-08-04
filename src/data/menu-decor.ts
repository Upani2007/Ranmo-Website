// Category-matched photo accents for /menu. Every dish photo and ingredient
// cutout here was hand-matched by content (not filename) to a specific
// category slug. Categories without a genuinely good photo match are
// intentionally left out rather than forced.
//
// Every accent floats in the outer page margin, outside the menu's text
// column — nothing runs across the menu itself. The full-width bottom-bleed
// treatment an earlier pass used has been dropped for that reason; the
// dessert photo that carried it is now the largest of the margin accents.
//
// Where a cutout has a straight cut edge (the frame sliced the plate), the
// artwork itself is cropped so that edge faces the column, and the white
// sticker outline is baked into the PNG. Neither is done in CSS.

/** Photo floating in the page margin, clear of the text column. */
export type CornerAccent = {
  src: string;
  width: number;
  height: number;
  side: "left" | "right";
  /** Vertical offset relative to the category heading. */
  topClass: string;
  /** Width tier. */
  widthClass: string;
  /** Shadow tier, paired to the width tier so the depth stays in scale. */
  stickerClass: string;
};

// Tailwind scans source files as raw text for literal class names, so every
// class must appear verbatim here (not be assembled at runtime from an
// interpolated variable) or the JIT compiler won't generate the CSS.

// Size tiers. Corner accents only appear from `xl` up: the menu column is
// max-w-5xl (1024px), so below ~1280px viewport there is no page margin to
// sit in, and anything placed there would have to overlap the text.
//
// The tiers are spread wide on purpose — 80 / 112 / 176 / 240 / 288px at 2xl.
// Bunching them closer (an earlier pass had everything between 128 and 176)
// reads as one uniform size at a glance.
const CORNER_2XL = { widthClass: "xl:w-56 2xl:w-72", stickerClass: "menu-sticker-lg" };
const CORNER_XL = { widthClass: "xl:w-48 2xl:w-60", stickerClass: "menu-sticker-lg" };
const CORNER_LG = { widthClass: "xl:w-36 2xl:w-44", stickerClass: "menu-sticker" };
const CORNER_SM = { widthClass: "xl:w-24 2xl:w-28", stickerClass: "menu-sticker" };
const CORNER_XS = { widthClass: "xl:w-16 2xl:w-20", stickerClass: "menu-sticker-xs" };

/**
 * Shifts an accent fully outside the text column, plus a gap — so it can
 * never overlap a heading, item name, or price at any viewport width. The
 * viewport edge crops whatever spills past it, which is the intended
 * "peeking in from off-page" look.
 */
export const CORNER_OFFSET: Record<CornerAccent["side"], string> = {
  left: "left-0 translate-x-[calc(-100%-1.5rem)]",
  right: "right-0 translate-x-[calc(100%+1.5rem)]",
};

// Grouped by tab rather than by size, because the thing that has to be
// checked is how they read *down a single tab*: no two consecutive accents
// share a size tier or a side, so scrolling alternates big/small and
// left/right instead of marching down one edge at one scale. Meat & Fish is
// the tab that makes or breaks this — it carries seven of them.
export const CORNER_ACCENTS: Record<string, CornerAccent> = {
  // --- Rice & Noodles: small on the left, then large on the right. ---
  noodles: {
    src: "/images/menu/noodles-vegetable.png",
    width: 505,
    height: 701,
    side: "left",
    topClass: "-top-6",
    ...CORNER_SM,
  },
  "rice-curry": {
    src: "/images/menu/rice-curry-chicken.png",
    width: 640,
    height: 544,
    side: "right",
    topClass: "top-2",
    ...CORNER_XL,
  },

  // --- Meat & Fish: 80 / 240 / 112 / 176 / 112 / 176 / 112, alternating. ---
  "main-dishes": {
    src: "/images/menu/decor-chili-coriander-1.png",
    width: 587,
    height: 596,
    side: "left",
    topClass: "-top-3",
    ...CORNER_XS,
  },
  "side-dishes-mutton": {
    src: "/images/menu/mutton-curry.png",
    width: 545,
    height: 648,
    side: "right",
    topClass: "-top-6",
    ...CORNER_XL,
  },
  "side-dishes-beef": {
    src: "/images/menu/beef-chili-sesame.png",
    width: 575,
    height: 612,
    side: "left",
    topClass: "top-0",
    ...CORNER_SM,
  },
  "side-dishes-pork": {
    src: "/images/menu/pork-belly-chili.png",
    width: 595,
    height: 592,
    side: "right",
    topClass: "-top-2",
    ...CORNER_LG,
  },
  "side-dishes-fish-thalapath": {
    src: "/images/menu/fish-fillet-fried.png",
    width: 505,
    height: 702,
    side: "left",
    topClass: "-top-4",
    ...CORNER_SM,
  },
  "side-dishes-prawns": {
    src: "/images/menu/prawns-chili-garlic.png",
    width: 532,
    height: 664,
    side: "right",
    topClass: "top-2",
    ...CORNER_LG,
  },
  "side-dishes-calamari": {
    src: "/images/menu/calamari-fried.png",
    width: 548,
    height: 648,
    side: "left",
    topClass: "-top-2",
    ...CORNER_SM,
  },

  // --- Starters & Soups ---
  appetizer: {
    src: "/images/menu/appetizer-spicy-wings.png",
    width: 551,
    height: 648,
    side: "left",
    topClass: "top-2",
    ...CORNER_LG,
  },
  // The artwork is already turned so its straight cut edge runs vertically
  // down the left, facing the column — no CSS rotation, which would turn it
  // a second time and put that edge along the top.
  "from-the-soup-kettle": {
    src: "/images/menu/soup-cream.png",
    width: 507,
    height: 698,
    side: "right",
    topClass: "-top-4",
    ...CORNER_2XL,
  },

  // --- Salads: opposite sides, so the pair doesn't stack down one edge. ---
  "green-salads": {
    src: "/images/menu/salad-chicken-ham.png",
    width: 687,
    height: 522,
    side: "right",
    topClass: "-top-2",
    ...CORNER_SM,
  },
  "side-dishes-vegetables": {
    src: "/images/menu/decor-tomato-basil.png",
    width: 597,
    height: 590,
    side: "left",
    topClass: "-top-3",
    ...CORNER_XS,
  },

  // --- Pizza & Pasta ---
  // The re-crop already presents its straight cut edge vertically on the
  // right, facing the column, so this no longer needs a quarter-turn to get
  // there — rotating it now would swing that edge round to the top instead.
  "italian-flavours": {
    src: "/images/menu/pasta-penne.png",
    width: 549,
    height: 656,
    side: "left",
    topClass: "top-0",
    ...CORNER_XL,
  },
  pizza: {
    src: "/images/menu/decor-coriander-basil.png",
    width: 611,
    height: 573,
    side: "right",
    topClass: "-top-2",
    ...CORNER_XS,
  },

  // --- Platters, Kottu & Sausages ---
  "side-dishes-sausages": {
    src: "/images/menu/decor-chili-coriander-2.png",
    width: 483,
    height: 700,
    side: "left",
    topClass: "-top-3",
    ...CORNER_XS,
  },

  // --- Desserts: the former full-width bleed, now the largest margin accent. ---
  "icecream-imorich": {
    src: "/images/menu/icecream-imorich.png",
    width: 768,
    height: 458,
    side: "right",
    topClass: "top-2",
    ...CORNER_SM,
  },
  desserts: {
    src: "/images/menu/dessert-tart-icecream.png",
    width: 422,
    height: 748,
    side: "left",
    topClass: "-top-4",
    ...CORNER_2XL,
  },
};
