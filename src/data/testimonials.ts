/**
 * A curated selection of real reviews from Ranmo's Google Business Profile,
 * transcribed by hand.
 *
 * Rules for editing this file:
 * - Quote text is reproduced **verbatim**. Do not reword, re-punctuate or
 *   correct spelling or grammar — these are other people's words. (Emoji were
 *   dropped from the originals for readability; nothing else was changed.)
 * - `rating` is the reviewer's actual star count, which is not always 5.
 * - Because this is a hand-picked subset rather than every review, the site
 *   must not show an average rating or a total review count anywhere — an
 *   average over a flattering selection would misrepresent the real score.
 *   Visitors get a link to the full listing instead.
 *
 * `relativeDate` is Google's own wording at the time of transcription
 * (12 August 2026) and does not update itself — "6 months ago" will read the
 * same next year. Re-check these if the section is still live in 2027.
 */

export type Testimonial = {
  author: string;
  /** Google's "Local Guide" badge, shown next to the name when true. */
  localGuide?: boolean;
  /** Out of 5. */
  rating: number;
  relativeDate: string;
  text: string;
};

/** Where visitors go to read every review, not just these four. */
export const GOOGLE_LISTING_URL =
  "https://www.google.com/maps/place/Ranmo+Seafood+Restaurant/@6.5779947,79.9626485,17z/data=!3m1!4b1!4m6!3m5!1s0x3ae2377c6e79436b:0x341de5763f561a29!8m2!3d6.5779947!4d79.9626485!16s%2Fg%2F11yb4cg1sj";

export const TESTIMONIALS: Testimonial[] = [
  {
    author: "Yuwani Medha Yatharthani",
    rating: 5,
    relativeDate: "a year ago",
    text: "One of the best restaurants in Kalutara I have ever seen, with very kind staff to the customers. The food is very tasty and the prices are reasonable compared to other restaurants.",
  },
  {
    author: "udari Dilhara",
    rating: 5,
    relativeDate: "6 months ago",
    text: "The best place to eat clean food. The customer service is excellent. The food is delicious. The prices are reasonable.",
  },
  {
    author: "Chamindri Nisansala Mataraarachchi",
    rating: 5,
    relativeDate: "2 months ago",
    text: "Highly recommended for a budget-friendly hangout with friends! The place offers a beautiful sunset view while dining, creating a relaxing atmosphere. The service is friendly and attentive, and the prices are very reasonable for the experience.",
  },
  {
    author: "Viraj Madushan",
    localGuide: true,
    rating: 4,
    relativeDate: "a year ago",
    text: "I recently visited Ranmo Tea Bar and Restaurant and had a fantastic experience. The place is clean and well-kept, creating a calm and relaxing atmosphere. One of the best things about it is the awesome view — you can enjoy your meal while overlooking the beach and the nearby railway line, which adds a unique charm to the setting. The food was delicious, with a variety of tasty bites available on their menu to suit all kinds of cravings. Their service is also top-notch — very friendly and welcoming staff who make you feel right at home.",
  },
  {
    // Name reproduced as it appears on the review, in caps.
    author: "UMAYANGA SATHSARANI",
    rating: 4,
    relativeDate: "3 weeks ago",
    text: "We ordered lunch packets from this restaurant for our office event, and the experience was excellent! The food was fresh, flavorful, and well-packed, making it easy to serve and enjoy. Everyone appreciated the generous portions and the variety offered. Delivery was punctual, and the team handled everything professionally, ensuring our event went smoothly. Highly recommended for anyone looking for quality meals and reliable service for group orders!",
  },
];
