import { SITE } from "@/data/site";

export function RestaurantSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: SITE.name,
    image: "https://ranmo.example.com/images/hero-storefront.jpg",
    servesCuisine: ["Sri Lankan", "Chinese", "Seafood", "Bakery"],
    priceRange: SITE.priceRange,
    telephone: SITE.phone.e164,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.line1,
      addressLocality: SITE.address.line2,
      addressCountry: "LK",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: SITE.hours.opens,
      closes: SITE.hours.closes,
    },
    hasMenu: "https://ranmo.example.com/menu",
    acceptsReservations: "True",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
