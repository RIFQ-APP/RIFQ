import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  IconBook,
  IconBrain,
  IconSparkles,
  IconMic,
  IconScroll,
  IconHands,
  IconLeaf,
  IconSearch,
  IconCheck,
} from "@/components/icons";

const features = [
  {
    href: "/quran",
    title: "المصحف الإلكتروني",
    desc: "قراءة مرتبة مع حفظ موضعك والتلاوة الصوتيّة.",
    Icon: IconBook,
  },
  {
    href: "/hifz",
    title: "الحفظ والمراجعة",
    desc: "جلسات تفاعلية وتتبع تقدّمك يوماً بيوم.",
    Icon: IconBrain,
  },
  {
    href: "/tafsir",
    title: "التفسير",
    desc: "معاني الآيات من مصادر موثوقة باختيار السورة.",
    Icon: IconSparkles,
  },
  {
    href: "/tajweed",
    title: "أكاديمية التجويد",
    desc: "دروس متدرجة من المخارج إلى أحكام النون.",
    Icon: IconMic,
  },
  {
    href: "/library/hadith",
    title: "مكتبة الحديث",
    desc: "مختارات رِفْق وآلاف الأحاديث من الكتب الستة.",
    Icon: IconScroll,
  },
  {
    href: "/adhkar",
    title: "الأذكار والأدعية",
    desc: "أذكار الصباح والمساء والنوم وغيرها.",
    Icon: IconHands,
  },
  {
    href: "/tadabbur",
    title: "التدبّر",
    desc: "متشابهات الآيات ومفاتيح للتأمل الهادئ.",
    Icon: IconLeaf,
  },
  {
    href: "/search",
    title: "البحث",
    desc: "ابحث في القرآن والمحتوى الإسلامي بسرعة.",
    Icon: IconSearch,
  },
  {
    href: "/wird",
    title: "ورد اليوم",
    desc: "تتبع قراءتك وأذكارك وسلسلة أيامك.",
    Icon: IconCheck,
  },
] as const;

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/60 to-background pointer-events-none" />
          <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-24 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground mb-6">
              منصة إسلامية تعليمية
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight mb-4">
              رِفْق
              <span className="block text-primary text-2xl sm:text-3xl mt-2 font-semibold">
                تعلّم برفق · افهم بعمق · استمر بثبات
              </span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg leading-relaxed mb-8">
              مكان واحد للقرآن والحفظ والتفسير والتجويد والحديث والأذكار —
              بتجربة هادئة تناسب يومك ومستواك.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/quran"
                className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm shadow-sm hover:opacity-95 transition-soft"
              >
                افتح المصحف
              </Link>
              <Link
                href="/hifz"
                className="px-6 py-3 rounded-xl bg-card border border-border font-medium text-sm hover:bg-muted transition-soft"
              >
                ابدأ الحفظ
              </Link>
              <Link
                href="/auth/register"
                className="px-6 py-3 rounded-xl text-sm font-medium text-primary hover:underline"
              >
                إنشاء حساب مجاني
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-2">كل ما تحتاجه في مكان واحد</h2>
            <p className="text-muted-foreground text-sm">
              أدوات حقيقية للاستخدام اليومي — لا مجرد صفحات ثابتة
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <Link
                key={f.href}
                href={f.href}
                className="group rounded-2xl border border-border bg-card p-5 shadow-sm hover:border-primary/40 hover:shadow-md transition-soft"
              >
                <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary">
                  <f.Icon size={22} />
                </span>
                <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-soft">
                  {f.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-y border-border bg-secondary/30">
          <div className="mx-auto max-w-6xl px-4 py-14 grid gap-8 md:grid-cols-3">
            {[
              {
                t: "موثوقية المحتوى",
                d: "مصادر معروفة، وتخريج للأحاديث، وتمييز بين النص والشرح.",
              },
              {
                t: "تجربة شخصية",
                d: "حفظ التقدّم، المفضلة، وخطط تناسب وقتك.",
              },
              {
                t: "واجهة عربية راقية",
                d: "تصميم RTL هادئ يصلح للكبار والصغار.",
              },
            ].map((x) => (
              <div key={x.t}>
                <h3 className="font-semibold mb-2">{x.t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{x.d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 text-center">
          <h2 className="text-2xl font-bold mb-3">ابدأ اليوم بخطوة واحدة</h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto text-sm">
            افتح سورة، أو راجع وردك، أو اقرأ ذكر الصباح — الاستمرار أهم من الكثرة.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/quran/1"
              className="px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-medium"
            >
              سورة الفاتحة
            </Link>
            <Link
              href="/wird"
              className="px-6 py-3 rounded-xl border border-border text-sm font-medium"
            >
              ورد اليوم
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
