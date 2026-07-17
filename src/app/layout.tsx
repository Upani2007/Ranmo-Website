import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RestaurantSchema } from "@/components/RestaurantSchema";
import { SITE } from "@/data/site";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ranmo.example.com"),
  title: {
    default: `${SITE.name} | Kalutara South`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "Ranmo",
    "Kalutara restaurant",
    "Sri Lankan mud crab",
    "tea bar Kalutara",
    "Galle Road restaurant",
  ],
  openGraph: {
    title: SITE.name,
    description: SITE.description,
    siteName: SITE.name,
    locale: "en_LK",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${oswald.variable} ${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-charcoal text-cream">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <RestaurantSchema />
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
