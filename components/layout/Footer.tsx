import Link from "next/link";
import { cn } from "@/lib/utils";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { BackToTop } from "@/components/ui/BackToTop";
import { ContactIcon } from "@/components/ui/ContactItemIcon";
import { footerConfig } from "@/config/footer";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  const {
    brand,
    contact,
    columns,
    socials,
    payments,
    bottomLinks,
    copyright,
  } = footerConfig;

  return (
    <footer
      dir="rtl"
      className={cn(
        "relative z-50 overflow-hidden",
        "bg-[#0B0B0C] text-white",
        "rounded-t-[28px]",
        "-mt-6",
        "shadow-[0_-8px_24px_rgba(0,0,0,0.35)]",
        className
      )}
    >
      {/* Decorative corner glow */}
      <div
        aria-hidden
        className="
          pointer-events-none absolute -top-40 right-0
          w-[500px] h-[500px]
          rounded-full
          opacity-40 blur-[120px]
        "
        style={{
          background:
            "radial-gradient(circle, rgba(200,140,60,0.35), transparent 70%)",
        }}
      />

      {/* Thin top highlight line */}
      <div
        aria-hidden
        className="
          absolute top-0 left-1/2 -translate-x-1/2
          h-px w-[60%]
          bg-gradient-to-r from-transparent via-white/20 to-transparent
        "
      />

      <div className="relative mx-auto w-full max-w-[1100px] px-5 sm:px-8 pt-12 pb-8">
        {/* ============ TOP: brand + newsletter ============ */}
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          {/* Brand block (right in RTL) */}
          <div>
            <Link
              href="/"
              aria-label={`${brand.primary} ${brand.secondary}`}
              className="inline-flex items-baseline gap-2 select-none"
            >
              <span
                className="font-lalezar text-3xl sm:text-4xl text-white"
                style={{ textShadow: "0 1px 0 rgba(255,255,255,0.15)" }}
              >
                {brand.primary}
              </span>
              <span className="font-lalezar text-3xl sm:text-4xl text-[#FFDEDE]">
                {brand.secondary}
              </span>
            </Link>

            <p className="mt-4 max-w-md text-white/60 leading-relaxed text-sm sm:text-base">
              {brand.tagline}
            </p>

            {/* Socials */}
            <div className="mt-6 flex items-center gap-3 flex-wrap">
              {socials.map((s) => (
                <SocialIcon key={s.icon} {...s} size={42} />
              ))}
            </div>
          </div>

          {/* Newsletter (left in RTL) */}
          <div className="md:justify-self-end md:max-w-md w-full">
            <NewsletterForm />
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-white/10" />

        {/* ============ MIDDLE: columns + contact ============ */}
        <div className="grid gap-10 md:grid-cols-12">
          {/* Link columns */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="font-lalezar text-base sm:text-lg text-white mb-4">
                  {col.title}
                </h3>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="
                          inline-block text-sm text-white/60
                          hover:text-white transition-colors
                          hover:translate-x-[-2px]
                        "
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact card */}
          <div className="md:col-span-4">
            <h3 className="font-lalezar text-base sm:text-lg text-white mb-4">
              {contact.title}
            </h3>
            <ul className="space-y-3">
              {contact.items.map((item) => {
                const inner = (
                  <span className="flex items-center gap-3 text-sm text-white/70 group-hover:text-white transition-colors">
                    <span
                      className="
                        flex items-center justify-center
                        w-9 h-9 rounded-full
                        bg-white/5 ring-1 ring-white/10
                        text-white/80
                        group-hover:bg-white/10 transition
                      "
                    >
                      <ContactIcon name={item.icon} className="w-4 h-4" />
                    </span>
                    <span className="flex flex-col">
                      <span className="text-[11px] uppercase tracking-wider text-white/40">
                        {item.label}
                      </span>
                      <span dir="ltr" className="text-white/85 text-right">
                        {item.value}
                      </span>
                    </span>
                  </span>
                );

                return (
                  <li key={item.label} className="group">
                    {item.href ? (
                      <a
                        href={item.href}
                        target={
                          item.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          item.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                      >
                        {inner}
                      </a>
                    ) : (
                      inner
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-white/10" />

        {/* ============ PAYMENTS ============ */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {payments.map((p) => (
            <PaymentBadge key={p.label} label={p.label} brand={p.brand} />
          ))}
        </div>

        {/* ============ BOTTOM BAR ============ */}
        <div className="mt-10 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40 text-center sm:text-right">
            {copyright}
          </p>

          <div className="flex items-center gap-4">
            <ul className="flex items-center gap-4 text-xs text-white/50">
              {bottomLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white transition">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <BackToTop />
          </div>
        </div>
      </div>
    </footer>
  );
}

/* -------------------- Payment badges -------------------- */
function PaymentBadge({
  label,
  brand,
}: {
  label: string;
  brand: "visa" | "mastercard" | "meeza" | "cod";
}) {
  return (
    <span
      aria-label={label}
      className="
        inline-flex items-center justify-center
        h-9 px-4 rounded-xl
        bg-white/5 ring-1 ring-white/10
        text-[11px] font-lalezar text-white/70
        min-w-[70px]
      "
    >
      {brand === "visa" && <VisaMark />}
      {brand === "mastercard" && <MastercardMark />}
      {brand === "meeza" && <MeezaMark />}
      {brand === "cod" && <span>{label}</span>}
    </span>
  );
}

function VisaMark() {
  return (
    <svg viewBox="0 0 48 16" className="h-3.5" aria-hidden>
      <text
        x="0"
        y="13"
        fontFamily="system-ui"
        fontWeight="800"
        fontStyle="italic"
        fontSize="14"
        fill="#ffffff"
      >
        VISA
      </text>
    </svg>
  );
}

function MastercardMark() {
  return (
    <svg viewBox="0 0 48 20" className="h-4" aria-hidden>
      <circle cx="16" cy="10" r="8" fill="#EB001B" />
      <circle cx="28" cy="10" r="8" fill="#F79E1B" fillOpacity="0.9" />
      <path
        d="M22 4 a8 8 0 0 1 0 12 a8 8 0 0 1 0 -12z"
        fill="#FF5F00"
      />
    </svg>
  );
}

function MeezaMark() {
  return (
    <svg viewBox="0 0 60 16" className="h-3.5" aria-hidden>
      <text
        x="0"
        y="13"
        fontFamily="system-ui"
        fontWeight="800"
        fontSize="13"
        fill="#ffffff"
      >
        meeza
      </text>
    </svg>
  );
}

export default Footer;