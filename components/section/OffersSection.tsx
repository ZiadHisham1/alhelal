import { Sheet } from "./Sheet";
import { OfferCard } from "@/components/ui/OfferCard";

const offers = [
  {
    title: "عرض القطعتين\n+\n كرسي هدية",
    image: "/img/offer-2pieces.jpg",
    href: "/offers/two-pieces",
  },
  {
    title: "عرض العرسان",
    image: "/img/offer-newlyweds.jpg",
    href: "/offers/newlyweds",
  },
  {
    title: "عرض التجديد",
    image: "/img/offer-renewal.jpg",
    href: "/offers/renewal",
  },
];

export function OffersSection() {
  return (
    <Sheet layer={20} pin={false}>
      <h2 className="font-lalezar text-2xl sm:text-3xl text-ink text-center mb-8">
        بص علي العروض
      </h2>

      <div className="space-y-5">
        {offers.map((o) => (
          <OfferCard key={o.href} {...o} />
        ))}
      </div>
    </Sheet>
  );
}