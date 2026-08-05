export const SITE = {
  name: "Ranmo Tea Bar and Restaurant",
  shortName: "Ranmo",
  tagline: "Sri Lankan tea-bar heritage, served lagoon-side.",
  description:
    "Ranmo Tea Bar and Restaurant sits on a lagoon in Kalutara South, with a coastal railway line running right alongside the dining room. Known for Chinese-fusion mains and a full Ranmo Special Tea program.",
  address: {
    line1: "#362 Galle Road",
    line2: "Kalutara South",
    country: "Sri Lanka",
    full: "#362 Galle Road, Kalutara South, Sri Lanka",
  },
  phone: {
    display: "071 2 111 888",
    href: "tel:+94712111888",
    e164: "+94712111888",
  },
  whatsapp: {
    // Same number as the printed phone; update if the client has a dedicated WhatsApp Business number.
    href: "https://wa.me/94712111888",
  },
  hours: {
    display: "10:00 AM – 10:00 PM, daily",
    opens: "10:00",
    closes: "22:00",
  },
  map: {
    // Basic Google Maps embed by address query — no API key required.
    embedSrc:
      "https://www.google.com/maps?q=Ranmo+Tea+Bar+and+Restaurant,+362+Galle+Road,+Kalutara+South,+Sri+Lanka&output=embed",
    directionsHref:
      "https://www.google.com/maps/dir/?api=1&destination=Ranmo+Tea+Bar+and+Restaurant,+362+Galle+Road,+Kalutara+South,+Sri+Lanka",
  },
  social: {
    // Placeholders — client has not yet confirmed active handles.
    facebook: null as string | null,
    instagram: null as string | null,
  },
  priceRange: "$$",
};

export const SIGNATURE_DISHES = [
  {
    name: "Ranmo Short Eats",
    description: "Golden-baked pastries, fresh off the tray — the go-to order for a quick bite with tea.",
    image: "/images/stock/pastries.jpg",
    href: "/menu#short-eats-pastries",
  },
  {
    name: "Mongolian Noodles",
    description: "Julienne vegetables, chicken, beef, sausages, shrimp and cuttlefish in a spicy Mongolian sauce, fried egg on top.",
    image: "/images/food-fried-rice-table.jpg",
    href: "/menu#rice-noodles",
  },
  {
    name: "Ranmo Special Tea",
    description: "The house tea program — plain or milk, brewed the way a proper tea bar should.",
    image: "/images/interior-mural-teapicker.jpg",
    href: "/menu#beverages",
  },
];

export const GALLERY_IMAGES = [
  {
    src: "/images/hero-lagoon-railway.jpg",
    alt: "View of the lagoon and coastal railway line from Ranmo's dining room windows",
    category: "Setting" as const,
    real: true,
  },
  {
    src: "/images/exterior-storefront-night.jpg",
    alt: "Ranmo Tea Bar and Restaurant's illuminated storefront on Galle Road at night",
    category: "Exterior" as const,
    real: true,
  },
  {
    src: "/images/interior-mural-doorway.jpg",
    alt: "Hand-carved wood entrance mural depicting Sri Lanka's tea country, with the dining room beyond",
    category: "Interior" as const,
    real: true,
  },
  {
    src: "/images/interior-mural-teapicker.jpg",
    alt: "Carved wood mural of a tea picker in the tea fields, lit in blue ambient lighting",
    category: "Interior" as const,
    real: true,
  },
  {
    src: "/images/food-fried-rice-table.jpg",
    alt: "A plate of fried rice served at a table inside Ranmo's dining room",
    category: "Food" as const,
    real: true,
  },
  {
    src: "/images/drink-icedtea-table.jpg",
    alt: "An iced tea beverage garnished with mint, served at a table inside Ranmo",
    category: "Food" as const,
    real: true,
  },
  {
    src: "/images/seafood-platter-fries.jpg",
    alt: "A seafood platter with prawns, sausage and French fries",
    category: "Food" as const,
    real: false,
  },
  {
    src: "/images/stock/prawns-lobster.jpg",
    alt: "Grilled prawn in butter sauce (menu reference photo)",
    category: "Food" as const,
    real: false,
  },
  {
    src: "/images/stock/oysters.jpg",
    alt: "Shucked oysters with tabasco and lime (menu reference photo)",
    category: "Food" as const,
    real: false,
  },
  {
    src: "/images/stock/clams.jpg",
    alt: "Sautéed clams with olives and lime (menu reference photo)",
    category: "Food" as const,
    real: false,
  },
  {
    src: "/images/stock/octopus.jpg",
    alt: "Octopus in spicy sauce (menu reference photo)",
    category: "Food" as const,
    real: false,
  },
] as const;

export const REVIEWS_PLACEHOLDER = [
  {
    author: "Google review",
    rating: 5,
    text: "The lagoon view from the dining room is unbeatable, and the food is worth the trip alone.",
  },
  {
    author: "Google review",
    rating: 5,
    text: "Great tea, great setting right by the railway line. Mongolian noodles were excellent.",
  },
  {
    author: "Google review",
    rating: 4,
    text: "Big menu, friendly service. Come hungry — the platters are made for sharing.",
  },
];

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/location", label: "Location" },
  { href: "/reservations", label: "Reservations" },
];
