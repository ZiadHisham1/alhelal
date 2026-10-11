import { Sheet } from "./Sheet";
import { OfferCard } from "@/components/ui/OfferCard";

const offers = [
  {
    title: "عرض القطعتين\n+\n كرسي هدية",
    image: "/img/offer-2pieces.jpg",
    href: "/contact-us",
  },
  {
    title: "عرض العرسان",
    image: "/img/offer-newlyweds.jpg",
    href: "/contact-us",
  },
  {
    title: "عرض التجديد",
    image: "/img/offer-renewal.jpg",
    href: "/contact-us",
  },
];

export function OffersSection() {
  return (
    <Sheet layer={40} pin={false} className="sm:rounded-t-[28px]">
      <h2 className="font-lalezar text-2xl sm:text-3xl lg:text-4xl text-ink text-center mb-8 lg:mb-12">
        بص علي العروض
      </h2>

      {/* 
        Mobile:  1 column stack
        Tablet:  2 columns
        Desktop: 3 columns (or 2 if you have exactly 3 offers — see note below)
      */}
      <div
        className="
          space-y-5
          sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-5
          lg:grid-cols-3 lg:gap-6
        "
      >
        {offers.map((o) => (
          <OfferCard key={o.href} {...o} />
        ))}
      </div>
    </Sheet>
  );
}