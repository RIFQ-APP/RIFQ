import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "المكتبة الإسلامية",
  description: "تفسير، حديث، سيرة، فقه، تجويد",
};

const sections = [
  { title: "موسوعة التفسير", desc: "8 مصادر: الميسر، السعدي، ابن كثير، القرطبي...", icon: "📕", href: "/tafsir", ready: true },
  { title: "المصحف والتلاوة", desc: "قراءة واستماع وتفسير ميسر لكل آية", icon: "📖", href: "/quran", ready: true },
  { title: "أكاديمية التجويد", desc: "8 دروس متدرجة مع أمثلة ومراجع", icon: "🎙️", href: "/tajweed", ready: true },
  { title: "الأذكار والأدعية", desc: "صباح ومساء وبعد الصلاة مع العداد", icon: "🤲", href: "/adhkar", ready: true },
  { title: "أكاديمية الحفظ", desc: "تتبع الحفظ وخطط مرنة", icon: "🧠", href: "/hifz", ready: true },
  { title: "السيرة النبوية", desc: "خط زمني من المولد إلى الوفاة", icon: "🕌", href: "/library/seerah", ready: true },
  { title: "مكتبة الحديث", desc: "أحاديث مختارة مع التخريج والدرجة", icon: "📜", href: "/library/hadith", ready: true },
  { title: "الفقه والعبادات", desc: "طهارة، صلاة، صيام، زكاة، حج", icon: "⚖️", href: "/library/fiqh", ready: true },
  { title: "الاختبارات", desc: "راجع التجويد والسيرة والأذكار", icon: "✅", href: "/quizzes", ready: true },
  { title: "خطة التعلم", desc: "تتبع يومي مرن للقراءة والحفظ", icon: "📅", href: "/plan", ready: true },
];

export default function LibraryPage() {
  return (
    <>
      <Header />
      <main className="flex-1 mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">المكتبة الإسلامية</h1>
          <p className="text-muted-foreground">محتوى منظم وموثق. المصادر ظاهرة، والفتوى الشخصية لأهل العلم.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((s) => (
            <Link key={s.href} href={s.href} className="card p-6 transition-soft hover:border-primary/40 group">
              <span className="text-3xl mb-3 block">{s.icon}</span>
              <h2 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-soft">{s.title}</h2>
              <p className="text-sm text-muted-foreground mb-2">{s.desc}</p>
              <span className="text-xs text-success font-medium">متاح</span>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
