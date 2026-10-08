// app/components/section/AboutContent.tsx
import Link from "next/link";
import { Sheet } from "./Sheet";

export function AboutContent() {
  return (
    <>
      {/* ============ 1. INTRO ============ */}
      <Sheet layer={10}>
        <div className="max-w-[720px] mx-auto space-y-6">
          <div className="text-center space-y-3">
            <h1 className="font-lalezar text-3xl sm:text-4xl text-ink">
              من نحن
            </h1>
            <p className="text-ink/70 leading-relaxed text-base sm:text-lg">
              في <span className="text-ink font-lalezar">الهلال فيرنتشر</span>{" "}
              نؤمن أن البيت ما هو إلا انعكاس لأصحابه. من أول قطعة أثاث لحد آخر
              لمسة ديكور، بنساعدك تصنع مكان يشبهك — مكان تحس فيه بالراحة،
              بالدفء، وبالانتماء.
            </p>
          </div>

          {/* Hero-ish image band */}
          <div className="relative w-full aspect-[16/10] rounded-[28px] overflow-hidden bg-white/40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/about-hero.jpg"
              alt="الهلال فيرنتشر — أثاث يليق ببيتك"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <p className="absolute bottom-5 right-6 left-6 text-white font-lalezar text-xl sm:text-2xl text-right drop-shadow-md">
              أثاث يليق ببيتك
            </p>
          </div>
        </div>
      </Sheet>

      {/* ============ 2. OUR STORY ============ */}
      <Sheet layer={20}>
        <div className="max-w-[720px] mx-auto space-y-6">
          <h2 className="font-lalezar text-2xl sm:text-3xl text-ink text-center">
            قصتنا
          </h2>

          <div className="space-y-4 text-ink/75 leading-relaxed text-right">
            <p>
              بدأت رحلتنا سنة <span className="font-lalezar text-ink">2015</span>{" "}
              من ورشة صغيرة في القاهرة. كانت البداية بسيطة — كنب مصنوع بحب،
              وخشب مختار بعناية، وعملاء بنتعامل معاهم كأنهم أهل البيت.
            </p>
            <p>
              مع الوقت كبر الحلم. زودنا خطوط الإنتاج، وضمينا فريق من أفضل
              الحرفيين، ووسّعنا مجموعتنا لتشمل غرف النوم، غرف المعيشة،
              والمكاتب المنزلية. لكن حاجة واحدة ما اتغيرتش:{" "}
              <span className="text-ink font-lalezar">
                الجودة قبل أي حاجة.
              </span>
            </p>
            <p>
              النهاردة، الهلال فيرنتشر بيخدم آلاف البيوت في مصر والمنطقة
              العربية. وكل قطعة بتخرج من عندنا، بتخرج بمعايير صارمة، وبتوصل
              لباب بيتك بضمان حقيقي وخدمة ما بعد البيع.
            </p>
          </div>
        </div>
      </Sheet>

      {/* ============ 3. VALUES ============ */}
      <Sheet layer={30}>
        <div className="max-w-[720px] mx-auto space-y-6">
          <h2 className="font-lalezar text-2xl sm:text-3xl text-ink text-center">
            قيمنا
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <ValueCard
              icon="quality"
              title="جودة بلا تنازلات"
              text="كل قطعة بتعدي على مراجعة يدوية قبل ما توصلك. لو مش عاجبتنا، مش هتوصلك."
            />
            <ValueCard
              icon="hand"
              title="صناعة يدوية"
              text="حرفيينا بيشتغلوا بإيديهم. كل تفصيلة بتتعمل بعناية مش بسرعة."
            />
            <ValueCard
              icon="heart"
              title="عميل في المقام الأول"
              text="خدمة العملاء عندنا مش قسم — هي روح الشركة. بنسمعك، بننصحك، وبنحل أي مشكلة."
            />
            <ValueCard
              icon="leaf"
              title="مسؤولية بيئية"
              text="بنستخدم أخشاب من مصادر مستدامة، وبنقلل الهدر في كل مرحلة تصنيع."
            />
          </div>
        </div>
      </Sheet>

      {/* ============ 4. STATS ============ */}
      <Sheet layer={40}>
        <div className="max-w-[720px] mx-auto space-y-6">
          <h2 className="font-lalezar text-2xl sm:text-3xl text-ink text-center">
            بالأرقام
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatCard value="10+" label="سنوات خبرة" />
            <StatCard value="5K+" label="عميل سعيد" />
            <StatCard value="200+" label="منتج متنوع" />
            <StatCard value="3" label="سنوات ضمان" />
          </div>
        </div>
      </Sheet>

      {/* ============ 5. CTA ============ */}
      <Sheet layer={40}>
        <div className="max-w-[560px] mx-auto text-center space-y-6">
          <h2 className="font-lalezar text-2xl sm:text-3xl text-ink">
            جاهز تبدّل شكل بيتك؟
          </h2>
          <p className="text-ink/70">
            تصفح مجموعتنا أو كلمنا على واتساب، وهنساعدك تختار الأفضل ليك.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/collection"
              className="
                inline-flex items-center justify-center
                h-14 px-8 rounded-full
                bg-ink text-white font-lalezar text-lg
                hover:bg-ink/90 active:scale-[0.99] transition
              "
            >
              تصفح المنتجات
            </Link>
            <a
              href="https://wa.me/201000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center justify-center
                h-14 px-8 rounded-full
                bg-white text-ink font-lalezar text-lg
                ring-1 ring-ink/10 hover:bg-white/80 transition
              "
            >
              تواصل على واتساب
            </a>
          </div>
        </div>
      </Sheet>
    </>
  );
}

/* ============ Small pieces ============ */

function ValueCard({
  icon,
  title,
  text,
}: {
  icon: "quality" | "hand" | "heart" | "leaf";
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[28px] bg-white/60 ring-1 ring-ink/10 p-5 space-y-3 text-right">
      <div className="w-11 h-11 grid place-items-center rounded-full bg-ink text-white">
        <ValueIcon name={icon} />
      </div>
      <h3 className="font-lalezar text-lg text-ink">{title}</h3>
      <p className="text-sm text-ink/70 leading-relaxed">{text}</p>
    </div>
  );
}

function ValueIcon({ name }: { name: "quality" | "hand" | "heart" | "leaf" }) {
  const common = {
    viewBox: "0 0 24 24",
    className: "w-5 h-5",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (name === "quality") {
    return (
      <svg {...common}>
        <path d="M12 3l2.5 5 5.5.8-4 3.9.9 5.5L12 15.7 7.1 18.2l.9-5.5-4-3.9L9.5 8 12 3z" />
      </svg>
    );
  }
  if (name === "hand") {
    return (
      <svg {...common}>
        <path d="M8 12V6a2 2 0 1 1 4 0v6" />
        <path d="M12 12V4a2 2 0 1 1 4 0v8" />
        <path d="M16 12v-3a2 2 0 1 1 4 0v7a6 6 0 0 1-6 6h-2a6 6 0 0 1-6-6v-3" />
      </svg>
    );
  }
  if (name === "heart") {
    return (
      <svg {...common}>
        <path d="M12 21s-7-4.5-9.2-9A4.7 4.7 0 0 1 12 6.5a4.7 4.7 0 0 1 9.2 5.5C19 16.5 12 21 12 21z" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M12 21c-4-4-6-8-6-12a6 6 0 1 1 12 0c0 4-2 8-6 12z" />
      <path d="M12 21V11" />
    </svg>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-[28px] bg-white/60 ring-1 ring-ink/10 p-4 text-center">
      <div className="font-lalezar text-3xl text-ink">{value}</div>
      <div className="text-xs text-ink/60 mt-1">{label}</div>
    </div>
  );
}