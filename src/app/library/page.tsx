import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  IconBook,
  IconBookOpen,
  IconMic,
  IconHands,
  IconBrain,
  IconMap,
  IconScroll,
  IconScale,
  IconAward,
  IconCalendar,
  IconSparkles,
  IconSearch,
} from "@/components/icons";

export const metadata = {
  title: "المكتبة الإسلامية",
  description: "تفسير، حديث، سيرة، فقه، تجويد",
};

const sections = [
  { title: "موسوعة التفسير", desc: "معاني الآيات من مصادر موثوقة باختيار السورة.", Icon: IconSparkles, href: "/tafsir" },
  { title: "المصحف والتلاوة", desc: "قراءة واستماع وتفسير ميسر لكل آية.", Icon: IconBook, href: "/quran" },
  { title: "أكاديمية التجويد", desc: "دروس متدرجة مع أمثلة ومراجع.", Icon: IconMic, href: "/tajweed" },
  { title: "الأذكار والأدعية", desc: "صباح ومساء وبعد الصلاة مع العداد.", Icon: IconHands, href: "/adhkar" },
  { title: "أكاديمية الحفظ", desc: "تتبع الحفظ وجلسات تفاعلية.", Icon: IconBrain, href: "/hifz" },
  { title: "السيرة النبوية", desc: "خط زمني من المولد إلى الوفاة.", Icon: IconMap, href: "/library/seerah" },
  { title: "مكتبة الحديث", desc: "أحاديث مختارة مع التخريج والدرجة.", Icon: IconScroll, href: "/library/hadith" },
  { title: "الفقه والعبادات", desc: "طهارة، صلاة، صيام، زكاة، حج.", Icon: IconScale, href: "/library/fiqh" },
  { title: "الاختبارات", desc: "راجع التجويد والسيرة والأذكار.", Icon: IconAward, href: "/quizzes" },
  { title: "خطة التعلم", desc: "تتبع يومي مرن للقراءة والحفظ.", Icon: IconCalendar, href: "/plan" },
  { title: "التدبّر", desc: "متشابهات ومقارنات هادئة بين الآيات.", Icon: IconBookOpen, href: "/tadabbur" },
  { title: "البحث", desc: "ابحث في القرآن والمحتوى بسرعة.", Icon: IconSearch, href: "/search" },
] as const;

export default function LibraryPage() {
  return (
    <>
      <Header />
      <main className="flex-1 mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-semibold text-primary mb-2">المكتبة</p>
          <h1 className="text-3xl font-bold text-foreground mb-2">المكتبة الإسلامية</h1>
          <p className="text-muted-foreground max-w-2xl">
            محتوى منظم وموثق. المصادر ظاهرة، والفتوى الشخصية لأهل العلم.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="card p-6 transition-soft hover:border-primary/40 group"
            >
              <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary">
                <s.Icon size={22} />
              </span>
              <h2 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-soft">
                {s.title}
              </h2>
              <p className="text-sm text-muted-foreground mb-3">{s.desc}</p>
              <span className="text-xs text-primary font-medium">متاح</span>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
