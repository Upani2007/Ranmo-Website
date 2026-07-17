import { SITE } from "@/data/site";
import { DirectionsButton } from "./CtaButtons";

export function MapEmbed({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <div className="aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/10 sm:aspect-video">
        <iframe
          title={`Map showing ${SITE.name}`}
          src={SITE.map.embedSrc}
          className="h-full w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <div className="mt-4">
        <DirectionsButton variant="primary" />
      </div>
    </div>
  );
}
