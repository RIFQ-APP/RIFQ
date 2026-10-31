import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const features = [
  { title: "المصحف + التفسير", description: "نص موثوق، تلاوة بـ6 قراء، وتفسير ميسر لكل آية.", href: "/quran", icon: "📖" },
  { title: "أكاديمية الحفظ", description: "تتبع حالة كل آية وخطط مرنة حسب وقتك.", href: "/hifz", icon: "🧠" },
  { title: "التجويد", description: "دروس متدرجة من المخارج إلى المدود مع أمثلة.", href: "/tajweed", icon: "🎙️" },
  { title: "الأذكار", description: "صباح ومساء وبعد الصلاة مع مصادر وعدّاد.", href: "/adhkar", icon: "🤲" },
  { title: "الحديث والسيرة", description: "أحاديث مخزّجة وخط زمني للسيرة النبوية.", href: "/library", icon: "📚" },
  { title: "اختبارات وخطة", description: "راجع فهمك ونظّم يومك برفق.", href: "/quizzes", icon: "✅" },
];

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/40 to-transparent pointer-events-none" />
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <p className="text-sm font-medium text-primary mb-3 tracking-wide">منصة إسلامية متكاملة</p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                تعلّم برفق
                <span className="block text-primary mt-1">وافهم بعمق</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
                قرآن، حفظ، تجويد، أذكار، حديث، سيرة، فقه، واختبارات — في مكان واحد هادئ وموثوق.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="/quran" className="btn-primary text-base px-8 py-3 w-full sm:w-auto">ابدأ قراءة القرآن</Link>
                <Link href="/hifz" className="btn-secondary text-base px-8 py-3 w-full sm:w-auto">خطة الحفظ</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-4 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { href: "/quran", icon: "📖", label: "المصحف" },
              { href: "/hifz", icon: "🧠", label: "الحفظ" },
              { href: "/adhkar", icon: "🤲", label: "الأذكار" },
              { href: "/plan", icon: "📅", label: "خطتي" },
            ].map((x) => (
              <Link key={x.href} href={x.href} className="card p-4 text-center hover:border-primary/30 transition-soft">
                <span className="text-2xl mb-2 block">{x.icon}</span>
                <span className="text-sm font-medium">{x.label}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">ماذا تقدم المنصة؟</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">وظائف حقيقية، ومصادر ظاهرة، وتجربة هادئة.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <Link key={f.href} href={f.href} className="card p-6 transition-soft hover:border-primary/40 group">
                <span className="text-3xl mb-4 block">{f.icon}</span>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-soft">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="card p-8 sm:p-10 bg-secondary/50 border-primary/10">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">الموثوقية قبل كثرة المحتوى</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              النص القرآني من مصدر موثوق. الأحاديث مع تخريجها. التفسير منقول ومُسمّى مصدره. لا نختلق آيات أو أحكاماً.
            </p>
            <Link href="/about#sources" className="inline-flex items-center gap-1 text-primary font-medium text-sm hover:underline">
              سياسة التوثيق ←
            </Link>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">ابدأ بخطوات ثابتة</h2>
          <p className="text-muted-foreground mb-6">أنشئ حساباً لحفظ تقدمك ومفضلتك بين أجهزتك.</p>
          <Link href="/auth/register" className="btn-primary text-base px-8 py-3">إنشاء حساب مجاني</Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
